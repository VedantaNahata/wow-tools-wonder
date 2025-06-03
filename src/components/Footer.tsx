
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-primary mb-4">WowsomeTools</h3>
            <p className="text-muted-foreground mb-4">
              Your go-to collection of powerful online tools for developers, designers, 
              and digital professionals. All tools are free and work directly in your browser.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 WowsomeTools. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/text/case-converter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Case Converter
                </Link>
              </li>
              <li>
                <Link to="/tools/code/json-formatter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link to="/tools/color/color-picker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Color Picker
                </Link>
              </li>
              <li>
                <Link to="/tools/seo/meta-tag-generator" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Meta Tag Generator
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
