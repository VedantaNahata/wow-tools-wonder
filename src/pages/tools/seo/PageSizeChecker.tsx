
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const PageSizeChecker = () => {
  return (
    <SEOWrapper
      title="Page Size Checker - Website Performance Analyzer"
      description="Calculate the size of a given URL's content and analyze resource weight for better performance."
      keywords="page size checker, website performance, page weight analyzer, site speed test"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Size Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate the size and weight of your website pages for better performance.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Page Size Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you analyze page size
                  and performance metrics.
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

export default PageSizeChecker;
