
import React, { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Download, Maximize, Trash2, Link, Unlink } from "lucide-react";

const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [resizedImageUrl, setResizedImageUrl] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [quality, setQuality] = useState<number>(0.9);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
      };
      img.src = url;
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
      };
      img.src = url;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalImage) {
      const aspectRatio = originalImage.naturalWidth / originalImage.naturalHeight;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalImage) {
      const aspectRatio = originalImage.naturalWidth / originalImage.naturalHeight;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const resizeImage = async () => {
    if (!originalImage || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw resized image
      ctx.drawImage(originalImage, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResizedImageUrl(url);
          setIsProcessing(false);
          toast({
            title: "Image resized",
            description: `Successfully resized to ${width}×${height}px`
          });
        }
      }, selectedFile?.type || 'image/png', quality);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Resize failed",
        description: "An error occurred while resizing the image",
        variant: "destructive"
      });
    }
  };

  const downloadResizedImage = () => {
    if (!resizedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = resizedImageUrl;
    
    const extension = selectedFile.name.split('.').pop() || 'png';
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${nameWithoutExt}_${width}x${height}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Resized image has been downloaded"
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setPreviewUrl("");
    setResizedImageUrl("");
    setWidth(0);
    setHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setPresetSize = (presetWidth: number, presetHeight: number) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
  };

  const presetSizes = [
    { name: "HD (1920×1080)", width: 1920, height: 1080 },
    { name: "4K (3840×2160)", width: 3840, height: 2160 },
    { name: "Instagram Square (1080×1080)", width: 1080, height: 1080 },
    { name: "Instagram Story (1080×1920)", width: 1080, height: 1920 },
    { name: "Facebook Cover (1200×630)", width: 1200, height: 630 },
    { name: "YouTube Thumbnail (1280×720)", width: 1280, height: 720 },
    { name: "Twitter Header (1500×500)", width: 1500, height: 500 },
    { name: "LinkedIn Cover (1584×396)", width: 1584, height: 396 }
  ];

  return (
    <SEOWrapper
      title="Image Resizer Tool - Resize Images Online"
      description="Resize images to custom dimensions or preset sizes. Maintain aspect ratio or stretch to fit. Download resized images instantly. Free online image resizer."
      keywords="image resizer, resize images, image dimensions, aspect ratio, photo resizer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Resizer Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resize images to custom dimensions or choose from popular preset sizes. Maintain aspect ratio or stretch to fit.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">
                        Drop your image here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, GIF, WebP
                      </p>
                    </div>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {selectedFile && originalImage && (
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Original: {originalImage.naturalWidth} × {originalImage.naturalHeight}px
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={clearAll}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resize Controls */}
              {originalImage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Maximize className="h-5 w-5" />
                      Resize Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Custom Dimensions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="width">Width (px)</Label>
                          <Input
                            id="width"
                            type="number"
                            value={width}
                            onChange={(e) => handleWidthChange(Number(e.target.value))}
                            min="1"
                            max="10000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Height (px)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => handleHeightChange(Number(e.target.value))}
                            min="1"
                            max="10000"
                          />
                        </div>
                      </div>

                      {/* Aspect Ratio Toggle */}
                      <div className="flex items-center space-x-2">
                        {maintainAspectRatio ? (
                          <Link className="h-4 w-4 text-primary" />
                        ) : (
                          <Unlink className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch
                          checked={maintainAspectRatio}
                          onCheckedChange={setMaintainAspectRatio}
                        />
                        <Label>Maintain aspect ratio</Label>
                      </div>

                      {/* Quality Slider */}
                      <div>
                        <Label htmlFor="quality">Quality: {Math.round(quality * 100)}%</Label>
                        <Input
                          id="quality"
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={quality}
                          onChange={(e) => setQuality(Number(e.target.value))}
                          className="mt-2"
                        />
                      </div>

                      {/* Preset Sizes */}
                      <div>
                        <Label className="text-base font-medium">Preset Sizes</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {presetSizes.map((preset) => (
                            <Button
                              key={preset.name}
                              variant="outline"
                              size="sm"
                              onClick={() => setPresetSize(preset.width, preset.height)}
                              className="justify-start text-sm"
                            >
                              {preset.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button onClick={resizeImage} disabled={isProcessing} className="w-full">
                        <Maximize className="h-4 w-4 mr-2" />
                        {isProcessing ? "Resizing..." : "Resize Image"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preview Section */}
              {previewUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Original Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <img
                        src={previewUrl}
                        alt="Original"
                        className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resized Result */}
              {resizedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resized Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <img
                          src={resizedImageUrl}
                          alt="Resized"
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-md border"
                        />
                      </div>
                      <p className="text-center text-sm text-muted-foreground">
                        {width} × {height}px
                      </p>
                      <Button onClick={downloadResizedImage} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Resized Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <canvas ref={canvasRef} className="hidden" />
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

export default ImageResizer;
