
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const AltTagChecker = () => {
  return (
    <SEOWrapper
      title="Alt Tag Checker - Image Accessibility Validator"
      description="Check for missing or empty alt attributes in HTML image tags for better SEO and accessibility."
      keywords="alt tag checker, image alt text, accessibility checker, SEO image optimization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alt Tag Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check for missing or empty alt attributes in HTML image tags.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Alt Tag Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you check alt tags
                  in your HTML images.
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

export default AltTagChecker;
