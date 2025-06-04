
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const QuadraticSolver = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<any>(null);

  const solveQuadratic = () => {
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);
    const coeffC = parseFloat(c);

    if (isNaN(coeffA) || isNaN(coeffB) || isNaN(coeffC)) {
      alert("Please enter valid numbers for all coefficients");
      return;
    }

    if (coeffA === 0) {
      alert("Coefficient 'a' cannot be zero for a quadratic equation");
      return;
    }

    const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
    let roots = [];
    let nature = "";

    if (discriminant > 0) {
      const root1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
      const root2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
      roots = [root1, root2];
      nature = "Two distinct real roots";
    } else if (discriminant === 0) {
      const root = -coeffB / (2 * coeffA);
      roots = [root];
      nature = "One repeated real root";
    } else {
      const realPart = -coeffB / (2 * coeffA);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * coeffA);
      roots = [
        `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
        `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`
      ];
      nature = "Two complex conjugate roots";
    }

    const vertex = {
      x: -coeffB / (2 * coeffA),
      y: coeffA * Math.pow(-coeffB / (2 * coeffA), 2) + coeffB * (-coeffB / (2 * coeffA)) + coeffC
    };

    setResult({
      discriminant,
      roots,
      nature,
      vertex,
      equation: `${coeffA}x² + ${coeffB}x + ${coeffC} = 0`
    });
  };

  const faqs = [
    {
      question: "What is a quadratic equation?",
      answer: "A quadratic equation is a polynomial equation of degree 2, written in the form ax² + bx + c = 0, where a ≠ 0."
    },
    {
      question: "What does the discriminant tell us?",
      answer: "The discriminant (b² - 4ac) determines the nature of roots: positive = two real roots, zero = one repeated root, negative = complex roots."
    }
  ];

  return (
    <SEOWrapper
      title="Quadratic Equation Solver - Solve ax² + bx + c = 0"
      description="Solve quadratic equations with detailed steps, discriminant analysis, and vertex calculation. Get real and complex roots."
      keywords="quadratic equation solver, quadratic formula, discriminant calculator, parabola vertex, polynomial solver"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quadratic Equation Solver
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solve quadratic equations and analyze their properties with detailed explanations.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Quadratic Equation: ax² + bx + c = 0</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="a">Coefficient a</Label>
                    <Input
                      id="a"
                      type="number"
                      placeholder="Enter a"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b">Coefficient b</Label>
                    <Input
                      id="b"
                      type="number"
                      placeholder="Enter b"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c">Coefficient c</Label>
                    <Input
                      id="c"
                      type="number"
                      placeholder="Enter c"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={solveQuadratic} className="w-full">
                  Solve Equation
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">Equation</h3>
                      <p className="text-xl font-mono">{result.equation}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Solutions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="font-semibold">{result.nature}</p>
                          {result.roots.map((root: any, index: number) => (
                            <div key={index} className="flex justify-between">
                              <span>Root {index + 1}:</span>
                              <span className="font-mono">{typeof root === 'number' ? root.toFixed(4) : root}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Discriminant:</span>
                            <span className="font-mono">{result.discriminant.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vertex X:</span>
                            <span className="font-mono">{result.vertex.x.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vertex Y:</span>
                            <span className="font-mono">{result.vertex.y.toFixed(4)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Quadratic Equation Solver" faqs={faqs} />
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

export default QuadraticSolver;
