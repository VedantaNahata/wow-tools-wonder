
import React, { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Download, Archive, Trash2 } from "lucide-react";

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [compressedImageUrl, setCompressedImageUrl] = useState<string>("");
  const [compressionLevel, setCompressionLevel] = useState<number>(0.8);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [maxHeight, setMaxHeight] = useState<number>(1080);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
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
      setOriginalSize(file.size);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
      };
      img.src = url;
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
      };
      img.src = url;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const compressImage = async () => {
    if (!originalImage || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = originalImage;
      const aspectRatio = width / height;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      canvas.width = Math.round(width);
      canvas.height = Math.round(height);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw resized image
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

      // Convert to blob with compression
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCompressedImageUrl(url);
          setCompressedSize(blob.size);
          setIsProcessing(false);
          
          const compressionRatio = ((originalSize - blob.size) / originalSize * 100).toFixed(1);
          toast({
            title: "Image compressed",
            description: `Size reduced by ${compressionRatio}% (${formatFileSize(originalSize)} → ${formatFileSize(blob.size)})`
          });
        }
      }, selectedFile?.type || 'image/jpeg', compressionLevel);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Compression failed",
        description: "An error occurred while compressing the image",
        variant: "destructive"
      });
    }
  };

  const downloadCompressedImage = () => {
    if (!compressedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = compressedImageUrl;
    
    const extension = selectedFile.name.split('.').pop() || 'jpg';
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${nameWithoutExt}_compressed.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Compressed image has been downloaded"
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setPreviewUrl("");
    setCompressedImageUrl("");
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = (): string => {
    if (originalSize === 0 || compressedSize === 0) return '0';
    return ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
  };

  return (
    <SEOWrapper
      title="Image Compressor Tool - Compress Images Online"
      description="Compress images online with quality control. Reduce file size while maintaining image quality. Support for JPG, PNG, WebP compression."
      keywords="image compressor, compress images, reduce file size, image optimization, photo compressor"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Compressor Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compress images to reduce file size while maintaining quality. Perfect for web optimization and storage savings.
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
                    
                    {selectedFile && (
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Original size: {formatFileSize(originalSize)}
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

              {/* Compression Settings */}
              {originalImage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Archive className="h-5 w-5" />
                      Compression Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Quality Slider */}
                      <div>
                        <Label htmlFor="quality">Quality: {Math.round(compressionLevel * 100)}%</Label>
                        <Input
                          id="quality"
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={compressionLevel}
                          onChange={(e) => setCompressionLevel(Number(e.target.value))}
                          className="mt-2"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Higher quality = larger file size
                        </p>
                      </div>

                      {/* Max Dimensions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="maxWidth">Max Width (px)</Label>
                          <Input
                            id="maxWidth"
                            type="number"
                            value={maxWidth}
                            onChange={(e) => setMaxWidth(Number(e.target.value))}
                            min="100"
                            max="5000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxHeight">Max Height (px)</Label>
                          <Input
                            id="maxHeight"
                            type="number"
                            value={maxHeight}
                            onChange={(e) => setMaxHeight(Number(e.target.value))}
                            min="100"
                            max="5000"
                          />
                        </div>
                      </div>

                      <Button onClick={compressImage} disabled={isProcessing} className="w-full">
                        <Archive className="h-4 w-4 mr-2" />
                        {isProcessing ? "Compressing..." : "Compress Image"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Original Image Preview */}
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
                      <p className="text-sm text-muted-foreground mt-2">
                        Size: {formatFileSize(originalSize)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Compressed Result */}
              {compressedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compressed Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <img
                          src={compressedImageUrl}
                          alt="Compressed"
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-md border"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium">Original Size</p>
                          <p className="text-muted-foreground">{formatFileSize(originalSize)}</p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium">Compressed Size</p>
                          <p className="text-muted-foreground">{formatFileSize(compressedSize)}</p>
                        </div>
                        <div className="text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <p className="font-medium">Size Reduction</p>
                          <p className="text-green-600 dark:text-green-400">{getCompressionRatio()}%</p>
                        </div>
                      </div>
                      
                      <Button onClick={downloadCompressedImage} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Compressed Image
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

export default ImageCompressor;
