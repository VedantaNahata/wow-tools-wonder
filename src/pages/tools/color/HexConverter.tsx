
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const HexConverter = () => {
  const [hexValue, setHexValue] = useState("#3B82F6");
  const [rgbValues, setRgbValues] = useState({ r: 59, g: 130, b: 246 });
  const [hslValues, setHslValues] = useState({ h: 217, s: 91, l: 60 });
  const [activeTab, setActiveTab] = useState("hex");

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

  const updateFromHex = (hex: string) => {
    setHexValue(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbValues(rgb);
      setHslValues(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgbValues({ r, g, b });
    setHexValue(rgbToHex(r, g, b));
    setHslValues(rgbToHsl(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHslValues({ h, s, l });
    const rgb = hslToRgb(h, s, l);
    setRgbValues(rgb);
    setHexValue(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const faqs = [
    {
      question: "What's the difference between HEX, RGB, and HSL?",
      answer: "HEX uses hexadecimal notation, RGB uses red/green/blue values (0-255), and HSL uses hue/saturation/lightness which is more intuitive for color adjustments."
    },
    {
      question: "When should I use each format?",
      answer: "HEX is common in web design, RGB for digital displays, and HSL for color manipulation and design work as it's easier to adjust hue and saturation."
    }
  ];

  return (
    <SEOWrapper
      title="HEX ↔ RGB ↔ HSL Converter - Convert Color Formats"
      description="Convert between HEX, RGB, and HSL color formats with live preview. Perfect for web designers and developers."
      keywords="hex to rgb, rgb to hsl, hsl to hex, color converter, color format converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HEX ↔ RGB ↔ HSL Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between color code formats with live preview and instant conversion.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Color Format Converter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className="w-full h-32 rounded-lg border mb-6"
                  style={{ backgroundColor: hexValue }}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">HEX</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="hex">HEX Code</Label>
                        <Input
                          id="hex"
                          type="text"
                          value={hexValue}
                          onChange={(e) => updateFromHex(e.target.value)}
                          placeholder="#3B82F6"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">RGB</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="r">Red (0-255)</Label>
                          <Input
                            id="r"
                            type="number"
                            min="0"
                            max="255"
                            value={rgbValues.r}
                            onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgbValues.g, rgbValues.b)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="g">Green (0-255)</Label>
                          <Input
                            id="g"
                            type="number"
                            min="0"
                            max="255"
                            value={rgbValues.g}
                            onChange={(e) => updateFromRgb(rgbValues.r, parseInt(e.target.value) || 0, rgbValues.b)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="b">Blue (0-255)</Label>
                          <Input
                            id="b"
                            type="number"
                            min="0"
                            max="255"
                            value={rgbValues.b}
                            onChange={(e) => updateFromRgb(rgbValues.r, rgbValues.g, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">HSL</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="h">Hue (0-360)</Label>
                          <Input
                            id="h"
                            type="number"
                            min="0"
                            max="360"
                            value={hslValues.h}
                            onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hslValues.s, hslValues.l)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="s">Saturation (0-100)</Label>
                          <Input
                            id="s"
                            type="number"
                            min="0"
                            max="100"
                            value={hslValues.s}
                            onChange={(e) => updateFromHsl(hslValues.h, parseInt(e.target.value) || 0, hslValues.l)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="l">Lightness (0-100)</Label>
                          <Input
                            id="l"
                            type="number"
                            min="0"
                            max="100"
                            value={hslValues.l}
                            onChange={(e) => updateFromHsl(hslValues.h, hslValues.s, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigator.clipboard.writeText(hexValue)}
                    className="font-mono"
                  >
                    Copy HEX: {hexValue}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigator.clipboard.writeText(`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`)}
                    className="font-mono"
                  >
                    Copy RGB: rgb({rgbValues.r}, {rgbValues.g}, {rgbValues.b})
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigator.clipboard.writeText(`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`)}
                    className="font-mono"
                  >
                    Copy HSL: hsl({hslValues.h}, {hslValues.s}%, {hslValues.l}%)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color Format Converter" faqs={faqs} />
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
