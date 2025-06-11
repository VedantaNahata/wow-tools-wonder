
import SEOWrapper from "@/components/SEOWrapper";
import { 
  Zap, 
  Target, 
  Wrench, 
  Lightbulb, 
  Shield, 
  Smartphone
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Blazing Fast, No Installs",
      description: "All tools run 100% in your browser — no downloads, no waiting. Just load and go.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Built for Everyone — From Beginners to Pros",
      description: "Whether you're a student, creator, developer, or just curious, our tools help you get things done — fast, free, and hassle-free.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "All-in-One Toolbox",
      description: "From image editing and SEO utilities to code minifiers and text converters — every category covered in one place.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Open & Effortless",
      description: "No logins. No limits. Just clean, fast tools that anyone can use anytime.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy-First",
      description: "Everything runs locally — we don't store your data or files. Ever.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Fully Responsive",
      description: "Use Wowsometools on desktop, tablet, or mobile. Every tool is built to adapt and perform.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <SEOWrapper
      title="Features - What Makes Wowsometools Stand Out"
      description="Discover the features that make Wowsometools the best online toolkit - blazing fast, privacy-first, and completely free tools for everyone."
      keywords="online tools features, browser tools, privacy tools, free web utilities, responsive tools"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🚀 Features That Make Wowsometools Stand Out
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Features;
