
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { GitBranch } from "lucide-react";

const LcmHcfFinder = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<{
    lcm: number;
    hcf: number;
    steps: string[];
  } | null>(null);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const calculateLcmHcf = () => {
    const nums = numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);
    
    if (nums.length < 2) {
      setResult({
        lcm: 0,
        hcf: 0,
        steps: ["Please enter at least two positive numbers separated by commas."]
      });
      return;
    }

    let currentLcm = nums[0];
    let currentHcf = nums[0];
    const steps = [`Numbers: ${nums.join(', ')}`];

    for (let i = 1; i < nums.length; i++) {
      const prevHcf = currentHcf;
      const prevLcm = currentLcm;
      
      currentHcf = gcd(currentHcf, nums[i]);
      currentLcm = lcm(currentLcm, nums[i]);
      
      steps.push(`Step ${i}: HCF(${prevHcf}, ${nums[i]}) = ${currentHcf}, LCM(${prevLcm}, ${nums[i]}) = ${currentLcm}`);
    }

    setResult({
      lcm: currentLcm,
      hcf: currentHcf,
      steps
    });
  };

  const faqData = [
    {
      question: "What is LCM and HCF?",
      answer: "LCM (Least Common Multiple) is the smallest number that is divisible by all given numbers. HCF (Highest Common Factor) is the largest number that divides all given numbers."
    },
    {
      question: "What's the relationship between LCM and HCF?",
      answer: "For two numbers a and b: LCM(a,b) × HCF(a,b) = a × b. This relationship helps verify calculations."
    },
    {
      question: "Can I find LCM and HCF of more than two numbers?",
      answer: "Yes! This calculator can handle multiple numbers. The process involves finding LCM/HCF pairs progressively."
    },
    {
      question: "What if one number is a multiple of another?",
      answer: "If number A is a multiple of number B, then LCM(A,B) = A and HCF(A,B) = B."
    }
  ];

  return (
    <SEOWrapper 
      title="LCM & HCF Calculator - Find Least Common Multiple & Highest Common Factor"
      description="Calculate LCM and HCF of multiple numbers with step-by-step solutions. Free online tool for finding least common multiple and greatest common divisor."
      keywords="LCM calculator, HCF calculator, least common multiple, highest common factor, GCD calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                <GitBranch className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">LCM & HCF Finder</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate Least Common Multiple and Highest Common Factor of multiple numbers
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Enter Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Numbers (comma-separated)</Label>
                <Input
                  type="text"
                  placeholder="12, 18, 24"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Enter at least two positive numbers separated by commas</p>
              </div>
              <Button onClick={calculateLcmHcf} className="w-full bg-teal-600 hover:bg-teal-700">
                Calculate LCM & HCF
              </Button>
            </CardContent>
          </Card>

          {result && result.steps.length > 0 && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.lcm > 0 && result.hcf > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-900/20 border border-teal-500/30 rounded-lg">
                      <h3 className="text-teal-300 font-semibold text-lg">LCM</h3>
                      <p className="text-teal-200 text-2xl font-bold">{result.lcm}</p>
                      <p className="text-gray-400 text-sm">Least Common Multiple</p>
                    </div>
                    <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                      <h3 className="text-cyan-300 font-semibold text-lg">HCF</h3>
                      <p className="text-cyan-200 text-2xl font-bold">{result.hcf}</p>
                      <p className="text-gray-400 text-sm">Highest Common Factor</p>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-blue-300 font-semibold mb-2">Step-by-step calculation:</h3>
                  {result.steps.map((step, index) => (
                    <p key={index} className="text-blue-200 mb-1">
                      {step}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <ToolFAQ
            toolName="LCM & HCF Calculator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default LcmHcfFinder;
