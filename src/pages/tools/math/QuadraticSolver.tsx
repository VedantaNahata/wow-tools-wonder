
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
    let steps = [];

    // Step-by-step solution
    steps.push(`Given equation: ${coeffA}x² + ${coeffB}x + ${coeffC} = 0`);
    steps.push(`Using quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)`);
    steps.push(`Substitute values: x = (-(${coeffB}) ± √((${coeffB})² - 4(${coeffA})(${coeffC}))) / (2(${coeffA}))`);
    steps.push(`Calculate discriminant: Δ = b² - 4ac = ${coeffB}² - 4(${coeffA})(${coeffC}) = ${discriminant}`);

    if (discriminant > 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const root1 = (-coeffB + sqrtDiscriminant) / (2 * coeffA);
      const root2 = (-coeffB - sqrtDiscriminant) / (2 * coeffA);
      roots = [root1, root2];
      nature = "Two distinct real roots";
      steps.push(`Since Δ > 0, there are two distinct real roots:`);
      steps.push(`x₁ = (${-coeffB} + √${discriminant}) / ${2 * coeffA} = (${-coeffB} + ${sqrtDiscriminant.toFixed(4)}) / ${2 * coeffA} = ${root1.toFixed(4)}`);
      steps.push(`x₂ = (${-coeffB} - √${discriminant}) / ${2 * coeffA} = (${-coeffB} - ${sqrtDiscriminant.toFixed(4)}) / ${2 * coeffA} = ${root2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const root = -coeffB / (2 * coeffA);
      roots = [root];
      nature = "One repeated real root";
      steps.push(`Since Δ = 0, there is one repeated real root:`);
      steps.push(`x = -b / 2a = ${-coeffB} / ${2 * coeffA} = ${root.toFixed(4)}`);
    } else {
      const realPart = -coeffB / (2 * coeffA);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * coeffA);
      roots = [
        `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
        `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`
      ];
      nature = "Two complex conjugate roots";
      steps.push(`Since Δ < 0, there are two complex conjugate roots:`);
      steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
      steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    }

    const vertex = {
      x: -coeffB / (2 * coeffA),
      y: coeffA * Math.pow(-coeffB / (2 * coeffA), 2) + coeffB * (-coeffB / (2 * coeffA)) + coeffC
    };

    const axisOfSymmetry = -coeffB / (2 * coeffA);
    const yIntercept = coeffC;
    const opens = coeffA > 0 ? "upward" : "downward";

    setResult({
      discriminant,
      roots,
      nature,
      vertex,
      steps,
      axisOfSymmetry,
      yIntercept,
      opens,
      equation: `${coeffA}x² + ${coeffB}x + ${coeffC} = 0`
    });
  };

  const faqs = [
    {
      question: "What is a quadratic equation?",
      answer: "A quadratic equation is a polynomial equation of degree 2, written in the form ax² + bx + c = 0, where a ≠ 0. It represents a parabola when graphed."
    },
    {
      question: "What does the discriminant tell us?",
      answer: "The discriminant (b² - 4ac) determines the nature of roots: positive = two real roots, zero = one repeated root, negative = complex roots. It also tells us where the parabola intersects the x-axis."
    },
    {
      question: "What is the vertex of a parabola?",
      answer: "The vertex is the highest or lowest point of the parabola. For ax² + bx + c, the vertex is at x = -b/(2a). If a > 0, it's the minimum point; if a < 0, it's the maximum point."
    }
  ];

  return (
    <SEOWrapper
      title="Advanced Quadratic Equation Solver - Step-by-Step Solutions"
      description="Solve quadratic equations with detailed step-by-step solutions, discriminant analysis, vertex calculation, and complete parabola properties."
      keywords="quadratic equation solver, quadratic formula, discriminant calculator, parabola vertex, polynomial solver, step by step"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced Quadratic Equation Solver
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solve quadratic equations with detailed step-by-step solutions and complete analysis.
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
                      step="any"
                      placeholder="Enter a (≠ 0)"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b">Coefficient b</Label>
                    <Input
                      id="b"
                      type="number"
                      step="any"
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
                      step="any"
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
                  <div className="space-y-6">
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">Equation</h3>
                      <p className="text-xl font-mono">{result.equation}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Solutions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="p-3 bg-muted rounded">
                            <p className="font-semibold text-center">{result.nature}</p>
                          </div>
                          {result.roots.map((root: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-background border rounded">
                              <span className="font-medium">Root {index + 1}:</span>
                              <span className="font-mono text-lg">{typeof root === 'number' ? root.toFixed(4) : root}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Parabola Properties</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Discriminant (Δ):</span>
                            <span className="font-mono">{result.discriminant.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vertex:</span>
                            <span className="font-mono">({result.vertex.x.toFixed(4)}, {result.vertex.y.toFixed(4)})</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Axis of Symmetry:</span>
                            <span className="font-mono">x = {result.axisOfSymmetry.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Y-intercept:</span>
                            <span className="font-mono">{result.yIntercept}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Opens:</span>
                            <span className="capitalize">{result.opens}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Step-by-Step Solution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {result.steps.map((step: string, index: number) => (
                            <div key={index} className="flex gap-3 p-3 bg-muted rounded">
                              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <span className="font-mono text-sm leading-relaxed">{step}</span>
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
