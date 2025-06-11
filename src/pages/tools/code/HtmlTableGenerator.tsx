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
import { Plus, Minus, Copy, Settings, Eye } from "lucide-react";

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

const HtmlTableGenerator = () => {
  const [rows, setRows] = useState<string[][]>([
    ["Header 1", "Header 2"],
    ["Row 1 Col 1", "Row 1 Col 2"]
  ]);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [activeTab, setActiveTab] = useState("table");
  const [tableId, setTableId] = useState("data-table");
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

  const addRow = () => {
    const newRow = Array(rows[0].length).fill("");
    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    const newRows = rows.map(row => [...row, ""]);
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

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
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

  const generateHTML = () => {
    const css = generateCSS();
    const tableRows = rows.map((row, rowIndex) => {
      const cells = row.map((cell, colIndex) => {
        const tag = rowIndex === 0 ? 'th' : 'td';
        return `    <${tag}>${cell}</${tag}>`;
      }).join('\n');
      return `  <tr>\n${cells}\n  </tr>`;
    }).join('\n');

    let html = css + '\n';
    html += styling.responsive ? `<div id="${tableId}-container">\n` : '';
    html += `<table id="${tableId}">`;
    
    if (tableCaption) {
      html += `\n  <caption>${tableCaption}</caption>`;
    }

    html += '\n  <thead>\n';
    html += `    <tr>\n`;
    rows[0].forEach(cell => {
      html += `      <th>${cell || ''}</th>\n`;
    });
    html += `    </tr>\n  </thead>`;

    html += '\n  <tbody>\n';
    rows.slice(1).forEach(row => {
      html += `    <tr>\n`;
      row.forEach(cell => {
        html += `      <td>${cell || ''}</td>\n`;
      });
      html += `    </tr>\n`;
    });
    html += '  </tbody>\n</table>';
    html += styling.responsive ? '\n</div>' : '';

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

  const applyStyling = () => {
    generateHTML();
    toast({
      title: "Styling Applied",
      description: "Table styling has been updated!"
    });
  };

  const faqs = [
    {
      question: "How do I add more rows or columns?",
      answer: "Use the 'Add Row' and 'Add Column' buttons above the table. You can also remove rows and columns using the minus buttons."
    },
    {
      question: "Can I customize the table styling?",
      answer: "Yes! Use the 'Styling' tab to customize colors, fonts, borders, hover effects, and much more. Click 'Apply Styling' to see changes."
    },
    {
      question: "Is the first row automatically a header?",
      answer: "Yes, the first row is automatically treated as table headers (th elements) with bold styling and background color."
    }
  ];

  return (
    <SEOWrapper
      title="HTML Table Generator - Create Tables Easily"
      description="Generate HTML tables quickly with clean code. Simple interface to create rows, columns, and export professional HTML table code."
      keywords="html table generator, table creator, html table code, web table maker"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HTML Table Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional HTML tables with advanced styling options. Generate clean, responsive code.
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
                    <TabsTrigger value="table">Edit Table</TabsTrigger>
                    <TabsTrigger value="styling">
                      <Settings className="h-4 w-4 mr-2" />
                      Styling
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="html">HTML Code</TabsTrigger>
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

                    <div className="overflow-x-auto border rounded-lg">
                      <table className="w-full">
                        {rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td className="p-2 border-r bg-muted/50 text-center min-w-[40px]">
                              <Button
                                onClick={() => removeRow(rowIndex)}
                                size="sm"
                                variant="ghost"
                                disabled={rows.length <= 1}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </td>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex} className="p-2 border-r border-b min-w-[150px]">
                                <Input
                                  value={cell}
                                  onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                  placeholder={rowIndex === 0 ? "Header text" : "Cell content"}
                                  className="border-0 focus-visible:ring-0"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr>
                          <td className="p-2 border-r bg-muted/50"></td>
                          {rows[0]?.map((_, colIndex) => (
                            <td key={colIndex} className="p-2 border-r text-center">
                              <Button
                                onClick={() => removeColumn(colIndex)}
                                size="sm"
                                variant="ghost"
                                disabled={rows[0]?.length <= 1}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </td>
                          ))}
                        </tr>
                      </table>
                    </div>

                    <Button onClick={generateHTML} className="w-full" size="lg">
                      Generate HTML Table
                    </Button>
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-6">
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
                          <div>
                            <Label>Text Color</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styling.textColor}
                                onChange={(e) => setStyling({...styling, textColor: e.target.value})}
                                className="w-12 h-10 rounded border cursor-pointer"
                              />
                              <Input
                                value={styling.textColor}
                                onChange={(e) => setStyling({...styling, textColor: e.target.value})}
                                className="font-mono text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Border Color</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styling.borderColor}
                                onChange={(e) => setStyling({...styling, borderColor: e.target.value})}
                                className="w-12 h-10 rounded border cursor-pointer"
                              />
                              <Input
                                value={styling.borderColor}
                                onChange={(e) => setStyling({...styling, borderColor: e.target.value})}
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

                    <Button onClick={applyStyling} className="w-full" size="lg">
                      Apply Styling
                    </Button>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    {htmlOutput ? (
                      <div
                        className="border border-border rounded-lg p-4 bg-background overflow-auto"
                        dangerouslySetInnerHTML={{ __html: htmlOutput }}
                      />
                    ) : (
                      <p className="text-muted-foreground">Generate HTML to see preview</p>
                    )}
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
