
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
import { toast } from "sonner";
import { Copy, Download, Code, Eye, RefreshCw, Braces, Table } from "lucide-react";
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
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "age": 45,
    "active": true
  }
]`;

const JsonToHtmlTable = () => {
  const [input, setInput] = useState(exampleJson);
  const [output, setOutput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("input");
  const [tableStyle, setTableStyle] = useState("modern");
  const [tableId, setTableId] = useState("json-table");
  const [responsiveTable, setResponsiveTable] = useState(true);
  const [stripedRows, setStripedRows] = useState(false);
  const [hoveredRows, setHoveredRows] = useState(true);
  const [tableBorders, setTableBorders] = useState(true);
  const [showNull, setShowNull] = useState(true);
  const [showBooleanAs, setShowBooleanAs] = useState("text"); // text, icons, colored
  const [expandNestedObjects, setExpandNestedObjects] = useState(false);
  const [nestingLevel, setNestingLevel] = useState(1);
  const [nestedDisplay, setNestedDisplay] = useState("stringify"); // stringify, expand, link
  const [includeArrayIndices, setIncludeArrayIndices] = useState(false);
  const [tableCaption, setTableCaption] = useState("");
  
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
      if (Array.isArray(value)) {
        if (nestedDisplay === "expand" && expandNestedObjects) {
          return ""; // Will be expanded in a nested table
        }
        return JSON.stringify(value);
      } else if (value !== null) {
        if (nestedDisplay === "expand" && expandNestedObjects) {
          return ""; // Will be expanded in a nested table
        }
        return JSON.stringify(value);
      }
    }
    
    return String(value);
  };
  
  const createNestedTable = (data: any, level: number = 1): string => {
    if (level > nestingLevel) {
      return JSON.stringify(data);
    }
    
    if (Array.isArray(data)) {
      let tableHtml = `<table class="nested-table level-${level}">`;
      
      if (includeArrayIndices) {
        tableHtml += `<thead><tr><th>Index</th><th>Value</th></tr></thead>`;
      }
      
      tableHtml += `<tbody>`;
      
      data.forEach((item, index) => {
        tableHtml += `<tr>`;
        
        if (includeArrayIndices) {
          tableHtml += `<td>${index}</td>`;
        }
        
        if (typeof item === "object" && item !== null && expandNestedObjects) {
          tableHtml += `<td>${createNestedTable(item, level + 1)}</td>`;
        } else {
          tableHtml += `<td>${formatJsonValue(item)}</td>`;
        }
        
        tableHtml += `</tr>`;
      });
      
      tableHtml += `</tbody></table>`;
      return tableHtml;
    } else if (typeof data === "object" && data !== null) {
      let tableHtml = `<table class="nested-table level-${level}">`;
      tableHtml += `<thead><tr><th>Key</th><th>Value</th></tr></thead>`;
      tableHtml += `<tbody>`;
      
      Object.keys(data).forEach(key => {
        tableHtml += `<tr>`;
        tableHtml += `<td>${key}</td>`;
        
        if (typeof data[key] === "object" && data[key] !== null && expandNestedObjects) {
          tableHtml += `<td>${createNestedTable(data[key], level + 1)}</td>`;
        } else {
          tableHtml += `<td>${formatJsonValue(data[key])}</td>`;
        }
        
        tableHtml += `</tr>`;
      });
      
      tableHtml += `</tbody></table>`;
      return tableHtml;
    }
    
    return formatJsonValue(data);
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

  const parseJson = () => {
    try {
      setJsonError("");
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setActiveTab("preview");
      toast.success("JSON parsed successfully!");
      return parsed;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      setJsonError(message);
      toast.error(`JSON Parse Error: ${message}`);
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
      const tableStyles = getTableStyles();
      
      // Generate CSS
      let html = `<style>
#${tableId} {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  ${Object.entries(tableStyles).map(([key, value]) => 
    `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
  ).join('\n  ')}
}

#${tableId} th,
#${tableId} td {
  padding: 10px;
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

${showBooleanAs === 'colored' ? `
.json-boolean.json-true {
  color: #10b981;
  font-weight: bold;
}
.json-boolean.json-false {
  color: #ef4444;
  font-weight: bold;
}` : ''}

${nestedDisplay === 'expand' ? `
.nested-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.nested-table th,
.nested-table td {
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  font-size: 0.9em;
}

