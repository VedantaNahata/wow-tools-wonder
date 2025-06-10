
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Upload, FileUp, Code, Eye, Copy, Download, FileCode, Table } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ExcelToHtmlConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [responsive, setResponsive] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [striped, setStriped] = useState(false);
  const [tableStyle, setTableStyle] = useState("modern");
  const [tableId, setTableId] = useState("excel-table");
  const [activeTab, setActiveTab] = useState("input");
  const [delimiter, setDelimiter] = useState(",");
  const [hoverEffect, setHoverEffect] = useState(true);
  const [tableCellPadding, setTableCellPadding] = useState("medium");
  const [tableCaption, setTableCaption] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "text/csv" || 
                file.type === "application/vnd.ms-excel" || 
                file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.name.endsWith('.csv') || 
                file.name.endsWith('.xls') || 
                file.name.endsWith('.xlsx'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
        toast.success(`File "${file.name}" loaded successfully`);
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid Excel/CSV file");
    }
  };

  const getPaddingValue = () => {
    switch (tableCellPadding) {
      case "small": return "6px";
      case "medium": return "12px";
      case "large": return "16px";
      default: return "12px";
    }
  };

  const getTableStyles = () => {
    const styles: { [key: string]: any } = {
      modern: {
        fontFamily: "system-ui, -apple-system, sans-serif",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      },
      classic: {
        fontFamily: "Georgia, serif",
        border: bordered ? "2px solid #374151" : "none",
      },
      minimal: {
        fontFamily: "Arial, sans-serif",
        border: "none",
      },
      dark: {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, sans-serif",
        border: bordered ? "1px solid #374151" : "none",
      },
      material: {
        fontFamily: "Roboto, sans-serif",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: "4px",
        overflow: "hidden",
      }
    };
    return styles[tableStyle] || styles.modern;
  };

  const convertToHtml = () => {
    if (!input.trim()) {
      toast.error("Please paste Excel data or upload a CSV file");
      return;
    }

    try {
      const lines = input.trim().split('\n');
      const rows = lines.map(line => {
        // Handle CSV parsing with quotes and commas
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if ((char === delimiter && !inQuotes) || (char === '\t' && !inQuotes)) {
            cells.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        cells.push(current.trim());
        return cells;
      });

      const tableClasses = ["table"];
      if (responsive) tableClasses.push("table-responsive");
      if (bordered) tableClasses.push("table-bordered");
      if (striped) tableClasses.push("table-striped");

      const tableStyles = getTableStyles();
      const padding = getPaddingValue();

      let html = `<table id="${tableId}" class="${tableClasses.join(' ')}">\n`;
      
      // Add CSS
      html = `<style>
#${tableId} {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  ${Object.entries(tableStyles).map(([key, value]) => 
    `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
  ).join('\n  ')}
}

${responsive ? `
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}` : ''}

#${tableId} th,
#${tableId} td {
  padding: ${padding};
  text-align: left;
  ${bordered ? `border: 1px solid ${tableStyle === 'dark' ? '#374151' : '#dee2e6'};` : ''}
}

#${tableId} th {
  background-color: ${tableStyle === 'dark' ? '#374151' : '#f8f9fa'};
  font-weight: bold;
  ${!bordered ? 'border-bottom: 2px solid #dee2e6;' : ''}
}

${striped ? `
#${tableId} tbody tr:nth-child(odd) {
  background-color: ${tableStyle === 'dark' ? '#1a1f2b' : '#f2f2f2'};
}` : ''}

${hoverEffect ? `
#${tableId} tbody tr:hover {
  background-color: ${tableStyle === 'dark' ? '#2d3748' : '#e9ecef'};
}` : ''}
</style>

