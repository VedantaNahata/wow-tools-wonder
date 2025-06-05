
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const RandomColorGenerator = () => {
  const [currentColor, setCurrentColor] = useState("#3B82F6");
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const generateRandomColor = () => {
    const color = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setCurrentColor(color);
    setColorHistory(prev => [color, ...prev.slice(0, 9)]);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const faqs = [
    {
      question: "How random are the colors?",
      answer: "Colors are generated using JavaScript's Math.random() function, creating truly random RGB values for maximum variety."
    },
    {
      question: "Can I save colors I like?",
      answer: "Click any color in the history to copy it to your clipboard for use in your projects."
    }
  ];

  return (
    <SEOWrapper
      title="Random Color Generator - Generate Random Colors"
      description="Generate completely random colors with previews and HEX codes. Perfect for design inspiration and creative projects."
      keywords="random color generator, random color, color inspiration, hex color generator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Random Color Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click to get completely random colors with previews and HEX codes for instant inspiration.
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
                <div className="text-center space-y-4">
                  <div 
                    className="w-full h-48 rounded-lg border mx-auto cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: currentColor }}
                    onClick={() => copyColor(currentColor)}
                  />
                  
                  <div className="space-y-2">
                    <p className="text-3xl font-bold font-mono">{currentColor.toUpperCase()}</p>
                    <p className="text-muted-foreground">Click the color box to copy</p>
                  </div>

                  <Button onClick={generateRandomColor} size="lg" className="text-lg px-8 py-3">
                    Generate Random Color
                  </Button>
                </div>

                {colorHistory.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Color History</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {colorHistory.map((color, index) => (
                        <div key={index} className="space-y-2">
                          <div
                            className="w-full h-16 rounded border cursor-pointer hover:scale-105 transition-transform"
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
