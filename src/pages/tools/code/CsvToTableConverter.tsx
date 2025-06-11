
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";
import { Upload, Copy, Eye, Settings, Download } from "lucide-react";

interface StylingOptions {
  tableStyle: string;
  headerBgColor: string;
  headerTextColor: string;
  rowBgColor: string;
  altRowBgColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: string;
  borderStyle: string;
  fontSize: string;
  fontFamily: string;
  padding: string;
  hoverEffect: string;
  hoverColor: string;
  hoverDuration: string;
  stripedRows: boolean;
  tableBorders: boolean;
  responsive: boolean;
}

const CsvToTableConverter = () => {
  const [csvData, setCsvData] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [activeTab, setActiveTab] = useState("input");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [tableId, setTableId] = useState("csv-table");
  const [tableCaption, setTableCaption] = useState("");
  const [styling, setStyling] = useState<StylingOptions>({
    tableStyle: "modern",
    headerBgColor: "#f8f9fa",
    headerTextColor: "#212529",
    rowBgColor: "#ffffff",
    altRowBgColor: "#f8f9fa",
    textColor: "#212529",
    borderColor: "#dee2e6",
    borderWidth: "1px",
    borderStyle: "solid",
    fontSize: "14px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "8px 12px",
    hoverEffect: "background",
    hoverColor: "#e9ecef",
    hoverDuration: "0.2s",
    stripedRows: true,
    tableBorders: true,
    responsive: true
  });

  const { toast } = useToast();

  const generateCSS = () => {
    const baseStyles = {
      modern: {
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      },
      classic: {
        border: `2px ${styling.borderStyle} ${styling.borderColor}`
      },
      minimal: {
        border: "none"
      },
      dark: {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        border: `1px ${styling.borderStyle} #374151`
      }
    };

    const selectedStyle = baseStyles[styling.tableStyle as keyof typeof baseStyles] || baseStyles.modern;

    return `
<style>
#${tableId} {
  border-collapse: collapse;
  width: 100%;
  font-family: ${styling.fontFamily};
  font-size: ${styling.fontSize};
  color: ${styling.textColor};
  ${Object.entries(selectedStyle).map(([key, value]) => 
    `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
  ).join('\n  ')}
  ${styling.responsive ? 'margin: 0 auto; max-width: 100%;' : ''}
}

${styling.responsive ? `
#${tableId}-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
` : ''}

#${tableId} th,
#${tableId} td {
  padding: ${styling.padding};
  text-align: left;
  ${styling.tableBorders ? `border: ${styling.borderWidth} ${styling.borderStyle} ${styling.borderColor};` : ''}
}

#${tableId} th {
  background-color: ${styling.headerBgColor};
  color: ${styling.headerTextColor};
  font-weight: bold;
  ${!styling.tableBorders ? `border-bottom: 2px ${styling.borderStyle} ${styling.borderColor};` : ''}
}

${styling.stripedRows ? `
#${tableId} tbody tr:nth-child(even) {
  background-color: ${styling.altRowBgColor};
}

#${tableId} tbody tr:nth-child(odd) {
  background-color: ${styling.rowBgColor};
}
` : `
#${tableId} tbody tr {
  background-color: ${styling.rowBgColor};
}
`}

${styling.hoverEffect === 'background' ? `
#${tableId} tbody tr:hover {
  background-color: ${styling.hoverColor} !important;
  transition: background-color ${styling.hoverDuration};
}
` : styling.hoverEffect === 'scale' ? `
#${tableId} tbody tr:hover {
  transform: scale(1.01);
  transition: transform ${styling.hoverDuration};
}
` : styling.hoverEffect === 'shadow' ? `
#${tableId} tbody tr:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: box-shadow ${styling.hoverDuration};
}
` : ''}

${styling.responsive ? `
@media (max-width: 768px) {
  #${tableId} {
    font-size: 12px;
  }
  #${tableId} th,
  #${tableId} td {
    padding: 6px 8px;
  }
}
` : ''}

