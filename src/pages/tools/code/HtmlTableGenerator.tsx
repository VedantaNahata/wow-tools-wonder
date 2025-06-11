
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";
import { Plus, Minus, Copy, Eye, Settings } from "lucide-react";

interface TableCell {
  content: string;
  isHeader: boolean;
}

interface StylingOptions {
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  headerBgColor: string;
  headerTextColor: string;
  evenRowBgColor: string;
  oddRowBgColor: string;
  textColor: string;
  fontSize: string;
  fontFamily: string;
  padding: string;
  hoverEffect: string;
  hoverColor: string;
  hoverDuration: string;
  stripedRows: boolean;
  responsive: boolean;
}

const HtmlTableGenerator = () => {
  const [rows, setRows] = useState<TableCell[][]>([
    [{ content: "Header 1", isHeader: true }, { content: "Header 2", isHeader: true }],
    [{ content: "Row 1 Col 1", isHeader: false }, { content: "Row 1 Col 2", isHeader: false }]
  ]);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [activeTab, setActiveTab] = useState("table");
  const [styling, setStyling] = useState<StylingOptions>({
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#ddd",
    headerBgColor: "#f8f9fa",
    headerTextColor: "#212529",
    evenRowBgColor: "#ffffff",
    oddRowBgColor: "#f8f9fa",
    textColor: "#212529",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    padding: "8px",
    hoverEffect: "background",
    hoverColor: "#e9ecef",
    hoverDuration: "0.3s",
    stripedRows: true,
    responsive: true
  });

  const { toast } = useToast();

  const addRow = () => {
    const newRow = rows[0].map(() => ({ content: "", isHeader: false }));
    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    const newRows = rows.map(row => [...row, { content: "", isHeader: row[0]?.isHeader || false }]);
    setRows(newRows);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const removeColumn = (colIndex: number) => {
    if (rows[0] && rows[0].length > 1) {
      setRows(rows.map(row => row.filter((_, i) => i !== colIndex)));
    }
  };

  const updateCell = (rowIndex: number, colIndex: number, content: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex].content = content;
    setRows(newRows);
  };

  const toggleHeader = (rowIndex: number, colIndex: number) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex].isHeader = !newRows[rowIndex][colIndex].isHeader;
    setRows(newRows);
  };

  const generateCSS = () => {
    const tableId = "generated-table";
    return `
<style>
#${tableId} {
  border-collapse: collapse;
  width: 100%;
  font-family: ${styling.fontFamily};
  font-size: ${styling.fontSize};
  color: ${styling.textColor};
  ${styling.responsive ? 'overflow-x: auto; display: block; white-space: nowrap;' : ''}
}

#${tableId} th,
#${tableId} td {
  border: ${styling.borderWidth} ${styling.borderStyle} ${styling.borderColor};
  padding: ${styling.padding};
  text-align: left;
}

#${tableId} th {
  background-color: ${styling.headerBgColor};
  color: ${styling.headerTextColor};
  font-weight: bold;
}

${styling.stripedRows ? `
#${tableId} tr:nth-child(even) {
  background-color: ${styling.evenRowBgColor};
}

