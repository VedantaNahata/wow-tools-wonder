
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Calendar, Clock } from "lucide-react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
    nextBirthday: {
      date: string;
      daysUntil: number;
    };
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      setAgeResult(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const timeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalSeconds = Math.floor(timeDiff / 1000);

    // Calculate next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setAgeResult({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: {
        date: nextBirthday.toLocaleDateString(),
        daysUntil: daysUntilBirthday
      }
    });
  };

  const faqData = [
    {
      question: "How accurate is the age calculation?",
      answer: "The calculator is accurate to the day level, accounting for leap years and varying month lengths. It calculates exact age in years, months, and days."
    },
    {
      question: "Can I calculate age for a future date?",
      answer: "Yes! You can set any target date to see how old someone will be on that date, or calculate age at any point in the past."
    },
    {
      question: "What's the difference between total days and age in days?",
      answer: "Age in days is the 'days' portion after years and months. Total days is the complete number of days lived since birth."
    },
    {
      question: "How is the next birthday calculated?",
      answer: "The calculator finds the next occurrence of your birth date and counts the days remaining. It automatically handles year boundaries."
    }
  ];

  return (
    <SEOWrapper
      title="Age Calculator - Calculate Your Exact Age"
      description="Calculate your exact age in years, months, days, hours, and minutes. Find out how many days you've been alive."
      keywords="age calculator, calculate age, age in days, age in months, birthday calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Age Calculator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your exact age in years, months, days, and more.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Enter Birth Date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetDate">Calculate Age On</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={calculateAge} className="w-full" disabled={!birthDate}>
                  Calculate Age
                </Button>
              </CardContent>
            </Card>

            {ageResult && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Your Age
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{ageResult.years}</div>
                        <div className="text-blue-800">Years</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">{ageResult.months}</div>
                        <div className="text-green-800">Months</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600">{ageResult.days}</div>
                        <div className="text-purple-800">Days</div>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-lg">
                        You are <span className="font-bold">{ageResult.years} years, {ageResult.months} months, and {ageResult.days} days</span> old
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-orange-600">
                          {ageResult.totalDays.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Days</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-red-600">
                          {ageResult.totalHours.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Hours</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">
                          {ageResult.totalMinutes.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Minutes</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-pink-600">
                          {ageResult.totalSeconds.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Seconds</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Birthday</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {ageResult.nextBirthday.daysUntil} days
                      </div>
                      <p className="text-muted-foreground">
                        until your next birthday on {ageResult.nextBirthday.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>

        <ToolFAQ toolName="Age Calculator FAQ" faqs={faqData} />
      </div>
    </SEOWrapper>
  );
};

export default AgeCalculator;
