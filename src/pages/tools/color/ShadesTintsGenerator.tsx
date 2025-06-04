
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ShadesTintsGenerator = () => {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [shades, setShades] = useState<string[]>([]);
  const [tints, setTints] = useState<string[]>([]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const generateShades = (color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return [];
    
    const shades = [];
    for (let i = 1; i <= 9; i++) {
      const factor = i / 10;
      const r = Math.round(rgb.r * (1 - factor));
      const g = Math.round(rgb.g * (1 - factor));
      const b = Math.round(rgb.b * (1 - factor));
      shades.push(rgbToHex(r, g, b));
    }
    return shades;
  };

  const generateTints = (color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return [];
    
    const tints = [];
    for (let i = 1; i <= 9; i++) {
      const factor = i / 10;
      const r = Math.round(rgb.r + (255 - rgb.r) * factor);
      const g = Math.round(rgb.g + (255 - rgb.g) * factor);
      const b = Math.round(rgb.b + (255 - rgb.b) * factor);
      tints.push(rgbToHex(r, g, b));
    }
    return tints;
  };

  const generateShadesAndTints = () => {
    setShades(generateShades(baseColor));
    setTints(generateTints(baseColor));
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  const faqs = [
    {
      question: "What's the difference between shades and tints?",
      answer: "Shades are created by adding black to a color (making it darker), while tints are created by adding white to a color (making it lighter)."
    },
    {
      question: "How can I use shades and tints in design?",
      answer: "Shades and tints are perfect for creating depth, hierarchy, and visual interest in your designs while maintaining color harmony."
    }
  ];

  return (
    <SEOWrapper
      title="Shades & Tints Generator - Create Color Variations"
      description="Generate shades and tints of any color. Create darker and lighter variations for your design projects with precise color control."
      keywords="color shades, color tints, color variations, color lightness, color darkness, color generator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shades & Tints Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate beautiful shades and tints from any base color for your design projects.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Shades & Tints Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="baseColor">Base Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="baseColor"
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        placeholder="#3b82f6"
                      />
                      <input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                    </div>
                  </div>
                  <Button onClick={generateShadesAndTints}>
                    Generate
                  </Button>
                </div>

                {(shades.length > 0 || tints.length > 0) && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Base Color</h3>
                      <Card className="cursor-pointer hover:shadow-lg transition-all w-32" onClick={() => copyToClipboard(baseColor)}>
                        <CardContent className="p-4">
                          <div 
                            className="w-full h-20 rounded-lg mb-2 border"
                            style={{ backgroundColor: baseColor }}
                          ></div>
                          <p className="text-center font-mono text-xs">{baseColor.toUpperCase()}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Tints (Lighter)</h3>
                      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                        {tints.map((color, index) => (
                          <Card key={index} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => copyToClipboard(color)}>
                            <CardContent className="p-2">
                              <div 
                                className="w-full h-16 rounded mb-1 border"
                                style={{ backgroundColor: color }}
                              ></div>
                              <p className="text-center font-mono text-xs">{color.toUpperCase()}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Shades (Darker)</h3>
                      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                        {shades.map((color, index) => (
                          <Card key={index} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => copyToClipboard(color)}>
                            <CardContent className="p-2">
                              <div 
                                className="w-full h-16 rounded mb-1 border"
                                style={{ backgroundColor: color }}
                              ></div>
                              <p className="text-center font-mono text-xs">{color.toUpperCase()}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Shades & Tints Generator" faqs={faqs} />
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

export default ShadesTintsGenerator;
