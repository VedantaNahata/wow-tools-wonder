
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { FileUp, Code, Copy, Download, Table as TableIcon, FileCode, Upload } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const CsvToTableConverter = () => {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const [outputFormat, setOutputFormat] = useState("html");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [markdownOutput, setMarkdownOutput] = useState("");
  const [activeTab, setActiveTab] = useState("input");
  const [tableStyle, setTableStyle] = useState("modern");
  const [tableId, setTableId] = useState("csv-table");
  const [responsiveTable, setResponsiveTable] = useState(true);
  const [stripedRows, setStripedRows] = useState(false);
  const [hoveredRows, setHoveredRows] = useState(true);
  const [tableBorders, setTableBorders] = useState(true);
  const [cellPadding, setCellPadding] = useState("medium");
  const [alignNumbers, setAlignNumbers] = useState(true);
  const [tableCaption, setTableCaption] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "text/csv" || file.name.endsWith('.csv'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        setInput(csv);
        toast.success(`File "${file.name}" loaded successfully`);
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const parseCSV = (csvText: string = input) => {
    if (!csvText.trim()) {
      toast.error("Please provide CSV data");
      return;
    }

    try {
      const lines = csvText.trim().split('\n');
      const data = lines.map(line => {
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delimiter && !inQuotes) {
            cells.push(current.trim().replace(/^"|"$/g, ''));
            current = '';
          } else {
            current += char;
          }
        }
        cells.push(current.trim().replace(/^"|"$/g, ''));
        return cells;
      });

      setParsedData(data);
      generateOutputs(data);
      setActiveTab("preview");
      toast.success("CSV parsed successfully!");
    } catch (error) {
      toast.error("Error parsing CSV data");
    }
  };

  const getPaddingValue = () => {
    switch (cellPadding) {
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
        border: tableBorders ? "2px solid #374151" : "none",
      },
      minimal: {
        fontFamily: "Arial, sans-serif",
        border: "none",
      },
      dark: {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, sans-serif",
        border: tableBorders ? "1px solid #374151" : "none",
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

  const isNumeric = (value: string): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
  };

  const generateOutputs = (data: string[][]) => {
    if (data.length === 0) return;

    // Generate HTML
    const tableStyles = getTableStyles();
    const padding = getPaddingValue();

    let html = `<style>
#${tableId} {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  ${Object.entries(tableStyles).map(([key, value]) => 
    `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
  ).join('\n  ')}
}

${responsiveTable ? `
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}` : ''}

#${tableId} th,
#${tableId} td {
  padding: ${padding};
  text-align: left;
  ${tableBorders ? `border: 1px solid ${tableStyle === 'dark' ? '#374151' : '#dee2e6'};` : ''}
}

#${tableId} th {
  background-color: ${tableStyle === 'dark' ? '#374151' : '#f8f9fa'};
  font-weight: bold;
  ${!tableBorders ? 'border-bottom: 2px solid #dee2e6;' : ''}
}

${stripedRows ? `
#${tableId} tbody tr:nth-child(odd) {
  background-color: ${tableStyle === 'dark' ? '#1a1f2b' : '#f2f2f2'};
}` : ''}

${hoveredRows ? `
#${tableId} tbody tr:hover {
  background-color: ${tableStyle === 'dark' ? '#2d3748' : '#e9ecef'};
}` : ''}

${alignNumbers ? `
#${tableId} .number-cell {
  text-align: right;
}` : ''}
</style>

