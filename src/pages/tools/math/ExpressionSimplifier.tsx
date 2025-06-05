
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ExpressionSimplifier = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<any>(null);

  const simplifyExpression = () => {
    if (!expression.trim()) {
      alert("Please enter an expression");
      return;
    }

    try {
      // Basic simplification for like terms
      const simplified = simplifyAlgebraic(expression);
      setResult({
        original: expression,
        simplified: simplified,
        steps: getSimplificationSteps(expression, simplified)
      });
    } catch (error) {
      alert("Invalid expression. Please check your input.");
    }
  };

  const simplifyAlgebraic = (expr: string): string => {
    // Remove spaces
    let cleaned = expr.replace(/\s/g, '');
    
    // Handle basic like terms (very simplified version)
    // This is a basic implementation - in reality, you'd need a proper parser
    
    // Find coefficients of x terms
    const xTerms = cleaned.match(/[+-]?\d*x/g) || [];
    const constants = cleaned.match(/[+-]?\d+(?!x)/g) || [];
    
    let xCoeff = 0;
    let constantSum = 0;
    
    // Sum x coefficients
    xTerms.forEach(term => {
      if (term === 'x' || term === '+x') xCoeff += 1;
      else if (term === '-x') xCoeff -= 1;
      else {
        const coeff = parseInt(term.replace('x', ''));
        xCoeff += coeff;
      }
    });
    
    // Sum constants
    constants.forEach(term => {
      constantSum += parseInt(term);
    });
    
    // Build simplified expression
    let simplified = '';
    
    if (xCoeff !== 0) {
      if (xCoeff === 1) simplified += 'x';
      else if (xCoeff === -1) simplified += '-x';
      else simplified += xCoeff + 'x';
    }
    
    if (constantSum !== 0) {
      if (simplified && constantSum > 0) simplified += ' + ' + constantSum;
      else if (simplified && constantSum < 0) simplified += ' - ' + Math.abs(constantSum);
      else simplified += constantSum;
    }
    
    return simplified || '0';
  };

  const getSimplificationSteps = (original: string, simplified: string): string[] => {
    const steps = [];
    steps.push(`Original: ${original}`);
    steps.push("Combine like terms");
    steps.push(`Simplified: ${simplified}`);
    return steps;
  };

  const faqs = [
    {
      question: "What types of expressions can be simplified?",
      answer: "This tool can simplify basic algebraic expressions with like terms, such as '2x + 3x - 5' or '4x + 7 - 2x + 3'."
    },
    {
      question: "How does the simplification work?",
      answer: "The tool identifies like terms (terms with the same variable) and combines their coefficients, then adds constants together."
    }
  ];

  return (
    <SEOWrapper
      title="Algebraic Expression Simplifier - Combine Like Terms"
      description="Simplify algebraic expressions by combining like terms. Perfect for students learning algebra and equation solving."
      keywords="expression simplifier, algebra simplifier, combine like terms, algebraic calculator, math solver"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Algebraic Expression Simplifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplify algebraic expressions by combining like terms with step-by-step solutions.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Expression Simplifier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="expression">Enter Expression</Label>
                  <Input
                    id="expression"
                    type="text"
                    placeholder="e.g., 2x + 3x - 5"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Example: 2x + 3x - 5, 4x + 7 - 2x + 3
                  </p>
                </div>
                
                <Button onClick={simplifyExpression} className="w-full">
                  Simplify Expression
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">Simplified Expression</h3>
                      <p className="text-3xl font-bold font-mono">{result.simplified}</p>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Step-by-Step Solution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {result.steps.map((step: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                                {index + 1}
                              </span>
                              <span className="font-mono">{step}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Expression Simplifier" faqs={faqs} />
            </div>
          </div>
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ExpressionSimplifier;
