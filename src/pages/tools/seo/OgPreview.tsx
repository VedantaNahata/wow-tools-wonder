
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const OgPreview = () => {
  return (
    <SEOWrapper
      title="Open Graph Preview Tool - Social Media Link Preview"
      description="Preview how your link will look when shared on social media platforms with Open Graph meta tags."
      keywords="open graph preview, social media preview, OG tags, link preview, Facebook preview"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Open Graph Preview Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preview how your link will look when shared on social media platforms.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Open Graph Preview Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you preview how your links
                  will appear when shared on social media.
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

export default OgPreview;
