
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Palette, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShadesTints = () => {
  const [baseColor, setBaseColor] = useState("#3498db");
  const [steps, setSteps] = useState([5]);
  const [shades, setShades] = useState<string[]>([]);
  const [tints, setTints] = useState<string[]>([]);
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
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const generateShades = (color: string, numSteps: number) => {
    const rgb = hexToRgb(color);
    if (!rgb) return [];

    const shades = [];
    for (let i = 1; i <= numSteps; i++) {
      const factor = i / (numSteps + 1);
      const r = rgb.r * (1 - factor);
      const g = rgb.g * (1 - factor);
      const b = rgb.b * (1 - factor);
      shades.push(rgbToHex(r, g, b));
    }
    return shades;
  };

  const generateTints = (color: string, numSteps: number) => {
    const rgb = hexToRgb(color);
    if (!rgb) return [];

    const tints = [];
    for (let i = 1; i <= numSteps; i++) {
      const factor = i / (numSteps + 1);
      const r = rgb.r + (255 - rgb.r) * factor;
      const g = rgb.g + (255 - rgb.g) * factor;
      const b = rgb.b + (255 - rgb.b) * factor;
      tints.push(rgbToHex(r, g, b));
    }
    return tints;
  };

  useEffect(() => {
    const numSteps = steps[0];
    setShades(generateShades(baseColor, numSteps));
    setTints(generateTints(baseColor, numSteps));
  }, [baseColor, steps]);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`,
    });
  };

  const copyAllColors = () => {
    const allColors = [...tints.reverse(), baseColor, ...shades];
    navigator.clipboard.writeText(allColors.join(", "));
    toast({
      title: "Copied!",
      description: "All colors copied to clipboard",
    });
  };

  const faqs = [
    {
      question: "What are shades and tints?",
      answer: "Shades are created by adding black to a color (making it darker), while tints are created by adding white to a color (making it lighter)."
    },
    {
      question: "How are these variations useful?",
      answer: "Shades and tints provide a cohesive color scheme for designs. Use tints for backgrounds and highlights, shades for shadows and accents."
    },
    {
      question: "How many steps should I generate?",
      answer: "3-7 steps usually provide enough variation for most design needs. More steps give finer gradations but may be overwhelming."
    }
  ];

  return (
    <SEOWrapper
      title="Shades & Tints Generator - Create Color Variations"
      description="Generate lighter and darker variations of any color. Create beautiful shades and tints for your color palette and design projects."
      keywords="color shades, color tints, color variations, lighter colors, darker colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Shades & Tints Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate lighter and darker variations of any color for your design palette.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                      <Label htmlFor="steps">Number of Steps: {steps[0]}</Label>
                      <Slider
                        value={steps}
                        onValueChange={setSteps}
                        max={10}
                        min={2}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Base Color Preview</Label>
                      <div
                        className="w-full h-24 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: baseColor }}
                        onClick={() => copyColor(baseColor)}
                      />
                      <p className="text-center text-sm font-mono mt-2">{baseColor}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Generated Variations</h3>
                    <button
                      onClick={copyAllColors}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      Copy All
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Tints (Lighter)</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {tints.slice().reverse().map((color, index) => (
                          <div key={index} className="space-y-2">
                            <div
                              className="w-full h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                              style={{ backgroundColor: color }}
                              onClick={() => copyColor(color)}
                            />
                            <p className="text-xs font-mono text-center">{color}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Base Color</h4>
                      <div className="w-full max-w-32">
                        <div
                          className="w-full h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: baseColor }}
                          onClick={() => copyColor(baseColor)}
                        />
                        <p className="text-xs font-mono text-center mt-2">{baseColor}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Shades (Darker)</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {shades.map((color, index) => (
                          <div key={index} className="space-y-2">
                            <div
                              className="w-full h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                              style={{ backgroundColor: color }}
                              onClick={() => copyColor(color)}
                            />
                            <p className="text-xs font-mono text-center">{color}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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

export default ShadesTints;
