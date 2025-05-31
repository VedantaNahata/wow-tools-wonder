
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Github, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <SEOWrapper
      title="Contact WowsomeTools - Get in Touch"
      description="Contact WowsomeTools team for support, feature requests, or feedback. We'd love to hear from you!"
      keywords="contact, support, feedback, wowsome tools"
    >
      <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions, suggestions, or just want to say hello? 
              We'd love to hear from you!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto w-fit mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Email Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  For general inquiries, feature requests, or technical support
                </p>
                <Button size="lg" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-6">
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto w-fit mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Feedback</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Share your thoughts and help us improve our tools
                </p>
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Give Feedback
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-center mb-8">Follow Us</h2>
            <div className="flex justify-center gap-6">
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Twitter className="h-5 w-5" />
                Twitter
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Quick Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Check out our frequently asked questions or browse our tool documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline">
                View FAQ
              </Button>
              <Button size="lg" variant="outline">
                Tool Docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Contact;
