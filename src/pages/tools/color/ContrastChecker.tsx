
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const ContrastChecker = () => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [contrastRatio, setContrastRatio] = useState(0);

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

  const calculateContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  };

  useEffect(() => {
    const ratio = calculateContrastRatio(backgroundColor, textColor);
    setContrastRatio(ratio);
  }, [backgroundColor, textColor]);

  const getWCAGRating = (ratio: number) => {
    if (ratio >= 7) return { level: "AAA", normal: true, large: true };
    if (ratio >= 4.5) return { level: "AA", normal: true, large: true };
    if (ratio >= 3) return { level: "AA Large", normal: false, large: true };
    return { level: "Fail", normal: false, large: false };
  };

  const rating = getWCAGRating(contrastRatio);

  const faqs = [
    {
      question: "What is color contrast ratio?",
      answer: "Color contrast ratio measures the difference in brightness between two colors. It's expressed as a ratio from 1:1 (no contrast) to 21:1 (maximum contrast)."
    },
    {
      question: "What are WCAG standards?",
      answer: "WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios: 4.5:1 for normal text (AA), 3:1 for large text (AA), and 7:1 for enhanced contrast (AAA)."
    },
    {
      question: "Why is contrast important?",
      answer: "Good contrast ensures text is readable for everyone, including people with visual impairments, color blindness, or when viewing in bright light conditions."
    }
  ];

  return (
    <SEOWrapper
      title="Color Contrast Checker - WCAG Accessibility Compliance"
      description="Check color contrast ratios for accessibility compliance. Ensure your text meets WCAG AA and AAA standards for better readability."
      keywords="color contrast checker, accessibility, WCAG compliance, color accessibility, text readability"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Contrast Checker
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check color contrast ratios for accessibility and WCAG compliance.
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
                    <div>
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="textColor">Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Contrast Ratio</Label>
                      <div className="text-2xl font-bold">
                        {contrastRatio.toFixed(2)}:1
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>WCAG Compliance</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {rating.normal ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span>Normal Text (14pt)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {rating.large ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span>Large Text (18pt+)</span>
                        </div>
                      </div>
                      <Badge 
                        variant={rating.level === "Fail" ? "destructive" : "default"}
                        className="mt-2"
                      >
                        {rating.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Preview</Label>
                      <div
                        className="w-full h-48 rounded-lg border p-6 flex flex-col justify-center items-center"
                        style={{ 
                          backgroundColor: backgroundColor,
                          color: textColor 
                        }}
                      >
                        <h3 className="text-xl font-bold mb-2">Sample Heading</h3>
                        <p className="text-base mb-4">This is normal text (14pt)</p>
                        <p className="text-lg">This is large text (18pt+)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="font-semibold">WCAG AA:</div>
                        <div>Normal: 4.5:1</div>
                        <div>Large: 3:1</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold">WCAG AAA:</div>
                        <div>Normal: 7:1</div>
                        <div>Large: 4.5:1</div>
                      </div>
                    </div>
                  </div>
                </div>
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
