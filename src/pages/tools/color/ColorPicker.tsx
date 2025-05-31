
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Palette, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("#3498db");
  const { toast } = useToast();

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

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const rgb = hexToRgb(selectedColor);
  const hsl = hexToHsl(selectedColor);

  const presetColors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57",
    "#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43",
    "#EE5A24", "#0ABDE3", "#10AC84", "#F79F1F", "#A3CB38",
    "#FDA7DF", "#D63031", "#74B9FF", "#00B894", "#FDCB6E"
  ];

  const faqs = [
    {
      question: "What color formats does this tool support?",
      answer: "The color picker provides values in HEX, RGB, and HSL formats, which are the most commonly used color formats in web development and design."
    },
    {
      question: "How do I use these color values?",
      answer: "Copy any color value and use it in your CSS, design software, or any application that accepts color codes. Each format has different use cases."
    },
    {
      question: "What's the difference between color formats?",
      answer: "HEX is compact and widely used, RGB represents red/green/blue values (0-255), and HSL represents hue/saturation/lightness which is more intuitive for color adjustments."
    }
  ];

  return (
    <SEOWrapper
      title="Color Picker - Pick Colors and Get HEX, RGB, HSL Values"
      description="Advanced color picker tool to select colors and get HEX, RGB, and HSL values instantly. Perfect for web developers and designers."
      keywords="color picker, color selector, hex color, rgb color, hsl color, color tool"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Color Picker
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick colors and get HEX, RGB, and HSL values instantly.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Color Picker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="colorPicker">Pick a Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="colorPicker"
                          type="color"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-20 h-12 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          placeholder="#3498db"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Color Preview</Label>
                      <div
                        className="w-full h-32 rounded-lg border mt-2"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </div>

                    <div>
                      <Label>Preset Colors</Label>
                      <div className="grid grid-cols-10 gap-2 mt-2">
                        {presetColors.map((color, index) => (
                          <button
                            key={index}
                            className="w-8 h-8 rounded border-2 border-transparent hover:border-foreground transition-colors"
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Color Values</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-semibold text-sm">HEX</div>
                            <div className="font-mono text-lg">{selectedColor}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(selectedColor, "HEX color")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>

                        {rgb && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <div className="font-semibold text-sm">RGB</div>
                              <div className="font-mono text-lg">
                                rgb({rgb.r}, {rgb.g}, {rgb.b})
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB color")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {hsl && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <div className="font-semibold text-sm">HSL</div>
                              <div className="font-mono text-lg">
                                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL color")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {rgb && hsl && (
                      <div>
                        <Label>Color Information</Label>
                        <div className="space-y-2 mt-2 text-sm">
                          <div className="flex justify-between">
                            <span>Red:</span>
                            <span>{rgb.r} ({Math.round((rgb.r / 255) * 100)}%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Green:</span>
                            <span>{rgb.g} ({Math.round((rgb.g / 255) * 100)}%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Blue:</span>
                            <span>{rgb.b} ({Math.round((rgb.b / 255) * 100)}%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hue:</span>
                            <span>{hsl.h}°</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturation:</span>
                            <span>{hsl.s}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lightness:</span>
                            <span>{hsl.l}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color Picker" faqs={faqs} />
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

export default ColorPicker;
