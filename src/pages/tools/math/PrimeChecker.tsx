
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { CheckCircle, X } from "lucide-react";

const PrimeChecker = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    isPrime: boolean;
    explanation: string;
    factors?: number[];
  } | null>(null);

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const findFactors = (n: number): number[] => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const checkPrime = () => {
    const n = parseInt(number);
    if (isNaN(n)) {
      setResult({
        isPrime: false,
        explanation: "Please enter a valid number."
      });
      return;
    }

    if (n < 1) {
      setResult({
        isPrime: false,
        explanation: "Numbers less than 1 are not considered prime."
      });
      return;
    }

    const prime = isPrime(n);
    const factors = findFactors(n);
    
    let explanation = "";
    if (n === 1) {
      explanation = "1 is neither prime nor composite by definition.";
    } else if (prime) {
      explanation = `${n} is prime because it has exactly two factors: 1 and ${n}.`;
    } else {
      explanation = `${n} is not prime because it has more than two factors.`;
    }

    setResult({
      isPrime: prime,
      explanation,
      factors
    });
  };

  const faqData = [
    {
      question: "What is a prime number?",
      answer: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself."
    },
    {
      question: "Is 1 a prime number?",
      answer: "No, 1 is not considered a prime number. By definition, prime numbers must have exactly two distinct positive divisors."
    },
    {
      question: "What's the difference between prime and composite numbers?",
      answer: "Prime numbers have exactly two factors (1 and themselves), while composite numbers have more than two factors."
    },
    {
      question: "What is the smallest prime number?",
      answer: "The smallest prime number is 2, which is also the only even prime number."
    },
    {
      question: "How large can prime numbers be?",
      answer: "There are infinitely many prime numbers. This calculator can check numbers up to about 9 quadrillion efficiently."
    }
  ];

  return (
    <SEOWrapper 
      title="Prime Number Checker - Check if a Number is Prime"
      description="Free prime number checker tool. Instantly determine if any number is prime or composite with detailed explanations and factor listings."
      keywords="prime number checker, prime calculator, composite number, factor finder, number theory"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Prime Number Checker</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Check if a number is prime with detailed analysis and factor listing
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Enter a Number to Check</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Number</Label>
                <Input
                  type="number"
                  placeholder="17"
                  min="1"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <Button onClick={checkPrime} className="w-full bg-pink-600 hover:bg-pink-700">
                Check if Prime
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  result.isPrime 
                    ? "bg-green-900/20 border-green-500/30" 
                    : "bg-red-900/20 border-red-500/30"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {result.isPrime ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <X className="h-6 w-6 text-red-400" />
                    )}
                    <p className={`text-xl font-bold ${
                      result.isPrime ? "text-green-300" : "text-red-300"
                    }`}>
                      {number} is {result.isPrime ? "PRIME" : "NOT PRIME"}
                    </p>
                  </div>
                  <p className="text-gray-300">
                    {result.explanation}
                  </p>
                </div>

                {result.factors && result.factors.length > 0 && (
                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <h3 className="text-blue-300 font-semibold mb-2">
                      All Factors of {number}:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.factors.map((factor, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-blue-600/20 text-blue-200 rounded text-sm"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                    <p className="text-blue-200 text-sm mt-2">
                      Total factors: {result.factors.length}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <ToolFAQ
            toolName="Prime Number Checker FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default PrimeChecker;
