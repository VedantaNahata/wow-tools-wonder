
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const FactorialCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateFactorial = (n: number): bigint => {
    if (n <= 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const handleCalculate = () => {
    const num = parseInt(number);
    if (!isNaN(num) && num >= 0 && num <= 1000) {
      const factorial = calculateFactorial(num);
      const steps = [];
      
      if (num <= 10) {
        for (let i = 1; i <= num; i++) {
          steps.push(i);
        }
      }
      
      setResult({
        number: num,
        factorial: factorial.toString(),
        steps: steps,
        digits: factorial.toString().length
      });
    } else {
      alert("Please enter a number between 0 and 1000");
    }
  };

  const faqs = [
    {
      question: "What is a factorial?",
      answer: "A factorial of a number n (written as n!) is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
      question: "What is 0! (zero factorial)?",
      answer: "By definition, 0! equals 1. This is a mathematical convention that makes many formulas work correctly."
    }
  ];

  return (
    <SEOWrapper
      title="Factorial Calculator - Calculate n! with Steps"
      description="Calculate factorials of any number with detailed steps and explanations. Fast and accurate factorial computation."
      keywords="factorial calculator, n factorial, mathematical calculator, combinatorics, permutations"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Factorial Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate the factorial of any number with step-by-step breakdown and explanations.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Factorial Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Enter a Number (0-1000)</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    min="0"
                    max="1000"
                  />
                </div>
                
                <Button onClick={handleCalculate} className="w-full">
                  Calculate {number}!
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">Result</h3>
                      <p className="text-3xl font-bold">
                        {result.number}! = {result.factorial.length > 50 ? 
                          `${result.factorial.substring(0, 50)}...` : 
                          result.factorial}
                      </p>
                      {result.factorial.length > 50 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          ({result.digits} digits total)
                        </p>
                      )}
                    </div>

                    {result.steps.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Step-by-Step Calculation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-mono text-sm">
                            {result.number}! = {result.steps.join(' × ')} = {result.factorial}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Factorial Calculator" faqs={faqs} />
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

export default FactorialCalculator;
