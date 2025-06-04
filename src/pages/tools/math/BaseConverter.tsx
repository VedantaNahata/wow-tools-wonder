
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const BaseConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [results, setResults] = useState<any>(null);

  const bases = [
    { value: "2", label: "Binary (Base 2)" },
    { value: "8", label: "Octal (Base 8)" },
    { value: "10", label: "Decimal (Base 10)" },
    { value: "16", label: "Hexadecimal (Base 16)" }
  ];

  const isValidInput = (value: string, base: number): boolean => {
    if (!value) return false;
    const validChars = "0123456789ABCDEF".slice(0, base);
    return value.toUpperCase().split('').every(char => validChars.includes(char));
  };

  const convertFromDecimal = (decimal: number, toBase: number): string => {
    if (decimal === 0) return "0";
    let result = "";
    const digits = "0123456789ABCDEF";
    
    while (decimal > 0) {
      result = digits[decimal % toBase] + result;
      decimal = Math.floor(decimal / toBase);
    }
    return result;
  };

  const convertToDecimal = (value: string, fromBase: number): number => {
    let decimal = 0;
    const digits = "0123456789ABCDEF";
    
    for (let i = 0; i < value.length; i++) {
      const digit = digits.indexOf(value.toUpperCase()[i]);
      decimal += digit * Math.pow(fromBase, value.length - 1 - i);
    }
    return decimal;
  };

  const performConversion = () => {
    if (!inputValue.trim()) {
      alert("Please enter a value to convert");
      return;
    }

    const base = parseInt(fromBase);
    if (!isValidInput(inputValue, base)) {
      alert(`Invalid input for base ${base}`);
      return;
    }

    const decimalValue = convertToDecimal(inputValue, base);
    
    const conversions = {
      binary: convertFromDecimal(decimalValue, 2),
      octal: convertFromDecimal(decimalValue, 8),
      decimal: decimalValue.toString(),
      hexadecimal: convertFromDecimal(decimalValue, 16)
    };

    setResults({
      originalValue: inputValue,
      originalBase: base,
      decimal: decimalValue,
      conversions
    });
  };

  const faqs = [
    {
      question: "What are the different number bases?",
      answer: "Binary (base 2) uses digits 0-1, Octal (base 8) uses 0-7, Decimal (base 10) uses 0-9, and Hexadecimal (base 16) uses 0-9 and A-F."
    },
    {
      question: "How do I convert between bases?",
      answer: "First convert to decimal (base 10) as an intermediate step, then convert from decimal to the target base using division and remainders."
    }
  ];

  return (
    <SEOWrapper
      title="Number Base Converter - Binary, Octal, Decimal, Hex"
      description="Convert numbers between binary, octal, decimal, and hexadecimal bases with step-by-step explanations and validation."
      keywords="base converter, binary converter, hexadecimal converter, octal converter, number system converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Number Base Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert numbers between binary, octal, decimal, and hexadecimal number systems.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Number Base Converter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="input">Input Value</Label>
                    <Input
                      id="input"
                      type="text"
                      placeholder="Enter number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>From Base</Label>
                    <Select value={fromBase} onValueChange={setFromBase}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bases.map(base => (
                          <SelectItem key={base.value} value={base.value}>
                            {base.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={performConversion} className="w-full">
                  Convert
                </Button>

                {results && (
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-lg font-bold text-primary mb-2">Original Input</h3>
                      <p className="text-xl font-mono">
                        {results.originalValue} (Base {results.originalBase})
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-center">Binary</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="font-mono text-lg break-all">{results.conversions.binary}</p>
                          <p className="text-sm text-muted-foreground">Base 2</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-center">Octal</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="font-mono text-lg">{results.conversions.octal}</p>
                          <p className="text-sm text-muted-foreground">Base 8</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-center">Decimal</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="font-mono text-lg">{results.conversions.decimal}</p>
                          <p className="text-sm text-muted-foreground">Base 10</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-center">Hexadecimal</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="font-mono text-lg">{results.conversions.hexadecimal}</p>
                          <p className="text-sm text-muted-foreground">Base 16</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Number Base Converter" faqs={faqs} />
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

export default BaseConverter;
