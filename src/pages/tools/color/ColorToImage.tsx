
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Image, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorToImage = () => {
  const [color, setColor] = useState("#3498db");
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [format, setFormat] = useState("png");
  const { toast } = useToast();

  const generateImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const link = document.createElement('a');
    link.download = `color-${color.replace('#', '')}-${width}x${height}.${format}`;
    
    if (format === 'png') {
      link.href = canvas.toDataURL('image/png');
    } else {
      link.href = canvas.toDataURL('image/jpeg', 0.9);
    }
    
    link.click();
    
    toast({
      title: "Downloaded!",
      description: `Color image saved as ${format.toUpperCase()}`,
    });
  };

  const presetSizes = [
    { name: "HD (1920x1080)", width: "1920", height: "1080" },
    { name: "4K (3840x2160)", width: "3840", height: "2160" },
    { name: "Square (1080x1080)", width: "1080", height: "1080" },
    { name: "Mobile (375x667)", width: "375", height: "667" },
    { name: "Desktop (1440x900)", width: "1440", height: "900" },
    { name: "A4 (2480x3508)", width: "2480", height: "3508" },
  ];

  const setPresetSize = (preset: { width: string; height: string }) => {
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "You can download images as PNG (with transparency support) or JPEG (smaller file size) formats."
    },
    {
      question: "What are these images useful for?",
      answer: "Solid color images are perfect for backgrounds, placeholders, mockups, testing, or when you need a specific color swatch as an image file."
    },
    {
      question: "Is there a size limit?",
      answer: "While there's no hard limit, very large images (>10000px) may take longer to generate and use more memory. Consider your device's capabilities."
    }
  ];

  return (
    <SEOWrapper
      title="Color to Image Generator - Create Solid Color Images"
      description="Convert any color to a downloadable image. Generate solid color backgrounds, placeholders, and swatches in PNG or JPEG format."
      keywords="color to image, solid color background, color image generator, placeholder image"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Image className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Color to Image
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert any color to a downloadable image for backgrounds and placeholders.
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
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          type="text"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          placeholder="#3498db"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="1920"
                          min="1"
                          max="10000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="1080"
                          min="1"
                          max="10000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="format">Format</Label>
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Preset Sizes</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {presetSizes.map((preset, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setPresetSize(preset)}
                            className="text-xs"
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Preview</Label>
                      <div className="relative">
                        <div
                          className="w-full h-48 rounded-lg border"
                          style={{ backgroundColor: color }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                            {width} × {height}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>File Info</Label>
                      <div className="text-sm space-y-1 p-3 bg-muted rounded-lg">
                        <div>Color: {color}</div>
                        <div>Size: {width} × {height} px</div>
                        <div>Format: {format.toUpperCase()}</div>
                        <div>
                          Estimated size: {
                            format === 'png' 
                              ? Math.round((parseInt(width) * parseInt(height) * 4) / 1024) + ' KB'
                              : Math.round((parseInt(width) * parseInt(height) * 3) / 1024 / 10) + ' KB'
                          }
                        </div>
                      </div>
                    </div>

                    <Button onClick={generateImage} className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color to Image" faqs={faqs} />
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
