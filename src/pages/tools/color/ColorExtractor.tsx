
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Copy, Palette, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorExtractor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedColors, setExtractedColors] = useState<{ color: string; count: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setExtractedColors([]);
    }
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const extractColors = () => {
    if (!selectedFile || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = Math.min(img.width, 400);
      canvas.height = Math.min(img.height, 400);
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      const colorMap = new Map<string, number>();
      
      // Sample every 4th pixel for performance
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];
        
        if (alpha > 128) { // Only count non-transparent pixels
          // Round colors to reduce noise
          const roundedR = Math.round(r / 10) * 10;
          const roundedG = Math.round(g / 10) * 10;
          const roundedB = Math.round(b / 10) * 10;
          
          const hex = rgbToHex(roundedR, roundedG, roundedB);
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }
      }
      
      // Sort by frequency and take top 12
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([color, count]) => ({ color, count }));
      
      setExtractedColors(sortedColors);
      setIsProcessing(false);
    };

    img.src = URL.createObjectURL(selectedFile);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`,
    });
  };

  const copyAllColors = () => {
    const colors = extractedColors.map(item => item.color).join(", ");
    navigator.clipboard.writeText(colors);
    toast({
      title: "Copied!",
      description: "All colors copied to clipboard",
    });
  };

  const clearFile = () => {
    setSelectedFile(null);
    setExtractedColors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const faqs = [
    {
      question: "How does color extraction work?",
      answer: "The tool uses HTML5 Canvas to analyze pixel data from your image and identifies the most frequently occurring colors, rounded to reduce noise."
    },
    {
      question: "What image formats are supported?",
      answer: "All common web image formats are supported: JPEG, PNG, GIF, WebP, and more. The tool works entirely in your browser."
    },
    {
      question: "How many colors are extracted?",
      answer: "The tool extracts up to 12 dominant colors from your image, sorted by frequency of occurrence."
    }
  ];

  return (
    <SEOWrapper
      title="Color Extractor - Extract Colors from Images"
      description="Extract dominant colors from any image. Upload an image and get the most prominent HEX color codes for your design palette."
      keywords="color extractor, image color picker, dominant colors, color palette from image"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Color Extractor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract dominant colors from any image and get their HEX codes.
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
                <div>
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <div className="mt-2">
                    {!selectedFile ? (
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium">Choose an image</p>
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          JPEG, PNG, GIF, WebP supported
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded">
                              <Upload className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{selectedFile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={clearFile}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={extractColors} disabled={isProcessing} className="flex-1">
                            {isProcessing ? "Extracting..." : "Extract Colors"}
                          </Button>
                          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            Change Image
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                {selectedFile && (
                  <div>
                    <Label>Image Preview</Label>
                    <div className="mt-2 flex justify-center">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Uploaded"
                        className="max-w-full max-h-64 rounded-lg border"
                      />
                    </div>
                  </div>
                )}

                {extractedColors.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Extracted Colors</h3>
                      <Button variant="outline" size="sm" onClick={copyAllColors}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {extractedColors.map((item, index) => (
                        <div
                          key={index}
                          className="space-y-2 cursor-pointer group"
                          onClick={() => copyColor(item.color)}
                        >
                          <div
                            className="w-full h-20 rounded-lg border group-hover:scale-105 transition-transform"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="text-center">
                            <p className="text-sm font-mono">{item.color}</p>
                            <p className="text-xs text-muted-foreground">
                              {((item.count / extractedColors[0].count) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
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
