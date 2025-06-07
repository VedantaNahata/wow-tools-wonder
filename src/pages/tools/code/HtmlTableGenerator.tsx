
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Download, Eye, Plus, Minus } from "lucide-react";
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

.${tableName} tr:hover {
  background-color: ${tableStyle === 'dark' ? '#1f2937' : '#f5f5f5'};
}

${tableStyle === 'minimal' ? `
.${tableName} th,
.${tableName} td {
  border: none;
  border-bottom: 1px solid #e5e7eb;
}
` : ''}
</style>

`;
    }

    html += `<table class="${tableName}">\n`;
    
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
    toast.success("✅ HTML table copied to clipboard!", {
      duration: 2000,
    });
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

  const faqs = [
    {
      question: "Can I customize the table styling?",
      answer: "Yes! Choose from modern, classic, minimal, or dark themes. You can also customize the table name, border style, and include/exclude CSS styling."
    },
    {
      question: "How do I add or remove rows and columns?",
      answer: "Use the + and - buttons next to the table to dynamically add or remove rows and columns. You can also modify the numbers in the configuration."
    },
    {
      question: "Is the generated table responsive?",
      answer: "The basic table structure is provided with modern styling. For full mobile responsiveness, you may need to add additional CSS media queries."
    },
    {
      question: "Can I download the HTML file?",
      answer: "Yes! Use the download button to save the complete HTML table with styling as a .html file that you can open in any browser."
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
              </CardHeader>
              <CardContent className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasHeader"
                        checked={hasHeader}
                        onCheckedChange={(checked) => setHasHeader(checked as boolean)}
                      />
                      <Label htmlFor="hasHeader">Include Header Row</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeCSS"
                        checked={includeCSS}
                        onCheckedChange={(checked) => setIncludeCSS(checked as boolean)}
                      />
                      <Label htmlFor="includeCSS">Include CSS Styling</Label>
                    </div>
                  </div>
                </div>

                <Button onClick={initializeTable} className="w-full">
                  Initialize Table
                </Button>

                {tableData.length > 0 && (
                  <div className="space-y-4">
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
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <tbody>
                          {tableData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, colIndex) => (
                                <td key={colIndex} className="border border-gray-300 p-2">
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
                  </div>
                )}

                {output && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Generated HTML Code</Label>
                      <div className="flex gap-2">
                        <Button onClick={copyToClipboard} variant="outline" size="sm">
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
                      <div dangerouslySetInnerHTML={{ __html: output }} />
                    </div>
                  </div>
                )}
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
