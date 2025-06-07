
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Bug, Lightbulb } from "lucide-react";

const Contact = () => {
  return (
    <SEOWrapper
      title="Contact - WowsomeTools"
      description="Get in touch with the WowsomeTools team. Report bugs, suggest features, or ask questions about our tools."
      keywords="contact, support, feedback, bug report, feature request"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with questions, feedback, or suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Bug className="h-6 w-6 text-primary" />
                <CardTitle>Report a Bug</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Found something that's not working as expected? Let us know and we'll fix it quickly.
              </p>
              <a 
                href="mailto:support@wowsometools.com?subject=Bug Report"
                className="text-primary hover:underline"
              >
                support@wowsometools.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                <CardTitle>Feature Request</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Have an idea for a new tool or feature? We're always looking to improve!
              </p>
              <a 
                href="mailto:features@wowsometools.com?subject=Feature Request"
                className="text-primary hover:underline"
              >
                features@wowsometools.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>General Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Have questions about how to use our tools or need general support?
              </p>
              <a 
                href="mailto:hello@wowsometools.com?subject=General Question"
                className="text-primary hover:underline"
              >
                hello@wowsometools.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <CardTitle>Business Inquiries</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Interested in partnerships, integrations, or business opportunities?
              </p>
              <a 
                href="mailto:business@wowsometools.com?subject=Business Inquiry"
                className="text-primary hover:underline"
              >
                business@wowsometools.com
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Quick Response Promise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We typically respond to all emails within 24 hours. For urgent bug reports, 
            we often respond much faster. We read every message and genuinely appreciate your feedback!
          </p>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Contact;
