
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, Zap } from "lucide-react";

const About = () => {
  return (
    <SEOWrapper
      title="About WowsomeTools - Free Online Tools for Everyone"
      description="Learn about WowsomeTools - your ultimate collection of free online tools for developers, designers, and digital professionals."
      keywords="about wowsome tools, free tools, online tools, developer tools"
    >
      <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              About WowsomeTools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're passionate about creating the best collection of free online tools 
              to help developers, designers, and digital professionals work more efficiently.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto w-fit mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Built by developers for developers. We understand your needs because we share them.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mx-auto w-fit mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">Always Free</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  No subscriptions, no hidden fees. All tools are completely free to use forever.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto w-fit mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">Privacy Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  All processing happens in your browser. Your data never leaves your device.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-3">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mx-auto w-fit mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  No server delays. All tools work instantly in your browser for maximum speed.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-center leading-relaxed mb-6">
                WowsomeTools was born from a simple frustration: having to search for different tools 
                across multiple websites, deal with ads, sign-ups, and limitations. We believed there 
                had to be a better way.
              </p>
              <p className="text-center leading-relaxed mb-6">
                So we created WowsomeTools - a comprehensive suite of free online tools that work 
                entirely in your browser. No accounts, no tracking, no limits. Just pure functionality 
                when you need it.
              </p>
              <p className="text-center leading-relaxed">
                Today, we're proud to serve thousands of developers, designers, and digital professionals 
                worldwide with over 50 carefully crafted tools that save time and boost productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default About;
