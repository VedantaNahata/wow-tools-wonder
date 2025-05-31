
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

  const handleCategoryClick = (categoryId: string) => {
    // If we're on the categories page, scroll to section
    if (window.location.pathname === '/categories') {
      const element = document.getElementById(categoryId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to categories page with hash
      window.open(`/categories#${categoryId}`, '_blank', 'noopener,noreferrer');
    }
    setIsMenuOpen(false);
  };

  const categories = [
    { name: "Text Tools", id: "text" },
    { name: "Color Tools", id: "color" },
    { name: "SEO Tools", id: "seo" },
    { name: "Code Tools", id: "code" },
    { name: "Math Tools", id: "math" },
    { name: "Image Tools", id: "image" },
  ];

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

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border-border z-50">
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.name}
                    onClick={() => handleCategoryClick(category.id)}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to="/categories" target="_blank" rel="noopener noreferrer" className="cursor-pointer font-medium">
                    View All Categories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/features" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">Features</Button>
            </Link>
            
            <Link to="/about" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">About</Button>
            </Link>
            
            <Link to="/contact" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">Contact</Button>
            </Link>
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
              <Link to="/categories" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Categories
                </Button>
              </Link>
              <Link to="/features" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Features
                </Button>
              </Link>
              <Link to="/about" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  About
                </Button>
              </Link>
              <Link to="/contact" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
