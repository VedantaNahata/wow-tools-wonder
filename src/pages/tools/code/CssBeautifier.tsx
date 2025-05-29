
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const CssBeautifier = () => {
  return (
    <SEOWrapper
      title="CSS Beautifier - Format and Beautify CSS Code"
      description="Format and beautify CSS code online. Clean up minified CSS and make it readable with proper indentation and formatting."
      keywords="css beautifier, css formatter, format css, beautify css, css minifier"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSS Beautifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Format and beautify your CSS code for better readability and maintenance.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSS Beautifier</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you format and beautify 
                  your CSS code.
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

export default CssBeautifier;
