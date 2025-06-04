
import { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ColorExtractor = () => {
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setImagePreview(imageSrc);
        extractColors(imageSrc);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const extractColors = (imageSrc: string) => {
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
      const colorCount: { [key: string]: number } = {};

      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const alpha = pixels[i + 3];

        if (alpha < 128) continue;

        const hex = rgbToHex(r, g, b);
        colorCount[hex] = (colorCount[hex] || 0) + 1;
      }

      const sortedColors = Object.entries(colorCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([color]) => color);

      setExtractedColors(sortedColors);
    };
    img.src = imageSrc;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  const faqs = [
    {
      question: "How does color extraction work?",
      answer: "The tool analyzes pixel data from your uploaded image and identifies the most frequently occurring colors, then displays them as HEX color codes."
    },
    {
      question: "What image formats are supported?",
      answer: "Most common image formats are supported including PNG, JPG, JPEG, GIF, and WebP."
    }
  ];

  return (
    <SEOWrapper
      title="Color Extractor - Extract Colors from Images"
      description="Extract dominant HEX colors from any image. Upload an image and get the most prominent color palette with copyable HEX codes."
      keywords="color extractor, image color picker, dominant colors, hex color extraction, color palette from image"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Code Extractor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract dominant colors from any image and get their HEX color codes.
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
                <div className="space-y-2">
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <input
                    ref={fileInputRef}
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                </div>

                <canvas ref={canvasRef} style={{ display: 'none' }} />

                {imagePreview && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Uploaded Image</h3>
                      <img 
                        src={imagePreview} 
                        alt="Uploaded" 
                        className="max-w-full h-auto max-h-96 rounded-lg border"
                      />
                    </div>

                    {extractedColors.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Extracted Colors</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {extractedColors.map((color, index) => (
                            <Card key={index} className="cursor-pointer hover:shadow-lg transition-all">
                              <CardContent className="p-4">
                                <div 
                                  className="w-full h-20 rounded-lg mb-2 border"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <p className="text-center font-mono text-sm">{color.toUpperCase()}</p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2"
                                  onClick={() => copyToClipboard(color)}
                                >
                                  Copy
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!imagePreview && (
                  <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                    <p className="text-muted-foreground">Upload an image to extract its dominant colors</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Color Code Extractor" faqs={faqs} />
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
