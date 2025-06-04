
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const RandomColorGenerator = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [colorCount, setColorCount] = useState("6");

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const generateColors = () => {
    const count = parseInt(colorCount) || 6;
    const newColors = Array.from({ length: count }, generateRandomColor);
    setColors(newColors);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  const faqs = [
    {
      question: "How are random colors generated?",
      answer: "Random colors are generated using JavaScript's Math.random() function to create random hexadecimal values for RGB components."
    },
    {
      question: "Can I generate specific types of colors?",
      answer: "This tool generates completely random colors. For specific color schemes, try our Color Palette Generator tool."
    }
  ];

  return (
    <SEOWrapper
      title="Random Color Generator - Generate Random Hex Colors"
      description="Generate random colors instantly with HEX codes. Perfect for design inspiration, testing, and creative projects."
      keywords="random color generator, random hex colors, color inspiration, random color picker"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Random Color Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate random colors instantly for design inspiration and creative projects.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Random Color Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="colorCount">Number of Colors</Label>
                    <Input
                      id="colorCount"
                      type="number"
                      value={colorCount}
                      onChange={(e) => setColorCount(e.target.value)}
                      min="1"
                      max="20"
                      className="w-32"
                    />
                  </div>
                  <Button onClick={generateColors}>
                    Generate Random Colors
                  </Button>
                </div>

                {colors.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {colors.map((color, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => copyToClipboard(color)}>
                        <CardContent className="p-4">
                          <div 
                            className="w-full h-20 rounded-lg mb-2 border"
                            style={{ backgroundColor: color }}
                          ></div>
                          <p className="text-center font-mono text-sm">{color.toUpperCase()}</p>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            Copy
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {colors.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                    <p className="text-muted-foreground">Click "Generate Random Colors" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Random Color Generator" faqs={faqs} />
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

export default RandomColorGenerator;
