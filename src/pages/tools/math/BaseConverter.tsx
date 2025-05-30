
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { RefreshCw } from "lucide-react";

const BaseConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [results, setResults] = useState<{
    binary: string;
    octal: string;
    decimal: string;
    hexadecimal: string;
  } | null>(null);

  const convertNumber = () => {
    try {
      const decimal = parseInt(inputValue, parseInt(fromBase));
      
      if (isNaN(decimal)) {
        setResults(null);
        return;
      }

      setResults({
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        decimal: decimal.toString(10),
        hexadecimal: decimal.toString(16).toUpperCase()
      });
    } catch (error) {
      setResults(null);
    }
  };

  const faqData = [
    {
      question: "What are number bases?",
      answer: "Number bases (radix) represent how many digits are used in a numbering system. Binary (base 2) uses 0-1, decimal (base 10) uses 0-9, hexadecimal (base 16) uses 0-9 and A-F."
    },
    {
      question: "How do I enter hexadecimal numbers?",
      answer: "For hexadecimal input, use digits 0-9 and letters A-F. For example, 'FF' represents 255 in decimal."
    },
    {
      question: "What's the largest number I can convert?",
      answer: "This converter can handle numbers up to JavaScript's safe integer limit (2^53 - 1), which is about 9 quadrillion."
    },
    {
      question: "Why would I need different number bases?",
      answer: "Different bases are used in computing: binary for machine code, hexadecimal for memory addresses and color codes, octal in some programming contexts."
    }
  ];

  return (
    <SEOWrapper 
      title="Number Base Converter - Binary, Decimal, Hexadecimal Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal bases instantly. Free online number base conversion tool for programmers and students."
      keywords="number base converter, binary converter, hexadecimal converter, octal converter, radix converter"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Number Base Converter</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Convert numbers between binary, octal, decimal, and hexadecimal bases
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Convert Number</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Input Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter number to convert"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">From Base</Label>
                  <Select value={fromBase} onValueChange={setFromBase}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="2">Binary (Base 2)</SelectItem>
                      <SelectItem value="8">Octal (Base 8)</SelectItem>
                      <SelectItem value="10">Decimal (Base 10)</SelectItem>
                      <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={convertNumber} className="w-full bg-red-600 hover:bg-red-700">
                Convert Number
              </Button>
            </CardContent>
          </Card>

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Binary (Base 2)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-200 font-mono text-lg break-all">
                      {results.binary}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Octal (Base 8)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-200 font-mono text-lg break-all">
                      {results.octal}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Decimal (Base 10)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-200 font-mono text-lg break-all">
                      {results.decimal}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Hexadecimal (Base 16)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-200 font-mono text-lg break-all">
                      {results.hexadecimal}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <ToolFAQ
            title="Number Base Converter FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default BaseConverter;
