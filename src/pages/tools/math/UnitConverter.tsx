
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const UnitConverter = () => {
  return (
    <SEOWrapper
      title="Unit Converter - Convert Between Different Units"
      description="Convert between different units of measurement including length, weight, temperature, volume, and more."
      keywords="unit converter, measurement converter, length converter, weight converter, temperature converter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unit Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different units of measurement including length, weight, and temperature.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Unit Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will help you convert between 
                  different units of measurement.
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

export default UnitConverter;
