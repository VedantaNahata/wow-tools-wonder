
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const BrokenLinkChecker = () => {
  return (
    <SEOWrapper
      title="Broken Link Checker - HTML Link Validator"
      description="Scan pasted HTML code for broken anchor tags and invalid links to improve SEO."
      keywords="broken link checker, HTML validator, link checker, SEO tools, dead link finder"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Broken Link Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan HTML code for broken anchor tags and invalid links.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Broken Link Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you find broken links
                  in your HTML code.
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

export default BrokenLinkChecker;
