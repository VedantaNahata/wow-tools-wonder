
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Calculator, Square, RotateCcw } from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(String(inputValue));
    } else if (operation) {
      const currentValue = previousValue || "0";
      const result = calculate(parseFloat(currentValue), inputValue, operation);
      
      setDisplay(String(result));
      setPreviousValue(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "^":
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const performFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case "sin":
        result = Math.sin(value * Math.PI / 180);
        break;
      case "cos":
        result = Math.cos(value * Math.PI / 180);
        break;
      case "tan":
        result = Math.tan(value * Math.PI / 180);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "x²":
        result = value * value;
        break;
      case "1/x":
        result = 1 / value;
        break;
      case "!":
        result = factorial(Math.floor(value));
        break;
      case "π":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const faqData = [
    {
      question: "How do I use trigonometric functions?",
      answer: "Enter an angle in degrees, then click sin, cos, or tan. The calculator automatically converts degrees to radians for calculation."
    },
    {
      question: "What's the difference between log and ln?",
      answer: "log is the base-10 logarithm (common logarithm), while ln is the natural logarithm (base e ≈ 2.718)."
    },
    {
      question: "How do I calculate powers and roots?",
      answer: "Use x² for squares, sqrt for square roots, or ^ for any power (enter base, press ^, enter exponent, press =)."
    },
    {
      question: "Can I calculate factorials of decimal numbers?",
      answer: "The factorial function only works with non-negative integers. Decimal inputs are rounded down to the nearest integer."
    },
    {
      question: "What are the π and e buttons for?",
      answer: "π (pi ≈ 3.14159) and e (Euler's number ≈ 2.71828) are mathematical constants used in various calculations."
    }
  ];

  return (
    <SEOWrapper 
      title="Scientific Calculator - Advanced Math Calculator with Trigonometry"
      description="Free online scientific calculator with trigonometric functions, logarithms, powers, roots, and more. Perfect for students, engineers, and professionals."
      keywords="scientific calculator, trigonometry calculator, logarithm calculator, advanced math calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Scientific Calculator</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced calculator with trigonometric, logarithmic, and power functions
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Square className="h-5 w-5" />
                Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display */}
              <div className="mb-4 p-4 bg-slate-900 border border-slate-600 rounded-lg">
                <div className="text-right text-2xl font-mono text-white overflow-hidden">
                  {display}
                </div>
              </div>

              {/* Button Grid */}
              <div className="grid grid-cols-5 gap-2">
                {/* Row 1 - Functions */}
                <Button onClick={() => performFunction("sin")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  sin
                </Button>
                <Button onClick={() => performFunction("cos")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  cos
                </Button>
                <Button onClick={() => performFunction("tan")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  tan
                </Button>
                <Button onClick={() => performFunction("log")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  log
                </Button>
                <Button onClick={() => performFunction("ln")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  ln
                </Button>

                {/* Row 2 - More Functions */}
                <Button onClick={() => performFunction("sqrt")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  √
                </Button>
                <Button onClick={() => performFunction("x²")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  x²
                </Button>
                <Button onClick={() => performOperation("^")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  x^y
                </Button>
                <Button onClick={() => performFunction("1/x")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  1/x
                </Button>
                <Button onClick={() => performFunction("!")} className="bg-blue-600 hover:bg-blue-700 text-sm">
                  x!
                </Button>

                {/* Row 3 - Constants and Clear */}
                <Button onClick={() => performFunction("π")} className="bg-green-600 hover:bg-green-700 text-sm">
                  π
                </Button>
                <Button onClick={() => performFunction("e")} className="bg-green-600 hover:bg-green-700 text-sm">
                  e
                </Button>
                <Button onClick={clear} className="bg-red-600 hover:bg-red-700 text-sm col-span-2">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Clear
                </Button>
                <Button onClick={() => performOperation("÷")} className="bg-orange-600 hover:bg-orange-700">
                  ÷
                </Button>

                {/* Row 4 - Numbers */}
                <Button onClick={() => inputNumber("7")} className="bg-slate-700 hover:bg-slate-600">
                  7
                </Button>
                <Button onClick={() => inputNumber("8")} className="bg-slate-700 hover:bg-slate-600">
                  8
                </Button>
                <Button onClick={() => inputNumber("9")} className="bg-slate-700 hover:bg-slate-600">
                  9
                </Button>
                <Button onClick={() => performOperation("×")} className="bg-orange-600 hover:bg-orange-700">
                  ×
                </Button>
                <Button onClick={() => inputNumber("(")} className="bg-slate-600 hover:bg-slate-500">
                  (
                </Button>

                {/* Row 5 */}
                <Button onClick={() => inputNumber("4")} className="bg-slate-700 hover:bg-slate-600">
                  4
                </Button>
                <Button onClick={() => inputNumber("5")} className="bg-slate-700 hover:bg-slate-600">
                  5
                </Button>
                <Button onClick={() => inputNumber("6")} className="bg-slate-700 hover:bg-slate-600">
                  6
                </Button>
                <Button onClick={() => performOperation("-")} className="bg-orange-600 hover:bg-orange-700">
                  -
                </Button>
                <Button onClick={() => inputNumber(")")} className="bg-slate-600 hover:bg-slate-500">
                  )
                </Button>

                {/* Row 6 */}
                <Button onClick={() => inputNumber("1")} className="bg-slate-700 hover:bg-slate-600">
                  1
                </Button>
                <Button onClick={() => inputNumber("2")} className="bg-slate-700 hover:bg-slate-600">
                  2
                </Button>
                <Button onClick={() => inputNumber("3")} className="bg-slate-700 hover:bg-slate-600">
                  3
                </Button>
                <Button onClick={() => performOperation("+")} className="bg-orange-600 hover:bg-orange-700">
                  +
                </Button>
                <Button onClick={() => performOperation("=")} className="bg-green-600 hover:bg-green-700 row-span-2">
                  =
                </Button>

                {/* Row 7 */}
                <Button onClick={() => inputNumber("0")} className="bg-slate-700 hover:bg-slate-600 col-span-2">
                  0
                </Button>
                <Button onClick={inputDecimal} className="bg-slate-700 hover:bg-slate-600">
                  .
                </Button>
                <Button onClick={() => setDisplay(display.slice(0, -1) || "0")} className="bg-slate-600 hover:bg-slate-500">
                  ⌫
                </Button>
              </div>
            </CardContent>
          </Card>

          <ToolFAQ
            toolName="Scientific Calculator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default ScientificCalculator;
