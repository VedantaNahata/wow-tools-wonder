
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Sigma } from "lucide-react";

const FactorialCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{ factorial: string; steps: string[] } | null>(null);

  const calculateFactorial = () => {
    const n = parseInt(number);
    if (isNaN(n) || n < 0) {
      setResult({ factorial: "Error: Please enter a non-negative integer", steps: [] });
      return;
    }

    if (n > 170) {
      setResult({ factorial: "Error: Number too large (max 170)", steps: [] });
      return;
    }

    let factorial = BigInt(1);
    const steps = [`${n}! = `];
    
    if (n === 0 || n === 1) {
      steps.push("1 (by definition)");
    } else {
      const stepParts = [];
      for (let i = n; i >= 1; i--) {
        stepParts.push(i.toString());
        factorial *= BigInt(i);
      }
      steps.push(stepParts.join(" × "));
      steps.push(`= ${factorial.toString()}`);
    }

    setResult({ factorial: factorial.toString(), steps });
  };

  const faqData = [
    {
      question: "What is a factorial?",
      answer: "A factorial of a positive integer n, denoted as n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
      question: "What is 0! equal to?",
      answer: "0! is defined to be 1 by convention. This definition is useful in many mathematical formulas and ensures consistency in combinatorics."
    },
    {
      question: "Why can't I calculate factorial of negative numbers?",
      answer: "Factorials are only defined for non-negative integers. For negative numbers, you would need the gamma function extension."
    },
    {
      question: "What's the largest factorial I can calculate?",
      answer: "This calculator can handle factorials up to 170! due to JavaScript's number precision limits. Beyond that, the result would be infinity."
    }
  ];

  return (
    <SEOWrapper 
      title="Factorial Calculator - Calculate n! with Steps"
      description="Free factorial calculator with step-by-step computation. Calculate factorials of any non-negative integer up to 170! with detailed breakdown."
      keywords="factorial calculator, n factorial, math calculator, combinatorics calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <Sigma className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Factorial Calculator</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate factorials (n!) with detailed step-by-step computation
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Calculate n!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Enter a number (0-170)</Label>
                <Input
                  type="number"
                  placeholder="5"
                  min="0"
                  max="170"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <Button onClick={calculateFactorial} className="w-full bg-violet-600 hover:bg-violet-700">
                Calculate Factorial
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-violet-900/20 border border-violet-500/30 rounded-lg">
                  <p className="text-violet-300 text-xl font-bold mb-2">
                    {number}! = {result.factorial}
                  </p>
                  {result.steps.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-gray-300 font-semibold">Step-by-step:</p>
                      {result.steps.map((step, index) => (
                        <p key={index} className="text-violet-200 font-mono">
                          {step}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <ToolFAQ
            title="Factorial Calculator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default FactorialCalculator;
