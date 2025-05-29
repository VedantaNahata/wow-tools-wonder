
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, Code, Image, Text, Book } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const toolCategories = [
    {
      name: "Text Tools",
      icon: Text,
      tools: [
        { name: "Case Converter", path: "/tools/text/case-converter" },
        { name: "Word Counter", path: "/tools/text/word-counter" },
        { name: "Lorem Generator", path: "/tools/text/lorem-generator" },
      ]
    },
    {
      name: "Image Tools",
      icon: Image,
      tools: [
        { name: "Base64 Converter", path: "/tools/image/base64-converter" },
        { name: "Image Compressor", path: "/tools/image/image-compressor" },
      ]
    },
    {
      name: "Web & SEO Tools",
      icon: Search,
      tools: [
        { name: "Meta Tag Generator", path: "/tools/seo/meta-tag-generator" },
        { name: "Robots.txt Tester", path: "/tools/seo/robots-tester" },
      ]
    },
    {
      name: "Code Tools",
      icon: Code,
      tools: [
        { name: "JSON Formatter", path: "/tools/code/json-formatter" },
        { name: "CSS Beautifier", path: "/tools/code/css-beautifier" },
      ]
    },
    {
      name: "Math & Conversion",
      icon: Book,
      tools: [
        { name: "Unit Converter", path: "/tools/math/unit-converter" },
        { name: "Age Calculator", path: "/tools/math/age-calculator" },
      ]
    },
    {
      name: "Color Tools",
      icon: Book,
      tools: [
        { name: "Color Picker", path: "/tools/color/color-picker" },
        { name: "Hex Converter", path: "/tools/color/hex-converter" },
      ]
    }
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">WowsomeTools</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {toolCategories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {category.tools.map((tool) => (
                    <DropdownMenuItem key={tool.path} asChild>
                      <Link to={tool.path} className="w-full">
                        {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {toolCategories.map((category) => (
                  <div key={category.name}>
                    <DropdownMenuLabel className="flex items-center space-x-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </DropdownMenuLabel>
                    {category.tools.map((tool) => (
                      <DropdownMenuItem key={tool.path} asChild>
                        <Link to={tool.path} className="w-full pl-6">
                          {tool.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
