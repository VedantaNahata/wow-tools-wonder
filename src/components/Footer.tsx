
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-foreground">
                Wowsome<span className="text-primary">Tools</span>
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your ultimate collection of free online tools for developers, designers, 
              and digital professionals. All tools work directly in your browser with 
              complete privacy.
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 px-2 py-1 rounded">✨ No Registration</span>
              <span className="bg-primary/10 px-2 py-1 rounded">🚀 Works Offline</span>
              <span className="bg-primary/10 px-2 py-1 rounded">🔒 Privacy First</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/text/case-converter" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Case Converter
                </Link>
              </li>
              <li>
                <Link 
                  to="/text/word-counter" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Word Counter
                </Link>
              </li>
              <li>
                <Link 
                  to="/seo/meta-tag-generator" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Meta Tag Generator
                </Link>
              </li>
              <li>
                <Link 
                  to="/code/json-formatter" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  JSON Formatter
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Pages</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/categories" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 WowsomeTools. All rights reserved. Made with ❤️ for developers and designers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
