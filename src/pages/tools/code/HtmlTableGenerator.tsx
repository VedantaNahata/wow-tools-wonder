
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";
import { Plus, Minus, Copy } from "lucide-react";

const HtmlTableGenerator = () => {
  const [rows, setRows] = useState<string[][]>([
    ["Header 1", "Header 2"],
    ["Row 1 Col 1", "Row 1 Col 2"]
  ]);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [activeTab, setActiveTab] = useState("table");
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

  const generateHTML = () => {
    const tableRows = rows.map((row, rowIndex) => {
      const cells = row.map((cell, colIndex) => {
        const tag = rowIndex === 0 ? 'th' : 'td';
        return `    <${tag}>${cell}</${tag}>`;
      }).join('\n');
      return `  <tr>\n${cells}\n  </tr>`;
    }).join('\n');

    const html = `<table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
${tableRows}
</table>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, sans-serif;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>`;

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
      question: "How do I add more rows or columns?",
      answer: "Use the 'Add Row' and 'Add Column' buttons above the table. You can also remove rows and columns using the minus buttons."
    },
    {
      question: "Can I customize the table styling?",
      answer: "Yes! The generated HTML includes CSS for borders, colors, and hover effects. You can modify the CSS in the HTML output to customize the appearance."
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
            Create professional HTML tables with clean code. Simple interface to add rows, columns, and generate ready-to-use HTML.
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="table">Edit Table</TabsTrigger>
                    <TabsTrigger value="html">HTML Code</TabsTrigger>
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
