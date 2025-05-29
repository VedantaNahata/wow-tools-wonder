
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const ImageCompressor = () => {
  return (
    <SEOWrapper
      title="Image Compressor - Compress Images Online"
      description="Compress images online to reduce file size while maintaining quality. Support for JPEG, PNG, and WebP formats."
      keywords="image compressor, compress images, reduce file size, optimize images"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Image Compressor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compress your images to reduce file size while maintaining quality.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Image Compressor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you compress images to reduce 
                  file size while maintaining quality.
                </p>
              </CardContent>
            </Card>
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
