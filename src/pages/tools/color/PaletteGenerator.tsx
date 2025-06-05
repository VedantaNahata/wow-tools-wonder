
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [paletteType, setPaletteType] = useState("complementary");
  const [palette, setPalette] = useState<string[]>([]);

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

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

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const generatePalette = () => {
    const hsl = hexToHsl(baseColor);
    const colors = [baseColor];

    switch (paletteType) {
      case "complementary":
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s * 0.7, Math.min(hsl.l + 20, 90)));
        colors.push(hslToHex(hsl.h, hsl.s * 0.7, Math.max(hsl.l - 20, 10)));
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s * 0.7, hsl.l));
        break;
      case "triadic":
        colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        colors.push(hslToHex(hsl.h, hsl.s * 0.5, Math.min(hsl.l + 30, 90)));
        colors.push(hslToHex(hsl.h, hsl.s * 0.5, Math.max(hsl.l - 30, 10)));
        break;
      case "analogous":
        colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h - 60 + 360) % 360, hsl.s, hsl.l));
        break;
      case "monochromatic":
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 90)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 10)));
        colors.push(hslToHex(hsl.h, Math.min(hsl.s + 20, 100), hsl.l));
        colors.push(hslToHex(hsl.h, Math.max(hsl.s - 20, 0), hsl.l));
        break;
    }

    setPalette(colors);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const faqs = [
    {
      question: "What are the different palette types?",
      answer: "Complementary uses opposite colors, triadic uses three evenly spaced colors, analogous uses adjacent colors, and monochromatic uses variations of one color."
    },
    {
      question: "How do I use these color palettes?",
      answer: "These palettes are great for web design, branding, and art projects. Click any color to copy its hex code."
    }
  ];

  return (
    <SEOWrapper
      title="Color Palette Generator - Create Harmonious Color Schemes"
      description="Generate beautiful color palettes from a base color. Create complementary, triadic, analogous, and monochromatic color schemes."
      keywords="color palette generator, color scheme, complementary colors, triadic colors, color harmony"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Palette Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter a base color and auto-generate harmonious color palettes for your designs.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Palette Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
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

                  <div className="space-y-2">
                    <Label>Palette Type</Label>
                    <Select value={paletteType} onValueChange={setPaletteType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complementary">Complementary</SelectItem>
                        <SelectItem value="triadic">Triadic</SelectItem>
                        <SelectItem value="analogous">Analogous</SelectItem>
                        <SelectItem value="monochromatic">Monochromatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={generatePalette} className="w-full">
                      Generate Palette
                    </Button>
                  </div>
                </div>

                {palette.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Generated Palette</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {palette.map((color, index) => (
                        <div key={index} className="space-y-2">
                          <div
                            className="w-full h-24 rounded border cursor-pointer hover:scale-105 transition-transform"
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
              <ToolFAQ toolName="Color Palette Generator" faqs={faqs} />
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

export default PaletteGenerator;
