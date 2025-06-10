
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Zap, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast",
      description: "All tools work instantly in your browser with no server processing delays."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "100% Private",
      description: "Your data never leaves your device. Everything is processed locally."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "No Installation",
      description: "Access all tools directly from your web browser. No downloads required."
    }
  ];

  const toolCategories = [
    "Text Processing Tools",
    "Code Formatting & Validation",
    "SEO Optimization Tools", 
    "Color & Design Utilities",
    "Math & Conversion Tools",
    "Image Processing Tools"
  ];

  return (
    <SEOWrapper
      title="Features - WowsomeTools"
      description="Discover the powerful features of WowsomeTools. Lightning fast, completely private, and accessible from any browser."
      keywords="features, online tools, privacy, fast tools, web tools"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need in a comprehensive toolkit, designed for developers, 
            designers, and digital professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center h-full">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Tool Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-foreground text-lg">{category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose WowsomeTools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">For Developers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Code formatters, validators, converters, and debugging tools to streamline your workflow.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">For Designers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Color tools, gradient generators, and image utilities to enhance your creative process.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">For SEO Specialists</h3>
              <p className="text-muted-foreground leading-relaxed">
                Meta tag generators, robots.txt tools, and SEO analyzers to optimize your content.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">For Everyone</h3>
              <p className="text-muted-foreground leading-relaxed">
                Text processors, calculators, and converters for everyday productivity needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Features;
