
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { ArrowLeftRight, Rulers } from "lucide-react";

const UnitConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState("");
  const [activeCategory, setActiveCategory] = useState("length");

  const conversions = {
    length: {
      units: {
        mm: { name: "Millimeter", factor: 0.001 },
        cm: { name: "Centimeter", factor: 0.01 },
        m: { name: "Meter", factor: 1 },
        km: { name: "Kilometer", factor: 1000 },
        in: { name: "Inch", factor: 0.0254 },
        ft: { name: "Foot", factor: 0.3048 },
        yd: { name: "Yard", factor: 0.9144 },
        mi: { name: "Mile", factor: 1609.344 }
      }
    },
    weight: {
      units: {
        mg: { name: "Milligram", factor: 0.000001 },
        g: { name: "Gram", factor: 0.001 },
        kg: { name: "Kilogram", factor: 1 },
        oz: { name: "Ounce", factor: 0.0283495 },
        lb: { name: "Pound", factor: 0.453592 },
        ton: { name: "Ton", factor: 1000 }
      }
    },
    temperature: {
      units: {
        c: { name: "Celsius" },
        f: { name: "Fahrenheit" },
        k: { name: "Kelvin" }
      }
    },
    volume: {
      units: {
        ml: { name: "Milliliter", factor: 0.001 },
        l: { name: "Liter", factor: 1 },
        cup: { name: "Cup", factor: 0.236588 },
        pt: { name: "Pint", factor: 0.473176 },
        qt: { name: "Quart", factor: 0.946353 },
        gal: { name: "Gallon", factor: 3.78541 }
      }
    },
    area: {
      units: {
        sqmm: { name: "Square Millimeter", factor: 0.000001 },
        sqcm: { name: "Square Centimeter", factor: 0.0001 },
        sqm: { name: "Square Meter", factor: 1 },
        sqkm: { name: "Square Kilometer", factor: 1000000 },
        sqin: { name: "Square Inch", factor: 0.00064516 },
        sqft: { name: "Square Foot", factor: 0.092903 },
        acre: { name: "Acre", factor: 4046.86 }
      }
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    
    // Convert to Celsius first
    switch (from) {
      case 'c': celsius = value; break;
      case 'f': celsius = (value - 32) * 5/9; break;
      case 'k': celsius = value - 273.15; break;
      default: return 0;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'c': return celsius;
      case 'f': return (celsius * 9/5) + 32;
      case 'k': return celsius + 273.15;
      default: return 0;
    }
  };

  const convertUnits = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) {
      setResult("Please enter a valid number");
      return;
    }

    const category = conversions[activeCategory as keyof typeof conversions];
    
    if (activeCategory === "temperature") {
      const converted = convertTemperature(inputValue, fromUnit, toUnit);
      setResult(converted.toFixed(4));
    } else {
      const fromFactor = (category.units as any)[fromUnit]?.factor;
      const toFactor = (category.units as any)[toUnit]?.factor;
      
      if (!fromFactor || !toFactor) {
        setResult("Please select valid units");
        return;
      }
      
      const baseValue = inputValue * fromFactor;
      const converted = baseValue / toFactor;
      setResult(converted.toFixed(6));
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result && value) {
      setValue(result);
      setResult(value);
    }
  };

  const faqData = [
    {
      question: "What units can I convert between?",
      answer: "You can convert between length (metric/imperial), weight, temperature (Celsius/Fahrenheit/Kelvin), volume, and area measurements."
    },
    {
      question: "How accurate are the conversions?",
      answer: "Our conversions use standard conversion factors and are accurate to 6 decimal places for most calculations."
    },
    {
      question: "Can I convert between different measurement systems?",
      answer: "Yes! You can convert between metric and imperial units seamlessly. For example, meters to feet, kilograms to pounds, etc."
    },
    {
      question: "How do temperature conversions work?",
      answer: "Temperature conversions use the standard formulas: °F = (°C × 9/5) + 32, K = °C + 273.15. The tool handles all conversions automatically."
    }
  ];

  return (
    <SEOWrapper
      title="Unit Converter - Convert Between Different Units"
      description="Convert between different units of measurement including length, weight, temperature, volume, and more."
      keywords="unit converter, measurement converter, length converter, weight converter, temperature converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <Rulers className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Unit Converter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different units of measurement including length, weight, and temperature.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Unit Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="length">Length</TabsTrigger>
                    <TabsTrigger value="weight">Weight</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                    <TabsTrigger value="volume">Volume</TabsTrigger>
                    <TabsTrigger value="area">Area</TabsTrigger>
                  </TabsList>

                  {Object.entries(conversions).map(([category, data]) => (
                    <TabsContent key={category} value={category} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>From</Label>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Enter value"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              type="number"
                            />
                            <Select value={fromUnit} onValueChange={setFromUnit}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(data.units).map(([key, unit]) => (
                                  <SelectItem key={key} value={key}>
                                    {(unit as any).name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>To</Label>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Result"
                              value={result}
                              readOnly
                              className="bg-muted"
                            />
                            <Select value={toUnit} onValueChange={setToUnit}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(data.units).map(([key, unit]) => (
                                  <SelectItem key={key} value={key}>
                                    {(unit as any).name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={convertUnits} className="flex-1">
                          Convert
                        </Button>
                        <Button onClick={swapUnits} variant="outline" size="icon">
                          <ArrowLeftRight className="h-4 w-4" />
                        </Button>
                      </div>

                      {result && (
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-center text-lg">
                            <span className="font-mono">{value}</span>{" "}
                            <span className="text-muted-foreground">
                              {fromUnit && (data.units as any)[fromUnit]?.name}
                            </span>{" "}
                            = <span className="font-mono font-bold">{result}</span>{" "}
                            <span className="text-muted-foreground">
                              {toUnit && (data.units as any)[toUnit]?.name}
                            </span>
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>

        <ToolFAQ toolName="Unit Converter FAQ" faqs={faqData} />
      </div>
    </SEOWrapper>
  );
};

export default UnitConverter;
