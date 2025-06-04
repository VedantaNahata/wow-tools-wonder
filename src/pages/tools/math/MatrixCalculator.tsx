
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const MatrixCalculator = () => {
  const [rows1, setRows1] = useState(2);
  const [cols1, setCols1] = useState(2);
  const [rows2, setRows2] = useState(2);
  const [cols2, setCols2] = useState(2);
  const [matrix1, setMatrix1] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matrix2, setMatrix2] = useState<number[][]>([[5, 6], [7, 8]]);
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<any>(null);

  const initializeMatrix = (rows: number, cols: number): number[][] => {
    return Array(rows).fill(0).map(() => Array(cols).fill(0));
  };

  const updateMatrixSize = (matrixNum: number, rows: number, cols: number) => {
    if (matrixNum === 1) {
      setRows1(rows);
      setCols1(cols);
      setMatrix1(initializeMatrix(rows, cols));
    } else {
      setRows2(rows);
      setCols2(cols);
      setMatrix2(initializeMatrix(rows, cols));
    }
  };

  const updateMatrixValue = (matrixNum: number, row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (matrixNum === 1) {
      const newMatrix = [...matrix1];
      newMatrix[row][col] = numValue;
      setMatrix1(newMatrix);
    } else {
      const newMatrix = [...matrix2];
      newMatrix[row][col] = numValue;
      setMatrix2(newMatrix);
    }
  };

  const addMatrices = (a: number[][], b: number[][]): number[][] => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a: number[][], b: number[][]): number[][] => {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    const result = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  const performOperation = () => {
    try {
      let resultMatrix: number[][] = [];

      switch (operation) {
        case "add":
          if (rows1 !== rows2 || cols1 !== cols2) {
            alert("Matrices must have the same dimensions for addition");
            return;
          }
          resultMatrix = addMatrices(matrix1, matrix2);
          break;
        
        case "subtract":
          if (rows1 !== rows2 || cols1 !== cols2) {
            alert("Matrices must have the same dimensions for subtraction");
            return;
          }
          resultMatrix = subtractMatrices(matrix1, matrix2);
          break;
        
        case "multiply":
          if (cols1 !== rows2) {
            alert("Number of columns in first matrix must equal number of rows in second matrix");
            return;
          }
          resultMatrix = multiplyMatrices(matrix1, matrix2);
          break;
      }

      setResult({
        operation,
        matrix: resultMatrix
      });
    } catch (error) {
      alert("Error performing operation. Please check your inputs.");
    }
  };

  const renderMatrix = (matrix: number[][], matrixNum: number) => (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <Label>Size:</Label>
        <Select value={matrixNum === 1 ? rows1.toString() : rows2.toString()} onValueChange={(value) => updateMatrixSize(matrixNum, parseInt(value), matrixNum === 1 ? cols1 : cols2)}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
        <span>×</span>
        <Select value={matrixNum === 1 ? cols1.toString() : cols2.toString()} onValueChange={(value) => updateMatrixSize(matrixNum, matrixNum === 1 ? rows1 : rows2, parseInt(value))}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, 1fr)` }}>
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <Input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => updateMatrixValue(matrixNum, i, j, e.target.value)}
              className="w-16 h-12 text-center"
            />
          ))
        )}
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What operations can I perform on matrices?",
      answer: "You can add, subtract, and multiply matrices. Addition/subtraction require same dimensions. Multiplication requires columns of first matrix = rows of second matrix."
    },
    {
      question: "What are the requirements for matrix operations?",
      answer: "Addition/subtraction require same dimensions. Multiplication requires columns of first matrix = rows of second matrix."
    }
  ];

  return (
    <SEOWrapper
      title="Matrix Calculator - Add, Subtract, Multiply Matrices"
      description="Perform matrix operations including addition, subtraction, and multiplication with step-by-step solutions."
      keywords="matrix calculator, matrix operations, matrix multiplication, linear algebra"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Matrix Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perform various matrix operations with detailed calculations and explanations.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Matrix Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Operation</Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">A + B (Addition)</SelectItem>
                      <SelectItem value="subtract">A - B (Subtraction)</SelectItem>
                      <SelectItem value="multiply">A × B (Multiplication)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Matrix A</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderMatrix(matrix1, 1)}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Matrix B</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderMatrix(matrix2, 2)}
                    </CardContent>
                  </Card>
                </div>

                <Button onClick={performOperation} className="w-full">
                  Calculate
                </Button>

                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${result.matrix[0].length}, 1fr)` }}>
                        {result.matrix.map((row: number[], i: number) =>
                          row.map((val: number, j: number) => (
                            <div key={`${i}-${j}`} className="w-16 h-12 border rounded flex items-center justify-center font-mono">
                              {val.toFixed(2)}
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Matrix Calculator" faqs={faqs} />
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

export default MatrixCalculator;
