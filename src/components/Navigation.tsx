
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">WowsomeTools</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Button 
              variant="ghost" 
              onClick={() => handleSmoothScroll('tools')}
              className="cursor-pointer"
            >
              Text Tools
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => handleSmoothScroll('tools')}
              className="cursor-pointer"
            >
              Image Tools
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => handleSmoothScroll('tools')}
              className="cursor-pointer"
            >
              SEO Tools
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => handleSmoothScroll('tools')}
              className="cursor-pointer"
            >
              Code Tools
            </Button>
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start cursor-pointer"
                onClick={() => handleSmoothScroll('tools')}
              >
                All Tools
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
