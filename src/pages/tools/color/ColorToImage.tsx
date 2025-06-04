
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
  const [color, setColor] = useState("#3b82f6");
  const [width, setWidth] = useState("400");
  const [height, setHeight] = useState("300");
  const [format, setFormat] = useState("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = parseInt(width) || 400;
    const h = parseInt(height) || 300;

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    generateImage();

    const link = document.createElement('a');
    link.download = `color-${color.replace('#', '')}-${width}x${height}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  const faqs = [
    {
      question: "What image formats can I generate?",
      answer: "You can generate images in PNG, JPEG, and WebP formats. PNG is recommended for solid colors as it provides lossless compression."
    },
    {
      question: "What are the size limitations?",
      answer: "You can create images up to 4000x4000 pixels. Larger images may take longer to generate and download."
    }
  ];

  return (
    <SEOWrapper
      title="Color to Image Generator - Create Solid Color Images"
      description="Generate solid color images in PNG, JPEG, or WebP format. Perfect for backgrounds, placeholders, and design mockups."
      keywords="color to image, solid color generator, background generator, placeholder image, color image creator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color to Image Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert any solid color to a downloadable image file for backgrounds and design projects.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="colorInput">Color (HEX)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="colorInput"
                          type="text"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          placeholder="#3b82f6"
                        />
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="space-y-2">
                      <Label>Image Format</Label>
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG (Recommended)</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                          <SelectItem value="webp">WebP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={downloadImage} className="w-full">
                      Download Image
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Color Preview</Label>
                      <div 
                        className="w-full h-32 rounded-lg border-2"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Image Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <span className="font-mono">{width} × {height}px</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="font-mono">{format.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Color:</span>
                          <span className="font-mono">{color.toUpperCase()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <canvas ref={canvasRef} style={{ display: 'none' }} />
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
