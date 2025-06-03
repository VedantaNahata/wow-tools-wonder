
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, Palette, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Update all color formats when hex changes
  const updateColor = (hexColor: string) => {
    setCurrentColor(hexColor);
    const newRgb = hexToRgb(hexColor);
    setRgb(newRgb);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  // Update color from RGB input
  const updateFromRgb = (r: number, g: number, b: number) => {
    const newRgb = { r, g, b };
    setRgb(newRgb);
    const hexColor = rgbToHex(r, g, b);
    setCurrentColor(hexColor);
    setHsl(rgbToHsl(r, g, b));
  };

  // Update color from HSL input
  const updateFromHsl = (h: number, s: number, l: number) => {
    const newHsl = { h, s, l };
    setHsl(newHsl);
    const newRgb = hslToRgb(h, s, l);
    setRgb(newRgb);
    const hexColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setCurrentColor(hexColor);
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard: ${value}`,
    });
  };

  const generateRandomColor = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    updateColor(randomHex);
  };

  // Initialize color palette canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(1/6, '#ffff00');
    gradient.addColorStop(2/6, '#00ff00');
    gradient.addColorStop(3/6, '#00ffff');
    gradient.addColorStop(4/6, '#0000ff');
    gradient.addColorStop(5/6, '#ff00ff');
    gradient.addColorStop(1, '#ff0000');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add brightness gradient
    const brightnessGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    brightnessGradient.addColorStop(0, 'rgba(255,255,255,1)');
    brightnessGradient.addColorStop(0.5, 'rgba(255,255,255,0)');
    brightnessGradient.addColorStop(0.5, 'rgba(0,0,0,0)');
    brightnessGradient.addColorStop(1, 'rgba(0,0,0,1)');

    ctx.fillStyle = brightnessGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixel = imageData.data;
    
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
    updateColor(hexColor);
  };

  const faqs = [
    {
      question: "How do I use the color picker?",
      answer: "Click anywhere on the color palette to pick a color, or manually enter HEX, RGB, or HSL values. You can also generate random colors."
    },
    {
      question: "What color formats are supported?",
      answer: "The tool supports HEX (#ff0000), RGB (255, 0, 0), and HSL (0°, 100%, 50%) color formats with automatic conversion between them."
    },
    {
      question: "Can I copy the color values?",
      answer: "Yes, click the copy button next to any color value to copy it to your clipboard for use in your projects."
    },
    {
      question: "What's the difference between RGB and HSL?",
      answer: "RGB uses Red, Green, Blue values (0-255). HSL uses Hue (0-360°), Saturation (0-100%), and Lightness (0-100%) which is more intuitive for designers."
    }
  ];

  return (
    <SEOWrapper
      title="Color Picker Tool - Pick Colors and Get HEX, RGB, HSL Values"
      description="Advanced color picker tool to select, explore, and work with colors. Get hex, RGB, HSL values instantly and create color palettes for your projects."
      keywords="color picker, color selector, hex color, rgb color, hsl color, color palette, color tool"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Picker Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick and explore colors with our advanced color picker. Get HEX, RGB, and HSL values instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Picker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Preview */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-24 h-24 rounded-lg border-2 border-border shadow-lg"
                    style={{ backgroundColor: currentColor }}
                  ></div>
                  <div className="flex-1">
                    <Label htmlFor="hex-input">Current Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="hex-input"
                        type="text"
                        value={currentColor}
                        onChange={(e) => updateColor(e.target.value)}
                        className="font-mono"
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => copyToClipboard(currentColor, "HEX")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={generateRandomColor} variant="outline">
                    <Palette className="h-4 w-4 mr-2" />
                    Random
                  </Button>
                </div>

                {/* Color Palette Canvas */}
                <div>
                  <Label>Click to Pick a Color</Label>
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    onClick={handleCanvasClick}
                    className="w-full max-w-md border rounded-lg cursor-crosshair mt-2"
                  />
                </div>

                {/* Color Format Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* HEX */}
                  <div>
                    <Label>HEX</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={currentColor}
                        onChange={(e) => updateColor(e.target.value)}
                        className="font-mono"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(currentColor, "HEX")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* RGB */}
                  <div>
                    <Label>RGB</Label>
                    <div className="flex gap-1 mt-1">
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                        className="text-xs"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)}
                        className="text-xs"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)}
                        className="text-xs"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* HSL */}
                  <div>
                    <Label>HSL</Label>
                    <div className="flex gap-1 mt-1">
                      <Input
                        type="number"
                        min="0"
                        max="360"
                        value={hsl.h}
                        onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hsl.s, hsl.l)}
                        className="text-xs"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.s}
                        onChange={(e) => updateFromHsl(hsl.h, parseInt(e.target.value) || 0, hsl.l)}
                        className="text-xs"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.l}
                        onChange={(e) => updateFromHsl(hsl.h, hsl.s, parseInt(e.target.value) || 0)}
                        className="text-xs"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ToolFAQ toolName="Color Picker" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HEX:</span>
                    <span className="font-mono">{currentColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RGB:</span>
                    <span className="font-mono">{rgb.r}, {rgb.g}, {rgb.b}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HSL:</span>
                    <span className="font-mono">{hsl.h}°, {hsl.s}%, {hsl.l}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CSS RGB:</span>
                    <span className="font-mono text-xs">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CSS HSL:</span>
                    <span className="font-mono text-xs">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ColorPicker;
