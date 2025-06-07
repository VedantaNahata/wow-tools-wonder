
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About WowsomeTools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to provide the best free online tools while respecting your privacy.
          </p>
        </div>

        <div className="prose max-w-4xl mx-auto mb-16">
          <div className="bg-muted/30 rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              WowsomeTools was born from a simple idea: everyone should have access to powerful, 
              professional-grade tools without compromising their privacy or paying hefty subscription fees. 
              We believe that the best tools are those that work instantly, respect your data, 
              and help you get things done efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize access to professional tools and make them available to everyone, everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Privacy first, user-centric design, and completely free access to essential tools.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Serving developers, designers, marketers, and digital professionals worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Why We Built This</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Privacy Matters:</strong> Your data should stay with you. 
                All our tools process information locally in your browser.
              </p>
              <p>
                <strong className="text-foreground">Speed is Essential:</strong> We believe tools should work 
                instantly, without loading screens or server delays.
              </p>
              <p>
                <strong className="text-foreground">Accessibility for All:</strong> Professional tools shouldn't 
                be locked behind paywalls. Quality should be free.
              </p>
              <p>
                <strong className="text-foreground">Simplicity Works:</strong> Complex tasks should have simple 
                solutions. No unnecessary complications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default About;
