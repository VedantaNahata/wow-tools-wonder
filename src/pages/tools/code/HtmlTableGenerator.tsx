
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Download, Eye, Plus, Minus, Code, Table as TableIcon, RefreshCw } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const HtmlTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [output, setOutput] = useState("");
  const [includeCSS, setIncludeCSS] = useState(true);
  const [tableStyle, setTableStyle] = useState("modern");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [tableName, setTableName] = useState("custom-table");
  const [activeTab, setActiveTab] = useState("editor");
  const [tableCaption, setTableCaption] = useState("");
  const [customCssClasses, setCustomCssClasses] = useState("");
  const [responsiveTable, setResponsiveTable] = useState(true);
  const [hoverEffect, setHoverEffect] = useState(true);

  const initializeTable = () => {
    const newData: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 && hasHeader) {
          row.push(`Header ${j + 1}`);
        } else {
          row.push(`Cell ${i + 1}-${j + 1}`);
        }
      }
      newData.push(row);
    }
    setTableData(newData);
    setActiveTab("editor");
  };

  const addRow = () => {
    if (tableData.length > 0) {
      const newRow = Array(cols).fill("").map((_, index) => `Cell ${tableData.length + 1}-${index + 1}`);
      setTableData([...tableData, newRow]);
      setRows(rows + 1);
    }
  };

  const removeRow = () => {
    if (tableData.length > 1) {
      setTableData(tableData.slice(0, -1));
      setRows(rows - 1);
    }
  };

  const addColumn = () => {
    if (tableData.length > 0) {
      const newData = tableData.map((row, rowIndex) => {
        if (rowIndex === 0 && hasHeader) {
          return [...row, `Header ${row.length + 1}`];
        }
        return [...row, `Cell ${rowIndex + 1}-${row.length + 1}`];
      });
      setTableData(newData);
      setCols(cols + 1);
    }
  };

  const removeColumn = () => {
    if (cols > 1 && tableData.length > 0) {
      const newData = tableData.map(row => row.slice(0, -1));
      setTableData(newData);
      setCols(cols - 1);
    }
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const getTableStyles = () => {
    const styles = {
      modern: {
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif"
      },
      classic: {
        border: "2px solid #374151",
        fontFamily: "Georgia, serif"
      },
      minimal: {
        border: "none",
        fontFamily: "Arial, sans-serif"
      },
      dark: {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        border: "1px solid #374151",
        fontFamily: "system-ui, -apple-system, sans-serif"
      },
      material: {
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
        overflow: "hidden",
        fontFamily: "Roboto, sans-serif"
      },
      bootstrap: {
        border: "1px solid #dee2e6",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }
    };
    return styles[tableStyle as keyof typeof styles] || styles.modern;
  };

  const generateHTML = () => {
    if (tableData.length === 0) {
      toast.error("Please initialize the table first");
      return;
    }

    let html = "";
    
    if (includeCSS) {
      const baseStyles = getTableStyles();
      html += `<style>
.${tableName} {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  ${Object.entries(baseStyles).map(([key, value]) => 
    `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
  ).join('\n  ')}
}

.${tableName} th,
.${tableName} td {
  border: 1px ${borderStyle} ${tableStyle === 'dark' ? '#374151' : '#ddd'};
  padding: 12px;
  text-align: left;
}

.${tableName} th {
  background-color: ${tableStyle === 'dark' ? '#374151' : '#f2f2f2'};
  font-weight: bold;
}

.${tableName} tr:nth-child(even) {
  background-color: ${tableStyle === 'dark' ? '#111827' : '#f9f9f9'};
}

${hoverEffect ? `.${tableName} tr:hover {
  background-color: ${tableStyle === 'dark' ? '#1f2937' : '#f5f5f5'};
}` : ''}

${tableStyle === 'minimal' ? `
.${tableName} th,
.${tableName} td {
  border: none;
  border-bottom: 1px solid #e5e7eb;
}
` : ''}

${responsiveTable ? `
@media screen and (max-width: 768px) {
  .${tableName} {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
` : ''}

${customCssClasses ? customCssClasses : ''}
</style>

