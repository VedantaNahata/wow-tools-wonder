
import { useState, useEffect } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Calculator, LineChart, PiggyBank, Calendar, Download, Info } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const InterestCalculator = () => {
  const [calculatorType, setCalculatorType] = useState("simple");
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5);
  const [timeUnit, setTimeUnit] = useState("years");
  const [compoundingFrequency, setCompoundingFrequency] = useState("annually");
  const [simpleInterest, setSimpleInterest] = useState<number | null>(null);
  const [compoundInterest, setCompoundInterest] = useState<number | null>(null);
  const [finalAmount, setFinalAmount] = useState<number | null>(null);
  const [chartData, setChartData] = useState<Array<{year: number, amount: number}>>([]);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [additionalPayment, setAdditionalPayment] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [totalPayments, setTotalPayments] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const frequencies = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1
  };
  
  const paymentFrequencies = {
    monthly: 12,
    biweekly: 26,
    weekly: 52,
    quarterly: 4,
    annually: 1
  };

  const calculateInterest = () => {
    if (principal <= 0) {
      toast.error("Principal amount must be greater than 0");
      return;
    }
    
    if (rate <= 0) {
      toast.error("Interest rate must be greater than 0");
      return;
    }
    
    if (time <= 0) {
      toast.error("Time period must be greater than 0");
      return;
    }
    
    // Convert all time periods to years for calculation
    let timeInYears = time;
    if (timeUnit === "months") {
      timeInYears = time / 12;
    } else if (timeUnit === "days") {
      timeInYears = time / 365;
    }
    
    // Calculate simple interest: P * r * t
    const simpleInt = principal * (rate / 100) * timeInYears;
    setSimpleInterest(simpleInt);
    
    // Calculate compound interest: P(1 + r/n)^(nt) - P
    const rateDecimal = rate / 100;
    const n = frequencies[compoundingFrequency as keyof typeof frequencies];
    const compoundInt = principal * Math.pow(1 + rateDecimal / n, n * timeInYears) - principal;
    setCompoundInterest(compoundInt);
    
    // Calculate final amount
    const finalAmt = principal + (calculatorType === "simple" ? simpleInt : compoundInt);
    setFinalAmount(finalAmt);
    
    // Generate chart data
    const newChartData = [];
    const years = Math.ceil(timeInYears);
    
    for (let i = 0; i <= years; i++) {
      let amount = principal;
      
      if (calculatorType === "simple") {
        amount += principal * (rate / 100) * i;
      } else {
        amount = principal * Math.pow(1 + rateDecimal / n, n * i);
      }
      
      newChartData.push({
        year: i,
        amount: Number(amount.toFixed(2))
      });
    }
    
    setChartData(newChartData);
    
    toast.success("Interest calculated successfully!");
  };

  const calculateLoanAmortization = () => {
    if (principal <= 0 || rate <= 0 || loanTerm <= 0) {
      toast.error("Please enter valid values for principal, interest rate and term");
      return;
    }
    
    // Convert annual rate to periodic rate based on payment frequency
    const periodicRate = (rate / 100) / paymentFrequencies[paymentFrequency as keyof typeof paymentFrequencies];
    
    // Calculate number of payments
    const numPayments = loanTerm * paymentFrequencies[paymentFrequency as keyof typeof paymentFrequencies];
    
    // Calculate payment amount using amortization formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const payment = principal * periodicRate * Math.pow(1 + periodicRate, numPayments) / (Math.pow(1 + periodicRate, numPayments) - 1);
    setPaymentAmount(payment);
    
    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = principal;
    let totalInterestPaid = 0;
    let totalPaid = 0;
    
    for (let i = 1; i <= numPayments; i++) {
      // Calculate interest for this period
      const interestPayment = balance * periodicRate;
      
      // Regular payment plus any additional payment
      let currentPayment = payment + additionalPayment;
      
      // Adjust final payment if needed to avoid negative balance
      if (balance < currentPayment) {
        currentPayment = balance + interestPayment;
      }
      
      // Principal portion is payment minus interest
      const principalPayment = currentPayment - interestPayment;
      
      // Update remaining balance
      balance -= principalPayment;
      
      // If balance is very small (floating point issues), set to zero
      if (Math.abs(balance) < 0.01) balance = 0;
      
      // Add to total interest and payments
      totalInterestPaid += interestPayment;
      totalPaid += currentPayment;
      
      // Only include certain periods in the schedule to avoid huge tables
      if (i <= 12 || // First year 
          i % 12 === 0 || // Annual points
          numPayments - i < 12 || // Last year
          balance === 0) { // Final payment
        schedule.push({
          period: i,
          payment: currentPayment,
          principal: principalPayment,
          interest: interestPayment,
          remainingBalance: balance
        });
      }
      
      // If balance is zero, we're done
      if (balance === 0) break;
    }
    
    setAmortizationSchedule(schedule);
    setTotalPayments(totalPaid);
    setTotalInterest(totalInterestPaid);
    
    toast.success("Loan amortization calculated successfully!");
  };

  // Reset calculations when calculator type changes
  useEffect(() => {
    setSimpleInterest(null);
    setCompoundInterest(null);
    setFinalAmount(null);
    setChartData([]);
    setAmortizationSchedule([]);
    setTotalInterest(null);
    setTotalPayments(null);
    setPaymentAmount(null);
  }, [calculatorType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const downloadAmortizationSchedule = () => {
    if (amortizationSchedule.length === 0) return;
    
    let csvContent = "Period,Payment,Principal,Interest,Remaining Balance\n";
    
    amortizationSchedule.forEach(row => {
      csvContent += `${row.period},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.remainingBalance.toFixed(2)}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'amortization_schedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Amortization schedule downloaded!");
  };

  const copyResults = () => {
    let text = "";
    
    if (calculatorType === "interest") {
      text = `
Interest Calculator Results:
Principal Amount: ${formatCurrency(principal)}
Interest Rate: ${rate}%
Time Period: ${time} ${timeUnit}
Compounding: ${compoundingFrequency}

Simple Interest: ${simpleInterest ? formatCurrency(simpleInterest) : 'N/A'}
Compound Interest: ${compoundInterest ? formatCurrency(compoundInterest) : 'N/A'}
Final Amount: ${finalAmount ? formatCurrency(finalAmount) : 'N/A'}
      `;
    } else {
      text = `
Loan Calculator Results:
Principal Amount: ${formatCurrency(principal)}
Interest Rate: ${rate}%
Loan Term: ${loanTerm} years
Payment Frequency: ${paymentFrequency}

Payment Amount: ${paymentAmount ? formatCurrency(paymentAmount) : 'N/A'}
Total Payments: ${totalPayments ? formatCurrency(totalPayments) : 'N/A'}
Total Interest: ${totalInterest ? formatCurrency(totalInterest) : 'N/A'}
      `;
    }
    
    navigator.clipboard.writeText(text.trim());
    toast.success("Results copied to clipboard!");
  };

  const faqs = [
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the initial principal, while compound interest is calculated on both the initial principal and the accumulated interest from previous periods, causing it to grow faster over time."
    },
    {
      question: "How does compounding frequency affect my returns?",
      answer: "More frequent compounding (e.g., daily vs. annually) results in higher returns because interest is calculated and added to the principal more often, creating a larger base for future interest calculations."
    },
    {
      question: "How can I pay off my loan faster?",
      answer: "Making additional payments directly toward the principal can significantly reduce the loan term and total interest paid. Use the loan calculator with the 'additional payment' option to see the impact."
    },
    {
      question: "What information do I need for accurate calculations?",
      answer: "For interest calculations, you need the principal amount, interest rate, time period, and compounding frequency. For loans, you also need the loan term and payment frequency."
    },
    {
      question: "How do biweekly payments affect my loan?",
      answer: "Biweekly payments (26 payments per year rather than 12 monthly payments) can help you pay off your loan faster and save on interest because you're making the equivalent of an extra monthly payment each year."
    }
  ];

  return (
    <SEOWrapper
      title="Advanced Interest Calculator - Simple & Compound Interest"
      description="Calculate simple and compound interest with customizable compounding periods, loan amortization schedules, and visual charts showing growth over time."
      keywords="interest calculator, compound interest, simple interest, loan calculator, amortization schedule, payment calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced Interest Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate simple and compound interest, loan payments, and generate amortization schedules.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>Interest Calculator</CardTitle>
                    <CardDescription>
                      Calculate interest and loan payments with detailed breakdown
                    </CardDescription>
                  </div>
                  <Select
                    value={calculatorType}
                    onValueChange={setCalculatorType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Calculator Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interest">Interest Calculator</SelectItem>
                      <SelectItem value="loan">Loan Calculator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {calculatorType === "interest" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="principal">Principal Amount ($)</Label>
                        <Input
                          id="principal"
                          type="number"
                          min="0"
                          step="100"
                          value={principal}
                          onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate">Interest Rate (%)</Label>
                        <Input
                          id="rate"
                          type="number"
                          min="0"
                          step="0.1"
                          value={rate}
                          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="interest-slider">Interest Rate: {rate}%</Label>
                        </div>
                        <Slider
                          id="interest-slider"
                          min={0.1}
                          max={20}
                          step={0.1}
                          value={[rate]}
                          onValueChange={(values) => setRate(values[0])}
                          className="py-4"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="time">Time Period</Label>
                        <Input
                          id="time"
                          type="number"
                          min="1"
                          step="1"
                          value={time}
                          onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeUnit">Time Unit</Label>
                        <Select
                          value={timeUnit}
                          onValueChange={setTimeUnit}
                        >
                          <SelectTrigger id="timeUnit">
                            <SelectValue placeholder="Select time unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="years">Years</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
                        <Select
                          value={compoundingFrequency}
                          onValueChange={setCompoundingFrequency}
                        >
                          <SelectTrigger id="compoundingFrequency">
                            <SelectValue placeholder="Select compounding" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="semiannually">Semi-Annually</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={calculateInterest} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Interest
                    </Button>

                    {finalAmount !== null && (
                      <div className="mt-8 space-y-6">
                        <Tabs defaultValue="results">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="results">Results</TabsTrigger>
                            <TabsTrigger value="chart">Growth Chart</TabsTrigger>
                            <TabsTrigger value="comparison">Comparison</TabsTrigger>
                          </TabsList>
                          <TabsContent value="results" className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">Principal Amount</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-2xl font-bold">{formatCurrency(principal)}</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">Interest Earned</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-2xl font-bold">
                                    {calculatorType === "simple" 
                                      ? formatCurrency(simpleInterest!) 
                                      : formatCurrency(compoundInterest!)}
                                  </p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg">Final Amount</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-2xl font-bold text-primary">{formatCurrency(finalAmount)}</p>
                                </CardContent>
                              </Card>
                            </div>
                            <Button variant="outline" onClick={copyResults} className="w-full">
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Results
                            </Button>
                          </TabsContent>
                          <TabsContent value="chart" className="mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Growth Over Time</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="h-80">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <RechartsLineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} />
                                      <YAxis 
                                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                                        label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                                      />
                                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                      <Legend />
                                      <Line 
                                        type="monotone" 
                                        dataKey="amount" 
                                        name="Total Amount" 
                                        stroke="#3b82f6" 
                                        activeDot={{ r: 8 }} 
                                        strokeWidth={2}
                                      />
                                    </RechartsLineChart>
                                  </ResponsiveContainer>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="comparison" className="mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Simple vs. Compound Interest</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-4">
                                    <h3 className="font-medium text-lg">Simple Interest</h3>
                                    <p className="text-muted-foreground">
                                      Simple interest is calculated only on the initial principal amount.
                                    </p>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span>Principal:</span>
                                        <span>{formatCurrency(principal)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Interest Rate:</span>
                                        <span>{rate}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Interest Earned:</span>
                                        <span>{formatCurrency(simpleInterest!)}</span>
                                      </div>
                                      <div className="flex justify-between font-bold">
                                        <span>Final Amount:</span>
                                        <span>{formatCurrency(principal + simpleInterest!)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h3 className="font-medium text-lg">Compound Interest</h3>
                                    <p className="text-muted-foreground">
                                      Compound interest is calculated on the initial principal and also on the accumulated interest.
                                    </p>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span>Principal:</span>
                                        <span>{formatCurrency(principal)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Interest Rate:</span>
                                        <span>{rate}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Compounding:</span>
                                        <span className="capitalize">{compoundingFrequency}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Interest Earned:</span>
                                        <span>{formatCurrency(compoundInterest!)}</span>
                                      </div>
                                      <div className="flex justify-between font-bold">
                                        <span>Final Amount:</span>
                                        <span>{formatCurrency(principal + compoundInterest!)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-6 p-4 bg-muted rounded-lg">
                                  <div className="flex items-start">
                                    <Info className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" />
                                    <p className="text-sm">
                                      The difference between simple and compound interest is{" "}
                                      <span className="font-bold">
                                        {formatCurrency(Math.abs(compoundInterest! - simpleInterest!))}
                                      </span>. 
                                      {compoundInterest! > simpleInterest! ? 
                                        " Compound interest earns you more over time." : 
                                        " In this case, the difference is minimal due to the terms chosen."}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="principal">Loan Amount ($)</Label>
                        <Input
                          id="principal"
                          type="number"
                          min="0"
                          step="1000"
                          value={principal}
                          onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate">Interest Rate (%)</Label>
                        <Input
                          id="rate"
                          type="number"
                          min="0"
                          step="0.1"
                          value={rate}
                          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                        <Input
                          id="loanTerm"
                          type="number"
                          min="1"
                          step="1"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                        <Select
                          value={paymentFrequency}
                          onValueChange={setPaymentFrequency}
                        >
                          <SelectTrigger id="paymentFrequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additionalPayment">Additional Payment ($)</Label>
                        <Input
                          id="additionalPayment"
                          type="number"
                          min="0"
                          step="10"
                          value={additionalPayment}
                          onChange={(e) => setAdditionalPayment(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={calculateLoanAmortization} className="w-full">
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculate Loan
                        </Button>
                      </div>
                    </div>

                    {paymentAmount !== null && (
                      <div className="mt-8 space-y-6">
                        <Tabs defaultValue="summary">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="summary">Summary</TabsTrigger>
                            <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
                            <TabsTrigger value="chart">Payment Breakdown</TabsTrigger>
                          </TabsList>
                          <TabsContent value="summary" className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Payment Amount
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-2xl font-bold">{formatCurrency(paymentAmount)}</p>
                                  <p className="text-sm text-muted-foreground mt-1 capitalize">Per {paymentFrequency.slice(0, -2)}</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <PiggyBank className="h-4 w-4 mr-2" />
                                    Total Payments
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-2xl font-bold">{formatCurrency(totalPayments!)}</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Over the life of the loan
                                  </p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <LineChart className="h-4 w-4 mr-2" />
                                    Total Interest
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-2xl font-bold text-primary">{formatCurrency(totalInterest!)}</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {((totalInterest! / principal) * 100).toFixed(1)}% of principal
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Loan Details</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-fore">Loan Amount:</p>
                                      <p className="font-medium">{formatCurrency(principal)}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-fore">Interest Rate:</p>
                                      <p className="font-medium">{rate}%</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-fore">Loan Term:</p>
                                      <p className="font-medium">{loanTerm} years</p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-fore">Payment Frequency:</p>
                                      <p className="font-medium capitalize">{paymentFrequency}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-fore">Additional Payment:</p>
                                      <p className="font-medium">{formatCurrency(additionalPayment)}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm text-muted-fore">Interest-to-Principal Ratio:</p>
                                      <p className="font-medium">{(totalInterest! / principal).toFixed(2)}</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Button variant="outline" onClick={copyResults} className="w-full">
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Results
                            </Button>
                          </TabsContent>
                          <TabsContent value="schedule" className="mt-4">
                            <Card>
                              <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Amortization Schedule</CardTitle>
                                <Button variant="outline" size="sm" onClick={downloadAmortizationSchedule}>
                                  <Download className="h-4 w-4 mr-1" />
                                  Download CSV
                                </Button>
                              </CardHeader>
                              <CardContent>
                                <div className="rounded-md border">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b bg-muted/50">
                                          <th className="h-10 px-4 text-left font-medium">Period</th>
                                          <th className="h-10 px-4 text-right font-medium">Payment</th>
                                          <th className="h-10 px-4 text-right font-medium">Principal</th>
                                          <th className="h-10 px-4 text-right font-medium">Interest</th>
                                          <th className="h-10 px-4 text-right font-medium">Remaining</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {amortizationSchedule.map((row, index) => (
                                          <tr key={index} className="border-b">
                                            <td className="p-4 align-middle">{row.period}</td>
                                            <td className="p-4 align-middle text-right">{formatCurrency(row.payment)}</td>
                                            <td className="p-4 align-middle text-right">{formatCurrency(row.principal)}</td>
                                            <td className="p-4 align-middle text-right">{formatCurrency(row.interest)}</td>
                                            <td className="p-4 align-middle text-right">{formatCurrency(row.remainingBalance)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">
                                  Note: This table shows select periods from your loan for clarity. Download the CSV for the full schedule.
                                </p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="chart" className="mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Payment Breakdown</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="h-80">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <RechartsLineChart 
                                      data={amortizationSchedule.map(row => ({
                                        period: row.period,
                                        principal: row.principal,
                                        interest: row.interest,
                                        remaining: row.remainingBalance
                                      }))}
                                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis 
                                        dataKey="period" 
                                        label={{ value: 'Payment Period', position: 'insideBottomRight', offset: -10 }} 
                                      />
                                      <YAxis 
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                        label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                                      />
                                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                      <Legend />
                                      <Line 
                                        type="monotone" 
                                        dataKey="remaining" 
                                        name="Remaining Balance" 
                                        stroke="#3b82f6" 
                                        strokeWidth={2}
                                      />
                                      <Line 
                                        type="monotone" 
                                        dataKey="principal" 
                                        name="Principal Payment" 
                                        stroke="#10b981" 
                                        strokeDasharray="5 5"
                                      />
                                      <Line 
                                        type="monotone" 
                                        dataKey="interest" 
                                        name="Interest Payment" 
                                        stroke="#ef4444" 
                                        strokeDasharray="3 3"
                                      />
                                    </RechartsLineChart>
                                  </ResponsiveContainer>
                                </div>
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                  <div className="flex items-start">
                                    <Info className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" />
                                    <p className="text-sm">
                                      Notice how the principal portion of your payment increases over time while the interest portion decreases. 
                                      {additionalPayment > 0 && ` Your additional payment of ${formatCurrency(additionalPayment)} per period helps pay down the principal faster, reducing the overall interest paid.`}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </>
                )}
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
