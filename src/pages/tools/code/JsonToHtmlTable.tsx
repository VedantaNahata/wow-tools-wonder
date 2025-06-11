
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, Code, Eye, Settings2, Braces } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

// Example JSON data for the user to start with
const exampleJson = `[
  {
    "id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "age": 32,
    "active": true
  },
  {
    "id": 2,
    "name": "Jane Doe", 
    "email": "jane@example.com",
    "age": 28,
    "active": false
  }
]`;

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

const JsonToHtmlTable = () => {
  const [input, setInput] = useState(exampleJson);
  const [output, setOutput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("input");
  const [tableId, setTableId] = useState("json-table");
  const [tableCaption, setTableCaption] = useState("");
  const [showNull, setShowNull] = useState(true);
  const [showBooleanAs, setShowBooleanAs] = useState("text");
  const [includeArrayIndices, setIncludeArrayIndices] = useState(false);
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
  
  const formatJsonValue = (value: any): string => {
    if (value === null) {
      return showNull ? "null" : "";
    }
    
    if (typeof value === "boolean") {
      switch (showBooleanAs) {
        case "icons":
          return value ? "✓" : "✗";
        case "colored":
          return `<span class="json-boolean ${value ? 'json-true' : 'json-false'}">${value}</span>`;
        default:
          return String(value);
      }
    }
    
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

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

    return `<style>
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

${showBooleanAs === 'colored' ? `
.json-boolean.json-true {
  color: #10b981;
  font-weight: bold;
}
.json-boolean.json-false {
  color: #ef4444;
  font-weight: bold;
}` : ''}

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

  const parseJson = () => {
    try {
      setJsonError("");
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setActiveTab("settings");
      toast({
        title: "JSON parsed successfully!",
        description: "Ready to configure table settings"
      });
      return parsed;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      setJsonError(message);
      toast({
        title: "JSON Parse Error",
        description: message,
        variant: "destructive"
      });
      return null;
    }
  };

  const generateTable = () => {
    try {
      if (!parsedData) {
        const parsed = parseJson();
        if (!parsed) return;
      }

      const data = parsedData;
      const isArray = Array.isArray(data);
      const css = generateCSS();
      
      let html = css + '\n';
      html += styling.responsive ? `<div id="${tableId}-container">\n` : '';
      html += `<table id="${tableId}">`;
      
      if (tableCaption) {
        html += `\n  <caption>${tableCaption}</caption>`;
      }
      
      // For array of objects, create a table with columns for each property
      if (isArray && data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
        // Get all unique keys from all objects
        const keys = new Set<string>();
        data.forEach((item: any) => {
          if (item && typeof item === 'object') {
            Object.keys(item).forEach(key => keys.add(key));
          }
        });
        const keyArray = Array.from(keys);
        
        // Table header
        html += '\n  <thead>\n    <tr>';
        if (includeArrayIndices) {
          html += '\n      <th>Index</th>';
        }
        keyArray.forEach(key => {
          html += `\n      <th>${key}</th>`;
        });
        html += '\n    </tr>\n  </thead>\n  <tbody>';
        
        // Table rows
        data.forEach((item: any, index: number) => {
          html += '\n    <tr>';
          
          if (includeArrayIndices) {
            html += `\n      <td>${index}</td>`;
          }
          
          keyArray.forEach(key => {
            const value = item && typeof item === 'object' ? item[key] : undefined;
            html += `\n      <td>${formatJsonValue(value)}</td>`;
          });
          
          html += '\n    </tr>';
        });
        html += '\n  </tbody>';
      } 
      // For a single object, create a key-value table
      else if (!isArray && data !== null && typeof data === 'object') {
        html += '\n  <thead>\n    <tr>\n      <th>Key</th>\n      <th>Value</th>\n    </tr>\n  </thead>\n  <tbody>';
        
        Object.keys(data).forEach(key => {
          const value = data[key];
          html += '\n    <tr>';
          html += `\n      <td>${key}</td>`;
          html += `\n      <td>${formatJsonValue(value)}</td>`;
          html += '\n    </tr>';
        });
        html += '\n  </tbody>';
      }
      // For array of primitives
      else if (isArray) {
        html += '\n  <thead>\n    <tr>';
        
        if (includeArrayIndices) {
          html += '\n      <th>Index</th>';
        }
        
        html += '\n      <th>Value</th>\n    </tr>\n  </thead>\n  <tbody>';
        
        data.forEach((item: any, index: number) => {
          html += '\n    <tr>';
          
          if (includeArrayIndices) {
            html += `\n      <td>${index}</td>`;
          }
          
          html += `\n      <td>${formatJsonValue(item)}</td>`;
          html += '\n    </tr>';
        });
        html += '\n  </tbody>';
      }
      // For primitive value (number, string, boolean)
      else {
        html += '\n  <tbody>\n    <tr>\n      <td>';
        html += formatJsonValue(data);
        html += '</td>\n    </tr>\n  </tbody>';
      }
      
      html += '\n</table>';
      html += styling.responsive ? '\n</div>' : '';
      
      setOutput(html);
      setActiveTab("output");
      toast({
        title: "HTML table generated successfully!",
        description: "Your JSON data has been converted to HTML"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error generating table";
      toast({
        title: "Generation Error",
        description: message,
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "HTML table copied to clipboard"
    });
  };

  const downloadHTML = () => {
    const blob = new Blob([output], { type: 'text/html' });
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

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      toast({
        title: "JSON formatted!",
        description: "Your JSON has been properly formatted"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      setJsonError(message);
      toast({
        title: "Format Error",
        description: message,
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setParsedData(null);
    setJsonError("");
    setActiveTab("input");
    toast({
      title: "Cleared",
      description: "All data has been cleared"
    });
  };

  const loadExample = () => {
    setInput(exampleJson);
    setJsonError("");
    toast({
      title: "Example loaded",
      description: "Sample JSON data has been loaded"
    });
  };

  const faqs = [
    {
      question: "What JSON structure works best with this converter?",
      answer: "The converter works well with arrays of objects (which become tables with columns), single objects (which become key-value tables), and arrays of primitive values. Complex nested structures are displayed as JSON strings."
    },
    {
      question: "Can I customize how specific data types are displayed?",
      answer: "Yes! You can customize how booleans are displayed (as text, icons, or colored text), whether to show null values, and whether to include array indices in the output table."
    },
    {
      question: "Is the generated HTML table responsive?",
      answer: "Yes, with the responsive option enabled, the table will adapt to different screen sizes with horizontal scrolling on smaller screens."
    }
  ];

  return (
    <SEOWrapper
      title="JSON to HTML Table Converter - Transform JSON Data to Tables"
      description="Convert JSON data to beautifully formatted HTML tables with advanced options for styling and data formatting."
      keywords="json to html table, json converter, html table generator, json formatter, json visualization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            JSON to HTML Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform complex JSON data into beautiful HTML tables with customizable styling options.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>JSON to HTML Table Converter</CardTitle>
                <CardDescription>
                  Convert JSON data to customized HTML tables with advanced styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-4">
                    <TabsTrigger value="input">
                      <Braces className="h-4 w-4 mr-2" />
                      JSON Input
                    </TabsTrigger>
                    <TabsTrigger value="settings" disabled={!parsedData}>
                      <Settings2 className="h-4 w-4 mr-2" />
                      Settings
                    </TabsTrigger>
                    <TabsTrigger value="preview" disabled={!output}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="output" disabled={!output}>
                      <Code className="h-4 w-4 mr-2" />
                      HTML Output
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="input" className="space-y-4">
                    <div className="flex justify-between">
                      <Label htmlFor="input">JSON Data</Label>
                      <div className="space-x-2">
                        <Button onClick={formatJson} variant="outline" size="sm">
                          Format JSON
                        </Button>
                        <Button onClick={loadExample} variant="outline" size="sm">
                          Load Example
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="input"
                      placeholder="Paste your JSON data here..."
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        setJsonError("");
                      }}
                      className={`min-h-[300px] font-mono ${jsonError ? 'border-destructive' : ''}`}
                    />
                    {jsonError && (
                      <p className="text-destructive text-sm">{jsonError}</p>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button onClick={clearAll} variant="outline">
                        Clear
                      </Button>
                      <Button onClick={parseJson}>
                        Parse & Continue
                      </Button>
                    </div>
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
                            <Label>Table Style</Label>
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
                          <div>
                            <Label>Boolean Display</Label>
                            <Select value={showBooleanAs} onValueChange={setShowBooleanAs}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text (true/false)</SelectItem>
                                <SelectItem value="icons">Icons (✓/✗)</SelectItem>
                                <SelectItem value="colored">Colored Text</SelectItem>
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
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="showNull"
                          checked={showNull}
                          onCheckedChange={(checked) => setShowNull(checked === true)}
                        />
                        <Label htmlFor="showNull">Show Null Values</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeArrayIndices"
                          checked={includeArrayIndices}
                          onCheckedChange={(checked) => setIncludeArrayIndices(checked === true)}
                        />
                        <Label htmlFor="includeArrayIndices">Include Array Indices</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button onClick={() => setActiveTab("input")} variant="outline">
                        Back to Input
                      </Button>
                      <Button onClick={generateTable}>
                        Generate HTML Table
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    {output ? (
                      <div
                        className="border border-border rounded-lg p-4 bg-background overflow-auto"
                        dangerouslySetInnerHTML={{ __html: output }}
                      />
                    ) : (
                      <p className="text-muted-foreground">Generate table to see preview</p>
                    )}
                  </TabsContent>

                  <TabsContent value="output" className="space-y-6">
                    {output && (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>HTML Output</Label>
                            <div className="flex gap-2">
                              <Button onClick={copyToClipboard} size="sm">
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
                            value={output}
                            readOnly
                            className="min-h-[300px] font-mono bg-muted text-sm"
                          />
                        </div>

                        <div className="flex justify-between gap-2">
                          <Button onClick={() => setActiveTab("settings")} variant="outline">
                            Back to Settings
                          </Button>
                          <Button onClick={clearAll}>
                            Convert New JSON
                          </Button>
                        </div>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="JSON to HTML Table Converter" faqs={faqs} />
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

export default JsonToHtmlTable;