`;
    }

    html += `<table class="${tableName}">\n`;
    
    if (tableCaption) {
      html += `  <caption>${tableCaption}</caption>\n`;
    }
    
    if (hasHeader) {
      html += "  <thead>\n    <tr>\n";
      for (let j = 0; j < cols; j++) {
        html += `      <th>${tableData[0][j]}</th>\n`;
      }
      html += "    </tr>\n  </thead>\n";
    }
    
    html += "  <tbody>\n";
    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < rows; i++) {
      html += "    <tr>\n";
      for (let j = 0; j < cols; j++) {
        html += `      <td>${tableData[i][j]}</td>\n`;
      }
      html += "    </tr>\n";
    }
    html += "  </tbody>\n</table>";

    setOutput(html);
    toast.success("HTML table generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("HTML table code copied to clipboard!");
  };

  const downloadHTML = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded!");
  };

  // Generate sample data for the table
  const generateSampleData = () => {
    const sampleRows = rows;
    const sampleCols = cols;
    const sampleData: string[][] = [];
    
    // Create sample headers
    const headers = [];
    for (let j = 0; j < sampleCols; j++) {
      switch (j % 4) {
        case 0: headers.push("Product"); break;
        case 1: headers.push("Category"); break;
        case 2: headers.push("Price"); break;
        case 3: headers.push("Stock"); break;
      }
    }
    sampleData.push(headers);
    
    // Create sample body rows
    const products = ["Phone", "Laptop", "Tablet", "Monitor", "Keyboard", "Mouse"];
    const categories = ["Electronics", "Accessories", "Audio", "Gaming"];
    
    for (let i = 1; i < sampleRows; i++) {
      const row = [];
      for (let j = 0; j < sampleCols; j++) {
        switch (j % 4) {
          case 0: row.push(products[Math.floor(Math.random() * products.length)]); break;
          case 1: row.push(categories[Math.floor(Math.random() * categories.length)]); break;
          case 2: row.push("$" + (Math.random() * 1000).toFixed(2)); break;
          case 3: row.push(Math.floor(Math.random() * 100).toString()); break;
        }
      }
      sampleData.push(row);
    }
    
    setTableData(sampleData);
    toast.success("Sample data generated!");
  };

  const faqs = [
    {
      question: "Can I customize the table styling?",
      answer: "Yes! Choose from modern, classic, minimal, dark, material, or bootstrap themes. You can also add custom CSS, customize the table name, border style, and more."
    },
    {
      question: "How do I add or remove rows and columns?",
      answer: "Use the + and - buttons next to the table to dynamically add or remove rows and columns. You can also modify the numbers in the configuration."
    },
    {
      question: "Is the generated table responsive?",
      answer: "Yes, enable the responsive option to add media queries that make your tables scroll horizontally on mobile devices. This ensures your tables look great on all screen sizes."
    },
    {
      question: "Can I download the HTML file?",
      answer: "Yes! Use the download button to save the complete HTML table with styling as a .html file that you can open in any browser or include in your website."
    },
    {
      question: "How do I add a caption to my table?",
      answer: "Enter your caption text in the 'Table Caption' field in the advanced options. The caption will appear above your table and is good for accessibility."
    }
  ];

  return (
    <SEOWrapper
      title="Advanced HTML Table Generator - Create Custom Styled Tables"
      description="Generate advanced HTML tables with custom styling, themes, and dynamic editing. Download or copy complete HTML code with CSS."
      keywords="html table generator, advanced table creator, html table maker, responsive table, table html code, css styling"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced HTML Table Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional HTML tables with advanced styling options and dynamic editing capabilities.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Table Configuration</CardTitle>
                <CardDescription>
                  Configure your table dimensions and styling options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-3">
                    <TabsTrigger value="config">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Configuration
                    </TabsTrigger>
                    <TabsTrigger value="editor">
                      <TableIcon className="h-4 w-4 mr-2" />
                      Editor
                    </TabsTrigger>
                    <TabsTrigger value="output">
                      <Code className="h-4 w-4 mr-2" />
                      Output
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="config" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rows">Rows</Label>
                        <Input
                          id="rows"
                          type="number"
                          min="1"
                          max="50"
                          value={rows}
                          onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cols">Columns</Label>
                        <Input
                          id="cols"
                          type="number"
                          min="1"
                          max="20"
                          value={cols}
                          onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tableName">Table CSS Class</Label>
                        <Input
                          id="tableName"
                          value={tableName}
                          onChange={(e) => setTableName(e.target.value)}
                          placeholder="custom-table"
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
                            <SelectItem value="bootstrap">Bootstrap</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Border Style</Label>
                        <Select value={borderStyle} onValueChange={setBorderStyle}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solid">Solid</SelectItem>
                            <SelectItem value="dashed">Dashed</SelectItem>
                            <SelectItem value="dotted">Dotted</SelectItem>
                            <SelectItem value="double">Double</SelectItem>
                            <SelectItem value="groove">Groove</SelectItem>
                            <SelectItem value="ridge">Ridge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="caption">Table Caption (Optional)</Label>
                      <Input
                        id="caption"
                        value={tableCaption}
                        onChange={(e) => setTableCaption(e.target.value)}
                        placeholder="Enter a table caption..."
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasHeader"
                            checked={hasHeader}
                            onCheckedChange={(checked) => setHasHeader(checked === true)}
                          />
                          <Label htmlFor="hasHeader">Include Header Row</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeCSS"
                            checked={includeCSS}
                            onCheckedChange={(checked) => setIncludeCSS(checked === true)}
                          />
                          <Label htmlFor="includeCSS">Include CSS Styling</Label>
                        </div>
                      </div>
                      <div className="space-y-4">
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
                            id="hoverEffect"
                            checked={hoverEffect}
                            onCheckedChange={(checked) => setHoverEffect(checked === true)}
                          />
                          <Label htmlFor="hoverEffect">Row Hover Effect</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customCss">Custom CSS (Optional)</Label>
                      <Textarea
                        id="customCss"
                        value={customCssClasses}
                        onChange={(e) => setCustomCssClasses(e.target.value)}
                        placeholder=".custom-table th { text-transform: uppercase; }"
                        className="font-mono text-sm"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={initializeTable} className="flex-1">
                        Initialize Table
                      </Button>
                      <Button onClick={generateSampleData} variant="outline">
                        Generate Sample Data
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="editor" className="space-y-4">
                    {tableData.length > 0 ? (
                      <>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Edit Table Content</h3>
                          <div className="flex gap-2">
                            <Button onClick={addRow} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" /> Row
                            </Button>
                            <Button onClick={removeRow} variant="outline" size="sm" disabled={rows <= 1}>
                              <Minus className="h-4 w-4 mr-1" /> Row
                            </Button>
                            <Button onClick={addColumn} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" /> Col
                            </Button>
                            <Button onClick={removeColumn} variant="outline" size="sm" disabled={cols <= 1}>
                              <Minus className="h-4 w-4 mr-1" /> Col
                            </Button>
                          </div>
                        </div>
                        <div className="overflow-x-auto border rounded-lg">
                          <table className="w-full border-collapse">
                            <tbody>
                              {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex} className={rowIndex === 0 && hasHeader ? "bg-muted/50" : ""}>
                                  {row.map((cell, colIndex) => (
                                    <td key={colIndex} className="border border-muted p-2">
                                      <Input
                                        value={cell}
                                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                        className="border-0 p-1"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <Button onClick={generateHTML} className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Generate HTML Code
                        </Button>
                      </>
                    ) : (
                      <div className="text-center p-6 border-2 border-dashed rounded-lg">
                        <TableIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Table Initialized</h3>
                        <p className="text-muted-foreground mb-4">Start by configuring and initializing your table.</p>
                        <Button onClick={() => setActiveTab("config")}>Go to Configuration</Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="output" className="space-y-4">
                    {output ? (
                      <>
                        <div className="flex justify-between items-center">
                          <Label>Generated HTML Code</Label>
                          <div className="flex gap-2">
                            <Button onClick={copyToClipboard} size="sm">
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
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
                        
                        <div className="border rounded-lg p-4 bg-background">
                          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                          <div className="overflow-x-auto">
                            <div dangerouslySetInnerHTML={{ __html: output }} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6 border-2 border-dashed rounded-lg">
                        <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No HTML Generated Yet</h3>
                        <p className="text-muted-foreground mb-4">Go to the Editor tab and click "Generate HTML Code".</p>
                        <Button onClick={() => setActiveTab("editor")}>Go to Editor</Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Advanced HTML Table Generator" faqs={faqs} />
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

export default HtmlTableGenerator;
