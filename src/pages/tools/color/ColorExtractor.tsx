
import { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ColorExtractor = () => {
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImagePreview(imageUrl);
      extractColors(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (imageUrl: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const colorMap = new Map<string, number>();
      
      // Sample every 10th pixel for performance
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];
        
        if (a > 128) { // Only consider non-transparent pixels
          const hex = rgbToHex(r, g, b);
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }
      }

      // Sort by frequency and get top colors
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([color]) => color);

      setExtractedColors(sortedColors);
    };
    img.src = imageUrl;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const faqs = [
    {
      question: "What image formats are supported?",
      answer: "The tool supports JPEG, PNG, GIF, and other common web image formats that can be displayed in a browser canvas."
    },
    {
      question: "How many colors can be extracted?",
      answer: "The tool extracts up to 10 dominant colors from your image, ranked by frequency of occurrence in the image."
    }
  ];

  return (
    <SEOWrapper
      title="Color Extractor from Image - Extract Dominant Colors"
      description="Upload an image and extract its dominant colors as HEX codes. Perfect for color palette inspiration and design work."
      keywords="color extractor, extract colors from image, dominant colors, image color palette, color picker from image"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Extractor from Image
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image and extract its dominant HEX colors for design inspiration.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Color Extractor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button onClick={triggerFileInput} className="w-full">
                    Upload Image
                  </Button>

                  <div className="text-sm text-muted-foreground text-center">
                    JPG, PNG, or GIF up to 5MB
                  </div>
                </div>

                {imagePreview && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Source Image</h3>
                    <div className="flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="max-h-60 max-w-full rounded border"
                      />
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                )}

                {extractedColors.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Extracted Colors</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {extractedColors.map((color, index) => (
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
                            {color.toUpperCase()}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Click any color to copy its HEX code to your clipboard.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color Extractor" faqs={faqs} />
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

export default ColorExtractor;
