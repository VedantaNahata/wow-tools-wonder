
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Palette, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HexConverter = () => {
  const [hexValue, setHexValue] = useState("#3498db");
  const [rgbR, setRgbR] = useState("52");
  const [rgbG, setRgbG] = useState("152");
  const [rgbB, setRgbB] = useState("219");
  const [hslH, setHslH] = useState("204");
  const [hslS, setHslS] = useState("70");
  const [hslL, setHslL] = useState("53");
  const { toast } = useToast();

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
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const hslToRgb = (h: number, s: number, l: number) => {
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

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

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

  const updateFromHex = (hex: string) => {
    setHexValue(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbR(rgb.r.toString());
      setRgbG(rgb.g.toString());
      setRgbB(rgb.b.toString());
      
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslH(hsl.h.toString());
      setHslS(hsl.s.toString());
      setHslL(hsl.l.toString());
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgbR(r.toString());
    setRgbG(g.toString());
    setRgbB(b.toString());
    
    const hex = rgbToHex(r, g, b);
    setHexValue(hex);
    
    const hsl = rgbToHsl(r, g, b);
    setHslH(hsl.h.toString());
    setHslS(hsl.s.toString());
    setHslL(hsl.l.toString());
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHslH(h.toString());
    setHslS(s.toString());
    setHslL(l.toString());
    
    const rgb = hslToRgb(h, s, l);
    setRgbR(rgb.r.toString());
    setRgbG(rgb.g.toString());
    setRgbB(rgb.b.toString());
    
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexValue(hex);
  };

  const copyValue = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const generateRandomColor = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    updateFromHex(randomHex);
  };

  const currentColor = hexValue;

  const faqs = [
    {
      question: "What's the difference between HEX, RGB, and HSL?",
      answer: "HEX uses hexadecimal notation (#RRGGBB), RGB uses decimal values (0-255), and HSL uses hue (0-360°), saturation (0-100%), and lightness (0-100%)."
    },
    {
      question: "When should I use each color format?",
      answer: "HEX is great for CSS and web design, RGB for image editing and printing, and HSL for intuitive color adjustments and animations."
    },
    {
      question: "Are the conversions accurate?",
      answer: "Yes, all conversions use standard mathematical formulas and are accurate. Some rounding may occur for display purposes."
    }
  ];

  return (
    <SEOWrapper
      title="HEX ↔ RGB ↔ HSL Color Converter with Live Preview"
      description="Convert colors between HEX, RGB, and HSL formats with live preview. Perfect tool for web developers and designers."
      keywords="hex to rgb, rgb to hex, hsl converter, color format converter, color conversion tool"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              HEX ↔ RGB ↔ HSL Converter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between HEX, RGB, and HSL color formats with live preview.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Color Converter
                  <Button variant="outline" size="sm" onClick={generateRandomColor}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Random
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Label>Color Preview</Label>
                  <div
                    className="w-full h-32 rounded-lg border mt-2 mx-auto"
                    style={{ backgroundColor: currentColor }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hex">HEX Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={hexValue}
                          onChange={(e) => updateFromHex(e.target.value)}
                          className="w-16 h-10"
                        />
                        <div className="flex-1 relative">
                          <Input
                            id="hex"
                            type="text"
                            value={hexValue}
                            onChange={(e) => updateFromHex(e.target.value)}
                            placeholder="#3498db"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => copyValue(hexValue, "HEX color")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>RGB Color</Label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            value={rgbR}
                            onChange={(e) => {
                              const r = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                              updateFromRgb(r, parseInt(rgbG), parseInt(rgbB));
                            }}
                            placeholder="R"
                            min="0"
                            max="255"
                          />
                          <Input
                            type="number"
                            value={rgbG}
                            onChange={(e) => {
                              const g = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                              updateFromRgb(parseInt(rgbR), g, parseInt(rgbB));
                            }}
                            placeholder="G"
                            min="0"
                            max="255"
                          />
                          <Input
                            type="number"
                            value={rgbB}
                            onChange={(e) => {
                              const b = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                              updateFromRgb(parseInt(rgbR), parseInt(rgbG), b);
                            }}
                            placeholder="B"
                            min="0"
                            max="255"
                          />
                        </div>
                        <div className="relative">
                          <Input
                            value={`rgb(${rgbR}, ${rgbG}, ${rgbB})`}
                            readOnly
                            className="pr-12"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => copyValue(`rgb(${rgbR}, ${rgbG}, ${rgbB})`, "RGB color")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>HSL Color</Label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            value={hslH}
                            onChange={(e) => {
                              const h = Math.max(0, Math.min(360, parseInt(e.target.value) || 0));
                              updateFromHsl(h, parseInt(hslS), parseInt(hslL));
                            }}
                            placeholder="H"
                            min="0"
                            max="360"
                          />
                          <Input
                            type="number"
                            value={hslS}
                            onChange={(e) => {
                              const s = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                              updateFromHsl(parseInt(hslH), s, parseInt(hslL));
                            }}
                            placeholder="S"
                            min="0"
                            max="100"
                          />
                          <Input
                            type="number"
                            value={hslL}
                            onChange={(e) => {
                              const l = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                              updateFromHsl(parseInt(hslH), parseInt(hslS), l);
                            }}
                            placeholder="L"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div className="relative">
                          <Input
                            value={`hsl(${hslH}, ${hslS}%, ${hslL}%)`}
                            readOnly
                            className="pr-12"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => copyValue(`hsl(${hslH}, ${hslS}%, ${hslL}%)`, "HSL color")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Modify any value above to see real-time conversion across all formats
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color Converter" faqs={faqs} />
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

export default HexConverter;
