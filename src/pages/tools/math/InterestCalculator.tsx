
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";

const InterestCalculator = () => {
  const [simpleInterest, setSimpleInterest] = useState({
    principal: "",
    rate: "",
    time: "",
    result: ""
  });

  const [compoundInterest, setCompoundInterest] = useState({
    principal: "",
    rate: "",
    time: "",
    frequency: "12",
    result: "",
    totalAmount: ""
  });

  const calculateSimpleInterest = () => {
    const p = parseFloat(simpleInterest.principal);
    const r = parseFloat(simpleInterest.rate) / 100;
    const t = parseFloat(simpleInterest.time);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const interest = p * r * t;
      const total = p + interest;
      setSimpleInterest(prev => ({
        ...prev,
        result: `Interest: $${interest.toFixed(2)} | Total: $${total.toFixed(2)}`
      }));
    }
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(compoundInterest.principal);
    const r = parseFloat(compoundInterest.rate) / 100;
    const t = parseFloat(compoundInterest.time);
    const n = parseFloat(compoundInterest.frequency);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
      const amount = p * Math.pow(1 + r / n, n * t);
      const interest = amount - p;
      setCompoundInterest(prev => ({
        ...prev,
        result: `Interest: $${interest.toFixed(2)}`,
        totalAmount: `Total Amount: $${amount.toFixed(2)}`
      }));
    }
  };

  const faqData = [
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus any previously earned interest."
    },
    {
      question: "How does compounding frequency affect interest?",
      answer: "More frequent compounding (daily vs annually) results in higher returns because interest is calculated and added to the principal more often."
    },
    {
      question: "What does APR mean in interest calculations?",
      answer: "APR (Annual Percentage Rate) represents the yearly cost of a loan or investment, including fees and compound interest effects."
    },
    {
      question: "How do I convert monthly interest rate to annual?",
      answer: "Multiply the monthly rate by 12. For example, 1% monthly = 12% annually (for simple interest). For compound interest, use (1 + monthly_rate)^12 - 1."
    },
    {
      question: "Can I use this calculator for loan payments?",
      answer: "This calculator shows interest earned/owed but doesn't calculate monthly payments. For loan payments, you'd need an amortization calculator."
    }
  ];

  return (
    <SEOWrapper 
      title="Interest Calculator - Simple & Compound Interest Calculator"
      description="Calculate simple and compound interest with different compounding frequencies. Free online tool for loans, savings, and investment calculations."
      keywords="interest calculator, compound interest, simple interest, loan calculator, savings calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Interest Calculator</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Calculate simple and compound interest for loans, savings, and investments
            </p>
          </div>

          <Tabs defaultValue="simple" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
              <TabsTrigger value="simple" className="data-[state=active]:bg-green-600">
                Simple Interest
              </TabsTrigger>
              <TabsTrigger value="compound" className="data-[state=active]:bg-green-600">
                Compound Interest
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simple">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Simple Interest Calculator
                  </CardTitle>
                  <p className="text-gray-400">Formula: I = P × R × T</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-300">Principal Amount ($)</Label>
                      <Input
                        type="number"
                        placeholder="10000"
                        value={simpleInterest.principal}
                        onChange={(e) => setSimpleInterest(prev => ({ ...prev, principal: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Interest Rate (%)</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        step="0.01"
                        value={simpleInterest.rate}
                        onChange={(e) => setSimpleInterest(prev => ({ ...prev, rate: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Time (Years)</Label>
                      <Input
                        type="number"
                        placeholder="2"
                        step="0.1"
                        value={simpleInterest.time}
                        onChange={(e) => setSimpleInterest(prev => ({ ...prev, time: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={calculateSimpleInterest} className="w-full bg-green-600 hover:bg-green-700">
                    Calculate Simple Interest
                  </Button>
                  {simpleInterest.result && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-300 text-lg font-semibold">
                        {simpleInterest.result}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Calculation: ${simpleInterest.principal} × {simpleInterest.rate}% × {simpleInterest.time} years
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compound">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Compound Interest Calculator
                  </CardTitle>
                  <p className="text-gray-400">Formula: A = P(1 + r/n)^(nt)</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Principal Amount ($)</Label>
                      <Input
                        type="number"
                        placeholder="10000"
                        value={compoundInterest.principal}
                        onChange={(e) => setCompoundInterest(prev => ({ ...prev, principal: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Annual Interest Rate (%)</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        step="0.01"
                        value={compoundInterest.rate}
                        onChange={(e) => setCompoundInterest(prev => ({ ...prev, rate: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Time (Years)</Label>
                      <Input
                        type="number"
                        placeholder="2"
                        step="0.1"
                        value={compoundInterest.time}
                        onChange={(e) => setCompoundInterest(prev => ({ ...prev, time: e.target.value }))}
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Compounding Frequency</Label>
                      <Select value={compoundInterest.frequency} onValueChange={(value) => setCompoundInterest(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="1">Annually</SelectItem>
                          <SelectItem value="2">Semi-Annually</SelectItem>
                          <SelectItem value="4">Quarterly</SelectItem>
                          <SelectItem value="12">Monthly</SelectItem>
                          <SelectItem value="52">Weekly</SelectItem>
                          <SelectItem value="365">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={calculateCompoundInterest} className="w-full bg-green-600 hover:bg-green-700">
                    Calculate Compound Interest
                  </Button>
                  {compoundInterest.result && (
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg space-y-2">
                      <p className="text-green-300 text-lg font-semibold">
                        {compoundInterest.result}
                      </p>
                      <p className="text-green-300 text-lg font-semibold">
                        {compoundInterest.totalAmount}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Compounded {compoundInterest.frequency === "1" ? "annually" : 
                                  compoundInterest.frequency === "2" ? "semi-annually" :
                                  compoundInterest.frequency === "4" ? "quarterly" :
                                  compoundInterest.frequency === "12" ? "monthly" :
                                  compoundInterest.frequency === "52" ? "weekly" : "daily"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <ToolFAQ
            title="Interest Calculator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default InterestCalculator;
