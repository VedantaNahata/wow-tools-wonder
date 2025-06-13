
import SEOWrapper from "@/components/SEOWrapper";

const Privacy = () => {
  return (
    <SEOWrapper
      title="Privacy Policy - WowsomeTools"
      description="Privacy Policy for WowsomeTools - Learn how we protect your data and privacy while using our free online tools."
      keywords="privacy policy, data protection, user privacy, browser tools"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            🛡️ Privacy Policy for Wowsometools
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Wowsometools, we respect your privacy and are committed to protecting the personal data of our users. This Privacy Policy outlines what information we collect, how we use it, and your rights in relation to that information.
          </p>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">1. Information We Do Not Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We have designed Wowsometools to work without requiring you to sign up, log in, or provide any personal information. Specifically:
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✅</span>
                <span>We do not collect names, email addresses, or contact info.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✅</span>
                <span>We do not store files, images, or any user-uploaded data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✅</span>
                <span>We do not track individual user activity across tools.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✅</span>
                <span>We do not use forms for data submission.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">2. Data Processed in the Browser Only</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All the tools provided on Wowsometools operate entirely in your browser using client-side code. This means:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6">
              <li>• Your data never leaves your device.</li>
              <li>• Processing happens locally.</li>
              <li>• We don't and can't access or save your inputs.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">3. Analytics & Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We use analytics services (e.g., Google Analytics) to improve our platform. These tools may collect non-personally identifiable information, such as:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 mb-8">
              <li>• Browser type and version</li>
              <li>• Device type and OS</li>
              <li>• Referring URLs</li>
              <li>• Anonymous usage patterns</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Cookies may be used solely for:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 mt-4 mb-6">
              <li>• Site performance optimization</li>
              <li>• Tracking aggregated site behavior</li>
              <li>• Preventing abuse (rate limiting)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do not use cookies to track individual users or for retargeting advertising.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">4. Third-Party Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may serve ads through networks like Google AdSense or others. These third parties may:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 mt-4 mb-6">
              <li>• Use cookies to serve personalized ads based on your visit</li>
              <li>• Collect anonymous data to improve ad targeting</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out of personalized ads by visiting Google's Ad Settings.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">5. External Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our site may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              While we don't collect user data, we ensure all tools are secure and sanitized against potential browser-based threats such as:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 mb-6">
              <li>• Cross-site scripting (XSS)</li>
              <li>• Malicious input handling</li>
              <li>• Unsafe file type support</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We regularly review and update the tools to maintain security.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">7. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wowsometools is not intended for use by children under the age of 13. We do not knowingly collect any information from children.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">8. User Rights (GDPR/CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              As we do not collect or store personal data, most rights under GDPR/CCPA do not apply. However, if you believe any identifiable information has been collected, you have the right to:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 mb-6">
              <li>• Request deletion of your data</li>
              <li>• Request details on what data we may have (if any)</li>
              <li>• Contact us with questions or complaints</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can reach us at{" "}
              <a 
                href="mailto:wowsometools@gmail.com" 
                className="text-primary hover:underline"
              >
                wowsometools@gmail.com
              </a>{" "}
              for any such requests.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy as laws or features change. When we do, we'll revise the "Effective Date" above. Continued use of Wowsometools implies acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have questions or concerns regarding this policy, feel free to email us at:
            </p>
            <div className="text-center">
              <a 
                href="mailto:wowsometools@gmail.com" 
                className="text-xl text-primary hover:underline inline-flex items-center gap-2"
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

export default Privacy;
