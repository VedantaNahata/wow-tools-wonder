
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
              <Link to="/text/text-encryptor" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Text Encryptor
              </Link>
              <Link to="/image/image-resizer" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Image Resizer
              </Link>
              <Link to="/seo/meta-tag-generator" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Meta Tag Generator
              </Link>
              <Link to="/code/html-table-generator" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                HTML Table Generator
              </Link>
              <Link to="/color/gradient-generator" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Gradient Generator
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
                onClick={() => handleSmoothScroll('image-tools')} 
                className="block text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
              >
                Image Tools
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
              <Link 
                to="/about" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </Link>
              <Link 
                to="/features" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Features
              </Link>
              <Link 
                to="/contact" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </Link>
              <Link 
                to="/privacy" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 WowsomeTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
