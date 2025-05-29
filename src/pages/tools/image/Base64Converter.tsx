
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const Base64Converter = () => {
  return (
    <SEOWrapper
      title="Base64 Image Converter - Convert Images to Base64"
      description="Convert images to Base64 encoding and decode Base64 back to images. Free online tool for web developers."
      keywords="base64 converter, image to base64, base64 to image, encode decode"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Base64 Image Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert images to Base64 encoding and decode Base64 strings back to images.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Base64 Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will allow you to convert images to Base64 
                  encoding and decode Base64 strings back to images.
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

export default Base64Converter;
