
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { TrendingUp, Calculator } from "lucide-react";

const QuadraticSolver = () => {
  const [equation, setEquation] = useState({ a: "", b: "", c: "" });
  const [solution, setSolution] = useState<{
    discriminant: number;
    roots: string[];
    steps: string[];
  } | null>(null);

  const solveQuadratic = () => {
    const a = parseFloat(equation.a);
    const b = parseFloat(equation.b);
    const c = parseFloat(equation.c);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      setSolution({
        discriminant: 0,
        roots: ["Error: Please enter valid coefficients with a ≠ 0"],
        steps: []
      });
      return;
    }

    const discriminant = b * b - 4 * a * c;
    const steps = [
      `Given equation: ${a}x² + ${b}x + ${c} = 0`,
      `Using quadratic formula: x = (-b ± √(b² - 4ac)) / 2a`,
      `Discriminant (Δ) = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`
    ];

    let roots: string[] = [];

    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      roots = [
        `x₁ = ${root1.toFixed(4)}`,
        `x₂ = ${root2.toFixed(4)}`
      ];
      steps.push("Since Δ > 0, there are two real and distinct roots:");
      steps.push(`x₁ = (-${b} + √${discriminant}) / ${2 * a} = ${root1.toFixed(4)}`);
      steps.push(`x₂ = (-${b} - √${discriminant}) / ${2 * a} = ${root2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      roots = [`x = ${root.toFixed(4)} (repeated root)`];
      steps.push("Since Δ = 0, there is one repeated real root:");
      steps.push(`x = -${b} / ${2 * a} = ${root.toFixed(4)}`);
    } else {
      const realPart = -b / (2 * a);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
      roots = [
        `x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
        `x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`
      ];
      steps.push("Since Δ < 0, there are two complex conjugate roots:");
      steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
      steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    }

    setSolution({ discriminant, roots, steps });
  };

  const faqData = [
    {
      question: "What is the quadratic formula?",
      answer: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a, used to solve equations of the form ax² + bx + c = 0."
    },
    {
      question: "What does the discriminant tell us?",
      answer: "The discriminant (b² - 4ac) determines the nature of roots: positive = two real roots, zero = one repeated root, negative = two complex roots."
    },
    {
      question: "Can the coefficient 'a' be zero?",
      answer: "No, if a = 0, the equation becomes linear (bx + c = 0) and is no longer quadratic."
    },
    {
      question: "What are complex roots?",
      answer: "Complex roots occur when the discriminant is negative, resulting in solutions involving the imaginary unit 'i' where i² = -1."
    },
    {
      question: "How do I interpret repeated roots?",
      answer: "A repeated root (discriminant = 0) means the parabola touches the x-axis at exactly one point, called the vertex."
    }
  ];

  return (
    <SEOWrapper 
      title="Quadratic Equation Solver - Solve ax²+bx+c=0 with Steps"
      description="Free quadratic equation solver with step-by-step solutions. Calculate discriminant, find real and complex roots with detailed explanations."
      keywords="quadratic equation solver, quadratic formula calculator, discriminant calculator, polynomial solver"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Quadratic Equation Solver</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Solve quadratic equations ax² + bx + c = 0 with step-by-step solutions
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Enter Coefficients for ax² + bx + c = 0
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300">Coefficient a</Label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={equation.a}
                    onChange={(e) => setEquation(prev => ({ ...prev, a: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Coefficient of x²</p>
                </div>
                <div>
                  <Label className="text-gray-300">Coefficient b</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={equation.b}
                    onChange={(e) => setEquation(prev => ({ ...prev, b: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Coefficient of x</p>
                </div>
                <div>
                  <Label className="text-gray-300">Coefficient c</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={equation.c}
                    onChange={(e) => setEquation(prev => ({ ...prev, c: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Constant term</p>
                </div>
              </div>
              <Button onClick={solveQuadratic} className="w-full bg-orange-600 hover:bg-orange-700">
                Solve Quadratic Equation
              </Button>
            </CardContent>
          </Card>

          {solution && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-blue-300 font-semibold mb-2">Roots:</h3>
                  {solution.roots.map((root, index) => (
                    <p key={index} className="text-blue-200 font-mono text-lg">
                      {root}
                    </p>
                  ))}
                </div>

                {solution.steps.length > 0 && (
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <h3 className="text-green-300 font-semibold mb-2">Step-by-Step Solution:</h3>
                    {solution.steps.map((step, index) => (
                      <p key={index} className="text-green-200 mb-1">
                        {index + 1}. {step}
                      </p>
                    ))}
                  </div>
                )}

                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                  <h3 className="text-purple-300 font-semibold mb-2">Analysis:</h3>
                  <p className="text-purple-200">
                    Discriminant (Δ) = {solution.discriminant}
                  </p>
                  <p className="text-purple-200">
                    Nature of roots: {
                      solution.discriminant > 0 ? "Two real and distinct roots" :
                      solution.discriminant === 0 ? "One repeated real root" :
                      "Two complex conjugate roots"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <ToolFAQ
            title="Quadratic Equation Solver FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default QuadraticSolver;
