
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const HtmlTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [output, setOutput] = useState("");
  const [includeCSS, setIncludeCSS] = useState(true);

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

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const generateHTML = () => {
    if (tableData.length === 0) {
      toast.error("Please initialize the table first");
      return;
    }

    let html = "";
    
    if (includeCSS) {
      html += `<style>
.custom-table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  font-family: Arial, sans-serif;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.custom-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.custom-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table tr:hover {
  background-color: #f5f5f5;
}
</style>

`;
    }

    html += `<table class="custom-table">\n`;
    
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
    toast.success("HTML table copied to clipboard!");
  };

  const faqs = [
    {
      question: "What CSS styling is included?",
      answer: "The generated CSS includes responsive table styling with borders, padding, hover effects, and alternating row colors for better readability."
    },
    {
      question: "Can I customize the table styling?",
      answer: "Yes, the generated CSS can be modified to match your website's design. You can change colors, fonts, spacing, and other styling properties."
    },
    {
      question: "Is the generated table responsive?",
      answer: "The basic table structure is provided. For full responsiveness, you may need to add additional CSS media queries for mobile devices."
    }
  ];

  return (
    <SEOWrapper
      title="HTML Table Generator - Create Custom HTML Tables"
      description="Generate custom HTML tables with styling. Create responsive tables with headers, custom content, and copy the complete HTML code."
      keywords="html table generator, table creator, html table maker, responsive table, table html code"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HTML Table Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create custom HTML tables with styling and copy the complete code.
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
                    <Label htmlFor="rows">Number of Rows</Label>
                    <Input
                      id="rows"
                      type="number"
                      min="1"
                      max="20"
                      value={rows}
                      onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cols">Number of Columns</Label>
                    <Input
                      id="cols"
                      type="number"
                      min="1"
                      max="10"
                      value={cols}
                      onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                    />
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
                    <h3 className="text-lg font-semibold">Edit Table Content</h3>
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
                      Generate HTML Code
                    </Button>
                  </div>
                )}

                {output && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Generated HTML Code</Label>
                      <Button onClick={copyToClipboard} variant="outline" size="sm">
                        Copy to Clipboard
                      </Button>
                    </div>
                    <Textarea
                      value={output}
                      readOnly
                      className="min-h-[300px] font-mono bg-muted"
                    />
                    
                    <div className="border rounded-lg p-4 bg-background">
                      <h3 className="text-lg font-semibold mb-2">Preview</h3>
                      <div dangerouslySetInnerHTML={{ __html: output }} />
                    </div>
                  </div>
                )}
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
