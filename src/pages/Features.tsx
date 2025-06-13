
import SEOWrapper from "@/components/SEOWrapper";

const Features = () => {
  const features = [
    {
      emoji: "⚡",
      title: "Blazing Fast, No Installs",
      description: "All tools run 100% in your browser — no downloads, no waiting. Just load and go."
    },
    {
      emoji: "🎯",
      title: "Built for Everyone — From Beginners to Pros",
      description: "Whether you're a student, creator, developer, or just curious, our tools help you get things done — fast, free, and hassle-free."
    },
    {
      emoji: "🧰",
      title: "All-in-One Toolbox",
      description: "From image editing and SEO utilities to code minifiers and text converters — every category covered in one place."
    },
    {
      emoji: "💡",
      title: "Open & Effortless",
      description: "No logins. No limits. Just clean, fast tools that anyone can use anytime."
    },
    {
      emoji: "🔐",
      title: "Privacy-First",
      description: "Everything runs locally — we don't store your data or files. Ever."
    },
    {
      emoji: "📱",
      title: "Fully Responsive",
      description: "Use Wowsometools on desktop, tablet, or mobile. Every tool is built to adapt and perform."
    }
  ];

  return (
    <SEOWrapper
      title="Features - What Makes Wowsometools Stand Out"
      description="Discover the features that make Wowsometools the best online toolkit - blazing fast, privacy-first, and completely free tools for everyone."
      keywords="online tools features, browser tools, privacy tools, free web utilities, responsive tools"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🚀 Features That Make Wowsometools Stand Out
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="text-5xl mb-4">
                {feature.emoji}
              </div>
              <h2 className="text-xl font-bold text-foreground leading-tight">
                {feature.title}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
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
