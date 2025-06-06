
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const handleCategoryClick = (category: string) => {
    // First navigate to home if not already there
    if (window.location.pathname !== '/') {
      window.location.href = '/';
      setTimeout(() => {
        handleSmoothScroll(category);
      }, 100);
    } else {
      handleSmoothScroll(category);
    }
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
            <a href="https://wowsometools.com/features" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">Features</Button>
            </a>
            <a href="https://wowsometools.com/about" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">About</Button>
            </a>
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
                <DropdownMenuItem 
                  onClick={() => handleCategoryClick('text-tools')}
                  className="cursor-pointer hover:bg-accent"
                >
                  Text Tools
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCategoryClick('image-tools')}
                  className="cursor-pointer hover:bg-accent"
                >
                  Image Tools
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCategoryClick('seo-tools')}
                  className="cursor-pointer hover:bg-accent"
                >
                  SEO Tools
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCategoryClick('code-tools')}
                  className="cursor-pointer hover:bg-accent"
                >
                  Code Tools
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCategoryClick('math-tools')}
                  className="cursor-pointer hover:bg-accent"
                >
                  Math & Conversion
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleCategoryClick('color-tools')}
                  className="cursor-pointer hover:bg-accent"
                >
                  Color Tools
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="https://wowsometools.com/contact" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">Contact</Button>
            </a>
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
              <a href="https://wowsometools.com/features" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Features
                </Button>
              </a>
              <a href="https://wowsometools.com/about" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  About
                </Button>
              </a>
              <Button 
                variant="ghost" 
                className="w-full justify-start cursor-pointer"
                onClick={() => handleCategoryClick('tools')}
              >
                All Tools
              </Button>
              <a href="https://wowsometools.com/contact" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
