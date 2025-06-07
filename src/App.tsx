import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import CaseConverter from "@/pages/tools/text/CaseConverter";
import WordCounter from "@/pages/tools/text/WordCounter";
import JsonFormatter from "@/pages/tools/code/JsonFormatter";
import HtmlTableGenerator from "@/pages/tools/code/HtmlTableGenerator";
import ExcelToHtmlConverter from "@/pages/tools/code/ExcelToHtmlConverter";
import CsvToTableConverter from "@/pages/tools/code/CsvToTableConverter";
import ColorPicker from "@/pages/tools/color/ColorPicker";
import ImageCompressor from "@/pages/tools/image/ImageCompressor";
import Base64Converter from "@/pages/tools/image/Base64Converter";
import RobotsTester from "@/pages/tools/seo/RobotsTester";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/text/case-converter" element={<CaseConverter />} />
            <Route path="/text/word-counter" element={<WordCounter />} />
            <Route path="/code/json-formatter" element={<JsonFormatter />} />
            <Route path="/code/html-table-generator" element={<HtmlTableGenerator />} />
            <Route path="/code/excel-to-html" element={<ExcelToHtmlConverter />} />
            <Route path="/code/csv-to-table" element={<CsvToTableConverter />} />
            <Route path="/color/color-picker" element={<ColorPicker />} />
            <Route path="/image/image-compressor" element={<ImageCompressor />} />
            <Route path="/image/base64-converter" element={<Base64Converter />} />
            <Route path="/seo/robots-tester" element={<RobotsTester />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
