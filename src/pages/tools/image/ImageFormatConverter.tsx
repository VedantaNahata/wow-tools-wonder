
import React, { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Download, RotateCw, Trash2 } from "lucide-react";

const ImageFormatConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [convertedImageUrl, setConvertedImageUrl] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number>(0.9);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const formats = [
    { value: "png", label: "PNG", mimeType: "image/png", hasQuality: false },
    { value: "jpeg", label: "JPEG", mimeType: "image/jpeg", hasQuality: true },
    { value: "jpg", label: "JPG", mimeType: "image/jpeg", hasQuality: true },
    { value: "webp", label: "WebP", mimeType: "image/webp", hasQuality: true },
    { value: "bmp", label: "BMP", mimeType: "image/bmp", hasQuality: false },
    { value: "ico", label: "ICO", mimeType: "image/x-icon", hasQuality: false },
    { value: "tiff", label: "TIFF", mimeType: "image/tiff", hasQuality: false }
  ];

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
      };
      img.src = url;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const convertImage = async () => {
    if (!originalImage || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = originalImage.naturalWidth;
      canvas.height = originalImage.naturalHeight;

      // For formats that don't support transparency, fill with white background
      const selectedFormat = formats.find(f => f.value === outputFormat);
      if (selectedFormat && ['jpeg', 'jpg', 'bmp'].includes(outputFormat)) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw the image
      ctx.drawImage(originalImage, 0, 0);

      // Convert to blob
      const mimeType = selectedFormat?.mimeType || 'image/png';
      const useQuality = selectedFormat?.hasQuality && outputFormat !== 'png';
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setConvertedImageUrl(url);
          setIsProcessing(false);
          toast({
            title: "Conversion successful",
            description: `Image converted to ${outputFormat.toUpperCase()} format`
          });
        }
      }, mimeType, useQuality ? quality : undefined);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Conversion failed",
        description: "An error occurred while converting the image",
        variant: "destructive"
      });
    }
  };

  const downloadConvertedImage = () => {
    if (!convertedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = convertedImageUrl;
    
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${nameWithoutExt}.${outputFormat}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: `Converted ${outputFormat.toUpperCase()} image has been downloaded`
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setPreviewUrl("");
    setConvertedImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getOriginalFormat = (): string => {
    if (!selectedFile) return "";
    const extension = selectedFile.name.split('.').pop()?.toLowerCase() || "";
    return extension.toUpperCase();
  };

  const selectedFormat = formats.find(f => f.value === outputFormat);

  return (
    <SEOWrapper
      title="Image Format Converter - Convert Images Between Formats"
      description="Convert images between different formats: PNG, JPEG, WebP, BMP, TIFF, ICO. Free online image format converter with quality control."
      keywords="image format converter, convert images, png to jpg, jpg to png, webp converter, image conversion"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Format Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert images between popular formats including PNG, JPEG, WebP, BMP, TIFF, and ICO with quality control.
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
                        Supports PNG, JPEG, WebP, BMP, TIFF, ICO
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
                            Format: {getOriginalFormat()} • Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
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

              {/* Conversion Settings */}
              {originalImage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RotateCw className="h-5 w-5" />
                      Conversion Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Format Selection */}
                      <div>
                        <Label htmlFor="format">Output Format</Label>
                        <Select value={outputFormat} onValueChange={setOutputFormat}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select output format" />
                          </SelectTrigger>
                          <SelectContent>
                            {formats.map((format) => (
                              <SelectItem key={format.value} value={format.value}>
                                {format.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quality Slider (only for formats that support it) */}
                      {selectedFormat?.hasQuality && (
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
                          <p className="text-sm text-muted-foreground mt-1">
                            Higher quality = larger file size
                          </p>
                        </div>
                      )}

                      {/* Format Information */}
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Format Information</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {outputFormat === 'png' && (
                            <>
                              <p>• Lossless compression</p>
                              <p>• Supports transparency</p>
                              <p>• Best for graphics with few colors</p>
                            </>
                          )}
                          {(outputFormat === 'jpeg' || outputFormat === 'jpg') && (
                            <>
                              <p>• Lossy compression</p>
                              <p>• No transparency support</p>
                              <p>• Best for photographs</p>
                            </>
                          )}
                          {outputFormat === 'webp' && (
                            <>
                              <p>• Modern format with excellent compression</p>
                              <p>• Supports transparency</p>
                              <p>• Smaller file sizes than PNG/JPEG</p>
                            </>
                          )}
                          {outputFormat === 'bmp' && (
                            <>
                              <p>• Uncompressed format</p>
                              <p>• Large file sizes</p>
                              <p>• Wide compatibility</p>
                            </>
                          )}
                          {outputFormat === 'ico' && (
                            <>
                              <p>• Icon format for Windows</p>
                              <p>• Multiple sizes in one file</p>
                              <p>• Used for favicons and app icons</p>
                            </>
                          )}
                          {outputFormat === 'tiff' && (
                            <>
                              <p>• High-quality format</p>
                              <p>• Supports multiple layers</p>
                              <p>• Used in professional photography</p>
                            </>
                          )}
                        </div>
                      </div>

                      <Button onClick={convertImage} disabled={isProcessing} className="w-full">
                        <RotateCw className="h-4 w-4 mr-2" />
                        {isProcessing ? "Converting..." : `Convert to ${outputFormat.toUpperCase()}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Original Image Preview */}
              {previewUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Original Image ({getOriginalFormat()})</CardTitle>
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

              {/* Converted Result */}
              {convertedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Converted Image ({outputFormat.toUpperCase()})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <img
                          src={convertedImageUrl}
                          alt="Converted"
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-md border"
                        />
                      </div>
                      
                      <Button onClick={downloadConvertedImage} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download {outputFormat.toUpperCase()} Image
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

export default ImageFormatConverter;
