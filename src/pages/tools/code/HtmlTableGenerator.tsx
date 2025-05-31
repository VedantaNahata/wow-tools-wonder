
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Copy, Plus, Minus, Table as TableIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HtmlTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState<string[][]>([
    ["Header 1", "Header 2", "Header 3"],
    ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
    ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
  ]);
  const [hasHeader, setHasHeader] = useState(true);
  const [addBorder, setAddBorder] = useState(true);
  const [addStyling, setAddStyling] = useState(true);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const { toast } = useToast();

  const updateTableSize = (newRows: number, newCols: number) => {
    const newData = Array(newRows).fill(null).map((_, rowIndex) => 
      Array(newCols).fill(null).map((_, colIndex) => {
        if (tableData[rowIndex] && tableData[rowIndex][colIndex]) {
          return tableData[rowIndex][colIndex];
        }
        if (rowIndex === 0 && hasHeader) {
          return `Header ${colIndex + 1}`;
        }
        return `Row ${rowIndex + (hasHeader ? 0 : 1)} Col ${colIndex + 1}`;
      })
    );
    setTableData(newData);
    setRows(newRows);
    setCols(newCols);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const generateHtml = () => {
    let html = "";
    
    if (addStyling) {
      html += `<style>
  .generated-table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-family: Arial, sans-serif;
  }
  .generated-table th,
  .generated-table td {
    padding: 12px;
    text-align: left;${addBorder ? '\n    border: 1px solid #ddd;' : ''}
  }
  .generated-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  .generated-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .generated-table tr:hover {
    background-color: #f5f5f5;
  }
</style>

`;
    }

    html += `<table class="${addStyling ? 'generated-table' : ''}"${addBorder && !addStyling ? ' border="1"' : ''}>\n`;
    
    if (hasHeader) {
      html += "  <thead>\n    <tr>\n";
      tableData[0].forEach(cell => {
        html += `      <th>${cell}</th>\n`;
      });
      html += "    </tr>\n  </thead>\n";
    }
    
    html += "  <tbody>\n";
    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < tableData.length; i++) {
      html += "    <tr>\n";
      tableData[i].forEach(cell => {
        html += `      <td>${cell}</td>\n`;
      });
      html += "    </tr>\n";
    }
    html += "  </tbody>\n</table>";

    setGeneratedHtml(html);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      toast({ title: "Copied!", description: "HTML code copied to clipboard." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy to clipboard.", variant: "destructive" });
    }
  };

  const faqData = [
    {
      question: "How do I add more rows or columns?",
      answer: "Use the + and - buttons next to the rows and columns inputs to adjust the table size. The table will automatically update with placeholder content."
    },
    {
      question: "Can I customize the table styling?",
      answer: "Yes! Toggle the 'Add CSS Styling' option to include professional CSS styles with hover effects, borders, and alternating row colors."
    },
    {
      question: "What's the difference between header and regular rows?",
      answer: "Header rows are styled differently (bold, background color) and are wrapped in <thead> tags for better semantic HTML structure."
    },
    {
      question: "How do I use the generated HTML?",
      answer: "Copy the generated HTML code and paste it directly into your HTML document. The CSS styles will be included if you enabled styling."
    },
    {
      question: "Is the generated HTML responsive?",
      answer: "The basic table is responsive by default. For mobile-first designs, you may want to add additional CSS for horizontal scrolling on small screens."
    }
  ];

  return (
    <SEOWrapper 
      title="HTML Table Generator - Create Custom HTML Tables Online"
      description="Generate professional HTML tables with custom rows, columns, and styling. Copy ready-to-use HTML code with CSS styling options."
      keywords="html table generator, html table maker, table generator, html code generator, css table styling"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <TableIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">HTML Table Generator</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create custom HTML tables with professional styling and copy the code instantly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table Builder */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TableIcon className="h-5 w-5" />
                  Table Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Table Size Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Rows</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => rows > 1 && updateTableSize(rows - 1, cols)}
                        disabled={rows <= 1}
                        className="bg-slate-900 border-slate-600"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={rows}
                        onChange={(e) => updateTableSize(Math.max(1, parseInt(e.target.value) || 1), cols)}
                        className="bg-slate-900 border-slate-600 text-white text-center"
                        min="1"
                        max="20"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateTableSize(rows + 1, cols)}
                        disabled={rows >= 20}
                        className="bg-slate-900 border-slate-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Columns</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => cols > 1 && updateTableSize(rows, cols - 1)}
                        disabled={cols <= 1}
                        className="bg-slate-900 border-slate-600"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={cols}
                        onChange={(e) => updateTableSize(rows, Math.max(1, parseInt(e.target.value) || 1))}
                        className="bg-slate-900 border-slate-600 text-white text-center"
                        min="1"
                        max="10"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateTableSize(rows, cols + 1)}
                        disabled={cols >= 10}
                        className="bg-slate-900 border-slate-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Include Header Row</Label>
                    <Switch 
                      checked={hasHeader} 
                      onCheckedChange={(checked) => {
                        setHasHeader(checked);
                        if (checked && tableData[0]) {
                          const newData = [...tableData];
                          newData[0] = newData[0].map((_, index) => `Header ${index + 1}`);
                          setTableData(newData);
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Add Borders</Label>
                    <Switch checked={addBorder} onCheckedChange={setAddBorder} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Add CSS Styling</Label>
                    <Switch checked={addStyling} onCheckedChange={setAddStyling} />
                  </div>
                </div>

                {/* Table Editor */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Edit Table Content</Label>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-slate-600">
                      {hasHeader && (
                        <thead>
                          <tr>
                            {tableData[0]?.map((cell, colIndex) => (
                              <th key={colIndex} className="border border-slate-600 p-1">
                                <Input
                                  value={cell}
                                  onChange={(e) => updateCell(0, colIndex, e.target.value)}
                                  className="bg-slate-700 border-none text-white text-sm"
                                  placeholder={`Header ${colIndex + 1}`}
                                />
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {tableData.slice(hasHeader ? 1 : 0).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex} className="border border-slate-600 p-1">
                                <Input
                                  value={cell}
                                  onChange={(e) => updateCell(rowIndex + (hasHeader ? 1 : 0), colIndex, e.target.value)}
                                  className="bg-slate-900 border-none text-white text-sm"
                                  placeholder={`Row ${rowIndex + 1} Col ${colIndex + 1}`}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Button onClick={generateHtml} className="w-full bg-orange-600 hover:bg-orange-700">
                  Generate HTML Code
                </Button>
              </CardContent>
            </Card>

            {/* Generated Code */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Generated HTML Code
                  <Button 
                    size="sm" 
                    onClick={copyToClipboard}
                    disabled={!generatedHtml}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedHtml}
                  readOnly
                  placeholder="Generated HTML code will appear here..."
                  className="bg-slate-900 border-slate-600 text-white font-mono text-sm min-h-[400px]"
                />
              </CardContent>
            </Card>
          </div>

          <AdSenseBox />
          
          <ToolFAQ
            toolName="HTML Table Generator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default HtmlTableGenerator;
