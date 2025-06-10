
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <SEOWrapper
      title="About - WowsomeTools"
      description="Learn about WowsomeTools - our mission to provide free, privacy-focused online tools for developers and digital professionals."
      keywords="about, mission, team, privacy, online tools"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            About WowsomeTools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to provide the best free online tools while respecting your privacy and data.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-muted/30 rounded-lg p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              WowsomeTools was created to solve a fundamental problem in the digital world: the lack of 
              accessible, privacy-respecting tools for everyday tasks. We noticed that most online tools 
              either compromise user privacy, require expensive subscriptions, or lack the quality and 
              features that professionals need.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform represents a new approach - providing enterprise-grade tools that work entirely 
              in your browser, ensuring your data stays private while delivering the performance and 
              reliability you deserve. Every tool is crafted with attention to detail and user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center h-full">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <Target className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize access to professional-grade tools and make them available to everyone, 
                  everywhere, without compromising privacy or requiring payment.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center h-full">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Privacy first, user-centric design, complete accessibility, and unwavering commitment 
                  to quality in every tool we create.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center h-full">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Serving millions of developers, designers, marketers, students, and digital professionals 
                  worldwide with reliable, fast tools.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Principles</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Privacy by Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is yours alone. Every tool processes information locally in your browser, 
                  ensuring that sensitive data never leaves your device or gets stored on our servers.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Performance First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe tools should work instantly. Our client-side processing eliminates loading 
                  screens and server delays, providing immediate results for better productivity.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Universal Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quality tools shouldn't be locked behind paywalls. We're committed to keeping all 
                  features free and accessible to users regardless of their economic situation.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Elegant Simplicity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complex tasks deserve simple solutions. We design intuitive interfaces that make 
                  powerful functionality accessible to users of all skill levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default About;
