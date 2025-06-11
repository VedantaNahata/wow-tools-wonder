import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";
import { Upload, Copy, Eye, Settings } from "lucide-react";

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

const ExcelToHtmlConverter = () => {
  const [excelData, setExcelData] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [activeTab, setActiveTab] = useState("input");
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

  const generateCSS = () => {
    const tableId = "excel-converted-table";
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

  const convertToHtml = () => {
    if (!excelData.trim()) {
      toast({
        title: "No data",
        description: "Please paste some Excel data first",
        variant: "destructive"
      });
      return;
    }

    try {
      const rows = excelData.trim().split('\n').map(row => 
        row.split('\t').map(cell => cell.trim())
      );

      if (rows.length === 0) {
        throw new Error("No data found");
      }

      const css = generateCSS();
      
      const tableRows = rows.map((row, index) => {
        const isHeader = index === 0;
        const tag = isHeader ? 'th' : 'td';
        const cells = row.map(cell => `    <${tag}>${cell || ''}</${tag}>`).join('\n');
        return `  <tr>\n${cells}\n  </tr>`;
      }).join('\n');

      const html = `${css}
<table id="excel-converted-table">
${tableRows}
</table>`;

      setHtmlOutput(html);
      setActiveTab("html");
      
      toast({
        title: "Converted successfully!",
        description: "Excel data has been converted to HTML table"
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "Please check your Excel data format",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "Copied!",
      description: "HTML code copied to clipboard"
    });
  };

  const clearData = () => {
    setExcelData("");
    setHtmlOutput("");
    setActiveTab("input");
  };

  const loadSampleData = () => {
    const sampleData = `Name	Age	City	Country
John Doe	30	New York	USA
Jane Smith	25	London	UK
Bob Johnson	35	Toronto	Canada
Alice Brown	28	Sydney	Australia`;
    setExcelData(sampleData);
  };

  const faqs = [
    {
      question: "How do I copy data from Excel?",
      answer: "Select the cells in Excel, copy them (Ctrl+C), then paste directly into the input area. The tab-separated format will be preserved."
    },
    {
      question: "Can I customize the table styling?",
      answer: "Yes! Use the Styling tab to customize colors, fonts, borders, hover effects, and responsiveness. All styling is included in the generated HTML."
    },
    {
      question: "Does it work with Google Sheets?",
      answer: "Absolutely! Copy data from Google Sheets the same way as Excel. The converter works with any tab-separated data."
    }
  ];

  return (
    <SEOWrapper
      title="Excel to HTML Converter - Convert Spreadsheets to Tables"
      description="Convert Excel and Google Sheets data to HTML tables with advanced styling options. Copy-paste Excel data and get beautiful HTML tables."
      keywords="excel to html, spreadsheet converter, csv to html, table converter, excel html"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Excel to HTML Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert Excel or Google Sheets data to beautiful HTML tables with advanced styling options.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Excel to HTML Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="input">
                      <Upload className="h-4 w-4 mr-2" />
                      Input
                    </TabsTrigger>
                    <TabsTrigger value="styling">
                      <Settings className="h-4 w-4 mr-2" />
                      Styling
                    </TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="input" className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <Button onClick={loadSampleData} variant="outline" size="sm">
                        Load Sample Data
                      </Button>
                      <Button onClick={clearData} variant="outline" size="sm">
                        Clear
                      </Button>
                    </div>
                    
                    <div>
                      <Label htmlFor="excelData">Paste Excel Data (Tab-separated)</Label>
                      <Textarea
                        id="excelData"
                        value={excelData}
                        onChange={(e) => setExcelData(e.target.value)}
                        placeholder="Copy and paste your Excel data here..."
                        className="min-h-[300px] font-mono text-sm"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Tip: Select cells in Excel/Google Sheets and copy (Ctrl+C), then paste here
                      </p>
                    </div>

                    <Button onClick={convertToHtml} disabled={!excelData.trim()} className="w-full">
                      Convert to HTML Table
                    </Button>
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            </div>
                          </div>
                        </div>
                      </div>

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
                      placeholder="Convert Excel data to see HTML code here..."
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
                      <p className="text-muted-foreground">Convert Excel data to see preview</p>
                    )}
                  </TabsContent>
                </Tabs>
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
