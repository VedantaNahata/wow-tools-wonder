
import { useState, useRef, useCallback } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Download, Crop, Trash2, Square, Monitor, Smartphone } from "lucide-react";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageCropper = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState<string>("free");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const aspectRatios = {
    "free": { label: "Free", ratio: 0 },
    "1:1": { label: "1:1 (Square)", ratio: 1 },
    "4:3": { label: "4:3", ratio: 4/3 },
    "3:4": { label: "3:4 (Portrait)", ratio: 3/4 },
    "16:9": { label: "16:9 (Widescreen)", ratio: 16/9 },
    "9:16": { label: "9:16 (Vertical)", ratio: 9/16 },
    "3:2": { label: "3:2", ratio: 3/2 },
    "2:3": { label: "2:3", ratio: 2/3 }
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
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        // Initialize crop area to center 50% of image
        const cropWidth = img.naturalWidth * 0.5;
        const cropHeight = img.naturalHeight * 0.5;
        const cropX = (img.naturalWidth - cropWidth) / 2;
        const cropY = (img.naturalHeight - cropHeight) / 2;
        setCropArea({ x: cropX, y: cropY, width: cropWidth, height: cropHeight });
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
        const cropWidth = img.naturalWidth * 0.5;
        const cropHeight = img.naturalHeight * 0.5;
        const cropX = (img.naturalWidth - cropWidth) / 2;
        const cropY = (img.naturalHeight - cropHeight) / 2;
        setCropArea({ x: cropX, y: cropY, width: cropWidth, height: cropHeight });
      };
      img.src = url;
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const getImageDisplayDimensions = useCallback(() => {
    if (!imageRef.current || !originalImage) return { width: 0, height: 0, scale: 1 };
    
    const container = cropContainerRef.current;
    if (!container) return { width: 0, height: 0, scale: 1 };
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    const imageAspectRatio = originalImage.naturalWidth / originalImage.naturalHeight;
    const containerAspectRatio = containerWidth / containerHeight;
    
    let displayWidth, displayHeight;
    
    if (imageAspectRatio > containerAspectRatio) {
      displayWidth = Math.min(containerWidth, 600);
      displayHeight = displayWidth / imageAspectRatio;
    } else {
      displayHeight = Math.min(containerHeight, 400);
      displayWidth = displayHeight * imageAspectRatio;
    }
    
    const scale = originalImage.naturalWidth / displayWidth;
    
    return { width: displayWidth, height: displayHeight, scale };
  }, [originalImage]);

  const handleMouseDown = (event: React.MouseEvent) => {
    const { width, height, scale } = getImageDisplayDimensions();
    if (width === 0 || height === 0) return;

    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) * scale;
    const y = (event.clientY - rect.top) * scale;

    setIsDragging(true);
    setDragStart({ x, y });
    setCropArea({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !originalImage) return;

    const { scale } = getImageDisplayDimensions();
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = (event.clientX - rect.left) * scale;
    const currentY = (event.clientY - rect.top) * scale;

    let width = Math.abs(currentX - dragStart.x);
    let height = Math.abs(currentY - dragStart.y);
    
    // Apply aspect ratio constraint
    if (aspectRatio !== "free" && aspectRatios[aspectRatio as keyof typeof aspectRatios]) {
      const ratio = aspectRatios[aspectRatio as keyof typeof aspectRatios].ratio;
      if (ratio > 0) {
        if (width / height > ratio) {
          width = height * ratio;
        } else {
          height = width / ratio;
        }
      }
    }

    const x = Math.min(dragStart.x, currentX);
    const y = Math.min(dragStart.y, currentY);

    // Ensure crop area stays within image bounds
    const maxWidth = originalImage.naturalWidth - x;
    const maxHeight = originalImage.naturalHeight - y;
    
    width = Math.min(width, maxWidth);
    height = Math.min(height, maxHeight);

    setCropArea({ x, y, width, height });
  }, [isDragging, dragStart, aspectRatio, originalImage, getImageDisplayDimensions]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const cropImage = async () => {
    if (!originalImage || cropArea.width === 0 || cropArea.height === 0) {
      toast({
        title: "Invalid crop area",
        description: "Please select an area to crop",
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

      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      ctx.drawImage(
        originalImage,
        cropArea.x, cropArea.y, cropArea.width, cropArea.height,
        0, 0, cropArea.width, cropArea.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCroppedImageUrl(url);
          setIsProcessing(false);
          toast({
            title: "Image cropped",
            description: `Successfully cropped to ${Math.round(cropArea.width)}×${Math.round(cropArea.height)}px`
          });
        }
      }, selectedFile?.type || 'image/png', 0.9);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Crop failed",
        description: "An error occurred while cropping the image",
        variant: "destructive"
      });
    }
  };

  const downloadCroppedImage = () => {
    if (!croppedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = croppedImageUrl;
    
    const extension = selectedFile.name.split('.').pop() || 'png';
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${nameWithoutExt}_cropped.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Cropped image has been downloaded"
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setPreviewUrl("");
    setCroppedImageUrl("");
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { width: displayWidth, height: displayHeight, scale } = getImageDisplayDimensions();

  return (
    <SEOWrapper
      title="Image Cropper Tool - Crop Images Online"
      description="Crop images to specific ratios or custom dimensions online. Interactive cropping with aspect ratio presets. Download cropped images instantly."
      keywords="image cropper, crop images, aspect ratio, image editing, photo cropper"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Cropper Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crop images to specific ratios or custom dimensions with interactive preview. Perfect for social media and web use.
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
                          {originalImage && (
                            <p className="text-sm text-muted-foreground">
                              {originalImage.naturalWidth} × {originalImage.naturalHeight}px
                            </p>
                          )}
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

              {/* Aspect Ratio Controls */}
              {originalImage && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aspect Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.entries(aspectRatios).map(([key, { label }]) => (
                        <Button
                          key={key}
                          variant={aspectRatio === key ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAspectRatio(key)}
                        >
                          {key === "1:1" && <Square className="h-4 w-4 mr-1" />}
                          {key === "16:9" && <Monitor className="h-4 w-4 mr-1" />}
                          {key === "9:16" && <Smartphone className="h-4 w-4 mr-1" />}
                          {label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Crop Interface */}
              {previewUrl && originalImage && (
                <Card>
                  <CardHeader>
                    <CardTitle>Crop Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Click and drag to select the area you want to crop
                      </p>
                      
                      <div 
                        ref={cropContainerRef}
                        className="relative inline-block mx-auto border border-muted-foreground/20 rounded"
                        style={{ maxWidth: '100%', maxHeight: '500px' }}
                      >
                        <img
                          ref={imageRef}
                          src={previewUrl}
                          alt="Crop preview"
                          className="max-w-full max-h-[500px] object-contain cursor-crosshair select-none"
                          onMouseDown={handleMouseDown}
                          draggable={false}
                          style={{ width: displayWidth, height: displayHeight }}
                        />
                        
                        {/* Crop overlay */}
                        {cropArea.width > 0 && cropArea.height > 0 && (
                          <div
                            className="absolute border-2 border-primary bg-primary/10"
                            style={{
                              left: (cropArea.x / scale),
                              top: (cropArea.y / scale),
                              width: (cropArea.width / scale),
                              height: (cropArea.height / scale),
                              pointerEvents: 'none'
                            }}
                          >
                            <div className="absolute -top-6 left-0 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                              {Math.round(cropArea.width)} × {Math.round(cropArea.height)}
                            </div>
                          </div>
                        )}
                      </div>

                      <Button onClick={cropImage} disabled={isProcessing || cropArea.width === 0} className="w-full">
                        <Crop className="h-4 w-4 mr-2" />
                        {isProcessing ? "Cropping..." : "Crop Image"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cropped Result */}
              {croppedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cropped Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <img
                        src={croppedImageUrl}
                        alt="Cropped result"
                        className="max-w-full max-h-96 mx-auto rounded border"
                      />
                      <p className="text-sm text-muted-foreground">
                        {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px
                      </p>
                      <Button onClick={downloadCroppedImage} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Cropped Image
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

export default ImageCropper;
