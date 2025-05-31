
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Download, 
  Palette, 
  Code, 
  Search, 
  Calculator,
  FileText,
  Image,
  Lock,
  Globe
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All tools work instantly in your browser with no server delays",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your data never leaves your browser - complete privacy guaranteed",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Responsive design that works perfectly on all devices",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Download,
      title: "No Downloads",
      description: "Everything works in your browser - no software installation needed",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lock,
      title: "No Registration",
      description: "Start using any tool immediately without creating an account",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Works Offline",
      description: "Many tools work even when you're offline after first load",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const toolCategories = [
    {
      icon: FileText,
      title: "Text Tools",
      description: "Case conversion, word counting, text manipulation, and more",
      color: "from-blue-500 to-cyan-500",
      count: "11+ Tools"
    },
    {
      icon: Palette,
      title: "Color Tools",
      description: "Color pickers, converters, palette generators, and accessibility checkers",
      color: "from-pink-500 to-rose-500",
      count: "10+ Tools"
    },
    {
      icon: Search,
      title: "SEO Tools",
      description: "Meta tag generators, robots.txt tools, and SEO analyzers",
      color: "from-purple-500 to-pink-500",
      count: "11+ Tools"
    },
    {
      icon: Code,
      title: "Code Tools",
      description: "JSON formatters, CSS beautifiers, and code minifiers",
      color: "from-orange-500 to-red-500",
      count: "4+ Tools"
    },
    {
      icon: Calculator,
      title: "Math Tools",
      description: "Calculators, converters, and mathematical utilities",
      color: "from-indigo-500 to-purple-500",
      count: "12+ Tools"
    },
    {
      icon: Image,
      title: "Image Tools",
      description: "Image compression, base64 conversion, and processing",
      color: "from-green-500 to-emerald-500",
      count: "2+ Tools"
    }
  ];

  return (
    <SEOWrapper
      title="Features - WowsomeTools Free Online Tools"
      description="Discover all the amazing features of WowsomeTools - privacy-first, lightning-fast, and completely free online tools."
      keywords="features, online tools, free tools, privacy, fast tools"
    >
      <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Powerful Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover what makes WowsomeTools the ultimate collection of free online tools 
              for developers, designers, and digital professionals.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose WowsomeTools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader className="text-center pb-4">
                      <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl mx-auto w-fit mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tool Categories */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Tool Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <p className="text-sm text-primary font-medium">{category.count}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers and designers who trust WowsomeTools for their daily workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="inline-block">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors">
                  Explore All Tools
                </button>
              </a>
              <a href="/about" className="inline-block">
                <button className="border border-border bg-background hover:bg-accent px-8 py-3 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Features;
