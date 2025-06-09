
import { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Download, Image as ImageIcon, Trash2, Link, Unlink } from "lucide-react";

const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [resizedImageUrl, setResizedImageUrl] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
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
        setWidth(img.naturalWidth.toString());
        setHeight(img.naturalHeight.toString());
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
        setWidth(img.naturalWidth.toString());
        setHeight(img.naturalHeight.toString());
      };
      img.src = url;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainAspectRatio && originalImage && value) {
      const newWidth = parseInt(value);
      const aspectRatio = originalImage.naturalWidth / originalImage.naturalHeight;
      const newHeight = Math.round(newWidth / aspectRatio);
      setHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainAspectRatio && originalImage && value) {
      const newHeight = parseInt(value);
      const aspectRatio = originalImage.naturalWidth / originalImage.naturalHeight;
      const newWidth = Math.round(newHeight * aspectRatio);
      setWidth(newWidth.toString());
    }
  };

  const resizeImage = async () => {
    if (!originalImage || !width || !height) {
      toast({
        title: "Missing information",
        description: "Please select an image and enter dimensions",
        variant: "destructive"
      });
      return;
    }

    const newWidth = parseInt(width);
    const newHeight = parseInt(height);

    if (newWidth <= 0 || newHeight <= 0 || newWidth > 10000 || newHeight > 10000) {
      toast({
        title: "Invalid dimensions",
        description: "Please enter valid dimensions (1-10000 pixels)",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Use high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResizedImageUrl(url);
          setIsProcessing(false);
          toast({
            title: "Image resized",
            description: `Successfully resized to ${newWidth}×${newHeight}px`
          });
        }
      }, selectedFile?.type || 'image/png', 0.9);
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
    setWidth("");
    setHeight("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setCommonSize = (w: number, h: number) => {
    setWidth(w.toString());
    setHeight(h.toString());
  };

  return (
    <SEOWrapper
      title="Image Resizer Tool - Resize Images Online"
      description="Resize images to custom dimensions online. Maintain aspect ratio or stretch to fit. High-quality image resizing with instant preview."
      keywords="image resizer, resize images, image dimensions, scale images, image tool"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Resizer Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resize any image to custom dimensions with high quality. Maintain aspect ratio or stretch to fit your needs.
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
                    <CardTitle>Resize Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="width">Width (pixels)</Label>
                          <Input
                            id="width"
                            type="number"
                            value={width}
                            onChange={(e) => handleWidthChange(e.target.value)}
                            min="1"
                            max="10000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Height (pixels)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => handleHeightChange(e.target.value)}
                            min="1"
                            max="10000"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant={maintainAspectRatio ? "default" : "outline"}
                          size="sm"
                          onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                        >
                          {maintainAspectRatio ? <Link className="h-4 w-4 mr-2" /> : <Unlink className="h-4 w-4 mr-2" />}
                          {maintainAspectRatio ? "Lock Aspect Ratio" : "Unlock Aspect Ratio"}
                        </Button>
                      </div>

                      <div>
                        <Label>Common Sizes</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => setCommonSize(800, 600)}>
                            800×600
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setCommonSize(1024, 768)}>
                            1024×768
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setCommonSize(1920, 1080)}>
                            1920×1080
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setCommonSize(400, 400)}>
                            400×400 (Square)
                          </Button>
                        </div>
                      </div>

                      <Button onClick={resizeImage} disabled={isProcessing} className="w-full">
                        {isProcessing ? "Resizing..." : "Resize Image"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preview Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className="max-w-full max-h-64 mx-auto rounded border"
                        />
                        {originalImage && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {originalImage.naturalWidth} × {originalImage.naturalHeight}px
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {resizedImageUrl && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Resized Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <img
                          src={resizedImageUrl}
                          alt="Resized"
                          className="max-w-full max-h-64 mx-auto rounded border"
                        />
                        <p className="text-sm text-muted-foreground">
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
              </div>

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
