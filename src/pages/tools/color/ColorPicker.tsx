
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [colorInfo, setColorInfo] = useState<any>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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

  const updateColorInfo = (color: string) => {
    setSelectedColor(color);
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColorInfo({
        hex: color.toUpperCase(),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        rgbValues: rgb,
        hslValues: hsl
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const faqs = [
    {
      question: "What color formats are supported?",
      answer: "The color picker shows HEX, RGB, and HSL values for any selected color, making it easy to use across different design tools."
    },
    {
      question: "How can I copy color values?",
      answer: "Click on any color value to copy it to your clipboard for easy use in your projects."
    }
  ];

  // Initialize color info on first load
  if (!colorInfo) {
    updateColorInfo(selectedColor);
  }

  return (
    <SEOWrapper
      title="Color Picker Tool - Get HEX, RGB, HSL Values"
      description="Choose any color and instantly get its HEX, RGB, and HSL values. Perfect for web design and development."
      keywords="color picker, hex color, rgb color, hsl color, color codes, web colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Picker Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose any color and get its HEX, RGB, and HSL values instantly for your projects.
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
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="colorPicker">Select Color</Label>
                      <div className="flex gap-2">
                        <input
                          id="colorPicker"
                          type="color"
                          value={selectedColor}
                          onChange={(e) => updateColorInfo(e.target.value)}
                          className="w-20 h-12 rounded border border-border cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={selectedColor}
                          onChange={(e) => updateColorInfo(e.target.value)}
                          placeholder="#3B82F6"
                        />
                      </div>
                    </div>

                    <div 
                      className="w-full h-32 rounded-lg border"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>

                  {colorInfo && (
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label>HEX Code</Label>
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(colorInfo.hex)}
                          className="w-full justify-start font-mono"
                        >
                          {colorInfo.hex}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>RGB Value</Label>
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(colorInfo.rgb)}
                          className="w-full justify-start font-mono"
                        >
                          {colorInfo.rgb}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>HSL Value</Label>
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(colorInfo.hsl)}
                          className="w-full justify-start font-mono"
                        >
                          {colorInfo.hsl}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {colorInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">RGB Values</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p>Red: {colorInfo.rgbValues.r}</p>
                          <p>Green: {colorInfo.rgbValues.g}</p>
                          <p>Blue: {colorInfo.rgbValues.b}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">HSL Values</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p>Hue: {colorInfo.hslValues.h}°</p>
                          <p>Saturation: {colorInfo.hslValues.s}%</p>
                          <p>Lightness: {colorInfo.hslValues.l}%</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Copy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => copyToClipboard(colorInfo.hex)}
                            className="w-full"
                          >
                            Copy HEX
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => copyToClipboard(colorInfo.rgb)}
                            className="w-full"
                          >
                            Copy RGB
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => copyToClipboard(colorInfo.hsl)}
                            className="w-full"
                          >
                            Copy HSL
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
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
