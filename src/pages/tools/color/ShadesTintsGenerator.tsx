
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ShadesTintsGenerator = () => {
  const [baseColor, setBaseColor] = useState("#3B82F6");
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
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const generateShades = (hex: string, steps: number = 5) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];

    const shades = [];
    for (let i = 1; i <= steps; i++) {
      const factor = i / (steps + 1);
      const r = rgb.r * (1 - factor);
      const g = rgb.g * (1 - factor);
      const b = rgb.b * (1 - factor);
      shades.push(rgbToHex(r, g, b));
    }
    return shades;
  };

  const generateTints = (hex: string, steps: number = 5) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];

    const tints = [];
    for (let i = 1; i <= steps; i++) {
      const factor = i / (steps + 1);
      const r = rgb.r + (255 - rgb.r) * factor;
      const g = rgb.g + (255 - rgb.g) * factor;
      const b = rgb.b + (255 - rgb.b) * factor;
      tints.push(rgbToHex(r, g, b));
    }
    return tints;
  };

  const generateVariations = () => {
    setShades(generateShades(baseColor));
    setTints(generateTints(baseColor));
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const faqs = [
    {
      question: "What's the difference between shades and tints?",
      answer: "Shades are created by adding black to a color (making it darker), while tints are created by adding white to a color (making it lighter)."
    },
    {
      question: "How can I use these variations?",
      answer: "Shades and tints are perfect for creating depth in designs, hover states, shadows, highlights, and maintaining color consistency across different elements."
    }
  ];

  // Generate initial variations
  if (shades.length === 0 && tints.length === 0) {
    generateVariations();
  }

  return (
    <SEOWrapper
      title="Shades & Tints Generator - Create Color Variations"
      description="Generate multiple lighter and darker versions of any color. Perfect for creating consistent color schemes and design systems."
      keywords="shades generator, tints generator, color variations, color palette, lighter darker colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shades & Tints Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter a color and get multiple lighter and darker versions for your design system.
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
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="baseColor">Base Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={generateVariations}>
                    Generate Variations
                  </Button>
                </div>

                {/* Base Color */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Base Color</h3>
                  <div className="flex gap-2">
                    <div
                      className="w-full h-16 rounded border cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: baseColor }}
                      onClick={() => copyColor(baseColor)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyColor(baseColor)}
                    className="font-mono"
                  >
                    {baseColor.toUpperCase()}
                  </Button>
                </div>

                {/* Tints (Lighter) */}
                {tints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Tints (Lighter)</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {tints.map((color, index) => (
                        <div key={index} className="space-y-1">
                          <div
                            className="w-full h-16 rounded border cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyColor(color)}
                            className="w-full font-mono text-xs"
                          >
                            {color}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shades (Darker) */}
                {shades.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Shades (Darker)</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {shades.map((color, index) => (
                        <div key={index} className="space-y-1">
                          <div
                            className="w-full h-16 rounded border cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyColor(color)}
                            className="w-full font-mono text-xs"
                          >
                            {color}
                          </Button>
                        </div>
                      ))}
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
