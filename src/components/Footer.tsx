
import { Link } from "react-router-dom";

const Footer = () => {
  const handleSmoothScroll = (targetId: string) => {
    // First navigate to home if not already there
    if (window.location.pathname !== '/') {
      window.location.href = '/';
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

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
              <button 
                onClick={() => handleSmoothScroll('text-tools')} 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
              >
                Text Tools
              </button>
              <button 
                onClick={() => handleSmoothScroll('seo-tools')} 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
              >
                SEO Tools
              </button>
              <button 
                onClick={() => handleSmoothScroll('code-tools')} 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
              >
                Code Tools
              </button>
              <button 
                onClick={() => handleSmoothScroll('color-tools')} 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
              >
                Color Tools
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Company</h4>
            <div className="space-y-2 text-sm">
              <a 
                href="https://wowsometools.com/about" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </a>
              <a 
                href="https://wowsometools.com/features" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Features
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
