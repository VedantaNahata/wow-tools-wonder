
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Shuffle, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RandomGenerator = () => {
  const [currentColor, setCurrentColor] = useState("#3498db");
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    setColorHistory(prev => [currentColor, ...prev.slice(0, 11)]);
    setCurrentColor(color);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`,
    });
  };

  const rgb = hexToRgb(currentColor);
  const hsl = hexToHsl(currentColor);

  const faqs = [
    {
      question: "How are random colors generated?",
      answer: "Colors are generated using JavaScript's Math.random() function to create random hexadecimal values for red, green, and blue components."
    },
    {
      question: "Can I use these colors commercially?",
      answer: "Yes, these are just color values and can be used freely in any project without restrictions."
    },
    {
      question: "How do I save colors I like?",
      answer: "Click on any color (current or from history) to copy it to your clipboard. You can then paste it wherever you need it."
    }
  ];

  return (
    <SEOWrapper
      title="Random Color Generator - Generate Random Colors Instantly"
      description="Generate random colors with HEX, RGB, and HSL values. Get instant color inspiration for your designs with our random color generator."
      keywords="random color generator, color inspiration, hex colors, rgb colors, random palette"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Shuffle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Random Color Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate random colors instantly and get inspiration for your next design project.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Random Color Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button 
                    onClick={generateRandomColor} 
                    size="lg" 
                    className="gap-2 mb-6"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Generate Random Color
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Current Color</h3>
                      <div
                        className="w-full h-48 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: currentColor }}
                        onClick={() => copyColor(currentColor)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Color Values</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-semibold">HEX</div>
                          <div className="font-mono">{currentColor}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyColor(currentColor)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      {rgb && (
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-semibold">RGB</div>
                            <div className="font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {hsl && (
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-semibold">HSL</div>
                            <div className="font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {colorHistory.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Color History</h3>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                      {colorHistory.map((color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg border cursor-pointer hover:scale-110 transition-transform relative group"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                        >
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Copy className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Random Color Generator" faqs={faqs} />
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

export default RandomGenerator;
