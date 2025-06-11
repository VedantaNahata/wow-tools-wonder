
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
      icon: <Zap className="h-12 w-12" />,
      title: "Blazing Fast, No Installs",
      description: "All tools run 100% in your browser — no downloads, no waiting. Just load and go.",
      emoji: "⚡"
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Built for Everyone — From Beginners to Pros",
      description: "Whether you're a student, creator, developer, or just curious, our tools help you get things done — fast, free, and hassle-free.",
      emoji: "🎯"
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "All-in-One Toolbox",
      description: "From image editing and SEO utilities to code minifiers and text converters — every category covered in one place.",
      emoji: "🧰"
    },
    {
      icon: <Lightbulb className="h-12 w-12" />,
      title: "Open & Effortless",
      description: "No logins. No limits. Just clean, fast tools that anyone can use anytime.",
      emoji: "💡"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Privacy-First",
      description: "Everything runs locally — we don't store your data or files. Ever.",
      emoji: "🔐"
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Fully Responsive",
      description: "Use Wowsometools on desktop, tablet, or mobile. Every tool is built to adapt and perform.",
      emoji: "📱"
    }
  ];

  return (
    <SEOWrapper
      title="Features - What Makes Wowsometools Stand Out"
      description="Discover the features that make Wowsometools the best online toolkit - blazing fast, privacy-first, and completely free tools for everyone."
      keywords="online tools features, browser tools, privacy tools, free web utilities, responsive tools"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            🚀 Features That Make Wowsometools Stand Out
          </h1>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-6 p-6 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="text-4xl flex-shrink-0">
                {feature.emoji}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Features;
