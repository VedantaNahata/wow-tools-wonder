
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdSenseBox from "@/components/AdSenseBox";

const ColorPicker = () => {
  return (
    <SEOWrapper
      title="Color Picker - Pick and Explore Colors"
      description="Advanced color picker tool to select, explore, and work with colors. Get hex, RGB, HSL values and create color palettes."
      keywords="color picker, color selector, hex color, rgb color, hsl color, color palette"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Color Picker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick and explore colors with our advanced color picker tool.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Color Picker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is coming soon! It will provide an advanced color 
                  picker with multiple color format support.
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

export default ColorPicker;
