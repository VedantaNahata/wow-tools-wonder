
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Copy, FileSpreadsheet, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExcelToHtmlTable = () => {
  const [inputData, setInputData] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [addStyling, setAddStyling] = useState(true);
  const [addBorder, setAddBorder] = useState(true);
  const { toast } = useToast();

  const parseData = (data: string) => {
    if (!data.trim()) return [];
    
    const lines = data.trim().split('\n');
    return lines.map(line => {
      // Handle both tab-separated and comma-separated values
      if (line.includes('\t')) {
        return line.split('\t');
      } else if (line.includes(',')) {
        // Simple CSV parsing (doesn't handle quoted commas)
        return line.split(',').map(cell => cell.trim());
      } else {
        return [line];
      }
    });
  };

  const generateHtml = () => {
    const rows = parseData(inputData);
    if (rows.length === 0) {
      toast({ title: "Error", description: "Please enter some data first.", variant: "destructive" });
      return;
    }

    let html = "";
    
    if (addStyling) {
      html += `<style>
  .excel-table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-family: Arial, sans-serif;
  }
  .excel-table th,
  .excel-table td {
    padding: 12px;
    text-align: left;${addBorder ? '\n    border: 1px solid #ddd;' : ''}
  }
  .excel-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  .excel-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .excel-table tr:hover {
    background-color: #f5f5f5;
  }
</style>

`;
    }

    html += `<table class="${addStyling ? 'excel-table' : ''}"${addBorder && !addStyling ? ' border="1"' : ''}>\n`;
    
    if (hasHeader && rows.length > 0) {
      html += "  <thead>\n    <tr>\n";
      rows[0].forEach(cell => {
        html += `      <th>${cell.trim()}</th>\n`;
      });
      html += "    </tr>\n  </thead>\n";
    }
    
    html += "  <tbody>\n";
    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < rows.length; i++) {
      html += "    <tr>\n";
      rows[i].forEach(cell => {
        html += `      <td>${cell.trim()}</td>\n`;
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputData(content);
      };
      reader.readAsText(file);
    }
  };

  const loadSampleData = () => {
    const sample = `Name	Age	Department	Salary
John Doe	30	Engineering	75000
Jane Smith	28	Marketing	65000
Bob Johnson	35	Sales	70000
Alice Brown	32	Engineering	80000
Tom Wilson	29	Marketing	62000`;
    setInputData(sample);
  };

  const faqData = [
    {
      question: "What formats can I paste?",
      answer: "You can paste data copied from Excel, Google Sheets, or any tab-separated or comma-separated values. The tool automatically detects the format."
    },
    {
      question: "Can I upload CSV files?",
      answer: "Yes! Click the upload button to select a CSV file from your computer. The content will be automatically loaded into the converter."
    },
    {
      question: "How does header detection work?",
      answer: "When 'First row is header' is enabled, the first row will be styled as table headers with bold text and background color."
    },
    {
      question: "What styling options are available?",
      answer: "You can choose to include CSS styling for professional appearance, add borders, and toggle hover effects and alternating row colors."
    },
    {
      question: "How do I get data from Excel?",
      answer: "Select the cells in Excel you want to convert, copy them (Ctrl+C), then paste directly into the input area. Column and row structure will be preserved."
    }
  ];

  return (
    <SEOWrapper 
      title="Excel to HTML Table Converter - Convert Spreadsheets to HTML"
      description="Convert Excel data and CSV files to HTML tables instantly. Paste spreadsheet data or upload files and get clean, styled HTML table code."
      keywords="excel to html, csv to html table, spreadsheet converter, excel table converter, csv table generator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <FileSpreadsheet className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Excel to HTML Table Converter</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Convert Excel spreadsheets and CSV data to clean, styled HTML tables
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Input Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload */}
                <div>
                  <Label className="text-gray-300">Upload CSV File</Label>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 file:cursor-pointer cursor-pointer mt-2"
                  />
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">First row is header</Label>
                    <Switch checked={hasHeader} onCheckedChange={setHasHeader} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Add borders</Label>
                    <Switch checked={addBorder} onCheckedChange={setAddBorder} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Add CSS styling</Label>
                    <Switch checked={addStyling} onCheckedChange={setAddStyling} />
                  </div>
                </div>

                {/* Sample Data Button */}
                <Button 
                  onClick={loadSampleData} 
                  variant="outline"
                  className="w-full bg-slate-900 border-slate-600 hover:bg-slate-700"
                >
                  Load Sample Data
                </Button>

                {/* Input Textarea */}
                <div>
                  <Label className="text-gray-300">
                    Paste Excel/CSV Data
                    <span className="text-xs text-gray-400 block mt-1">
                      Copy cells from Excel or paste CSV data
                    </span>
                  </Label>
                  <Textarea
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Paste your Excel data here or upload a CSV file...&#10;&#10;Example:&#10;Name	Age	Department&#10;John	30	Engineering&#10;Jane	28	Marketing"
                    className="bg-slate-900 border-slate-600 text-white font-mono text-sm min-h-[300px] mt-2"
                  />
                </div>

                <Button onClick={generateHtml} className="w-full bg-orange-600 hover:bg-orange-700">
                  Convert to HTML Table
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
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
                  placeholder="HTML table code will appear here after conversion..."
                  className="bg-slate-900 border-slate-600 text-white font-mono text-sm min-h-[400px]"
                />
                
                {generatedHtml && (
                  <div className="mt-4">
                    <Label className="text-gray-300">Preview</Label>
                    <div 
                      className="bg-white p-4 rounded-lg mt-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: generatedHtml }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <AdSenseBox />
          
          <ToolFAQ
            toolName="Excel to HTML Table Converter FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ExcelToHtmlTable;
