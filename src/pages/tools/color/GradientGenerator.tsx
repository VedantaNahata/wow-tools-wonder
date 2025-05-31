
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Palette, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#ff6b6b");
  const [color2, setColor2] = useState("#4ecdc4");
  const [direction, setDirection] = useState("to right");
  const [type, setType] = useState("linear");
  const { toast } = useToast();

  const generateGradient = () => {
    if (type === "linear") {
      return `linear-gradient(${direction}, ${color1}, ${color2})`;
    } else {
      return `radial-gradient(circle, ${color1}, ${color2})`;
    }
  };

  const copyCSS = () => {
    const css = `background: ${generateGradient()};`;
    navigator.clipboard.writeText(css);
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard",
    });
  };

  const faqs = [
    {
      question: "What are CSS gradients?",
      answer: "CSS gradients are smooth transitions between two or more colors. They can be linear (in a straight line) or radial (circular)."
    },
    {
      question: "How do I use the generated CSS?",
      answer: "Copy the CSS code and paste it into your stylesheet. Apply it to any element using the background property."
    },
    {
      question: "What's the difference between linear and radial gradients?",
      answer: "Linear gradients transition colors in a straight line, while radial gradients transition colors in a circular pattern from the center outward."
    }
  ];

  return (
    <SEOWrapper
      title="CSS Gradient Generator - Create Linear & Radial Gradients"
      description="Generate beautiful CSS gradients with live preview. Create linear and radial gradients, customize colors and direction, and copy CSS code."
      keywords="css gradient generator, linear gradient, radial gradient, css background, web design"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Gradient Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful CSS gradients with live preview and copy the code instantly.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type">Gradient Type</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="radial">Radial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {type === "linear" && (
                      <div>
                        <Label htmlFor="direction">Direction</Label>
                        <Select value={direction} onValueChange={setDirection}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="to right">To Right</SelectItem>
                            <SelectItem value="to left">To Left</SelectItem>
                            <SelectItem value="to bottom">To Bottom</SelectItem>
                            <SelectItem value="to top">To Top</SelectItem>
                            <SelectItem value="45deg">45 Degrees</SelectItem>
                            <SelectItem value="90deg">90 Degrees</SelectItem>
                            <SelectItem value="135deg">135 Degrees</SelectItem>
                            <SelectItem value="180deg">180 Degrees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="color1">First Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={color1}
                          onChange={(e) => setColor1(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={color1}
                          onChange={(e) => setColor1(e.target.value)}
                          placeholder="#ff6b6b"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="color2">Second Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={color2}
                          onChange={(e) => setColor2(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={color2}
                          onChange={(e) => setColor2(e.target.value)}
                          placeholder="#4ecdc4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Preview</Label>
                      <div
                        className="w-full h-48 rounded-lg border"
                        style={{ background: generateGradient() }}
                      />
                    </div>

                    <div>
                      <Label>CSS Code</Label>
                      <div className="relative">
                        <Input
                          value={`background: ${generateGradient()};`}
                          readOnly
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={copyCSS}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
