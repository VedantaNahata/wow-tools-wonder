
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

  const parseExpression = (expr: string) => {
    // Remove spaces and convert to lowercase
    expr = expr.replace(/\s/g, '').toLowerCase();
    
    // Extract terms
    const terms: { [key: string]: number } = {};
    let currentTerm = "";
    let currentSign = 1;
    
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      
      if (char === '+' || char === '-') {
        if (currentTerm) {
          const termInfo = parseTerm(currentTerm);
          const key = termInfo.variable || 'constant';
          terms[key] = (terms[key] || 0) + currentSign * termInfo.coefficient;
        }
        currentSign = char === '+' ? 1 : -1;
        currentTerm = "";
      } else {
        currentTerm += char;
      }
    }
    
    // Handle last term
    if (currentTerm) {
      const termInfo = parseTerm(currentTerm);
      const key = termInfo.variable || 'constant';
      terms[key] = (terms[key] || 0) + currentSign * termInfo.coefficient;
    }
    
    return terms;
  };

  const parseTerm = (term: string) => {
    // Handle cases like "2x", "x", "3", "-5x", etc.
    const match = term.match(/^([+-]?\d*)\*?([a-z]?)(\^?\d+)?$/);
    
    if (!match) {
      throw new Error(`Invalid term: ${term}`);
    }
    
    let coefficient = match[1];
    const variable = match[2];
    
    // Handle coefficient
    if (coefficient === '' || coefficient === '+') {
      coefficient = '1';
    } else if (coefficient === '-') {
      coefficient = '-1';
    }
    
    return {
      coefficient: parseInt(coefficient) || 1,
      variable: variable || null
    };
  };

  const buildSimplifiedExpression = (terms: { [key: string]: number }): string => {
    const parts = [];
    
    // Sort terms: variables first, then constant
    const sortedKeys = Object.keys(terms).sort((a, b) => {
      if (a === 'constant') return 1;
      if (b === 'constant') return -1;
      return a.localeCompare(b);
    });
    
    for (const key of sortedKeys) {
      const coefficient = terms[key];
      if (coefficient === 0) continue;
      
      let termStr = "";
      
      if (key === 'constant') {
        termStr = coefficient.toString();
      } else {
        if (coefficient === 1) {
          termStr = key;
        } else if (coefficient === -1) {
          termStr = `-${key}`;
        } else {
          termStr = `${coefficient}${key}`;
        }
      }
      
      if (parts.length > 0 && coefficient > 0) {
        parts.push(`+${termStr}`);
      } else {
        parts.push(termStr);
      }
    }
    
    return parts.length > 0 ? parts.join(' ') : "0";
  };

  const simplifyExpression = () => {
    try {
      if (!expression.trim()) {
        alert("Please enter an expression");
        return;
      }

      const terms = parseExpression(expression);
      const simplified = buildSimplifiedExpression(terms);
      
      setResult({
        original: expression,
        simplified: simplified,
        terms: terms
      });
    } catch (error) {
      alert("Error parsing expression. Please check your input format.");
    }
  };

  const faqs = [
    {
      question: "What expressions can I simplify?",
      answer: "You can simplify polynomial expressions with variables and constants, like '2x + 3x - 5' or '4y - 2y + 7'."
    },
    {
      question: "How do I enter expressions?",
      answer: "Use standard notation: '2x + 3y - 5' or '4a - 2a + 6b'. The tool combines like terms automatically."
    }
  ];

  return (
    <SEOWrapper
      title="Algebraic Expression Simplifier - Combine Like Terms"
      description="Simplify algebraic expressions by combining like terms. Step-by-step simplification with detailed explanations."
      keywords="expression simplifier, algebra calculator, combine like terms, polynomial simplifier, algebraic calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Algebraic Expression Simplifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplify algebraic expressions by combining like terms with step-by-step explanations.
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
                    placeholder="e.g., 2x + 3x - 5 + 7"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Examples: "2x + 3x - 5", "4y - 2y + 7", "3a + 2b - a + 5b"
                  </p>
                </div>
                
                <Button onClick={simplifyExpression} className="w-full">
                  Simplify Expression
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Original</h3>
                        <p className="font-mono text-lg">{result.original}</p>
                      </div>
                      
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <h3 className="text-lg font-bold text-primary mb-2">Simplified</h3>
                        <p className="font-mono text-lg font-bold">{result.simplified}</p>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Term Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(result.terms).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="font-semibold">
                                {key === 'constant' ? 'Constant term:' : `${key} terms:`}
                              </span>
                              <span className="font-mono">
                                {value}
                                {key !== 'constant' && value !== 0 && (
                                  <span className="text-muted-foreground ml-1">
                                    {Math.abs(value) === 1 ? key : `${key}`}
                                  </span>
                                )}
                              </span>
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
              <ToolFAQ toolName="Algebraic Expression Simplifier" faqs={faqs} />
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
