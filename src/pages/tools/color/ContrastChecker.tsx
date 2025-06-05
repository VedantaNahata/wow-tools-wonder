
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ContrastChecker = () => {
  const [background, setBackground] = useState("#FFFFFF");
  const [text, setText] = useState("#000000");
  const [contrast, setContrast] = useState<any>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const checkContrast = () => {
    const ratio = getContrastRatio(background, text);
    
    const wcagAA = {
      normalText: ratio >= 4.5,
      largeText: ratio >= 3,
    };
    
    const wcagAAA = {
      normalText: ratio >= 7,
      largeText: ratio >= 4.5,
    };

    setContrast({
      ratio: ratio.toFixed(2),
      wcagAA,
      wcagAAA,
      grade: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail'
    });
  };

  const faqs = [
    {
      question: "What is WCAG compliance?",
      answer: "WCAG (Web Content Accessibility Guidelines) sets standards for web accessibility. AA compliance requires 4.5:1 contrast for normal text and 3:1 for large text. AAA is more strict with 7:1 and 4.5:1 respectively."
    },
    {
      question: "Why is color contrast important?",
      answer: "Good color contrast ensures that text is readable for everyone, including people with visual impairments, color blindness, or those viewing screens in bright light."
    }
  ];

  // Auto-check when colors change
  const updateBackground = (color: string) => {
    setBackground(color);
    setTimeout(() => checkContrast(), 100);
  };

  const updateText = (color: string) => {
    setText(color);
    setTimeout(() => checkContrast(), 100);
  };

  // Initial check
  if (!contrast) {
    checkContrast();
  }

  return (
    <SEOWrapper
      title="Color Contrast Checker - WCAG Compliance Tool"
      description="Check color contrast ratios for accessibility compliance. Ensure your colors meet WCAG AA and AAA standards."
      keywords="contrast checker, wcag compliance, accessibility, color accessibility, contrast ratio"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Contrast Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check color contrast ratios and get accessibility ratings for WCAG compliance.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Contrast Checker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="background">Background Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={background}
                          onChange={(e) => updateBackground(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={background}
                          onChange={(e) => updateBackground(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="text">Text Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={text}
                          onChange={(e) => updateText(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={text}
                          onChange={(e) => updateText(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div 
                      className="w-full h-32 rounded border p-4 flex items-center justify-center"
                      style={{ backgroundColor: background, color: text }}
                    >
                      <div className="text-center">
                        <p className="text-lg">Sample Text</p>
                        <p className="text-sm">How readable is this?</p>
                      </div>
                    </div>
                  </div>
                </div>

                {contrast && (
                  <div className="space-y-4">
                    <div className={`p-6 rounded-lg text-center ${
                      contrast.grade === 'AAA' ? 'bg-green-100 dark:bg-green-900/20' :
                      contrast.grade === 'AA' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      contrast.grade === 'AA Large' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                      'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      <h3 className="text-2xl font-bold mb-2">
                        Contrast Ratio: {contrast.ratio}:1
                      </h3>
                      <p className="text-lg font-semibold">
                        Grade: {contrast.grade}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">WCAG AA Compliance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Normal Text (4.5:1)</span>
                              <span className={`px-2 py-1 rounded text-sm ${
                                contrast.wcagAA.normalText ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {contrast.wcagAA.normalText ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Large Text (3:1)</span>
                              <span className={`px-2 py-1 rounded text-sm ${
                                contrast.wcagAA.largeText ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {contrast.wcagAA.largeText ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">WCAG AAA Compliance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Normal Text (7:1)</span>
                              <span className={`px-2 py-1 rounded text-sm ${
                                contrast.wcagAAA.normalText ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {contrast.wcagAAA.normalText ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Large Text (4.5:1)</span>
                              <span className={`px-2 py-1 rounded text-sm ${
                                contrast.wcagAAA.largeText ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {contrast.wcagAAA.largeText ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Contrast Checker" faqs={faqs} />
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

export default ContrastChecker;
