
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const UnitConverter = () => {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState("");
  const [category, setCategory] = useState("length");

  const conversions = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.344
    },
    weight: {
      kilogram: 1,
      gram: 0.001,
      pound: 0.453592,
      ounce: 0.0283495,
      ton: 1000,
      stone: 6.35029
    },
    temperature: {
      celsius: { base: 'celsius' },
      fahrenheit: { base: 'fahrenheit' },
      kelvin: { base: 'kelvin' }
    },
    volume: {
      liter: 1,
      milliliter: 0.001,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176,
      cup: 0.236588,
      fluid_ounce: 0.0295735
    },
    area: {
      square_meter: 1,
      square_kilometer: 1000000,
      square_centimeter: 0.0001,
      square_inch: 0.00064516,
      square_foot: 0.092903,
      acre: 4046.86,
      hectare: 10000
    }
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    return celsius;
  };

  const performConversion = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue) || !fromUnit || !toUnit) return;

    let convertedValue = 0;

    if (category === 'temperature') {
      convertedValue = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
      const categoryConversions = conversions[category as keyof typeof conversions] as Record<string, number>;
      const fromFactor = categoryConversions[fromUnit];
      const toFactor = categoryConversions[toUnit];
      
      if (fromFactor && toFactor) {
        convertedValue = (inputValue * fromFactor) / toFactor;
      }
    }

    setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ''));
  };

  const getUnitsForCategory = (cat: string) => {
    switch (cat) {
      case 'length':
        return [
          { value: 'meter', label: 'Meter (m)' },
          { value: 'kilometer', label: 'Kilometer (km)' },
          { value: 'centimeter', label: 'Centimeter (cm)' },
          { value: 'millimeter', label: 'Millimeter (mm)' },
          { value: 'inch', label: 'Inch (in)' },
          { value: 'foot', label: 'Foot (ft)' },
          { value: 'yard', label: 'Yard (yd)' },
          { value: 'mile', label: 'Mile (mi)' }
        ];
      case 'weight':
        return [
          { value: 'kilogram', label: 'Kilogram (kg)' },
          { value: 'gram', label: 'Gram (g)' },
          { value: 'pound', label: 'Pound (lb)' },
          { value: 'ounce', label: 'Ounce (oz)' },
          { value: 'ton', label: 'Ton (t)' },
          { value: 'stone', label: 'Stone (st)' }
        ];
      case 'temperature':
        return [
          { value: 'celsius', label: 'Celsius (°C)' },
          { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
          { value: 'kelvin', label: 'Kelvin (K)' }
        ];
      case 'volume':
        return [
          { value: 'liter', label: 'Liter (L)' },
          { value: 'milliliter', label: 'Milliliter (mL)' },
          { value: 'gallon', label: 'Gallon (gal)' },
          { value: 'quart', label: 'Quart (qt)' },
          { value: 'pint', label: 'Pint (pt)' },
          { value: 'cup', label: 'Cup' },
          { value: 'fluid_ounce', label: 'Fluid Ounce (fl oz)' }
        ];
      case 'area':
        return [
          { value: 'square_meter', label: 'Square Meter (m²)' },
          { value: 'square_kilometer', label: 'Square Kilometer (km²)' },
          { value: 'square_centimeter', label: 'Square Centimeter (cm²)' },
          { value: 'square_inch', label: 'Square Inch (in²)' },
          { value: 'square_foot', label: 'Square Foot (ft²)' },
          { value: 'acre', label: 'Acre' },
          { value: 'hectare', label: 'Hectare (ha)' }
        ];
      default:
        return [];
    }
  };

  const faqs = [
    {
      question: "What units can I convert between?",
      answer: "You can convert between length, weight, temperature, volume, and area units. Each category includes both metric and imperial units."
    },
    {
      question: "How accurate are the conversions?",
      answer: "All conversions use standard conversion factors and are accurate to 6 decimal places for precise calculations."
    },
    {
      question: "Can I convert temperature units?",
      answer: "Yes! The tool supports Celsius, Fahrenheit, and Kelvin temperature conversions with proper formulas for each scale."
    }
  ];

  return (
    <SEOWrapper
      title="Unit Converter - Convert Between Different Units"
      description="Convert between different units of measurement including length, weight, temperature, volume, and area with high precision."
      keywords="unit converter, measurement converter, length converter, weight converter, temperature converter, metric converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unit Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different units of measurement with precision and ease.
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
                <Tabs value={category} onValueChange={setCategory} className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="length">Length</TabsTrigger>
                    <TabsTrigger value="weight">Weight</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                    <TabsTrigger value="volume">Volume</TabsTrigger>
                    <TabsTrigger value="area">Area</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          type="number"
                          value={value}
                          onChange={(e) => {
                            setValue(e.target.value);
                            performConversion();
                          }}
                          placeholder="Enter value"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>From</Label>
                        <Select 
                          value={fromUnit} 
                          onValueChange={(value) => {
                            setFromUnit(value);
                            performConversion();
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {getUnitsForCategory(category).map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Select 
                          value={toUnit} 
                          onValueChange={(value) => {
                            setToUnit(value);
                            performConversion();
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {getUnitsForCategory(category).map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {result && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-lg font-semibold">
                          {value} {getUnitsForCategory(category).find(u => u.value === fromUnit)?.label.split(' ')[0]} = 
                          <span className="text-primary ml-2">{result} {getUnitsForCategory(category).find(u => u.value === toUnit)?.label.split(' ')[0]}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Unit Converter" faqs={faqs} />
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

export default UnitConverter;
