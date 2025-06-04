
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const PrimeChecker = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<any>(null);

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getFactors = (n: number): number[] => {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) {
          factors.push(n / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const getPrimeFactorization = (n: number): number[] => {
    const factors = [];
    let divisor = 2;
    
    while (divisor * divisor <= n) {
      while (n % divisor === 0) {
        factors.push(divisor);
        n /= divisor;
      }
      divisor++;
    }
    
    if (n > 1) {
      factors.push(n);
    }
    
    return factors;
  };

  const handleCheck = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      alert("Please enter a positive integer");
      return;
    }

    const prime = isPrime(num);
    const factors = getFactors(num);
    const primeFactors = getPrimeFactorization(num);
    
    setResult({
      number: num,
      isPrime: prime,
      factors: factors,
      primeFactors: primeFactors,
      factorCount: factors.length
    });
  };

  const faqs = [
    {
      question: "What is a prime number?",
      answer: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself."
    },
    {
      question: "What's the difference between factors and prime factors?",
      answer: "Factors are all numbers that divide evenly into a number, while prime factors are only the prime numbers that multiply together to make the original number."
    }
  ];

  return (
    <SEOWrapper
      title="Prime Number Checker - Test if Number is Prime"
      description="Check if any number is prime with detailed analysis, factors, and prime factorization. Fast prime number detection."
      keywords="prime number checker, prime test, factorization, number theory, mathematical calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Prime Number Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check if a number is prime and explore its mathematical properties with detailed analysis.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Prime Number Checker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Enter a Number</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    min="1"
                  />
                </div>
                
                <Button onClick={handleCheck} className="w-full">
                  Check if Prime
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className={`p-6 rounded-lg text-center ${result.isPrime ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                      <h3 className="text-2xl font-bold mb-2">
                        {result.number} is {result.isPrime ? 'PRIME' : 'NOT PRIME'}
                      </h3>
                      <p className="text-lg">
                        {result.isPrime 
                          ? `${result.number} has exactly 2 factors: 1 and ${result.number}`
                          : `${result.number} has ${result.factorCount} factors`
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">All Factors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {result.factors.map((factor: number, index: number) => (
                              <span key={index} className="px-2 py-1 bg-muted rounded text-sm font-mono">
                                {factor}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Prime Factorization</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {result.primeFactors.length > 0 ? (
                            <div className="space-y-2">
                              <p className="font-mono">
                                {result.number} = {result.primeFactors.join(' × ')}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(result.primeFactors)).map((factor: number, index: number) => (
                                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono">
                                    {factor}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p>No prime factorization (number is 1)</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Prime Number Checker" faqs={faqs} />
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

export default PrimeChecker;
