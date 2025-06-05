
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#8B5CF6");
  const [direction, setDirection] = useState("to right");
  const [gradientType, setGradientType] = useState("linear");

  const generateGradientCSS = () => {
    if (gradientType === "linear") {
      return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateGradientCSS());
  };

  const directions = [
    { value: "to right", label: "To Right" },
    { value: "to left", label: "To Left" },
    { value: "to bottom", label: "To Bottom" },
    { value: "to top", label: "To Top" },
    { value: "45deg", label: "45° Diagonal" },
    { value: "135deg", label: "135° Diagonal" },
  ];

  const faqs = [
    {
      question: "How do I use the generated CSS?",
      answer: "Copy the CSS code and paste it into your stylesheet or style attribute to apply the gradient to any element."
    },
    {
      question: "What's the difference between linear and radial gradients?",
      answer: "Linear gradients transition colors in a straight line, while radial gradients transition from the center outward in a circular pattern."
    }
  ];

  return (
    <SEOWrapper
      title="CSS Gradient Generator - Create Linear & Radial Gradients"
      description="Create beautiful CSS gradients with live preview. Generate linear and radial gradients with custom colors and directions."
      keywords="gradient generator, css gradient, linear gradient, radial gradient, background gradient"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSS Gradient Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create linear and radial gradients with custom colors and directions, then copy the CSS code.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Gradient Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className="w-full h-48 rounded-lg border"
                  style={{ 
                    background: gradientType === "linear" 
                      ? `linear-gradient(${direction}, ${color1}, ${color2})`
                      : `radial-gradient(circle, ${color1}, ${color2})`
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Gradient Type</Label>
                    <Select value={gradientType} onValueChange={setGradientType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {gradientType === "linear" && (
                    <div className="space-y-2">
                      <Label>Direction</Label>
                      <Select value={direction} onValueChange={setDirection}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {directions.map(dir => (
                            <SelectItem key={dir.value} value={dir.value}>
                              {dir.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="color1">Start Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color2">End Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CSS Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                        <code>{generateGradientCSS()}</code>
                      </pre>
                      <Button onClick={copyCSS} className="w-full">
                        Copy CSS Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Gradient Generator" faqs={faqs} />
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

export default GradientGenerator;