#${tableId} tr:nth-child(odd) {
  background-color: ${styling.oddRowBgColor};
}
` : ''}

${styling.hoverEffect === 'background' ? `
#${tableId} tr:hover {
  background-color: ${styling.hoverColor} !important;
  transition: background-color ${styling.hoverDuration};
}
` : styling.hoverEffect === 'scale' ? `
#${tableId} tr:hover {
  transform: scale(1.02);
  transition: transform ${styling.hoverDuration};
}
` : styling.hoverEffect === 'shadow' ? `
#${tableId} tr:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
    padding: 6px;
  }
}
` : ''}
</style>`;
  };

  const generateHTML = () => {
    const css = generateCSS();
    const tableRows = rows.map((row, rowIndex) => {
      const cells = row.map((cell, colIndex) => {
        const tag = cell.isHeader ? 'th' : 'td';
        return `    <${tag}>${cell.content}</${tag}>`;
      }).join('\n');
      return `  <tr>\n${cells}\n  </tr>`;
    }).join('\n');

    const html = `${css}
<table id="generated-table">
${tableRows}
</table>`;

    setHtmlOutput(html);
    setActiveTab("html");
    
    toast({
      title: "HTML Generated",
      description: "Table HTML has been generated successfully!"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "Copied!",
      description: "HTML code copied to clipboard"
    });
  };

  const faqs = [
    {
      question: "How do I make my table responsive?",
      answer: "Enable the 'Responsive' option in styling. This adds CSS that makes the table scroll horizontally on smaller screens and adjusts font sizes."
    },
    {
      question: "Can I customize hover effects?",
      answer: "Yes! You can choose from background color change, scale effect, or shadow effect. You can also customize the hover color and animation duration."
    },
    {
      question: "How do I add more styling options?",
      answer: "Use the Styling tab to customize colors, fonts, borders, spacing, and hover effects. All changes are reflected in the generated CSS."
    }
  ];

  return (
    <SEOWrapper
      title="HTML Table Generator - Create Tables with Advanced Styling"
      description="Generate HTML tables with advanced styling options. Customize colors, hover effects, fonts, borders and make responsive tables easily."
      keywords="html table generator, table creator, responsive tables, css table styling"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HTML Table Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional HTML tables with advanced styling options, hover effects, and responsive design.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>HTML Table Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="table">
                      <Eye className="h-4 w-4 mr-2" />
                      Table
                    </TabsTrigger>
                    <TabsTrigger value="styling">
                      <Settings className="h-4 w-4 mr-2" />
                      Styling
                    </TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>

                  <TabsContent value="table" className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <Button onClick={addRow} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Row
                      </Button>
                      <Button onClick={addColumn} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Column
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        {rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-b border-border">
                            {row.map((cell, colIndex) => (
                              <td key={colIndex} className="border border-border p-2 relative">
                                <div className="flex items-center gap-2 mb-2">
                                  <label className="flex items-center gap-1 text-xs">
                                    <Checkbox
                                      checked={cell.isHeader}
                                      onCheckedChange={() => toggleHeader(rowIndex, colIndex)}
                                    />
                                    Header
                                  </label>
                                  {colIndex === 0 && (
                                    <Button
                                      onClick={() => removeRow(rowIndex)}
                                      size="sm"
                                      variant="outline"
                                      disabled={rows.length <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {rowIndex === 0 && (
                                    <Button
                                      onClick={() => removeColumn(colIndex)}
                                      size="sm"
                                      variant="outline"
                                      disabled={row.length <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                                <Input
                                  value={cell.content}
                                  onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                  placeholder={cell.isHeader ? "Header text" : "Cell content"}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </table>
                    </div>

                    <Button onClick={generateHTML} className="w-full">
                      Generate HTML Table
                    </Button>
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Colors */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Colors</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="headerBg">Header Background</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styling.headerBgColor}
                                onChange={(e) => setStyling({...styling, headerBgColor: e.target.value})}
                                className="w-12 h-10 rounded border"
                              />
                              <Input
                                value={styling.headerBgColor}
                                onChange={(e) => setStyling({...styling, headerBgColor: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="headerText">Header Text</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styling.headerTextColor}
                                onChange={(e) => setStyling({...styling, headerTextColor: e.target.value})}
                                className="w-12 h-10 rounded border"
                              />
                              <Input
                                value={styling.headerTextColor}
                                onChange={(e) => setStyling({...styling, headerTextColor: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Typography */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Typography</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="fontFamily">Font Family</Label>
                            <Select
                              value={styling.fontFamily}
                              onValueChange={(value) => setStyling({...styling, fontFamily: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                                <SelectItem value="Georgia, serif">Georgia</SelectItem>
                                <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                                <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                                <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effects */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Hover Effects</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="hoverEffect">Hover Effect</Label>
                            <Select
                              value={styling.hoverEffect}
                              onValueChange={(value) => setStyling({...styling, hoverEffect: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="background">Background Color</SelectItem>
                                <SelectItem value="scale">Scale Effect</SelectItem>
                                <SelectItem value="shadow">Shadow Effect</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="hoverDuration">Animation Duration</Label>
                            <Select
                              value={styling.hoverDuration}
                              onValueChange={(value) => setStyling({...styling, hoverDuration: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.1s">Fast (0.1s)</SelectItem>
                                <SelectItem value="0.3s">Normal (0.3s)</SelectItem>
                                <SelectItem value="0.5s">Slow (0.5s)</SelectItem>
                                <SelectItem value="1s">Very Slow (1s)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Options</h3>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <Checkbox
                              checked={styling.stripedRows}
                              onCheckedChange={(checked) => setStyling({...styling, stripedRows: checked as boolean})}
                            />
                            <span>Striped Rows</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Checkbox
                              checked={styling.responsive}
                              onCheckedChange={(checked) => setStyling({...styling, responsive: checked as boolean})}
                            />
                            <span>Responsive Design</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="html" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Generated HTML</h3>
                      <Button onClick={copyToClipboard} disabled={!htmlOutput}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy HTML
                      </Button>
                    </div>
                    <Textarea
                      value={htmlOutput}
                      readOnly
                      className="font-mono text-sm min-h-[400px]"
                      placeholder="Click 'Generate HTML Table' to see the code here..."
                    />
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    {htmlOutput ? (
                      <div
                        className="border border-border rounded-lg p-4 bg-background"
                        dangerouslySetInnerHTML={{ __html: htmlOutput }}
                      />
                    ) : (
                      <p className="text-muted-foreground">Generate HTML to see preview</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="HTML Table Generator" faqs={faqs} />
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
