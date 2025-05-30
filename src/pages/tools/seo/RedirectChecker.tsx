
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const RedirectChecker = () => {
  return (
    <SEOWrapper
      title="URL Redirect Checker - Check Redirect Chains"
      description="Check the redirect path of any URL and analyze 301, 302 redirects and redirect chains."
      keywords="redirect checker, URL redirect, 301 redirect, 302 redirect, redirect chain analyzer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            URL Redirect Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check the redirect path of any URL and analyze redirect chains.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>URL Redirect Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you check URL redirects
                  and analyze redirect chains.
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

export default RedirectChecker;
