
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ContrastChecker = () => {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

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

  const getContrastRatio = () => {
    const fg = hexToRgb(foregroundColor);
    const bg = hexToRgb(backgroundColor);
    
    if (!fg || !bg) return 0;
    
    const fgLuminance = getLuminance(fg.r, fg.g, fg.b);
    const bgLuminance = getLuminance(bg.r, bg.g, bg.b);
    
    const lightest = Math.max(fgLuminance, bgLuminance);
    const darkest = Math.min(fgLuminance, bgLuminance);
    
    return (lightest + 0.05) / (darkest + 0.05);
  };

  const contrastRatio = getContrastRatio();
  const wcagAA = contrastRatio >= 4.5;
  const wcagAALarge = contrastRatio >= 3;
  const wcagAAA = contrastRatio >= 7;

  const faqs = [
    {
      question: "What is color contrast ratio?",
      answer: "Color contrast ratio measures the difference in brightness between two colors. It's essential for accessibility and readability."
    },
    {
      question: "What are WCAG guidelines?",
      answer: "WCAG (Web Content Accessibility Guidelines) provide standards for web accessibility. AA requires 4.5:1 for normal text, AAA requires 7:1."
    }
  ];

  return (
    <SEOWrapper
      title="Color Contrast Checker - WCAG Accessibility Compliance"
      description="Check color contrast ratios for accessibility compliance with WCAG AA and AAA standards. Ensure your designs are accessible to all users."
      keywords="color contrast checker, accessibility, WCAG, color accessibility, contrast ratio"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contrast Checker Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check color contrast ratios for accessibility compliance with WCAG standards.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Foreground Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        placeholder="#000000"
                      />
                      <input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="#ffffff"
                      />
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg border" style={{ backgroundColor, color: foregroundColor }}>
                  <h3 className="text-2xl font-bold mb-2">Sample Text</h3>
                  <p className="text-lg">This is how your text will look with the selected colors.</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Contrast Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {contrastRatio.toFixed(2)}:1
                      </div>
                      <p className="text-muted-foreground">Contrast Ratio</p>
                    </div>

                    <div className="space-y-2">
                      <div className={`p-3 rounded flex justify-between items-center ${wcagAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <span>WCAG AA (Normal Text)</span>
                        <span className="font-bold">{wcagAA ? 'PASS' : 'FAIL'}</span>
                      </div>
                      <div className={`p-3 rounded flex justify-between items-center ${wcagAALarge ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <span>WCAG AA (Large Text)</span>
                        <span className="font-bold">{wcagAALarge ? 'PASS' : 'FAIL'}</span>
                      </div>
                      <div className={`p-3 rounded flex justify-between items-center ${wcagAAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <span>WCAG AAA</span>
                        <span className="font-bold">{wcagAAA ? 'PASS' : 'FAIL'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Contrast Checker Tool" faqs={faqs} />
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
