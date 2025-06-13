
import SEOWrapper from "@/components/SEOWrapper";

const Terms = () => {
  return (
    <SEOWrapper
      title="Terms of Service - WowsomeTools"
      description="Terms of Service for WowsomeTools - Learn about the terms and conditions for using our free online tools."
      keywords="terms of service, terms and conditions, legal, user agreement"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            📄 Terms of Service for Wowsometools
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome to Wowsometools. By accessing or using our website and tools, you agree to the following Terms of Service.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using Wowsometools, you confirm that you have read, understood, and agreed to these Terms of Service. If you do not agree, please discontinue using the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wowsometools provides free, browser-based utilities such as code formatters, text tools, SEO generators, conversion calculators, and other web utilities designed to enhance digital workflows. All tools operate without requiring sign-ups or installations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">3. User Conduct</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You agree to use our services only for lawful purposes. You must not:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>• Use the tools for any illegal, harmful, or abusive activity</li>
              <li>• Attempt to reverse-engineer, copy, or replicate the functionality for commercial misuse</li>
              <li>• Interfere with site functionality or attempt unauthorized access to the platform</li>
              <li>• Upload or generate malicious code or inputs that could damage the site or other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">4. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              All content, tools, designs, code, and trademarks on Wowsometools are the exclusive property of Wowsometools (unless otherwise stated). You may:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>• Use the tools for personal or commercial projects</li>
              <li>• Share the site or tools freely</li>
              <li>• Not redistribute or sell our tools without explicit permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">5. Tool Output & Accuracy</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our tools are provided "as-is." While we aim for accuracy, we do not guarantee that the output is always:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
              <li>• 100% correct</li>
              <li>• Suitable for every use case</li>
              <li>• Secure from third-party dependencies or browser limitations</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Always validate results before using them in sensitive environments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">6. Availability of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of the website or tools at any time, without prior notice. We are not liable for any service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              To the fullest extent permitted by law, Wowsometools and its team are not liable for any direct, indirect, incidental, or consequential damages that arise from:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
              <li>• Use or inability to use the tools</li>
              <li>• Errors, bugs, or incorrect tool outputs</li>
              <li>• Third-party advertising or linked content</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You use the tools at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">8. Advertisements and Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wowsometools may display advertisements from third-party networks. We do not control the content of these ads and are not responsible for any interaction between you and third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms of Service at any time. Updates will be posted on this page, and continued use of the site implies your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">10. Contact Information</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you have any questions or legal concerns regarding these Terms, please contact us at:
            </p>
            <div className="text-center">
              <a 
                href="mailto:wowsometools@gmail.com" 
                className="text-2xl text-primary hover:underline inline-flex items-center gap-2"
              >
                📧 wowsometools@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Terms;
