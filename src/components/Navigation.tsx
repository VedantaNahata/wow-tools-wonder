
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

const Navigation = () => {
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
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/tools/text">
              <Button variant="ghost">Text Tools</Button>
            </Link>
            <Link to="/tools/image/base64-converter">
              <Button variant="ghost">Image Tools</Button>
            </Link>
            <Link to="/tools/seo/meta-tag-generator">
              <Button variant="ghost">SEO Tools</Button>
            </Link>
            <Link to="/tools/code/json-formatter">
              <Button variant="ghost">Code Tools</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Link to="/">
              <Button variant="ghost" size="sm">Menu</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