caption {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${styling.textColor};
}
</style>`;
  };

  const convertToHtml = () => {
    if (!csvData.trim()) {
      toast({
        title: "No data",
        description: "Please paste some CSV data first",
        variant: "destructive"
      });
      return;
    }

    try {
      const lines = csvData.trim().split('\n');
      if (lines.length === 0) {
        throw new Error("No data found");
      }

      const parseCSVLine = (line: string) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          const nextChar = line[i + 1];
          
          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === delimiter && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        
        result.push(current.trim());
        return result;
      };

      const rows = lines.map(line => parseCSVLine(line));
      const css = generateCSS();
      
      let html = css + '\n';
      html += styling.responsive ? `<div id="${tableId}-container">\n` : '';
      html += `<table id="${tableId}">`;
      
      if (tableCaption) {
        html += `\n  <caption>${tableCaption}</caption>`;
      }

      if (hasHeader && rows.length > 0) {
        html += '\n  <thead>\n    <tr>';
        rows[0].forEach(cell => {
          html += `\n      <th>${cell || ''}</th>`;
        });
        html += '\n    </tr>\n  </thead>';
      }

      html += '\n  <tbody>';
      const dataRows = hasHeader ? rows.slice(1) : rows;
      
      dataRows.forEach(row => {
        html += '\n    <tr>';
        row.forEach(cell => {
          html += `\n      <td>${cell || ''}</td>`;
        });
        html += '\n    </tr>';
      });

      html += '\n  </tbody>\n</table>';
      html += styling.responsive ? '\n</div>' : '';

      setHtmlOutput(html);
      setActiveTab("output");
      
      toast({
        title: "Converted successfully!",
        description: "CSV data has been converted to HTML table"
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "Please check your CSV data format",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "Copied!",
      description: "HTML code copied to clipboard"
    });
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableId}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "HTML file downloaded successfully"
    });
  };

  const clearData = () => {
    setCsvData("");
    setHtmlOutput("");
    setActiveTab("input");
  };

  const loadSampleData = () => {
    const sampleData = `Name,Age,City,Country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,Toronto,Canada`;
    setCsvData(sampleData);
  };

  const faqs = [
    {
      question: "What CSV formats are supported?",
      answer: "The converter supports standard CSV with customizable delimiters (comma, semicolon, tab, pipe). It handles quoted fields and escaped quotes properly."
    },
    {
      question: "Can I customize the table appearance?",
      answer: "Yes! You can customize colors, fonts, borders, hover effects, padding, and choose from multiple pre-built themes. All styling is embedded in the HTML output."
    },
    {
      question: "How do I handle CSV files with special characters?",
      answer: "The converter properly handles quoted fields, escaped quotes, and special characters. Make sure your CSV follows standard formatting rules."
    }
  ];

  return (
    <SEOWrapper
      title="CSV to HTML Table Converter - Convert CSV to Styled Tables"
      description="Convert CSV data to beautiful HTML tables with advanced styling options, custom delimiters, and responsive design."
      keywords="csv to html, csv converter, html table generator, csv parser, data visualization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSV to HTML Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert CSV data to beautiful, responsive HTML tables with advanced styling options.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSV to HTML Table Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="input">
                      <Upload className="h-4 w-4 mr-2" />
                      Input
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="output">Output</TabsTrigger>
                  </TabsList>

                  <TabsContent value="input" className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <Button onClick={loadSampleData} variant="outline" size="sm">
                        Load Sample
                      </Button>
                      <Button onClick={clearData} variant="outline" size="sm">
                        Clear
                      </Button>
                    </div>
                    
                    <div>
                      <Label htmlFor="csvData">CSV Data</Label>
                      <Textarea
                        id="csvData"
                        value={csvData}
                        onChange={(e) => setCsvData(e.target.value)}
                        placeholder="Paste your CSV data here..."
                        className="min-h-[300px] font-mono text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
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
                      <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                          id="hasHeader"
                          checked={hasHeader}
                          onCheckedChange={(checked) => setHasHeader(checked === true)}
                        />
                        <Label htmlFor="hasHeader">First row is header</Label>
                      </div>
                    </div>

                    <Button onClick={convertToHtml} disabled={!csvData.trim()} className="w-full">
                      Convert to HTML Table
                    </Button>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="tableId">Table ID</Label>
                            <Input
                              id="tableId"
                              value={tableId}
                              onChange={(e) => setTableId(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="tableCaption">Table Caption</Label>
                            <Input
                              id="tableCaption"
                              value={tableCaption}
                              onChange={(e) => setTableCaption(e.target.value)}
                              placeholder="Optional table caption"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tableStyle">Table Style</Label>
                            <Select
                              value={styling.tableStyle}
                              onValueChange={(value) => setStyling({...styling, tableStyle: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="modern">Modern</SelectItem>
                                <SelectItem value="classic">Classic</SelectItem>
                                <SelectItem value="minimal">Minimal</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Colors</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Header Background</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styling.headerBgColor}
                                onChange={(e) => setStyling({...styling, headerBgColor: e.target.value})}
                                className="w-12 h-10 rounded border cursor-pointer"
                              />
                              <Input
                                value={styling.headerBgColor}
                                onChange={(e) => setStyling({...styling, headerBgColor: e.target.value})}
                                className="font-mono text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Header Text</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styling.headerTextColor}
                                onChange={(e) => setStyling({...styling, headerTextColor: e.target.value})}
                                className="w-12 h-10 rounded border cursor-pointer"
                              />
                              <Input
                                value={styling.headerTextColor}
                                onChange={(e) => setStyling({...styling, headerTextColor: e.target.value})}
                                className="font-mono text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="stripedRows"
                          checked={styling.stripedRows}
                          onCheckedChange={(checked) => setStyling({...styling, stripedRows: checked === true})}
                        />
                        <Label htmlFor="stripedRows">Striped Rows</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tableBorders"
                          checked={styling.tableBorders}
                          onCheckedChange={(checked) => setStyling({...styling, tableBorders: checked === true})}
                        />
                        <Label htmlFor="tableBorders">Table Borders</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="responsive"
                          checked={styling.responsive}
                          onCheckedChange={(checked) => setStyling({...styling, responsive: checked === true})}
                        />
                        <Label htmlFor="responsive">Responsive</Label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    {htmlOutput ? (
                      <div
                        className="border border-border rounded-lg p-4 bg-background overflow-auto"
                        dangerouslySetInnerHTML={{ __html: htmlOutput }}
                      />
                    ) : (
                      <p className="text-muted-foreground">Convert CSV data to see preview</p>
                    )}
                  </TabsContent>

                  <TabsContent value="output" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Generated HTML</h3>
                      <div className="flex gap-2">
                        <Button onClick={copyToClipboard} disabled={!htmlOutput}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button onClick={downloadHTML} variant="outline" disabled={!htmlOutput}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={htmlOutput}
                      readOnly
                      className="font-mono text-sm min-h-[400px]"
                      placeholder="Convert CSV data to see HTML code here..."
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="CSV to HTML Table Converter" faqs={faqs} />
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
