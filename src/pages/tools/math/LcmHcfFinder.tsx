
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const LcmHcfFinder = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<any>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const gcdMultiple = (nums: number[]): number => {
    return nums.reduce((a, b) => gcd(a, b));
  };

  const lcmMultiple = (nums: number[]): number => {
    return nums.reduce((a, b) => lcm(a, b));
  };

  const calculateLcmHcf = () => {
    const nums = numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);
    
    if (nums.length < 2) {
      alert("Please enter at least 2 positive numbers separated by commas");
      return;
    }

    const hcf = gcdMultiple(nums);
    const lcmValue = lcmMultiple(nums);
    
    setResult({
      numbers: nums,
      hcf,
      lcm: lcmValue
    });
  };

  const faqs = [
    {
      question: "What is the difference between HCF and LCM?",
      answer: "HCF (Highest Common Factor) is the largest number that divides all given numbers. LCM (Least Common Multiple) is the smallest number that is divisible by all given numbers."
    },
    {
      question: "How are HCF and LCM related?",
      answer: "For two numbers a and b: HCF(a,b) × LCM(a,b) = a × b. This relationship helps verify calculations."
    }
  ];

  return (
    <SEOWrapper
      title="LCM & HCF Calculator - Find LCM and HCF of Numbers"
      description="Calculate LCM (Least Common Multiple) and HCF (Highest Common Factor) of multiple numbers with step-by-step solutions."
      keywords="LCM calculator, HCF calculator, GCD calculator, least common multiple, highest common factor, greatest common divisor"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            LCM & HCF Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the Least Common Multiple and Highest Common Factor of multiple numbers with detailed explanations.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>LCM & HCF Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="numbers">Enter Numbers (comma-separated)</Label>
                  <Input
                    id="numbers"
                    type="text"
                    placeholder="e.g., 12, 18, 24"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter at least 2 positive numbers separated by commas
                  </p>
                </div>
                
                <Button onClick={calculateLcmHcf} className="w-full">
                  Calculate LCM & HCF
                </Button>

                {result && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                        <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">HCF</h3>
                        <p className="text-3xl font-bold">{result.hcf}</p>
                        <p className="text-sm text-muted-foreground mt-1">Highest Common Factor</p>
                      </div>
                      
                      <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-center">
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">LCM</h3>
                        <p className="text-3xl font-bold">{result.lcm}</p>
                        <p className="text-sm text-muted-foreground mt-1">Least Common Multiple</p>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Input Numbers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {result.numbers.map((num: number, index: number) => (
                            <span key={index} className="px-3 py-1 bg-muted rounded font-mono">
                              {num}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="LCM & HCF Calculator" faqs={faqs} />
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

export default LcmHcfFinder;
