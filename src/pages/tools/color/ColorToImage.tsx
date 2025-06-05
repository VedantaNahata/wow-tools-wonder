
import { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ColorToImage = () => {
  const [color, setColor] = useState("#3B82F6");
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = parseInt(width) || 800;
    const h = parseInt(height) || 600;
    
    canvas.width = w;
    canvas.height = h;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `color-${color.replace('#', '')}-${width}x${height}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const presetSizes = [
    { label: "800x600", width: "800", height: "600" },
    { label: "1920x1080 (Full HD)", width: "1920", height: "1080" },
    { label: "1280x720 (HD)", width: "1280", height: "720" },
    { label: "500x500 (Square)", width: "500", height: "500" },
    { label: "300x300 (Small Square)", width: "300", height: "300" },
  ];

  const setPresetSize = (preset: string) => {
    const size = presetSizes.find(s => s.label === preset);
    if (size) {
      setWidth(size.width);
      setHeight(size.height);
    }
  };

  const faqs = [
    {
      question: "What formats are supported?",
      answer: "The tool generates PNG images which support transparency and high quality. PNG is perfect for solid colors and backgrounds."
    },
    {
      question: "What can I use these color images for?",
      answer: "Perfect for backgrounds, placeholders, design mockups, social media posts, or any project that needs a solid color image."
    }
  ];

  return (
    <SEOWrapper
      title="Color to Image Generator - Create Solid Color Images"
      description="Convert any color to a downloadable image. Perfect for backgrounds, placeholders, and design projects."
      keywords="color to image, solid color image, background generator, color image download"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color to Image Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert any solid color to a downloadable image for backgrounds and design projects.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Color to Image Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      min="1"
                      max="4000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      min="1"
                      max="4000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preset Sizes</Label>
                    <Select onValueChange={setPresetSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose preset" />
                      </SelectTrigger>
                      <SelectContent>
                        {presetSizes.map(size => (
                          <SelectItem key={size.label} value={size.label}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={generateImage} className="flex-1">
                      Generate Image
                    </Button>
                    <Button onClick={downloadImage} variant="outline">
                      Download PNG
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Preview ({width}×{height}px)
                    </p>
                    <div className="border rounded overflow-hidden inline-block">
                      <canvas
                        ref={canvasRef}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '300px',
                          width: 'auto',
                          height: 'auto'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Instructions:</strong></p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Choose your color using the color picker or enter a HEX code</li>
                    <li>Set your desired width and height (or use a preset)</li>
                    <li>Click "Generate Image" to create the preview</li>
                    <li>Click "Download PNG" to save the image to your device</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color to Image Generator" faqs={faqs} />
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

export default ColorToImage;
