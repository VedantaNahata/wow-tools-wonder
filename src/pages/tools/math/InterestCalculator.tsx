
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("years");
  const [compoundFreq, setCompoundFreq] = useState("annually");
  const [simpleResult, setSimpleResult] = useState<any>(null);
  const [compoundResult, setCompoundResult] = useState<any>(null);

  const getCompoundingFrequency = (freq: string) => {
    switch (freq) {
      case "daily": return 365;
      case "monthly": return 12;
      case "quarterly": return 4;
      case "semi-annually": return 2;
      case "annually": return 1;
      default: return 1;
    }
  };

  const convertTimeToYears = (time: number, unit: string) => {
    switch (unit) {
      case "days": return time / 365;
      case "months": return time / 12;
      case "years": return time;
      default: return time;
    }
  };

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const timeInYears = convertTimeToYears(t, timeUnit);
      const interest = (p * r * timeInYears) / 100;
      const total = p + interest;
      
      // Generate year-by-year breakdown
      const breakdown = [];
      const years = Math.ceil(timeInYears);
      for (let i = 1; i <= years; i++) {
        const yearTime = Math.min(i, timeInYears);
        const yearInterest = (p * r * yearTime) / 100;
        breakdown.push({
          year: i,
          interest: yearInterest,
          total: p + yearInterest
        });
      }
      
      setSimpleResult({ 
        interest, 
        total, 
        principal: p, 
        rate: r, 
        time: timeInYears,
        breakdown,
        effectiveRate: (interest / p) * 100
      });
    }
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const n = getCompoundingFrequency(compoundFreq);
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
      const timeInYears = convertTimeToYears(t, timeUnit);
      const amount = p * Math.pow((1 + r / (100 * n)), n * timeInYears);
      const interest = amount - p;
      
      // Generate year-by-year breakdown
      const breakdown = [];
      const years = Math.ceil(timeInYears);
      for (let i = 1; i <= years; i++) {
        const yearTime = Math.min(i, timeInYears);
        const yearAmount = p * Math.pow((1 + r / (100 * n)), n * yearTime);
        const yearInterest = yearAmount - p;
        breakdown.push({
          year: i,
          interest: yearInterest,
          total: yearAmount
        });
      }
      
      const effectiveRate = (Math.pow((1 + r / (100 * n)), n) - 1) * 100;
      
      setCompoundResult({ 
        interest, 
        amount, 
        principal: p, 
        rate: r, 
        time: timeInYears, 
        compound: n,
        breakdown,
        effectiveRate
      });
    }
  };

  const faqs = [
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. Compound interest grows exponentially over time."
    },
    {
      question: "How does compounding frequency affect returns?",
      answer: "Higher compounding frequency (daily vs annually) results in slightly higher returns due to interest being calculated and added more frequently, though the difference diminishes with very high frequencies."
    },
    {
      question: "What is the effective annual rate?",
      answer: "The effective annual rate is the actual annual rate of return after accounting for compounding. It's higher than the nominal rate when compounding occurs more than once per year."
    }
  ];

  return (
    <SEOWrapper
      title="Advanced Interest Calculator - Simple & Compound Interest with Breakdown"
      description="Calculate simple and compound interest with detailed yearly breakdowns, multiple time periods, and effective rate calculations."
      keywords="interest calculator, simple interest, compound interest, investment calculator, loan calculator, effective rate"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced Interest Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate simple and compound interest with detailed breakdowns, multiple time periods, and effective rates.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Interest Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="principal">Principal Amount ($)</Label>
                    <Input
                      id="principal"
                      type="number"
                      placeholder="Enter principal"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.01"
                      placeholder="Enter rate"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time Period</Label>
                    <Input
                      id="time"
                      type="number"
                      placeholder="Enter time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Unit</Label>
                    <Select value={timeUnit} onValueChange={setTimeUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="years">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="simple" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simple">Simple Interest</TabsTrigger>
                    <TabsTrigger value="compound">Compound Interest</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="simple" className="space-y-4">
                    <Button onClick={calculateSimpleInterest} className="w-full">
                      Calculate Simple Interest
                    </Button>
                    {simpleResult && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Principal</h3>
                            <p className="text-2xl font-bold">${simpleResult.principal.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Interest Earned</h3>
                            <p className="text-2xl font-bold">${simpleResult.interest.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-purple-700 dark:text-purple-300">Total Amount</h3>
                            <p className="text-2xl font-bold">${simpleResult.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Year-by-Year Breakdown</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {simpleResult.breakdown.map((year: any, index: number) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                  <span>Year {year.year}</span>
                                  <span>Interest: ${year.interest.toFixed(2)}</span>
                                  <span className="font-semibold">Total: ${year.total.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="compound" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Compounding Frequency</Label>
                      <Select value={compoundFreq} onValueChange={setCompoundFreq}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily (365 times/year)</SelectItem>
                          <SelectItem value="monthly">Monthly (12 times/year)</SelectItem>
                          <SelectItem value="quarterly">Quarterly (4 times/year)</SelectItem>
                          <SelectItem value="semi-annually">Semi-annually (2 times/year)</SelectItem>
                          <SelectItem value="annually">Annually (1 time/year)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={calculateCompoundInterest} className="w-full">
                      Calculate Compound Interest
                    </Button>
                    
                    {compoundResult && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Principal</h3>
                            <p className="text-xl font-bold">${compoundResult.principal.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Interest Earned</h3>
                            <p className="text-xl font-bold">${compoundResult.interest.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-purple-700 dark:text-purple-300">Final Amount</h3>
                            <p className="text-xl font-bold">${compoundResult.amount.toFixed(2)}</p>
                          </div>
                          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg text-center">
                            <h3 className="font-semibold text-orange-700 dark:text-orange-300">Effective Rate</h3>
                            <p className="text-xl font-bold">{compoundResult.effectiveRate.toFixed(3)}%</p>
                          </div>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Year-by-Year Growth</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {compoundResult.breakdown.map((year: any, index: number) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                  <span>Year {year.year}</span>
                                  <span>Interest: ${year.interest.toFixed(2)}</span>
                                  <span className="font-semibold">Total: ${year.total.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Interest Calculator" faqs={faqs} />
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

export default InterestCalculator;