.nested-table th {
  background-color: ${tableStyle === 'dark' ? '#313e52' : '#f1f5f9'};
}

.level-2 {
  font-size: 0.95em;
}

.level-3 {
  font-size: 0.9em;
}` : ''}

${responsiveTable ? `
@media screen and (max-width: 768px) {
  #${tableId}-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}` : ''}
</style>

`;
      
      // Start of table
      html += `${responsiveTable ? `<div id="${tableId}-container">` : ''}
<table id="${tableId}">
`;

      if (tableCaption) {
        html += `  <caption>${tableCaption}</caption>\n`;
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
        html += '<thead>\n<tr>\n';
        if (includeArrayIndices) {
          html += '  <th>Index</th>\n';
        }
        keyArray.forEach(key => {
          html += `  <th>${key}</th>\n`;
        });
        html += '</tr>\n</thead>\n<tbody>\n';
        
        // Table rows
        data.forEach((item: any, index: number) => {
          html += '<tr>\n';
          
          if (includeArrayIndices) {
            html += `  <td>${index}</td>\n`;
          }
          
          keyArray.forEach(key => {
            const value = item && typeof item === 'object' ? item[key] : undefined;
            
            if (typeof value === 'object' && value !== null && nestedDisplay === 'expand' && expandNestedObjects) {
              html += `  <td>${createNestedTable(value)}</td>\n`;
            } else {
              html += `  <td>${formatJsonValue(value)}</td>\n`;
            }
          });
          
          html += '</tr>\n';
        });
        html += '</tbody>\n';
      } 
      // For a single object, create a key-value table
      else if (!isArray && data !== null && typeof data === 'object') {
        html += '<thead>\n<tr>\n<th>Key</th>\n<th>Value</th>\n</tr>\n</thead>\n<tbody>\n';
        
        Object.keys(data).forEach(key => {
          const value = data[key];
          html += '<tr>\n';
          html += `  <td>${key}</td>\n`;
          
          if (typeof value === 'object' && value !== null && nestedDisplay === 'expand' && expandNestedObjects) {
            html += `  <td>${createNestedTable(value)}</td>\n`;
          } else {
            html += `  <td>${formatJsonValue(value)}</td>\n`;
          }
          
          html += '</tr>\n';
        });
        html += '</tbody>\n';
      }
      // For array of primitives
      else if (isArray) {
        html += '<thead>\n<tr>\n';
        
        if (includeArrayIndices) {
          html += '<th>Index</th>\n';
        }
        
        html += '<th>Value</th>\n</tr>\n</thead>\n<tbody>\n';
        
        data.forEach((item: any, index: number) => {
          html += '<tr>\n';
          
          if (includeArrayIndices) {
            html += `  <td>${index}</td>\n`;
          }
          
          if (typeof item === 'object' && item !== null && nestedDisplay === 'expand' && expandNestedObjects) {
            html += `  <td>${createNestedTable(item)}</td>\n`;
          } else {
            html += `  <td>${formatJsonValue(item)}</td>\n`;
          }
          
          html += '</tr>\n';
        });
        html += '</tbody>\n';
      }
      // For primitive value (number, string, boolean)
      else {
        html += '<tbody>\n<tr>\n<td>';
        html += formatJsonValue(data);
        html += '</td>\n</tr>\n</tbody>\n';
      }
      
      html += '</table>\n';
      
      if (responsiveTable) {
        html += '</div>';
      }
      
      setOutput(html);
      setActiveTab("output");
      toast.success("HTML table generated successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error generating table";
      toast.error(`Error: ${message}`);
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

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      toast.success("JSON formatted!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      setJsonError(message);
      toast.error(`JSON Parse Error: ${message}`);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setParsedData(null);
    setJsonError("");
    setActiveTab("input");
    toast.info("All data cleared");
  };

  const loadExample = () => {
    setInput(exampleJson);
    setJsonError("");
    toast.info("Example JSON loaded");
  };

  const faqs = [
    {
      question: "What JSON structure works best with this converter?",
      answer: "The converter works well with arrays of objects (which become tables with columns), single objects (which become key-value tables), and arrays of primitive values. Complex nested structures can be managed with the nesting options."
    },
    {
      question: "How can I handle nested objects and arrays in my JSON?",
      answer: "You can choose to display nested data as stringified JSON, expand them into nested tables, or even control the nesting level. This gives you flexibility in handling complex JSON structures."
    },
    {
      question: "Can I customize how specific data types are displayed?",
      answer: "Yes! You can customize how booleans are displayed (as text, icons, or colored text), whether to show null values, and whether to include array indices in the output table."
    },
    {
      question: "Is the generated HTML table responsive?",
      answer: "Yes, with the responsive option enabled, the table will adapt to different screen sizes with horizontal scrolling on smaller screens. This ensures your data remains usable across all devices."
    },
    {
      question: "What if my JSON contains a lot of data?",
      answer: "For very large JSON datasets, consider limiting what you convert at once or adjusting the nesting level to prevent overly complex tables. You can also disable some features like nested object expansion for better performance."
    }
  ];

  return (
    <SEOWrapper
      title="JSON to HTML Table Converter - Transform JSON Data to Tables"
      description="Convert JSON data to beautifully formatted HTML tables with advanced options for nested objects, styling, and data formatting."
      keywords="json to html table, json converter, html table generator, json formatter, nested json, json visualization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            JSON to HTML Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform complex JSON data into beautiful HTML tables with customizable styling and nested object support.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>JSON to HTML Table Converter</CardTitle>
                <CardDescription>
                  Convert JSON data to customized HTML tables with advanced options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-4">
                    <TabsTrigger value="input">
                      <Braces className="h-4 w-4 mr-2" />
                      JSON Input
                    </TabsTrigger>
                    <TabsTrigger value="preview" disabled={!parsedData}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="options" disabled={!parsedData}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Options
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
                      className={`min-h-[300px] font-mono ${jsonError ? 'border-red-500' : ''}`}
                    />
                    {jsonError && (
                      <p className="text-red-500 text-sm">{jsonError}</p>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button onClick={clearAll} variant="outline">
                        Clear
                      </Button>
                      <Button onClick={parseJson}>
                        Parse JSON
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    {parsedData && (
                      <div>
                        <Label>JSON Structure Preview</Label>
                        <Card className="mt-2 overflow-auto max-h-[400px]">
                          <CardContent className="p-4">
                            <pre className="text-sm font-mono whitespace-pre-wrap">
                              {JSON.stringify(parsedData, null, 2)}
                            </pre>
                          </CardContent>
                        </Card>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button onClick={() => setActiveTab("input")} variant="outline">
                            Back to Input
                          </Button>
                          <Button onClick={() => setActiveTab("options")}>
                            Continue to Options
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="options" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tableId">Table ID</Label>
                        <Input
                          id="tableId"
                          value={tableId}
                          onChange={(e) => setTableId(e.target.value)}
                          placeholder="json-table"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tableCaption">Table Caption (Optional)</Label>
                        <Input
                          id="tableCaption"
                          value={tableCaption}
                          onChange={(e) => setTableCaption(e.target.value)}
                          placeholder="My JSON Data"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nested Object Display</Label>
                        <Select value={nestedDisplay} onValueChange={setNestedDisplay}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stringify">JSON String</SelectItem>
                            <SelectItem value="expand">Expand as Tables</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {nestedDisplay === "expand" && (
                        <div className="space-y-2">
                          <Label>Nesting Level</Label>
                          <Select 
                            value={nestingLevel.toString()} 
                            onValueChange={(val) => setNestingLevel(parseInt(val))}
                            disabled={!expandNestedObjects}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Level</SelectItem>
                              <SelectItem value="2">2 Levels</SelectItem>
                              <SelectItem value="3">3 Levels</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
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
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="expandNestedObjects"
                          checked={expandNestedObjects}
                          onCheckedChange={(checked) => setExpandNestedObjects(checked === true)}
                        />
                        <Label htmlFor="expandNestedObjects">Expand Nested Objects</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button onClick={() => setActiveTab("preview")} variant="outline">
                        Back to Preview
                      </Button>
                      <Button onClick={generateTable}>
                        Generate HTML Table
                      </Button>
                    </div>
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
                            className="min-h-[200px] font-mono bg-muted text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Preview</Label>
                          <div className="border rounded-lg p-4 bg-card">
                            <div dangerouslySetInnerHTML={{ __html: output }} />
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <Button onClick={() => setActiveTab("options")} variant="outline">
                            Back to Options
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
