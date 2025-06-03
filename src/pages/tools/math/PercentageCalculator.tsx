
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");

  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [changeResult, setChangeResult] = useState("");

  const [total, setTotal] = useState("");
  const [part, setPart] = useState("");
  const [percentResult, setPercentResult] = useState("");

  const calculatePercentageOf = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(perc)) {
      const result = (val * perc) / 100;
      setResult(result.toString());
    }
  };

  const calculatePercentageChange = () => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(old) && !isNaN(newVal) && old !== 0) {
      const change = ((newVal - old) / old) * 100;
      setChangeResult(change.toFixed(2) + "%");
    }
  };

  const calculateWhatPercent = () => {
    const partVal = parseFloat(part);
    const totalVal = parseFloat(total);
    if (!isNaN(partVal) && !isNaN(totalVal) && totalVal !== 0) {
      const percent = (partVal / totalVal) * 100;
      setPercentResult(percent.toFixed(2) + "%");
    }
  };

  const faqs = [
    {
      question: "How do I calculate percentage increase?",
      answer: "Use the percentage change tab. Enter the old value and new value, then click calculate. The formula is: ((New Value - Old Value) / Old Value) × 100"
    },
    {
      question: "What is the difference between percentage increase and decrease?",
      answer: "Percentage increase shows a positive result when the new value is higher than the old value. Percentage decrease shows a negative result when the new value is lower."
    },
    {
      question: "How do I find what percentage one number is of another?",
      answer: "Use the 'What percent is X of Y' tab. Enter the part (X) and the total (Y), then calculate. The formula is: (Part / Total) × 100"
    }
  ];

  return (
    <SEOWrapper
      title="Percentage Calculator - Calculate % Increase, Decrease & More"
      description="Calculate percentage increase, decrease, and proportion values. Free online percentage calculator with multiple calculation modes."
      keywords="percentage calculator, percent increase, percent decrease, percentage change, proportion calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Percentage Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate percentage increase, decrease, and proportion values with our comprehensive calculator.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Percentage Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="percentage-of" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="percentage-of">% of Number</TabsTrigger>
                    <TabsTrigger value="percentage-change">% Change</TabsTrigger>
                    <TabsTrigger value="what-percent">What %</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="percentage-of" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="percentage">Percentage (%)</Label>
                        <Input
                          id="percentage"
                          type="number"
                          placeholder="Enter percentage"
                          value={percentage}
                          onChange={(e) => setPercentage(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">of Value</Label>
                        <Input
                          id="value"
                          type="number"
                          placeholder="Enter value"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={calculatePercentageOf} className="w-full">
                      Calculate
                    </Button>
                    {result && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-lg font-semibold">
                          {percentage}% of {value} = <span className="text-primary">{result}</span>
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="percentage-change" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="oldValue">Old Value</Label>
                        <Input
                          id="oldValue"
                          type="number"
                          placeholder="Enter old value"
                          value={oldValue}
                          onChange={(e) => setOldValue(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newValue">New Value</Label>
                        <Input
                          id="newValue"
                          type="number"
                          placeholder="Enter new value"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={calculatePercentageChange} className="w-full">
                      Calculate Change
                    </Button>
                    {changeResult && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-lg font-semibold">
                          Change: <span className="text-primary">{changeResult}</span>
                          {parseFloat(changeResult) > 0 ? " (Increase)" : " (Decrease)"}
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="what-percent" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="part">Part</Label>
                        <Input
                          id="part"
                          type="number"
                          placeholder="Enter part value"
                          value={part}
                          onChange={(e) => setPart(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total">Total</Label>
                        <Input
                          id="total"
                          type="number"
                          placeholder="Enter total value"
                          value={total}
                          onChange={(e) => setTotal(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={calculateWhatPercent} className="w-full">
                      Calculate Percentage
                    </Button>
                    {percentResult && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-lg font-semibold">
                          {part} is <span className="text-primary">{percentResult}</span> of {total}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Percentage Calculator" faqs={faqs} />
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

export default PercentageCalculator;
