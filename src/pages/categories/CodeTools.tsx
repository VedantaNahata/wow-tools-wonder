
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, FileCode, Table, Download, Upload, Braces } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";

const CodeTools = () => {
  const tools = [
    {
      title: "JSON Formatter",
      description: "Format, validate and beautify JSON data with syntax highlighting",
      icon: Braces,
      path: "/code/json-formatter",
      category: "Formatting"
    },
    {
      title: "JavaScript Beautifier",
      description: "Format messy JS code into clean, indented code",
      icon: FileCode,
      path: "/code/javascript-beautifier",
      category: "Formatting"
    },
    {
      title: "HTML Beautifier",
      description: "Auto-format your HTML for better readability",
      icon: Code,
      path: "/code/html-beautifier",
      category: "Formatting"
    },
    {
      title: "CSS Beautifier",
      description: "Format and organize CSS code with proper indentation",
      icon: Code,
      path: "/code/css-beautifier",
      category: "Formatting"
    },
    {
      title: "JavaScript Minifier",
      description: "Compress JavaScript code by removing whitespace and comments",
      icon: FileCode,
      path: "/code/javascript-minifier",
      category: "Minification"
    },
    {
      title: "HTML Minifier",
      description: "Minimize HTML file size for production deployment",
      icon: Code,
      path: "/code/html-minifier",
      category: "Minification"
    },
    {
      title: "CSS Minifier",
      description: "Minify CSS code to reduce file size for production",
      icon: Code,
      path: "/code/css-minifier",
      category: "Minification"
    },
    {
      title: "HTML Table Generator",
      description: "Create custom HTML tables by entering rows, columns, and data",
      icon: Table,
      path: "/code/html-table-generator",
      category: "Table Tools"
    },
    {
      title: "Excel to HTML Converter",
      description: "Paste Excel cells or upload CSV → get responsive HTML table code",
      icon: Upload,
      path: "/code/excel-to-html",
      category: "Table Tools"
    },
    {
      title: "Markdown Table Generator",
      description: "Create markdown tables via a simple UI, then export the code",
      icon: Table,
      path: "/code/markdown-table-generator",
      category: "Table Tools"
    },
    {
      title: "CSV to Table Converter",
      description: "Paste or upload CSV → view formatted table + export as HTML/Markdown",
      icon: Download,
      path: "/code/csv-to-table",
      category: "Table Tools"
    },
    {
      title: "JSON to HTML Table",
      description: "Paste JSON array of objects → get a clean HTML table",
      icon: Table,
      path: "/code/json-to-html-table",
      category: "Table Tools"
    }
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <SEOWrapper
      title="Code Tools - Free Online Development Utilities"
      description="Free online code tools for developers including formatters, minifiers, beautifiers, and table generators. Format JSON, minify CSS/JS/HTML, and create tables."
      keywords="code tools, json formatter, javascript minifier, html beautifier, css minifier, table generator, developer tools"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Code Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional code formatting, minification, and table generation tools for developers.
            Format, beautify, and optimize your code with our free online utilities.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="category-header" className="mb-12" />

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold text-foreground mb-6 border-b pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools
                  .filter(tool => tool.category === category)
                  .map((tool) => (
                    <Card key={tool.path} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <tool.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full">
                          <Link to={tool.path}>
                            Use Tool
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <AdSenseBox format="horizontal" slot="category-footer" />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default CodeTools;
