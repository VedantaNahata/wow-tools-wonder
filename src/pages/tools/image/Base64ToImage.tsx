
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { ImageDown, Download, Trash2, AlertCircle } from "lucide-react";

const Base64ToImage = () => {
  const [base64Input, setBase64Input] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageInfo, setImageInfo] = useState<{
    type: string;
    size: string;
    dimensions?: string;
  } | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const { toast } = useToast();

  const validateAndConvert = (input: string) => {
    if (!input.trim()) {
      setImageUrl("");
      setImageInfo(null);
      setIsValid(true);
      return;
    }

    try {
      let base64Data = input.trim();
      
      // Check if it's a data URL or plain base64
      if (base64Data.startsWith('data:')) {
        // Data URL format
        if (!base64Data.includes('base64,')) {
          setIsValid(false);
          setImageUrl("");
          setImageInfo(null);
          return;
        }
      } else {
        // Plain base64, assume it's an image (default to PNG)
        base64Data = `data:image/png;base64,${base64Data}`;
      }

      // Try to create an image to validate
      const img = new Image();
      img.onload = () => {
        setImageUrl(base64Data);
        setIsValid(true);
        
        // Extract MIME type
        const mimeMatch = base64Data.match(/data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'unknown';
        
        // Calculate size
        const base64String = base64Data.split(',')[1];
        const sizeInBytes = Math.round((base64String.length * 3) / 4);
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        
        setImageInfo({
          type: mimeType,
          size: `${sizeInKB} KB`,
          dimensions: `${img.naturalWidth} × ${img.naturalHeight}px`
        });

        toast({
          title: "Valid Base64 image",
          description: "Image decoded successfully"
        });
      };
      
      img.onerror = () => {
        setIsValid(false);
        setImageUrl("");
        setImageInfo(null);
        toast({
          title: "Invalid Base64",
          description: "The provided Base64 string is not a valid image",
          variant: "destructive"
        });
      };
      
      img.src = base64Data;
    } catch (error) {
      setIsValid(false);
      setImageUrl("");
      setImageInfo(null);
    }
  };

  const handleInputChange = (value: string) => {
    setBase64Input(value);
    validateAndConvert(value);
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      
      // Extract format from MIME type
      const mimeMatch = imageUrl.match(/data:image\/([^;]+);/);
      const format = mimeMatch ? mimeMatch[1] : 'png';
      
      link.download = `decoded-image.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started",
        description: "Image has been downloaded"
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the image",
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setBase64Input("");
    setImageUrl("");
    setImageInfo(null);
    setIsValid(true);
  };

  const loadSampleBase64 = () => {
    // A small sample image (1x1 red pixel PNG)
    const sampleBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    handleInputChange(sampleBase64);
  };

  return (
    <SEOWrapper
      title="Base64 to Image Viewer - Decode Base64 to Images Online"
      description="Decode Base64 strings to images instantly. Preview and download decoded images. Support for all image formats. Free online Base64 decoder."
      keywords="base64 to image, base64 decoder, decode base64, base64 viewer, image decoder"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Base64 to Image Viewer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste any Base64 string to preview and download the decoded image. Supports all image formats.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageDown className="h-5 w-5" />
                    Base64 Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="base64-input">Paste Base64 String</Label>
                      <textarea
                        id="base64-input"
                        value={base64Input}
                        onChange={(e) => handleInputChange(e.target.value)}
                        rows={8}
                        className={`w-full p-3 border rounded-md font-mono text-sm ${
                          !isValid && base64Input ? 'border-destructive' : ''
                        }`}
                        placeholder="Paste your Base64 string here... (with or without data: prefix)"
                      />
                    </div>
                    
                    {!isValid && base64Input && (
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        Invalid Base64 image data
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button onClick={loadSampleBase64} variant="outline" size="sm">
                        Load Sample
                      </Button>
                      <Button onClick={clearAll} variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Section */}
              {imageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Image Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <img
                          src={imageUrl}
                          alt="Decoded from Base64"
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-md border"
                        />
                      </div>
                      
                      {imageInfo && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">Format</p>
                            <p className="text-muted-foreground">{imageInfo.type}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">Size</p>
                            <p className="text-muted-foreground">{imageInfo.size}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">Dimensions</p>
                            <p className="text-muted-foreground">{imageInfo.dimensions}</p>
                          </div>
                        </div>
                      )}
                      
                      <Button onClick={downloadImage} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Paste a Base64 string with or without the "data:image/..." prefix</p>
                    <p>• The tool will automatically detect and validate the image format</p>
                    <p>• Supported formats: PNG, JPG, GIF, WebP, SVG, and more</p>
                    <p>• Click "Load Sample" to see how it works with a test image</p>
                    <p>• Download the decoded image in its original format</p>
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

export default Base64ToImage;
