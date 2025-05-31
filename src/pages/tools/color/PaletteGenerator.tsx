
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Palette, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState("#3498db");
  const [harmonyType, setHarmonyType] = useState("complementary");
  const [palette, setPalette] = useState<string[]>([]);
  const { toast } = useToast();

  const hexToHsl = (hex: string) => {
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

  const hslToHex = (h: number, s: number, l: number) => {
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

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generatePalette = () => {
    const [h, s, l] = hexToHsl(baseColor);
    let colors: string[] = [baseColor];

    switch (harmonyType) {
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
        colors.push(hslToHex((h + 120) % 360, s * 0.6, l * 1.1));
        break;
      case "analogous":
        colors.push(hslToHex((h + 30) % 360, s, l));
        colors.push(hslToHex((h - 30 + 360) % 360, s, l));
        colors.push(hslToHex((h + 60) % 360, s * 0.8, l));
        colors.push(hslToHex((h - 60 + 360) % 360, s * 0.8, l));
        break;
      case "monochromatic":
        colors.push(hslToHex(h, s, Math.min(l * 1.3, 100)));
        colors.push(hslToHex(h, s, l * 0.7));
        colors.push(hslToHex(h, s * 0.6, l));
        colors.push(hslToHex(h, s * 1.2, l * 0.5));
        break;
      case "split-complementary":
        colors.push(hslToHex((h + 150) % 360, s, l));
        colors.push(hslToHex((h + 210) % 360, s, l));
        colors.push(hslToHex(h, s * 0.7, l * 1.1));
        colors.push(hslToHex((h + 180) % 360, s * 0.5, l * 0.9));
        break;
    }

    setPalette(colors);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`,
    });
  };

  const copyAllColors = () => {
    navigator.clipboard.writeText(palette.join(", "));
    toast({
      title: "Copied!",
      description: "All colors copied to clipboard",
    });
  };

  const faqs = [
    {
      question: "What are color harmonies?",
      answer: "Color harmonies are pleasing arrangements of colors based on their relationships on the color wheel. They create balanced and visually appealing color schemes."
    },
    {
      question: "Which harmony type should I choose?",
      answer: "Complementary for high contrast, analogous for harmony, triadic for vibrant designs, monochromatic for subtle variations, and split-complementary for softer contrast."
    },
    {
      question: "How do I use these color palettes?",
      answer: "Use the base color for primary elements, complementary colors for accents, and the additional colors for backgrounds, borders, and supporting elements."
    }
  ];

  return (
    <SEOWrapper
      title="Color Palette Generator - Create Harmonious Color Schemes"
      description="Generate beautiful color palettes from any base color. Create complementary, triadic, analogous, and other color harmonies for your designs."
      keywords="color palette generator, color harmony, complementary colors, triadic colors, color scheme"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Color Palette Generator
            </h1>
          </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="baseColor">Base Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        placeholder="#3498db"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="harmony">Harmony Type</Label>
                    <Select value={harmonyType} onValueChange={setHarmonyType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complementary">Complementary</SelectItem>
                        <SelectItem value="triadic">Triadic</SelectItem>
                        <SelectItem value="analogous">Analogous</SelectItem>
                        <SelectItem value="monochromatic">Monochromatic</SelectItem>
                        <SelectItem value="split-complementary">Split Complementary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={generatePalette} className="w-full gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Generate Palette
                    </Button>
                  </div>
                </div>

                {palette.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Generated Palette</h3>
                      <Button variant="outline" size="sm" onClick={copyAllColors}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                      </Button>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      {palette.map((color, index) => (
                        <div key={index} className="space-y-2">
                          <div
                            className="w-full h-24 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                          />
                          <div className="text-center">
                            <p className="text-sm font-mono">{color}</p>
                          </div>
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
