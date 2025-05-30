
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Percent, Calculator, TrendingUp, TrendingDown } from "lucide-react";

const PercentageCalculator = () => {
  const [basicPercent, setBasicPercent] = useState({ value: "", total: "", result: "" });
  const [percentChange, setPercentChange] = useState({ oldValue: "", newValue: "", result: "" });
  const [percentOf, setPercentOf] = useState({ percent: "", value: "", result: "" });

  const calculateBasicPercent = () => {
    const value = parseFloat(basicPercent.value);
    const total = parseFloat(basicPercent.total);
    if (!isNaN(value) && !isNaN(total) && total !== 0) {
      const result = ((value / total) * 100).toFixed(2);
      setBasicPercent(prev => ({ ...prev, result: `${result}%` }));
    }
  };

  const calculatePercentChange = () => {
    const oldVal = parseFloat(percentChange.oldValue);
    const newVal = parseFloat(percentChange.newValue);
    if (!isNaN(oldVal) && !isNaN(newVal) && oldVal !== 0) {
      const change = ((newVal - oldVal) / oldVal) * 100;
      const result = change.toFixed(2);
      setPercentChange(prev => ({ ...prev, result: `${result}%` }));
    }
  };

  const calculatePercentOf = () => {
    const percent = parseFloat(percentOf.percent);
    const value = parseFloat(percentOf.value);
    if (!isNaN(percent) && !isNaN(value)) {
      const result = ((percent / 100) * value).toFixed(2);
      setPercentOf(prev => ({ ...prev, result }));
    }
  };

  const faqData = [
    {
      question: "How do I calculate what percentage one number is of another?",
      answer: "To find what percentage A is of B, divide A by B and multiply by 100. For example, 25 is 50% of 50 because (25 ÷ 50) × 100 = 50%."
    },
    {
      question: "What's the difference between percentage increase and decrease?",
      answer: "Percentage increase shows growth (positive result), while percentage decrease shows reduction (negative result). The formula is: ((New Value - Old Value) / Old Value) × 100."
    },
    {
      question: "How do I calculate a percentage of a number?",
      answer: "To find X% of a number, multiply the number by X/100. For example, 20% of 150 is (20/100) × 150 = 30."
    },
    {
      question: "Can I calculate percentage change for negative numbers?",
      answer: "Yes, but be careful with interpretation. When the original value is negative, the results can be counterintuitive. Consider using absolute values or alternative metrics."
    },
    {
      question: "What if I get a percentage over 100%?",
      answer: "Percentages over 100% are normal and indicate that one value is larger than the comparison value. For example, 150 is 300% of 50."
    }
  ];

  return (
    <SEOWrapper 
      title="Percentage Calculator - Calculate Percentages, Increases & Decreases"
      description="Free online percentage calculator. Calculate what percentage one number is of another, percentage increases/decreases, and percentage of numbers with step-by-step solutions."
      keywords="percentage calculator, percent increase, percent decrease, percentage of number, math calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Percent className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Percentage Calculator</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate percentages, percentage increases/decreases, and percentage of numbers with detailed solutions
            </p>
          </div>

          <Tabs defaultValue="basic" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
              <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600">
                Basic Percentage
              </TabsTrigger>
              <TabsTrigger value="change" className="data-[state=active]:bg-blue-600">
                Percent Change
              </TabsTrigger>
              <TabsTrigger value="of" className="data-[state=active]:bg-blue-600">
                Percent Of
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    What percentage is X of Y?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Value (X)</Label>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={basicPercent.value}
                        onChange={(e) => setBasicPercent(prev => ({ ...prev, value: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Total (Y)</Label>
                      <Input
                        type="number"
                        placeholder="Enter total"
                        value={basicPercent.total}
                        onChange={(e) => setBasicPercent(prev => ({ ...prev, total: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={calculateBasicPercent} className="w-full bg-blue-600 hover:bg-blue-700">
                    Calculate Percentage
                  </Button>
                  {basicPercent.result && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-300 text-lg font-semibold">
                        Result: {basicPercent.result}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Formula: ({basicPercent.value} ÷ {basicPercent.total}) × 100
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="change">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Percentage Increase/Decrease
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Old Value</Label>
                      <Input
                        type="number"
                        placeholder="Enter old value"
                        value={percentChange.oldValue}
                        onChange={(e) => setPercentChange(prev => ({ ...prev, oldValue: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">New Value</Label>
                      <Input
                        type="number"
                        placeholder="Enter new value"
                        value={percentChange.newValue}
                        onChange={(e) => setPercentChange(prev => ({ ...prev, newValue: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={calculatePercentChange} className="w-full bg-blue-600 hover:bg-blue-700">
                    Calculate Change
                  </Button>
                  {percentChange.result && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-300 text-lg font-semibold flex items-center gap-2">
                        {parseFloat(percentChange.result) >= 0 ? (
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-400" />
                        )}
                        {parseFloat(percentChange.result) >= 0 ? "Increase" : "Decrease"}: {Math.abs(parseFloat(percentChange.result)).toFixed(2)}%
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Formula: (({percentChange.newValue} - {percentChange.oldValue}) ÷ {percentChange.oldValue}) × 100
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="of">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    What is X% of Y?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Percentage (%)</Label>
                      <Input
                        type="number"
                        placeholder="Enter percentage"
                        value={percentOf.percent}
                        onChange={(e) => setPercentOf(prev => ({ ...prev, percent: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Value</Label>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={percentOf.value}
                        onChange={(e) => setPercentOf(prev => ({ ...prev, value: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={calculatePercentOf} className="w-full bg-blue-600 hover:bg-blue-700">
                    Calculate Result
                  </Button>
                  {percentOf.result && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-300 text-lg font-semibold">
                        Result: {percentOf.result}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Formula: ({percentOf.percent} ÷ 100) × {percentOf.value}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <ToolFAQ
            title="Percentage Calculator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default PercentageCalculator;
