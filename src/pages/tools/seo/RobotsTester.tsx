
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const RobotsTester = () => {
  return (
    <SEOWrapper
      title="Robots.txt Tester - Validate Your Robots.txt File"
      description="Test and validate your robots.txt file to ensure proper search engine crawling. Check syntax and robot directives."
      keywords="robots.txt tester, robots.txt validator, SEO tools, search engine optimization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Robots.txt Tester
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test and validate your robots.txt file to ensure proper search engine crawling.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Robots.txt Tester</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you test and validate 
                  your robots.txt file.
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

export default RobotsTester;
