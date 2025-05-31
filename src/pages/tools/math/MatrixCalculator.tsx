
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Grid3X3 } from "lucide-react";

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [matrixB, setMatrixB] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<number[][] | null>(null);

  const updateMatrix = (matrix: string, row: number, col: number, value: string) => {
    if (matrix === "A") {
      const newMatrix = [...matrixA];
      newMatrix[row][col] = value;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = [...matrixB];
      newMatrix[row][col] = value;
      setMatrixB(newMatrix);
    }
  };

  const parseMatrix = (matrix: string[][]): number[][] => {
    return matrix.map(row => row.map(cell => parseFloat(cell) || 0));
  };

  const calculateMatrix = () => {
    const a = parseMatrix(matrixA);
    const b = parseMatrix(matrixB);
    
    try {
      let resultMatrix: number[][];
      
      switch (operation) {
        case "add":
          resultMatrix = a.map((row, i) => row.map((cell, j) => cell + b[i][j]));
          break;
        case "subtract":
          resultMatrix = a.map((row, i) => row.map((cell, j) => cell - b[i][j]));
          break;
        case "multiply":
          resultMatrix = multiplyMatrices(a, b);
          break;
        default:
          return;
      }
      
      setResult(resultMatrix);
    } catch (error) {
      setResult(null);
    }
  };

  const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    const result = Array(a.length).fill(null).map(() => Array(b[0].length).fill(0));
    
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    
    return result;
  };

  const faqData = [
    {
      question: "What matrix operations can I perform?",
      answer: "You can perform addition, subtraction, and multiplication of 3×3 matrices. All operations follow standard matrix mathematics rules."
    },
    {
      question: "What are the rules for matrix multiplication?",
      answer: "Matrix multiplication requires the number of columns in the first matrix to equal the number of rows in the second matrix. The result has dimensions of rows from first matrix and columns from second matrix."
    },
    {
      question: "Can I multiply matrices of different sizes?",
      answer: "This calculator works with 3×3 matrices. For different sizes, the column count of matrix A must equal the row count of matrix B."
    },
    {
      question: "What if I leave cells empty?",
      answer: "Empty cells are treated as 0. Make sure to fill in all relevant values for accurate calculations."
    }
  ];

  return (
    <SEOWrapper 
      title="Matrix Calculator - Add, Subtract & Multiply Matrices"
      description="Free 3x3 matrix calculator for addition, subtraction, and multiplication operations. Perform matrix calculations with step-by-step results."
      keywords="matrix calculator, matrix multiplication, matrix addition, linear algebra calculator"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <Grid3X3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Matrix Calculator</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Perform matrix operations: addition, subtraction, and multiplication
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Matrix Operation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300">Operation</Label>
                <Select value={operation} onValueChange={setOperation}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="add">Addition (A + B)</SelectItem>
                    <SelectItem value="subtract">Subtraction (A - B)</SelectItem>
                    <SelectItem value="multiply">Multiplication (A × B)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Matrix A */}
                <div>
                  <Label className="text-gray-300 mb-4 block">Matrix A</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {matrixA.map((row, i) => 
                      row.map((cell, j) => (
                        <Input
                          key={`a-${i}-${j}`}
                          type="number"
                          placeholder="0"
                          value={cell}
                          onChange={(e) => updateMatrix("A", i, j, e.target.value)}
                          className="bg-slate-900 border-slate-600 text-white text-center"
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Matrix B */}
                <div>
                  <Label className="text-gray-300 mb-4 block">Matrix B</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {matrixB.map((row, i) => 
                      row.map((cell, j) => (
                        <Input
                          key={`b-${i}-${j}`}
                          type="number"
                          placeholder="0"
                          value={cell}
                          onChange={(e) => updateMatrix("B", i, j, e.target.value)}
                          className="bg-slate-900 border-slate-600 text-white text-center"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={calculateMatrix} className="w-full bg-amber-600 hover:bg-amber-700">
                Calculate Result
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Result Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-2 w-48">
                    {result.map((row, i) => 
                      row.map((cell, j) => (
                        <div
                          key={`result-${i}-${j}`}
                          className="p-3 bg-amber-900/20 border border-amber-500/30 rounded text-center text-amber-200 font-mono"
                        >
                          {cell.toFixed(2)}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <ToolFAQ
            toolName="Matrix Calculator FAQ"
            faqs={faqData}
          />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default MatrixCalculator;
