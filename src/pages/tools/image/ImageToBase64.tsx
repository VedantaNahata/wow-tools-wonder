
import { useState, useRef } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import { Upload, Copy, Download, ImageUp, Trash2 } from "lucide-react";

const ImageToBase64 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Result, setBase64Result] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, GIF, WebP, etc.)",
          variant: "destructive"
        });
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      convertToBase64(file);
    }
  };

  const convertToBase64 = async (file: File) => {
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBase64Result(result);
        setIsProcessing(false);
        toast({
          title: "Conversion successful",
          description: "Image has been converted to Base64 format"
        });
      };
      reader.onerror = () => {
        setIsProcessing(false);
        toast({
          title: "Conversion failed",
          description: "Failed to read the image file",
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "An error occurred during conversion",
        variant: "destructive"
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      convertToBase64(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(base64Result);
      toast({
        title: "Copied to clipboard",
        description: "Base64 string has been copied to your clipboard"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadBase64 = () => {
    const element = document.createElement('a');
    const file = new Blob([base64Result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedFile?.name || 'image'}_base64.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Download started",
      description: "Base64 file has been downloaded"
    });
  };

  const clearAll = () => {
    setSelectedFile(null);
    setBase64Result("");
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <SEOWrapper
      title="Image to Base64 Converter - Convert Images to Base64 Online"
      description="Convert any image to Base64 encoding instantly. Upload JPG, PNG, GIF, WebP images and get Base64 string with download option. Free online tool."
      keywords="image to base64, base64 converter, image encoder, base64 generator, convert image"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image to Base64 Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload any image and instantly convert it to Base64 format. Perfect for web development and data embedding.
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
                    <ImageUp className="h-5 w-5" />
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
                        Supports JPG, PNG, GIF, WebP (max 10MB)
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
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
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

              {/* Preview Section */}
              {previewUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Image Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Base64 Result Section */}
              {base64Result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Base64 Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="base64-output">Base64 String</Label>
                        <textarea
                          id="base64-output"
                          value={base64Result}
                          readOnly
                          rows={8}
                          className="w-full p-3 border rounded-md bg-muted/50 font-mono text-sm"
                          placeholder="Base64 string will appear here..."
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={copyToClipboard} className="flex-1">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy to Clipboard
                        </Button>
                        <Button onClick={downloadBase64} variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download as File
                        </Button>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p><strong>Size:</strong> {(base64Result.length / 1024).toFixed(2)} KB</p>
                        <p><strong>Format:</strong> Data URL (includes MIME type)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isProcessing && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p>Converting image to Base64...</p>
                    </div>
                  </CardContent>
                </Card>
              )}
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

export default ImageToBase64;
