
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calculator, Percent, Hash, Binary, TrendingUp, Grid3X3, CheckSquare, SquareRoot, Target, CircleDot, Ruler } from "lucide-react";

const MathTools = () => {
  const tools = [
    {
      name: "Age Calculator",
      description: "Calculate age in years, months, and days",
      path: "/math/age-calculator",
      icon: Calculator
    },
    {
      name: "Percentage Calculator",
      description: "Calculate percentages, discounts, and ratios",
      path: "/math/percentage-calculator",
      icon: Percent
    },
    {
      name: "Base Converter",
      description: "Convert numbers between different bases",
      path: "/math/base-converter",
      icon: Binary
    },
    {
      name: "Interest Calculator",
      description: "Calculate simple and compound interest",
      path: "/math/interest-calculator",
      icon: TrendingUp
    },
    {
      name: "Matrix Calculator",
      description: "Perform matrix operations and calculations",
      path: "/math/matrix-calculator",
      icon: Grid3X3
    },
    {
      name: "Prime Checker",
      description: "Check if a number is prime",
      path: "/math/prime-checker",
      icon: CheckSquare
    },
    {
      name: "Quadratic Solver",
      description: "Solve quadratic equations",
      path: "/math/quadratic-solver",
      icon: SquareRoot
    },
    {
      name: "Factorial Calculator",
      description: "Calculate factorial of numbers",
      path: "/math/factorial-calculator",
      icon: Hash
    },
    {
      name: "LCM & HCF Finder",
      description: "Find LCM and HCF of numbers",
      path: "/math/lcm-hcf-finder",
      icon: Target
    },
    {
      name: "Expression Simplifier",
      description: "Simplify mathematical expressions",
      path: "/math/expression-simplifier",
      icon: CircleDot
    },
    {
      name: "Unit Converter",
      description: "Convert between different units",
      path: "/math/unit-converter",
      icon: Ruler
    }
  ];

  return (
    <SEOWrapper
      title="Math Tools - Mathematical Calculators and Converters"
      description="Free online math tools including calculators, converters, and mathematical utilities for students and professionals."
      keywords="math tools, calculator, percentage calculator, unit converter, mathematical tools"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🧮 Math Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mathematical calculators, converters, and utilities for students, professionals, and anyone working with numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link key={index} to={tool.path}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </SEOWrapper>
  );
};

export default MathTools;
