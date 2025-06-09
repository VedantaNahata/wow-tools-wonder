
import { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Download, RotateCw, Trash2, FileImage } from "lucide-react";

type ImageFormat = 'jpeg' | 'png' | 'webp';

const ImageFormatConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [convertedImageUrl, setConvertedImageUrl] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<ImageFormat>('jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [originalFormat, setOriginalFormat] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const formats = {
    jpeg: {
      label: "JPEG",
      description: "Best for photos, smaller file size",
      extension: "jpg",
      supportsQuality: true
    },
    png: {
      label: "PNG",
      description: "Best for graphics with transparency",
      extension: "png",
      supportsQuality: false
    },
    webp: {
      label: "WebP",
      description: "Modern format, excellent compression",
      extension: "webp",
      supportsQuality: true
    }
  };

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
      setOriginalFormat(file.type.split('/')[1].toUpperCase());
      setOriginalSize(file.size);
      setPreviewUrl(URL.createObjectURL(file));
      setConvertedImageUrl("");
      setConvertedSize(0);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setOriginalFormat(file.type.split('/')[1].toUpperCase());
      setOriginalSize(file.size);
      setPreviewUrl(URL.createObjectURL(file));
      setConvertedImageUrl("");
      setConvertedSize(0);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const convertImage = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to convert",
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

      const img = new Image();
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Clear canvas with white background for JPEG
        if (outputFormat === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${outputFormat}`;
        const qualityValue = formats[outputFormat].supportsQuality ? quality / 100 : 1.0;

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedImageUrl(url);
            setConvertedSize(blob.size);
            setIsProcessing(false);

            toast({
              title: "Conversion complete",
              description: `Successfully converted to ${outputFormat.toUpperCase()}`
            });
          }
        }, mimeType, qualityValue);
      };

      img.onerror = () => {
        setIsProcessing(false);
        toast({
          title: "Conversion failed",
          description: "Failed to load the image",
          variant: "destructive"
        });
      };

      img.src = previewUrl;
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion",
        variant: "destructive"
      });
    }
  };

  const downloadConvertedImage = () => {
    if (!convertedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = convertedImageUrl;
    
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
    const extension = formats[outputFormat].extension;
    link.download = `${nameWithoutExt}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Converted image has been downloaded"
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setConvertedImageUrl("");
    setOriginalFormat("");
    setOriginalSize(0);
    setConvertedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const sizeChange = originalSize > 0 && convertedSize > 0 
    ? ((convertedSize - originalSize) / originalSize * 100).toFixed(1)
    : '0';

  const sizeChangeText = parseFloat(sizeChange) > 0 ? `+${sizeChange}%` : `${sizeChange}%`;
  const sizeChangeColor = parseFloat(sizeChange) > 0 ? 'text-destructive' : 'text-green-600';

  return (
    <SEOWrapper
      title="Image Format Converter - Convert JPG PNG WebP Online"
      description="Convert images between JPG, PNG, and WebP formats online. High-quality conversion with customizable settings and instant download."
      keywords="image converter, jpg to png, png to jpg, webp converter, image format, convert images"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Format Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert images between JPG, PNG, and WebP formats with customizable quality settings. All processing happens in your browser.
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
                        Supports JPG, PNG, GIF, WebP, BMP
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
                            {originalFormat} • {formatFileSize(originalSize)}
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
              {selectedFile && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RotateCw className="h-5 w-5" />
                      Conversion Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Output Format</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                          {Object.entries(formats).map(([key, format]) => (
                            <Button
                              key={key}
                              variant={outputFormat === key ? "default" : "outline"}
                              className="h-auto p-4 flex flex-col items-start"
                              onClick={() => setOutputFormat(key as ImageFormat)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <FileImage className="h-4 w-4" />
                                <span className="font-semibold">{format.label}</span>
                              </div>
                              <span className="text-xs text-left">{format.description}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {formats[outputFormat].supportsQuality && (
                        <div>
                          <Label htmlFor="quality">Quality: {quality}%</Label>
                          <Input
                            id="quality"
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={quality}
                            onChange={(e) => setQuality(parseInt(e.target.value))}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Smaller size</span>
                            <span>Better quality</span>
                          </div>
                        </div>
                      )}

                      <Button onClick={convertImage} disabled={isProcessing} className="w-full">
                        <RotateCw className="h-4 w-4 mr-2" />
                        {isProcessing ? "Converting..." : `Convert to ${outputFormat.toUpperCase()}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results */}
              {convertedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Original</p>
                          <p className="text-lg font-semibold">{originalFormat}</p>
                          <p className="text-sm">{formatFileSize(originalSize)}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Converted</p>
                          <p className="text-lg font-semibold">{outputFormat.toUpperCase()}</p>
                          <p className="text-sm">{formatFileSize(convertedSize)}</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Size Change</p>
                          <p className={`text-lg font-semibold ${sizeChangeColor}`}>{sizeChangeText}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <p className="font-medium mb-2">Original ({originalFormat})</p>
                          <img
                            src={previewUrl}
                            alt="Original"
                            className="max-w-full max-h-64 mx-auto rounded border"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium mb-2">Converted ({outputFormat.toUpperCase()})</p>
                          <img
                            src={convertedImageUrl}
                            alt="Converted"
                            className="max-w-full max-h-64 mx-auto rounded border"
                          />
                        </div>
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

              {/* Format Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Format Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">JPEG</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Best for photographs</li>
                        <li>• Smaller file sizes</li>
                        <li>• No transparency support</li>
                        <li>• Lossy compression</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">PNG</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Best for graphics/logos</li>
                        <li>• Supports transparency</li>
                        <li>• Larger file sizes</li>
                        <li>• Lossless compression</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">WebP</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Modern web format</li>
                        <li>• Excellent compression</li>
                        <li>• Supports transparency</li>
                        <li>• Both lossy & lossless</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
