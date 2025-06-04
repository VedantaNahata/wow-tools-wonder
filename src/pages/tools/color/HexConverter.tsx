
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HexConverter = () => {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [cmyk, setCmyk] = useState({ c: 76, m: 47, y: 0, k: 4 });
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
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

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateFromHex = (hexColor: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(hexColor)) return;
    
    setHex(hexColor);
    const newRgb = hexToRgb(hexColor);
    setRgb(newRgb);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return;
    
    const newRgb = { r, g, b };
    setRgb(newRgb);
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
    setCmyk(rgbToCmyk(r, g, b));
  };

  const copyToClipboard = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${format} value copied: ${value}`,
    });
  };

  const faqs = [
    {
      question: "What color formats can I convert between?",
      answer: "This tool supports conversion between HEX, RGB, HSL, and CMYK color formats with real-time updates."
    },
    {
      question: "What is the difference between RGB and CMYK?",
      answer: "RGB is for digital displays (Red, Green, Blue), while CMYK is for printing (Cyan, Magenta, Yellow, Key/Black)."
    },
    {
      question: "How accurate are the conversions?",
      answer: "All conversions use standard color space formulas and are accurate for web and print design purposes."
    }
  ];

  return (
    <SEOWrapper
      title="Hex Color Converter - Convert Between HEX, RGB, HSL, CMYK"
      description="Convert colors between HEX, RGB, HSL, and CMYK formats. Perfect for web designers and developers with real-time conversion."
      keywords="hex converter, rgb to hex, hex to rgb, color converter, hsl converter, cmyk converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hex Color Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert colors between HEX, RGB, HSL, and CMYK formats with real-time preview.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Color Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Color Preview */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 rounded-lg border-2 border-border"
                      style={{ backgroundColor: hex }}
                    ></div>
                    <div className="flex-1">
                      <Label>Current Color</Label>
                      <p className="text-2xl font-mono">{hex}</p>
                    </div>
                  </div>

                  {/* HEX Input */}
                  <div className="space-y-2">
                    <Label htmlFor="hex-input">HEX Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="hex-input"
                        type="text"
                        value={hex}
                        onChange={(e) => updateFromHex(e.target.value)}
                        placeholder="#3B82F6"
                        className="font-mono"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(hex, "HEX")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* RGB Input */}
                  <div className="space-y-2">
                    <Label>RGB Values</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                        placeholder="R"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)}
                        placeholder="G"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)}
                        placeholder="B"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Converted Values</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* HSL */}
                  <div className="space-y-2">
                    <Label>HSL</Label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                        hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* CMYK */}
                  <div className="space-y-2">
                    <Label>CMYK</Label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                        cmyk({cmyk.c}, {cmyk.m}, {cmyk.y}, {cmyk.k})
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`, "CMYK")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* CSS Values */}
                  <div className="space-y-2">
                    <Label>CSS RGB</Label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "CSS RGB")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>CSS HSL</Label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                        hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "CSS HSL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <ToolFAQ toolName="Hex Color Converter" faqs={faqs} />
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
