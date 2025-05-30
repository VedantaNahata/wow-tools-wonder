
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const SerpPreview = () => {
  return (
    <SEOWrapper
      title="Google SERP Snippet Preview - Search Result Preview Tool"
      description="Simulate how your page title and meta description will appear in Google search results."
      keywords="SERP preview, Google search preview, search snippet, title tag preview, meta description preview"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Google SERP Snippet Preview
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simulate how your page will appear in Google search results.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>SERP Snippet Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you preview how your page
                  will appear in search results.
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

export default SerpPreview;
