
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ExcelToHtmlConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [responsive, setResponsive] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [striped, setStriped] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "text/csv" || file.name.endsWith('.csv'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        setInput(csv);
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const convertToHtml = () => {
    if (!input.trim()) {
      toast.error("Please paste Excel data or upload a CSV file");
      return;
    }

    try {
      const lines = input.trim().split('\n');
      const rows = lines.map(line => {
        // Handle CSV parsing with quotes and commas
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            cells.push(current.trim());
            current = '';
          } else if (char === '\t' && !inQuotes) {
            cells.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        cells.push(current.trim());
        return cells;
      });

      let tableClass = "table";
      if (responsive) tableClass += " table-responsive";
      if (bordered) tableClass += " table-bordered";
      if (striped) tableClass += " table-striped";

      let html = `<table class="${tableClass}">\n`;

      // Add CSS if responsive
      if (responsive) {
        html = `<style>
.table-responsive {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table-bordered td, .table-bordered th {
  border: 1px solid #dee2e6;
  padding: 8px;
}
.table-striped tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>\n` + html;
      }

      if (includeHeaders && rows.length > 0) {
        html += "  <thead>\n    <tr>\n";
        rows[0].forEach(cell => {
          html += `      <th>${cell.replace(/"/g, '')}</th>\n`;
        });
        html += "    </tr>\n  </thead>\n";
        html += "  <tbody>\n";
        
        for (let i = 1; i < rows.length; i++) {
          html += "    <tr>\n";
          rows[i].forEach(cell => {
            html += `      <td>${cell.replace(/"/g, '')}</td>\n`;
          });
          html += "    </tr>\n";
        }
      } else {
        html += "  <tbody>\n";
        rows.forEach(row => {
          html += "    <tr>\n";
          row.forEach(cell => {
            html += `      <td>${cell.replace(/"/g, '')}</td>\n`;
          });
          html += "    </tr>\n";
        });
      }

      html += "  </tbody>\n</table>";

      setOutput(html);
      toast.success("Excel data converted to HTML table successfully!");
    } catch (error) {
      toast.error("Error converting data to HTML table");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("HTML table copied to clipboard!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const faqs = [
    {
      question: "What formats are supported?",
      answer: "You can paste data directly from Excel (tab-separated) or upload CSV files. The tool automatically detects the format and converts it to HTML."
    },
    {
      question: "How do I copy data from Excel?",
      answer: "Simply select the cells in Excel, copy them (Ctrl+C), and paste directly into the input area. The tool will handle the formatting automatically."
    },
    {
      question: "What styling options are available?",
      answer: "You can make tables responsive, add borders, enable striped rows, and include/exclude headers. The generated HTML includes CSS for styling."
    }
  ];

  return (
    <SEOWrapper
      title="Excel to HTML Table Converter - Convert Spreadsheet Data"
      description="Convert Excel data and CSV files to responsive HTML tables. Paste from Excel or upload CSV files with custom styling options."
      keywords="excel to html, csv to html, table converter, spreadsheet converter, html table generator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Excel to HTML Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert Excel data and CSV files to responsive HTML tables with custom styling options.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Excel to HTML Converter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload CSV File (Optional)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="input">Excel Data / CSV Content</Label>
                    <Textarea
                      id="input"
                      placeholder="Paste your Excel data here or upload a CSV file above..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[150px] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="headers"
                        checked={includeHeaders}
                        onCheckedChange={setIncludeHeaders}
                      />
                      <Label htmlFor="headers">Include Headers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="responsive"
                        checked={responsive}
                        onCheckedChange={setResponsive}
                      />
                      <Label htmlFor="responsive">Responsive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bordered"
                        checked={bordered}
                        onCheckedChange={setBordered}
                      />
                      <Label htmlFor="bordered">Bordered</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="striped"
                        checked={striped}
                        onCheckedChange={setStriped}
                      />
                      <Label htmlFor="striped">Striped Rows</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={convertToHtml} className="flex-1">
                    Convert to HTML
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {output && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="output">HTML Table Code</Label>
                      <Button onClick={copyToClipboard} variant="outline" size="sm">
                        Copy HTML
                      </Button>
                    </div>
                    <Textarea
                      id="output"
                      value={output}
                      readOnly
                      className="min-h-[200px] font-mono bg-muted"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Excel to HTML Converter" faqs={faqs} />
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

export default ExcelToHtmlConverter;
