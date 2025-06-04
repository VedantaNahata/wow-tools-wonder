
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compound, setCompound] = useState("");
  const [simpleResult, setSimpleResult] = useState<any>(null);
  const [compoundResult, setCompoundResult] = useState<any>(null);

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const interest = (p * r * t) / 100;
      const total = p + interest;
      setSimpleResult({ interest, total, principal: p, rate: r, time: t });
    }
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const n = parseFloat(compound) || 1;
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
      const amount = p * Math.pow((1 + r / (100 * n)), n * t);
      const interest = amount - p;
      setCompoundResult({ interest, amount, principal: p, rate: r, time: t, compound: n });
    }
  };

  const faqs = [
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest."
    },
    {
      question: "How often should interest be compounded?",
      answer: "Common compounding frequencies are annually (1), semi-annually (2), quarterly (4), monthly (12), or daily (365)."
    }
  ];

  return (
    <SEOWrapper
      title="Interest Calculator - Simple & Compound Interest Calculator"
      description="Calculate simple and compound interest with detailed breakdowns. Compare different interest types and compounding frequencies."
      keywords="interest calculator, simple interest, compound interest, investment calculator, loan calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Interest Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate simple and compound interest with detailed comparisons and breakdowns.
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
                <Tabs defaultValue="simple" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simple">Simple Interest</TabsTrigger>
                    <TabsTrigger value="compound">Compound Interest</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="simple" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="principal">Principal Amount</Label>
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
                          placeholder="Enter rate"
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time (Years)</Label>
                        <Input
                          id="time"
                          type="number"
                          placeholder="Enter time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={calculateSimpleInterest} className="w-full">
                      Calculate Simple Interest
                    </Button>
                    {simpleResult && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Simple Interest Result</h3>
                        <div className="space-y-1">
                          <p>Principal: <span className="font-mono">${simpleResult.principal.toFixed(2)}</span></p>
                          <p>Interest: <span className="font-mono text-primary">${simpleResult.interest.toFixed(2)}</span></p>
                          <p>Total Amount: <span className="font-mono font-bold">${simpleResult.total.toFixed(2)}</span></p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="compound" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="principal2">Principal Amount</Label>
                        <Input
                          id="principal2"
                          type="number"
                          placeholder="Enter principal"
                          value={principal}
                          onChange={(e) => setPrincipal(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate2">Interest Rate (%)</Label>
                        <Input
                          id="rate2"
                          type="number"
                          placeholder="Enter rate"
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time2">Time (Years)</Label>
                        <Input
                          id="time2"
                          type="number"
                          placeholder="Enter time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="compound">Compounds/Year</Label>
                        <Input
                          id="compound"
                          type="number"
                          placeholder="Enter frequency"
                          value={compound}
                          onChange={(e) => setCompound(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={calculateCompoundInterest} className="w-full">
                      Calculate Compound Interest
                    </Button>
                    {compoundResult && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Compound Interest Result</h3>
                        <div className="space-y-1">
                          <p>Principal: <span className="font-mono">${compoundResult.principal.toFixed(2)}</span></p>
                          <p>Interest: <span className="font-mono text-primary">${compoundResult.interest.toFixed(2)}</span></p>
                          <p>Total Amount: <span className="font-mono font-bold">${compoundResult.amount.toFixed(2)}</span></p>
                        </div>
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
