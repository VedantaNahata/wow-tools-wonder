
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate || !targetDate) {
      alert("Please enter both dates");
      return;
    }

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
      alert("Birth date cannot be after target date");
      return;
    }

    const diffTime = target.getTime() - birth.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    // More precise calculation
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
      totalDays: diffDays,
      totalWeeks: diffWeeks,
      totalMonths: diffMonths,
      totalYears: diffYears,
      hours: diffDays * 24,
      minutes: diffDays * 24 * 60
    });
  };

  const faqs = [
    {
      question: "How is age calculated?",
      answer: "Age is calculated by finding the difference between two dates, accounting for leap years and varying month lengths for precise results."
    },
    {
      question: "Can I calculate age at a specific future date?",
      answer: "Yes! You can set any target date to see how old someone will be on that date."
    }
  ];

  return (
    <SEOWrapper
      title="Age Calculator - Calculate Age in Years, Months, Days"
      description="Calculate exact age in years, months, days, hours, and minutes between any two dates with precise calculations."
      keywords="age calculator, date calculator, birth date calculator, age in days, age in years"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Age Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate exact age in years, months, days, and more between any two dates.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Age Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Calculate Age On</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={calculateAge} className="w-full">
                  Calculate Age
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">Exact Age</h3>
                      <p className="text-3xl font-bold">
                        {result.years} years, {result.months} months, {result.days} days
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-blue-600">{result.totalYears}</p>
                          <p className="text-sm text-muted-foreground">Total Years</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-green-600">{result.totalMonths}</p>
                          <p className="text-sm text-muted-foreground">Total Months</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-purple-600">{result.totalWeeks}</p>
                          <p className="text-sm text-muted-foreground">Total Weeks</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-2xl font-bold text-orange-600">{result.totalDays}</p>
                          <p className="text-sm text-muted-foreground">Total Days</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-xl font-bold text-red-600">{result.hours.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Hours</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-xl font-bold text-indigo-600">{result.minutes.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Minutes</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Age Calculator" faqs={faqs} />
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

export default AgeCalculator;