` + html;

      if (tableCaption) {
        html += `  <caption>${tableCaption}</caption>\n`;
      }

      if (includeHeaders && rows.length > 0) {
        html += "  <thead>\n    <tr>\n";
        rows[0].forEach(cell => {
          html += `      <th>${cell.replace(/"/g, '')}</th>\n`;
        });
        html += "    </tr>\n  </thead>\n";
        html += "  <tbody>\n";
        
        for (let i = 1; i < rows.length; i++) {
          html += "    <tr>\n";
          rows[i].forEach(cell => {
            html += `      <td>${cell.replace(/"/g, '')}</td>\n`;
          });
          html += "    </tr>\n";
        }
      } else {
        html += "  <tbody>\n";
        rows.forEach(row => {
          html += "    <tr>\n";
          row.forEach(cell => {
            html += `      <td>${cell.replace(/"/g, '')}</td>\n`;
          });
          html += "    </tr>\n";
        }); 
      }

      html += "  </tbody>\n</table>";

      setOutput(html);
      setPreviewHtml(html);
      setActiveTab("output");
      toast.success("Excel data converted to HTML table successfully!");
    } catch (error) {
      toast.error("Error converting data to HTML table");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("HTML table copied to clipboard!");
  };

  const downloadHTML = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableId}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setPreviewHtml("");
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    toast.info("All data cleared");
  };

  const faqs = [
    {
      question: "What Excel formats are supported?",
      answer: "The tool supports data copied directly from Excel (tab-separated) as well as CSV files. Simply copy cells in Excel and paste them here, or upload a CSV file."
    },
    {
      question: "How do I customize the table appearance?",
      answer: "Use the styling options to customize table borders, striping, hover effects, and overall style. You can choose from modern, classic, minimal, dark, or material designs."
    },
    {
      question: "Is the generated HTML table responsive?",
      answer: "Yes! With the responsive option enabled, the table will automatically adapt to different screen sizes by adding horizontal scrolling on small devices."
    },
    {
      question: "Can I reuse the generated code?",
      answer: "Absolutely! You can copy the complete HTML code including CSS styles, or download it as an HTML file. The code can be pasted directly into your website or application."
    },
    {
      question: "Why does my data have unexpected formatting?",
      answer: "If your data contains special characters or delimiters, try changing the delimiter setting. For best results, ensure your Excel data doesn't contain merged cells before copying."
    }
  ];

  return (
    <SEOWrapper
      title="Excel to HTML Table Converter - Convert Spreadsheet Data"
      description="Convert Excel data and CSV files to responsive HTML tables. Paste from Excel or upload CSV files with custom styling options."
      keywords="excel to html, csv to html, table converter, spreadsheet converter, html table generator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Excel to HTML Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert Excel data and CSV files to responsive HTML tables with custom styling options.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Excel to HTML Converter</CardTitle>
                <CardDescription>
                  Upload a CSV file or paste Excel data to generate a styled HTML table
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-3">
                    <TabsTrigger value="input">
                      <Upload className="h-4 w-4 mr-2" />
                      Input
                    </TabsTrigger>
                    <TabsTrigger value="styling">
                      <Table className="h-4 w-4 mr-2" />
                      Styling
                    </TabsTrigger>
                    <TabsTrigger value="output">
                      <Code className="h-4 w-4 mr-2" />
                      Output
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="input" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload Excel or CSV File</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('file')?.click()}>
                        <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-foreground mb-1">Click to upload a file</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Supports CSV, XLS, XLSX formats
                        </p>
                        <Input
                          id="file"
                          type="file"
                          accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button size="sm" variant="outline" onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('file')?.click();
                        }}>
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="delimiter">Delimiter</Label>
                        <Select value={delimiter} onValueChange={setDelimiter}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value=",">Comma (,)</SelectItem>
                            <SelectItem value=";">Semicolon (;)</SelectItem>
                            <SelectItem value="\t">Tab</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="input">Excel Data / CSV Content</Label>
                      <Textarea
                        id="input"
                        placeholder="Paste your Excel data here or upload a file above..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[200px] font-mono"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button onClick={clearAll} variant="outline">
                        Clear
                      </Button>
                      <Button onClick={() => setActiveTab("styling")}>
                        Continue to Styling
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tableId">Table ID</Label>
                        <Input
                          id="tableId"
                          value={tableId}
                          onChange={(e) => setTableId(e.target.value)}
                          placeholder="excel-table"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tableCaption">Table Caption (Optional)</Label>
                        <Input
                          id="tableCaption"
                          value={tableCaption}
                          onChange={(e) => setTableCaption(e.target.value)}
                          placeholder="My Excel Data"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Table Style</Label>
                        <Select value={tableStyle} onValueChange={setTableStyle}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="dark">Dark Theme</SelectItem>
                            <SelectItem value="material">Material Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Cell Padding</Label>
                        <Select value={tableCellPadding} onValueChange={setTableCellPadding}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="headers"
                          checked={includeHeaders}
                          onCheckedChange={(checked) => setIncludeHeaders(checked === true)}
                        />
                        <Label htmlFor="headers">Headers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="responsive"
                          checked={responsive}
                          onCheckedChange={(checked) => setResponsive(checked === true)}
                        />
                        <Label htmlFor="responsive">Responsive</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bordered"
                          checked={bordered}
                          onCheckedChange={(checked) => setBordered(checked === true)}
                        />
                        <Label htmlFor="bordered">Bordered</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="striped"
                          checked={striped}
                          onCheckedChange={(checked) => setStriped(checked === true)}
                        />
                        <Label htmlFor="striped">Striped Rows</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hoverEffect"
                          checked={hoverEffect}
                          onCheckedChange={(checked) => setHoverEffect(checked === true)}
                        />
                        <Label htmlFor="hoverEffect">Hover Effect</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button onClick={() => setActiveTab("input")} variant="outline">
                        Back
                      </Button>
                      <Button onClick={convertToHtml}>
                        Generate HTML Table
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="output" className="space-y-6">
                    {output ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="output">HTML Table Code</Label>
                            <div className="flex gap-2">
                              <Button onClick={copyToClipboard} variant="outline" size="sm">
                                <Copy className="h-4 w-4 mr-1" />
                                Copy HTML
                              </Button>
                              <Button onClick={downloadHTML} variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            id="output"
                            value={output}
                            readOnly
                            className="min-h-[200px] font-mono text-sm bg-muted"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Live Preview</Label>
                          <div className="border rounded-lg p-4 overflow-x-auto">
                            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button onClick={() => setActiveTab("styling")} variant="outline">
                            Back to Styling
                          </Button>
                          <Button onClick={clearAll}>
                            Convert Another Table
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-12 border-2 border-dashed rounded-lg">
                        <FileCode className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No HTML Generated Yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your Excel data and click "Generate HTML Table" to see the output here
                        </p>
                        <Button onClick={() => setActiveTab("input")}>
                          Back to Input
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Excel to HTML Converter" faqs={faqs} />
            </div>
          </div>
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ExcelToHtmlConverter;
