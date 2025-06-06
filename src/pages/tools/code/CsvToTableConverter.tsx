
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const CsvToTableConverter = () => {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const [outputFormat, setOutputFormat] = useState("html");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [markdownOutput, setMarkdownOutput] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "text/csv" || file.name.endsWith('.csv'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        setInput(csv);
        parseCSV(csv);
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const parseCSV = (csvText: string = input) => {
    if (!csvText.trim()) {
      toast.error("Please provide CSV data");
      return;
    }

    try {
      const lines = csvText.trim().split('\n');
      const data = lines.map(line => {
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delimiter && !inQuotes) {
            cells.push(current.trim().replace(/^"|"$/g, ''));
            current = '';
          } else {
            current += char;
          }
        }
        cells.push(current.trim().replace(/^"|"$/g, ''));
        return cells;
      });

      setParsedData(data);
      generateOutputs(data);
      toast.success("CSV parsed successfully!");
    } catch (error) {
      toast.error("Error parsing CSV data");
    }
  };

  const generateOutputs = (data: string[][]) => {
    if (data.length === 0) return;

    // Generate HTML
    let html = '<table class="table table-bordered">\n';
    
    if (hasHeaders && data.length > 0) {
      html += '  <thead>\n    <tr>\n';
      data[0].forEach(cell => {
        html += `      <th>${cell}</th>\n`;
      });
      html += '    </tr>\n  </thead>\n  <tbody>\n';
      
      for (let i = 1; i < data.length; i++) {
        html += '    <tr>\n';
        data[i].forEach(cell => {
          html += `      <td>${cell}</td>\n`;
        });
        html += '    </tr>\n';
      }
    } else {
      html += '  <tbody>\n';
      data.forEach(row => {
        html += '    <tr>\n';
        row.forEach(cell => {
          html += `      <td>${cell}</td>\n`;
        });
        html += '    </tr>\n';
      });
    }
    
    html += '  </tbody>\n</table>';
    setHtmlOutput(html);

    // Generate Markdown
    let markdown = "";
    if (data.length > 0) {
      if (hasHeaders) {
        markdown += "| " + data[0].join(" | ") + " |\n";
        markdown += "|" + data[0].map(() => " --- ").join("|") + "|\n";
        
        for (let i = 1; i < data.length; i++) {
          markdown += "| " + data[i].join(" | ") + " |\n";
        }
      } else {
        data.forEach(row => {
          markdown += "| " + row.join(" | ") + " |\n";
        });
      }
    }
    setMarkdownOutput(markdown);
  };

  const copyToClipboard = (content: string, format: string) => {
    navigator.clipboard.writeText(content);
    toast.success(`${format} table copied to clipboard!`);
  };

  const clearAll = () => {
    setInput("");
    setParsedData([]);
    setHtmlOutput("");
    setMarkdownOutput("");
  };

  const faqs = [
    {
      question: "What CSV formats are supported?",
      answer: "The tool supports standard CSV with comma, semicolon, or tab delimiters. It handles quoted fields and escaped quotes properly."
    },
    {
      question: "Can I preview the table before exporting?",
      answer: "Yes, after parsing the CSV, you'll see a live preview of the table. You can then export to HTML or Markdown format."
    },
    {
      question: "How do I handle different delimiters?",
      answer: "Use the delimiter dropdown to select comma, semicolon, or tab. The tool will re-parse your data with the selected delimiter."
    }
  ];

  return (
    <SEOWrapper
      title="CSV to Table Converter - Convert CSV to HTML & Markdown"
      description="Convert CSV data to formatted HTML and Markdown tables. Upload files or paste CSV data with custom delimiter support."
      keywords="csv to html, csv to markdown, table converter, csv parser, data converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSV to Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert CSV data to formatted HTML and Markdown tables with live preview.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSV to Table Converter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload CSV File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Delimiter</Label>
                    <Select value={delimiter} onValueChange={setDelimiter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=",">Comma (,)</SelectItem>
                        <SelectItem value=";">Semicolon (;)</SelectItem>
                        <SelectItem value="\t">Tab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="headers"
                        checked={hasHeaders}
                        onCheckedChange={setHasHeaders}
                      />
                      <Label htmlFor="headers">First row is headers</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input">CSV Data</Label>
                  <Textarea
                    id="input"
                    placeholder="Paste your CSV data here or upload a file above..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => parseCSV()} className="flex-1">
                    Parse CSV
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {parsedData.length > 0 && (
                  <div className="space-y-4">
                    <div>
                      <Label>Table Preview</Label>
                      <div className="border rounded-md p-4 max-h-[300px] overflow-auto">
                        <Table>
                          {hasHeaders && (
                            <TableHeader>
                              <TableRow>
                                {parsedData[0]?.map((cell, index) => (
                                  <TableHead key={index}>{cell}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                          )}
                          <TableBody>
                            {(hasHeaders ? parsedData.slice(1) : parsedData).map((row, rowIndex) => (
                              <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <TableCell key={cellIndex}>{cell}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>HTML Output</Label>
                          <Button 
                            onClick={() => copyToClipboard(htmlOutput, "HTML")} 
                            variant="outline" 
                            size="sm"
                          >
                            Copy HTML
                          </Button>
                        </div>
                        <Textarea
                          value={htmlOutput}
                          readOnly
                          className="min-h-[200px] font-mono bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Markdown Output</Label>
                          <Button 
                            onClick={() => copyToClipboard(markdownOutput, "Markdown")} 
                            variant="outline" 
                            size="sm"
                          >
                            Copy Markdown
                          </Button>
                        </div>
                        <Textarea
                          value={markdownOutput}
                          readOnly
                          className="min-h-[200px] font-mono bg-muted"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="CSV to Table Converter" faqs={faqs} />
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

export default CsvToTableConverter;