${responsiveTable ? '<div class="table-responsive">\n' : ''}
<table id="${tableId}">
`;
    
    if (tableCaption) {
      html += `  <caption>${tableCaption}</caption>\n`;
    }
    
    if (hasHeaders && data.length > 0) {
      html += '  <thead>\n    <tr>\n';
      data[0].forEach(cell => {
        html += `      <th>${cell}</th>\n`;
      });
      html += '    </tr>\n  </thead>\n  <tbody>\n';
      
      for (let i = 1; i < data.length; i++) {
        html += '    <tr>\n';
        data[i].forEach(cell => {
          const isNumber = isNumeric(cell);
          html += `      <td${isNumber && alignNumbers ? ' class="number-cell"' : ''}>${cell}</td>\n`;
        });
        html += '    </tr>\n';
      }
    } else {
      html += '  <tbody>\n';
      data.forEach(row => {
        html += '    <tr>\n';
        row.forEach(cell => {
          const isNumber = isNumeric(cell);
          html += `      <td${isNumber && alignNumbers ? ' class="number-cell"' : ''}>${cell}</td>\n`;
        });
        html += '    </tr>\n';
      });
    }
    
    html += '  </tbody>\n</table>';
    
    if (responsiveTable) {
      html += '\n</div>';
    }
    
    setHtmlOutput(html);

    // Generate Markdown
    let markdown = "";
    if (data.length > 0) {
      if (hasHeaders) {
        markdown += "| " + data[0].join(" | ") + " |\n";
        markdown += "|" + data[0].map(col => {
          // For numeric columns, align right with ---:
          const isNumberCol = data.slice(1).some(row => {
            const cellIndex = data[0].indexOf(col);
            return row[cellIndex] && isNumeric(row[cellIndex]);
          });
          return isNumberCol && alignNumbers ? " ---: " : " --- ";
        }).join("|") + "|\n";
        
        for (let i = 1; i < data.length; i++) {
          markdown += "| " + data[i].join(" | ") + " |\n";
        }
      } else {
        // Determine column alignments by checking if columns are numeric
        const alignments = data[0].map((_, colIndex) => {
          const isNumberCol = data.some(row => row[colIndex] && isNumeric(row[colIndex]));
          return isNumberCol && alignNumbers ? " ---: " : " --- ";
        });
        
        // Add header row for markdown which needs one
        markdown += "| " + data[0].map((_, i) => `Column ${i+1}`).join(" | ") + " |\n";
        markdown += "|" + alignments.join("|") + "|\n";
        
        data.forEach(row => {
          markdown += "| " + row.join(" | ") + " |\n";
        });
      }
      
      if (tableCaption) {
        markdown = `**${tableCaption}**\n\n` + markdown;
      }
    }
    setMarkdownOutput(markdown);
  };

  const copyToClipboard = (content: string, format: string) => {
    navigator.clipboard.writeText(content);
    toast.success(`${format} table copied to clipboard!`);
  };

  const downloadTable = (format: string) => {
    const content = format === 'html' ? htmlOutput : markdownOutput;
    const extension = format === 'html' ? 'html' : 'md';
    const blob = new Blob([content], { type: format === 'html' ? 'text/html' : 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_table.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`${format.toUpperCase()} file downloaded!`);
  };

  const clearAll = () => {
    setInput("");
    setParsedData([]);
    setHtmlOutput("");
    setMarkdownOutput("");
    setActiveTab("input");
    
    // Clear file input
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    toast.info("All data cleared");
  };

  const faqs = [
    {
      question: "What CSV formats are supported?",
      answer: "The tool supports standard CSV with various delimiters (comma, semicolon, or tab). It properly handles quoted fields and escaped quotes for more complex CSV data."
    },
    {
      question: "How do I customize the table output?",
      answer: "You can choose between HTML and Markdown output formats, customize the table styling, add borders, striped rows, and hover effects, and even align numeric values automatically."
    },
    {
      question: "Can I use the generated tables in my website?",
      answer: "Yes! The HTML output includes responsive design and styling that you can directly copy into your web page. The Markdown output works great with GitHub, GitLab, or any platform that supports Markdown."
    },
    {
      question: "How do I handle large CSV files?",
      answer: "For very large CSV files, we recommend splitting them into smaller chunks before processing. The tool works best with files up to a few MB in size."
    },
    {
      question: "Why are my numbers right-aligned?",
      answer: "By default, the converter automatically detects numeric values and right-aligns them, which is a common convention for displaying numbers in tables. You can disable this feature in the styling options."
    }
  ];

  return (
    <SEOWrapper
      title="CSV to Table Converter - Convert CSV to HTML & Markdown"
      description="Convert CSV data to formatted HTML and Markdown tables. Upload files or paste CSV data with custom delimiter support."
      keywords="csv to html, csv to markdown, table converter, csv parser, data converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSV to Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert CSV data to formatted HTML and Markdown tables with live preview.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSV to Table Converter</CardTitle>
                <CardDescription>
                  Transform CSV data into beautifully formatted HTML or Markdown tables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-4">
                    <TabsTrigger value="input">
                      <Upload className="h-4 w-4 mr-2" />
                      Input
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <TableIcon className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="styling">
                      <Code className="h-4 w-4 mr-2" />
                      Styling
                    </TabsTrigger>
                    <TabsTrigger value="export">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="input" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload CSV File</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('file')?.click()}>
                        <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-foreground mb-1">Click to upload a CSV file</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          or paste CSV content directly below
                        </p>
                        <Input
                          id="file"
                          type="file"
                          accept=".csv,text/csv"
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="delimiter">Delimiter</Label>
                        <Select value={delimiter} onValueChange={setDelimiter}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value=",">Comma (,)</SelectItem>
                            <SelectItem value=";">Semicolon (;)</SelectItem>
                            <SelectItem value="\t">Tab</SelectItem>
                            <SelectItem value="|">Pipe (|)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="headers"
                          checked={hasHeaders}
                          onCheckedChange={(checked) => setHasHeaders(checked === true)}
                        />
                        <Label htmlFor="headers">First row is headers</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="input">CSV Data</Label>
                      <Textarea
                        id="input"
                        placeholder="Paste your CSV data here or upload a file above..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[200px] font-mono"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button onClick={clearAll} variant="outline">
                        Clear
                      </Button>
                      <Button onClick={() => parseCSV()}>
                        Parse CSV
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    {parsedData.length > 0 ? (
                      <div>
                        <Label>Table Preview</Label>
                        <div className="border rounded-md p-4 mt-2 max-h-[400px] overflow-auto">
                          <Table>
                            {hasHeaders && (
                              <TableHeader>
                                <TableRow>
                                  {parsedData[0]?.map((cell, index) => (
                                    <TableHead key={index}>{cell}</TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                            )}
                            <TableBody>
                              {(hasHeaders ? parsedData.slice(1) : parsedData).map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                  {row.map((cell, cellIndex) => {
                                    const isNumber = isNumeric(cell);
                                    return (
                                      <TableCell 
                                        key={cellIndex}
                                        className={isNumber && alignNumbers ? "text-right" : ""}
                                      >
                                        {cell}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button onClick={() => setActiveTab("input")} variant="outline">
                            Back to Input
                          </Button>
                          <Button onClick={() => setActiveTab("styling")}>
                            Continue to Styling
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-12 border-2 border-dashed rounded-lg">
                        <TableIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Data Parsed Yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your CSV file or paste CSV data and click "Parse CSV"
                        </p>
                        <Button onClick={() => setActiveTab("input")}>
                          Go to Input
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-6">
                    {parsedData.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tableId">Table ID</Label>
                            <Input
                              id="tableId"
                              value={tableId}
                              onChange={(e) => setTableId(e.target.value)}
                              placeholder="csv-table"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tableCaption">Table Caption (Optional)</Label>
                            <Input
                              id="tableCaption"
                              value={tableCaption}
                              onChange={(e) => setTableCaption(e.target.value)}
                              placeholder="My CSV Data"
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
                            <Select value={cellPadding} onValueChange={setCellPadding}>
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

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="responsiveTable"
                              checked={responsiveTable}
                              onCheckedChange={(checked) => setResponsiveTable(checked === true)}
                            />
                            <Label htmlFor="responsiveTable">Responsive Table</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="tableBorders"
                              checked={tableBorders}
                              onCheckedChange={(checked) => setTableBorders(checked === true)}
                            />
                            <Label htmlFor="tableBorders">Table Borders</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="stripedRows"
                              checked={stripedRows}
                              onCheckedChange={(checked) => setStripedRows(checked === true)}
                            />
                            <Label htmlFor="stripedRows">Striped Rows</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="hoveredRows"
                              checked={hoveredRows}
                              onCheckedChange={(checked) => setHoveredRows(checked === true)}
                            />
                            <Label htmlFor="hoveredRows">Hover Effect</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="alignNumbers"
                              checked={alignNumbers}
                              onCheckedChange={(checked) => setAlignNumbers(checked === true)}
                            />
                            <Label htmlFor="alignNumbers">Right-align Numbers</Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Output Format</Label>
                          <Select value={outputFormat} onValueChange={setOutputFormat}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="html">HTML Table</SelectItem>
                              <SelectItem value="markdown">Markdown Table</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button onClick={() => setActiveTab("preview")} variant="outline">
                            Back to Preview
                          </Button>
                          <Button onClick={() => {
                            generateOutputs(parsedData);
                            setActiveTab("export");
                          }}>
                            Generate Output
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-12">
                        <p>Please parse CSV data first</p>
                        <Button onClick={() => setActiveTab("input")} className="mt-2">
                          Go to Input
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="export" className="space-y-4">
                    {outputFormat === "html" && htmlOutput ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>HTML Output</Label>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => copyToClipboard(htmlOutput, "HTML")} 
                                variant="outline" 
                                size="sm"
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy HTML
                              </Button>
                              <Button 
                                onClick={() => downloadTable('html')} 
                                variant="outline" 
                                size="sm"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            value={htmlOutput}
                            readOnly
                            className="min-h-[200px] font-mono bg-muted"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Preview</Label>
                          <div className="border rounded-lg p-4 overflow-x-auto">
                            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
                          </div>
                        </div>
                      </>
                    ) : outputFormat === "markdown" && markdownOutput ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Markdown Output</Label>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => copyToClipboard(markdownOutput, "Markdown")} 
                                variant="outline" 
                                size="sm"
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy Markdown
                              </Button>
                              <Button 
                                onClick={() => downloadTable('markdown')} 
                                variant="outline" 
                                size="sm"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            value={markdownOutput}
                            readOnly
                            className="min-h-[200px] font-mono bg-muted"
                          />
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <Button onClick={() => setActiveTab("styling")} variant="outline">
                            Back to Styling
                          </Button>
                          <Button onClick={clearAll}>
                            Convert New CSV
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-12 border-2 border-dashed rounded-lg">
                        <FileCode className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Output Generated Yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Style your table and generate the output
                        </p>
                        <Button onClick={() => setActiveTab("styling")}>
                          Go to Styling
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="CSV to Table Converter" faqs={faqs} />
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

export default CsvToTableConverter;
