
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need in a comprehensive toolkit, designed for developers, 
            designers, and digital professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Tool Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-foreground">{category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose WowsomeTools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-3">For Developers</h3>
              <p className="text-muted-foreground">
                Code formatters, validators, converters, and debugging tools to streamline your workflow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">For Designers</h3>
              <p className="text-muted-foreground">
                Color tools, gradient generators, and image utilities to enhance your creative process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">For SEO Specialists</h3>
              <p className="text-muted-foreground">
                Meta tag generators, robots.txt tools, and SEO analyzers to optimize your content.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">For Everyone</h3>
              <p className="text-muted-foreground">
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
