
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const JsonToHtmlTable = () => {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [output, setOutput] = useState("");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [responsive, setResponsive] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [striped, setStriped] = useState(false);

  const parseJson = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON data");
      return;
    }

    try {
      const data = JSON.parse(input);
      
      if (!Array.isArray(data)) {
        toast.error("JSON must be an array of objects");
        return;
      }

      if (data.length === 0) {
        toast.error("JSON array is empty");
        return;
      }

      // Validate that all items are objects
      const allObjects = data.every(item => typeof item === 'object' && item !== null && !Array.isArray(item));
      if (!allObjects) {
        toast.error("All array items must be objects");
        return;
      }

      setParsedData(data);
      generateHtmlTable(data);
      toast.success("JSON parsed successfully!");
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const generateHtmlTable = (data: any[]) => {
    if (data.length === 0) return;

    // Get all unique keys from all objects
    const allKeys = Array.from(new Set(data.flatMap(obj => Object.keys(obj))));

    let tableClass = "table";
    if (responsive) tableClass += " table-responsive";
    if (bordered) tableClass += " table-bordered";
    if (striped) tableClass += " table-striped";

    let html = "";

    // Add CSS if responsive
    if (responsive) {
      html += `<style>
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
</style>
`;
    }

    html += `<table class="${tableClass}">\n`;

    if (includeHeaders) {
      html += "  <thead>\n    <tr>\n";
      allKeys.forEach(key => {
        html += `      <th>${key}</th>\n`;
      });
      html += "    </tr>\n  </thead>\n";
    }

    html += "  <tbody>\n";
    data.forEach(row => {
      html += "    <tr>\n";
      allKeys.forEach(key => {
        const value = row[key] !== undefined ? row[key] : '';
        const cellValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        html += `      <td>${cellValue}</td>\n`;
      });
      html += "    </tr>\n";
    });
    html += "  </tbody>\n</table>";

    setOutput(html);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("HTML table copied to clipboard!");
  };

  const clearAll = () => {
    setInput("");
    setParsedData([]);
    setOutput("");
  };

  const loadSampleData = () => {
    const sampleJson = `[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "city": "Los Angeles"
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "age": 35,
    "city": "Chicago"
  }
]`;
    setInput(sampleJson);
  };

  // Get all unique keys for preview
  const allKeys = parsedData.length > 0 ? Array.from(new Set(parsedData.flatMap(obj => Object.keys(obj)))) : [];

  const faqs = [
    {
      question: "What JSON format is required?",
      answer: "The JSON must be an array of objects. Each object represents a table row, and the object keys become the table columns."
    },
    {
      question: "How are missing properties handled?",
      answer: "If an object is missing a property that exists in other objects, an empty cell is created. All unique keys across all objects become columns."
    },
    {
      question: "Can I customize the table styling?",
      answer: "Yes, you can make the table responsive, add borders, enable striped rows, and include/exclude headers. CSS is included for styling."
    }
  ];

  return (
    <SEOWrapper
      title="JSON to HTML Table Converter - Convert JSON Arrays"
      description="Convert JSON arrays of objects to clean HTML tables. Supports responsive design, custom styling, and handles nested objects."
      keywords="json to html, json table converter, array to table, json parser, html table generator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            JSON to HTML Table
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert JSON arrays of objects to clean, responsive HTML tables.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>JSON to HTML Table</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="input">JSON Array Input</Label>
                    <Button onClick={loadSampleData} variant="outline" size="sm">
                      Load Sample
                    </Button>
                  </div>
                  <Textarea
                    id="input"
                    placeholder='Paste your JSON array here, e.g., [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="headers"
                      checked={includeHeaders}
                      onCheckedChange={(checked) => setIncludeHeaders(checked === true)}
                    />
                    <Label htmlFor="headers">Include Headers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="responsive"
                      checked={responsive}
                      onCheckedChange={(checked) => setResponsive(checked === true)}
                    />
                    <Label htmlFor="responsive">Responsive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bordered"
                      checked={bordered}
                      onCheckedChange={(checked) => setBordered(checked === true)}
                    />
                    <Label htmlFor="bordered">Bordered</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="striped"
                      checked={striped}
                      onCheckedChange={(checked) => setStriped(checked === true)}
                    />
                    <Label htmlFor="striped">Striped Rows</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={parseJson} className="flex-1">
                    Convert to HTML
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
                          {includeHeaders && (
                            <TableHeader>
                              <TableRow>
                                {allKeys.map((key, index) => (
                                  <TableHead key={index}>{key}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                          )}
                          <TableBody>
                            {parsedData.map((row, rowIndex) => (
                              <TableRow key={rowIndex}>
                                {allKeys.map((key, cellIndex) => {
                                  const value = row[key] !== undefined ? row[key] : '';
                                  const cellValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
                                  return <TableCell key={cellIndex}>{cellValue}</TableCell>;
                                })}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

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
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="JSON to HTML Table" faqs={faqs} />
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

export default JsonToHtmlTable;
