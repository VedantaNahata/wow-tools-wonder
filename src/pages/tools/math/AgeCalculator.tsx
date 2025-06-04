
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
  const [ageData, setAgeData] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
      alert("Birth date cannot be in the future!");
      return;
    }

    // Calculate exact age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const daysInLastMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += daysInLastMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time lived
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate zodiac sign
    const zodiacSigns = [
      { name: "Capricorn", start: [12, 22], end: [1, 19] },
      { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] },
      { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] },
      { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", start: [11, 22], end: [12, 21] }
    ];

    const birthMonth = birth.getMonth() + 1;
    const birthDay = birth.getDate();
    
    let zodiacSign = "Capricorn"; // default
    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (
        (birthMonth === startMonth && birthDay >= startDay) ||
        (birthMonth === endMonth && birthDay <= endDay) ||
        (startMonth > endMonth && (birthMonth === startMonth || birthMonth === endMonth))
      ) {
        zodiacSign = sign.name;
        break;
      }
    }

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      zodiacSign,
      birthDayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' })
    });
  };

  const faqs = [
    {
      question: "How accurate is the age calculation?",
      answer: "The calculator provides exact age calculations down to days, accounting for leap years and varying month lengths."
    },
    {
      question: "Can I calculate age as of a specific date?",
      answer: "Yes! You can set any target date to calculate age as of that specific date, not just today."
    },
    {
      question: "What additional information does the tool provide?",
      answer: "Beyond basic age, it shows total time lived in various units, days until next birthday, zodiac sign, and birth day of week."
    }
  ];

  return (
    <SEOWrapper
      title="Age Calculator - Calculate Your Exact Age"
      description="Calculate your exact age in years, months, days, hours, and minutes. Find out how many days you've been alive and more fun facts."
      keywords="age calculator, calculate age, age in days, age in months, birthday calculator, zodiac sign"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Age Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your exact age and discover interesting facts about your time on Earth.
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
                    <Label htmlFor="targetDate">Calculate Age As Of</Label>
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

                {ageData && (
                  <div className="space-y-6">
                    {/* Main Age Display */}
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">Your Age</h3>
                      <p className="text-3xl font-bold">
                        {ageData.years} years, {ageData.months} months, {ageData.days} days
                      </p>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{ageData.totalDays.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Days</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{ageData.totalWeeks.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Weeks</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{ageData.totalMonths}</p>
                        <p className="text-sm text-muted-foreground">Total Months</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{ageData.totalHours.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                      </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Time Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Minutes:</span>
                            <span className="font-mono">{ageData.totalMinutes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Seconds:</span>
                            <span className="font-mono">{ageData.totalSeconds.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Days to next birthday:</span>
                            <span className="font-mono">{ageData.daysToNextBirthday}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Birth Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Day of week:</span>
                            <span className="font-semibold">{ageData.birthDayOfWeek}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zodiac sign:</span>
                            <span className="font-semibold">{ageData.zodiacSign}</span>
                          </div>
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
