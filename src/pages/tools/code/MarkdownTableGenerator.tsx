
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const MarkdownTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [alignment, setAlignment] = useState("left");
  const [output, setOutput] = useState("");

  const initializeTable = () => {
    const newTable = Array(rows).fill(null).map(() => Array(cols).fill(""));
    setTableData(newTable);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newTable = [...tableData];
    newTable[rowIndex][colIndex] = value;
    setTableData(newTable);
  };

  const generateMarkdown = () => {
    if (tableData.length === 0) {
      toast.error("Please initialize the table first");
      return;
    }

    let markdown = "";
    
    // Header row
    if (tableData.length > 0) {
      markdown += "| " + tableData[0].join(" | ") + " |\n";
      
      // Alignment row
      const alignmentSymbol = alignment === "left" ? ":--" : alignment === "right" ? "--:" : ":-:";
      markdown += "|" + Array(cols).fill(` ${alignmentSymbol} `).join("|") + "|\n";
      
      // Data rows
      for (let i = 1; i < tableData.length; i++) {
        markdown += "| " + tableData[i].join(" | ") + " |\n";
      }
    }

    setOutput(markdown);
    toast.success("Markdown table generated successfully!");
  };

  const addRow = () => {
    const newRow = Array(cols).fill("");
    setTableData([...tableData, newRow]);
  };

  const removeRow = () => {
    if (tableData.length > 1) {
      setTableData(tableData.slice(0, -1));
    }
  };

  const addColumn = () => {
    const newTable = tableData.map(row => [...row, ""]);
    setTableData(newTable);
    setCols(cols + 1);
  };

  const removeColumn = () => {
    if (cols > 1) {
      const newTable = tableData.map(row => row.slice(0, -1));
      setTableData(newTable);
      setCols(cols - 1);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Markdown table copied to clipboard!");
  };

  const clearAll = () => {
    setTableData([]);
    setOutput("");
  };

  const faqs = [
    {
      question: "What is Markdown table syntax?",
      answer: "Markdown tables use pipes (|) to separate columns and dashes to create headers. The alignment can be controlled with colons (:--), (--:), or (:-:)."
    },
    {
      question: "How do I add or remove rows and columns?",
      answer: "Use the +/- buttons next to the table to dynamically add or remove rows and columns. You can also change the initial size and reinitialize."
    },
    {
      question: "What alignment options are available?",
      answer: "You can align text left (:--), right (--:), or center (:-:). This affects how the content appears when the Markdown is rendered."
    }
  ];

  return (
    <SEOWrapper
      title="Markdown Table Generator - Create MD Tables Easily"
      description="Generate Markdown tables with custom rows, columns, and alignment. Visual editor with live preview and copy-to-clipboard functionality."
      keywords="markdown table generator, md table, markdown editor, table creator, markdown syntax"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Markdown Table Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create Markdown tables with a visual editor and export the MD code instantly.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Markdown Table Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rows">Rows</Label>
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
                    <Label htmlFor="cols">Columns</Label>
                    <Input
                      id="cols"
                      type="number"
                      min="1"
                      max="10"
                      value={cols}
                      onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alignment</Label>
                    <Select value={alignment} onValueChange={setAlignment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Button onClick={initializeTable} variant="outline" className="w-full">
                      Initialize Table
                    </Button>
                  </div>
                </div>

                {tableData.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Button onClick={addRow} variant="outline" size="sm">+ Row</Button>
                      <Button onClick={removeRow} variant="outline" size="sm">- Row</Button>
                      <Button onClick={addColumn} variant="outline" size="sm">+ Column</Button>
                      <Button onClick={removeColumn} variant="outline" size="sm">- Column</Button>
                    </div>

                    <div className="overflow-auto">
                      <table className="w-full border-collapse border border-border">
                        {tableData.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex === 0 ? "bg-muted" : ""}>
                            {row.map((cell, colIndex) => (
                              <td key={colIndex} className="border border-border p-1">
                                <Input
                                  value={cell}
                                  onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                  placeholder={rowIndex === 0 ? `Header ${colIndex + 1}` : `Cell ${rowIndex},${colIndex + 1}`}
                                  className="border-0 bg-transparent"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={generateMarkdown} className="flex-1">
                    Generate Markdown
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {output && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="output">Markdown Code</Label>
                      <Button onClick={copyToClipboard} variant="outline" size="sm">
                        Copy Markdown
                      </Button>
                    </div>
                    <Textarea
                      id="output"
                      value={output}
                      readOnly
                      className="min-h-[150px] font-mono bg-muted"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Markdown Table Generator" faqs={faqs} />
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

export default MarkdownTableGenerator;
