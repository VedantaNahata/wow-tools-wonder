
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
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [paletteType, setPaletteType] = useState("complementary");
  const [palette, setPalette] = useState<string[]>([]);

  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

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

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const generatePalette = () => {
    const [h, s, l] = hexToHsl(baseColor);
    let colors: string[] = [baseColor];

    switch (paletteType) {
      case "complementary":
        colors.push(hslToHex((h + 180) % 360, s, l));
        colors.push(hslToHex(h, s * 0.7, l * 1.2));
        colors.push(hslToHex((h + 180) % 360, s * 0.7, l * 1.2));
        colors.push(hslToHex(h, s * 0.5, l * 0.8));
        break;
      
      case "triadic":
        colors.push(hslToHex((h + 120) % 360, s, l));
        colors.push(hslToHex((h + 240) % 360, s, l));
        colors.push(hslToHex(h, s * 0.6, l * 1.1));
        colors.push(hslToHex(h, s * 0.8, l * 0.9));
        break;
      
      case "analogous":
        colors.push(hslToHex((h + 30) % 360, s, l));
        colors.push(hslToHex((h - 30 + 360) % 360, s, l));
        colors.push(hslToHex((h + 60) % 360, s * 0.8, l));
        colors.push(hslToHex((h - 60 + 360) % 360, s * 0.8, l));
        break;
      
      case "monochromatic":
        colors.push(hslToHex(h, s, Math.min(l * 1.3, 90)));
        colors.push(hslToHex(h, s, l * 0.7));
        colors.push(hslToHex(h, s * 0.6, l));
        colors.push(hslToHex(h, s * 1.2, Math.max(l * 0.5, 10)));
        break;
    }

    setPalette(colors);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  const faqs = [
    {
      question: "What are the different palette types?",
      answer: "Complementary uses opposite colors on the color wheel, Triadic uses three evenly spaced colors, Analogous uses adjacent colors, and Monochromatic uses variations of a single hue."
    },
    {
      question: "How do I use these color palettes?",
      answer: "These palettes are perfect for web design, branding, interior design, or any project where you need harmonious color combinations."
    }
  ];

  return (
    <SEOWrapper
      title="Color Palette Generator - Create Harmonious Color Schemes"
      description="Generate beautiful color palettes from any base color. Create complementary, triadic, analogous, and monochromatic color schemes."
      keywords="color palette generator, color scheme, complementary colors, triadic colors, analogous colors, color harmony"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Palette Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate harmonious color palettes from any base color using color theory principles.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                </div>

                <Button onClick={generatePalette} className="w-full">
                  Generate Palette
                </Button>

                {palette.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {palette.map((color, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => copyToClipboard(color)}>
                        <CardContent className="p-4">
                          <div 
                            className="w-full h-20 rounded-lg mb-2 border"
                            style={{ backgroundColor: color }}
                          ></div>
                          <p className="text-center font-mono text-sm">{color.toUpperCase()}</p>
                        </CardContent>
                      </Card>
                    ))}
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
