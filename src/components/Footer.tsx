
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">WowsomeTools</h3>
            <p className="text-sm text-muted-foreground">
              Free online tools for developers, designers, and digital professionals. 
              All tools work directly in your browser with complete privacy.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Popular Tools</h4>
            <div className="space-y-2 text-sm">
              <Link to="/text/case-converter" className="block text-muted-foreground hover:text-foreground transition-colors">
                Case Converter
              </Link>
              <Link to="/text/word-counter" className="block text-muted-foreground hover:text-foreground transition-colors">
                Word Counter
              </Link>
              <Link to="/code/json-formatter" className="block text-muted-foreground hover:text-foreground transition-colors">
                JSON Formatter
              </Link>
              <Link to="/color/color-picker" className="block text-muted-foreground hover:text-foreground transition-colors">
                Color Picker
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Categories</h4>
            <div className="space-y-2 text-sm">
              <a href="#tools" className="block text-muted-foreground hover:text-foreground transition-colors">
                Text Tools
              </a>
              <a href="#tools" className="block text-muted-foreground hover:text-foreground transition-colors">
                SEO Tools
              </a>
              <a href="#tools" className="block text-muted-foreground hover:text-foreground transition-colors">
                Code Tools
              </a>
              <a href="#tools" className="block text-muted-foreground hover:text-foreground transition-colors">
                Color Tools
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Company</h4>
            <div className="space-y-2 text-sm">
              <a 
                href="https://wowsometools.com" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </a>
              <a 
                href="https://wowsometools.com/contact" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
              <a 
                href="https://wowsometools.com/privacy" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <a 
                href="https://wowsometools.com/terms" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 <a href="https://wowsometools.com" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">WowsomeTools</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
