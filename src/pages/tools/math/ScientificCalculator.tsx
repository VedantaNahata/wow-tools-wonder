
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
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

  const inputDot = () => {
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
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
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
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performFunction = (func: string) => {
    const inputValue = parseFloat(display);
    let result: number;

    switch (func) {
      case "sin":
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case "cos":
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case "tan":
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case "log":
        result = Math.log10(inputValue);
        break;
      case "ln":
        result = Math.log(inputValue);
        break;
      case "sqrt":
        result = Math.sqrt(inputValue);
        break;
      case "x²":
        result = inputValue * inputValue;
        break;
      case "1/x":
        result = 1 / inputValue;
        break;
      case "±":
        result = -inputValue;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const insertConstant = (value: number) => {
    setDisplay(String(value));
    setWaitingForOperand(true);
  };

  const faqs = [
    {
      question: "How do I use trigonometric functions?",
      answer: "Enter a value in degrees and click sin, cos, or tan. The calculator automatically converts degrees to radians for calculation."
    },
    {
      question: "What's the difference between log and ln?",
      answer: "log is the base-10 logarithm, while ln is the natural logarithm (base e). Both are commonly used in mathematics and science."
    },
    {
      question: "How do I calculate powers?",
      answer: "Enter the base number, click the ^ button, enter the exponent, then press equals. For example: 2 ^ 3 = 8"
    }
  ];

  return (
    <SEOWrapper
      title="Scientific Calculator - Advanced Online Calculator"
      description="Full-featured scientific calculator with trigonometric, logarithmic, and power functions. Perfect for students and professionals."
      keywords="scientific calculator, trigonometric calculator, logarithm calculator, advanced calculator, math calculator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scientific Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A full-featured calculator with trigonometric, logarithmic, and power functions.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Scientific Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-md mx-auto">
                  {/* Display */}
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <div className="text-right text-2xl font-mono overflow-hidden">{display}</div>
                  </div>

                  {/* Calculator Buttons */}
                  <div className="grid grid-cols-5 gap-2">
                    {/* Row 1 - Functions */}
                    <Button variant="outline" onClick={() => performFunction("sin")} className="h-12">sin</Button>
                    <Button variant="outline" onClick={() => performFunction("cos")} className="h-12">cos</Button>
                    <Button variant="outline" onClick={() => performFunction("tan")} className="h-12">tan</Button>
                    <Button variant="outline" onClick={() => performFunction("log")} className="h-12">log</Button>
                    <Button variant="outline" onClick={() => performFunction("ln")} className="h-12">ln</Button>

                    {/* Row 2 - More Functions */}
                    <Button variant="outline" onClick={() => performFunction("sqrt")} className="h-12">√</Button>
                    <Button variant="outline" onClick={() => performFunction("x²")} className="h-12">x²</Button>
                    <Button variant="outline" onClick={() => performOperation("^")} className="h-12">x^y</Button>
                    <Button variant="outline" onClick={() => performFunction("1/x")} className="h-12">1/x</Button>
                    <Button variant="destructive" onClick={clear} className="h-12">C</Button>

                    {/* Row 3 */}
                    <Button variant="outline" onClick={() => inputNumber("7")} className="h-12">7</Button>
                    <Button variant="outline" onClick={() => inputNumber("8")} className="h-12">8</Button>
                    <Button variant="outline" onClick={() => inputNumber("9")} className="h-12">9</Button>
                    <Button variant="outline" onClick={() => performOperation("÷")} className="h-12">÷</Button>
                    <Button variant="outline" onClick={() => performFunction("±")} className="h-12">±</Button>

                    {/* Row 4 */}
                    <Button variant="outline" onClick={() => inputNumber("4")} className="h-12">4</Button>
                    <Button variant="outline" onClick={() => inputNumber("5")} className="h-12">5</Button>
                    <Button variant="outline" onClick={() => inputNumber("6")} className="h-12">6</Button>
                    <Button variant="outline" onClick={() => performOperation("×")} className="h-12">×</Button>
                    <Button variant="outline" onClick={() => insertConstant(Math.PI)} className="h-12">π</Button>

                    {/* Row 5 */}
                    <Button variant="outline" onClick={() => inputNumber("1")} className="h-12">1</Button>
                    <Button variant="outline" onClick={() => inputNumber("2")} className="h-12">2</Button>
                    <Button variant="outline" onClick={() => inputNumber("3")} className="h-12">3</Button>
                    <Button variant="outline" onClick={() => performOperation("-")} className="h-12">-</Button>
                    <Button variant="outline" onClick={() => insertConstant(Math.E)} className="h-12">e</Button>

                    {/* Row 6 */}
                    <Button variant="outline" onClick={() => inputNumber("0")} className="h-12 col-span-2">0</Button>
                    <Button variant="outline" onClick={inputDot} className="h-12">.</Button>
                    <Button variant="outline" onClick={() => performOperation("+")} className="h-12">+</Button>
                    <Button variant="default" onClick={() => performOperation("=")} className="h-12">=</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Scientific Calculator" faqs={faqs} />
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

export default ScientificCalculator;
