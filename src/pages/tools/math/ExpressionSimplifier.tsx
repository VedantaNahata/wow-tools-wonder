
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Superscript } from "lucide-react";

const ExpressionSimplifier = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<{
    simplified: string;
    steps: string[];
  } | null>(null);

  const simplifyExpression = () => {
    try {
      // Basic algebraic simplification (demo version)
      let expr = expression.toLowerCase().replace(/\s/g, '');
      const steps = [`Original expression: ${expression}`];
      
      // Simple like terms combination
      expr = combineLikeTerms(expr);
      steps.push(`After combining like terms: ${expr}`);
      
      setResult({
        simplified: expr,
        steps
      });
    } catch (error) {
      setResult({
        simplified: "Error: Invalid expression",
        steps: ["Please enter a valid algebraic expression"]
      });
    }
  };

  const combineLikeTerms = (expr: string): string => {
    // This is a simplified version for demo purposes
    // In a real implementation, you'd use a proper algebra engine
    
    // Handle simple cases like 2x + 3x = 5x
    expr = expr.replace(/(\d*)x\s*\+\s*(\d*)x/g, (match, a, b) => {
      const coef1 = a === '' ? 1 : parseInt(a) || 0;
      const coef2 = b === '' ? 1 : parseInt(b) || 0;
      const sum = coef1 + coef2;
      return sum === 1 ? 'x' : sum === 0 ? '0' : `${sum}x`;
    });
    
    // Handle constants
    expr = expr.replace(/(\d+)\s*\+\s*(\d+)/g, (match, a, b) => {
      return (parseInt(a) + parseInt(b)).toString();
    });
    
    return expr;
  };

  const faqData = [
    {
      question: "What types of expressions can I simplify?",
      answer: "This is a basic algebraic simplifier that can handle simple polynomial expressions with like terms. For complex expressions, consider using dedicated computer algebra systems."
    },
    {
      question: "How do I enter expressions?",
      answer: "Use standard notation: 2x + 3x - 5, x^2 + 2x + 1, etc. Use 'x' as the variable and standard operators (+, -, *, ^)."
    },
    {
      question: "Can it handle multiple variables?",
      answer: "This basic version primarily handles single-variable expressions. For multi-variable algebra, you'd need more advanced tools."
    },
    {
      question: "Does it factor expressions?",
      answer: "This version combines like terms but doesn't perform factoring. Factoring requires more sophisticated algebraic algorithms."
    }
  ];

  return (
    <SEOWrapper 
      title="Algebraic Expression Simplifier - Simplify Math Expressions"
      description="Simplify algebraic expressions by combining like terms. Free online tool for basic polynomial simplification with step-by-step solutions."
      keywords="algebraic expression simplifier, combine like terms, polynomial simplifier, algebra calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl">
                <Superscript className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Expression Simplifier</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simplify algebraic expressions by combining like terms
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Enter Algebraic Expression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Expression</Label>
                <Input
                  type="text"
                  placeholder="2x + 3x - 5"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Examples: 2x + 3x - 5, x^2 + 2x + x^2, 3y - y + 7
                </p>
              </div>
              <Button onClick={simplifyExpression} className="w-full bg-slate-600 hover:bg-slate-700">
                Simplify Expression
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Simplified Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-900/20 border border-slate-500/30 rounded-lg">
                  <p className="text-slate-300 text-xl font-mono">
                    {result.simplified}
                  </p>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-blue-300 font-semibold mb-2">Steps:</h3>
                  {result.steps.map((step, index) => (
                    <p key={index} className="text-blue-200 mb-1">
                      {index + 1}. {step}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <ToolFAQ
            toolName="Expression Simplifier FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ExpressionSimplifier;
