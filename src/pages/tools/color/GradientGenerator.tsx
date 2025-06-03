
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [direction, setDirection] = useState("to right");
  const [angle, setAngle] = useState([45]);
  const [gradientType, setGradientType] = useState("linear");

  const generateGradientCSS = () => {
    if (gradientType === "linear") {
      if (direction === "custom") {
        return `linear-gradient(${angle[0]}deg, ${color1}, ${color2})`;
      }
      return `linear-gradient(${direction}, ${color1}, ${color2})`;
    } else {
      return `radial-gradient(circle, ${color1}, ${color2})`;
    }
  };

  const copyCSS = () => {
    const css = `background: ${generateGradientCSS()};`;
    navigator.clipboard.writeText(css);
    toast.success("CSS copied to clipboard!");
  };

  const faqs = [
    {
      question: "How do I use the generated gradient in my CSS?",
      answer: "Copy the generated CSS code and paste it into your stylesheet. Apply it to any element using the background property."
    },
    {
      question: "What's the difference between linear and radial gradients?",
      answer: "Linear gradients create a smooth transition in a straight line, while radial gradients create a circular transition from the center outward."
    },
    {
      question: "Can I create gradients with more than two colors?",
      answer: "Yes! You can manually edit the generated CSS to add more color stops. For example: linear-gradient(to right, red, yellow, blue)"
    }
  ];

  return (
    <SEOWrapper
      title="CSS Gradient Generator - Create Linear & Radial Gradients"
      description="Create beautiful CSS gradients with our gradient generator. Adjust colors, direction, and type to generate custom CSS code."
      keywords="gradient generator, CSS gradient, linear gradient, radial gradient, gradient maker, CSS background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Gradient Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create linear/radial gradients, adjust direction & colors, and copy CSS code.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Gradient Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="color1">Color 1</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="color1"
                          value={color1}
                          onChange={(e) => setColor1(e.target.value)}
                          className="w-16 h-10 p-1 rounded"
                        />
                        <Input
                          type="text"
                          value={color1}
                          onChange={(e) => setColor1(e.target.value)}
                          placeholder="#ff0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color2">Color 2</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="color2"
                          value={color2}
                          onChange={(e) => setColor2(e.target.value)}
                          className="w-16 h-10 p-1 rounded"
                        />
                        <Input
                          type="text"
                          value={color2}
                          onChange={(e) => setColor2(e.target.value)}
                          placeholder="#0000ff"
                        />
                      </div>
                    </div>
                  </div>

                  {gradientType === "linear" && (
                    <div className="space-y-2">
                      <Label>Direction</Label>
                      <Select value={direction} onValueChange={setDirection}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="to right">To Right</SelectItem>
                          <SelectItem value="to left">To Left</SelectItem>
                          <SelectItem value="to bottom">To Bottom</SelectItem>
                          <SelectItem value="to top">To Top</SelectItem>
                          <SelectItem value="to bottom right">To Bottom Right</SelectItem>
                          <SelectItem value="to bottom left">To Bottom Left</SelectItem>
                          <SelectItem value="custom">Custom Angle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {direction === "custom" && gradientType === "linear" && (
                    <div className="space-y-2">
                      <Label>Angle: {angle[0]}°</Label>
                      <Slider
                        value={angle}
                        onValueChange={setAngle}
                        max={360}
                        min={0}
                        step={1}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview & CSS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div
                      className="w-full h-32 rounded-lg border"
                      style={{ background: generateGradientCSS() }}
                    ></div>
                  </div>

                  <div className="space-y-2">
                    <Label>CSS Code</Label>
                    <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                      background: {generateGradientCSS()};
                    </div>
                    <Button onClick={copyCSS} className="w-full">
                      Copy CSS Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

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
