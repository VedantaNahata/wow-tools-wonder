
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Text Tools
import CaseConverter from "./pages/tools/text/CaseConverter";
import WordCounter from "./pages/tools/text/WordCounter";
import LoremGenerator from "./pages/tools/text/LoremGenerator";
import TextReverser from "./pages/tools/text/TextReverser";
import TextCleaner from "./pages/tools/text/TextCleaner";

// Image Tools
import Base64Converter from "./pages/tools/image/Base64Converter";
import ImageCompressor from "./pages/tools/image/ImageCompressor";

// Web & SEO Tools
import MetaTagGenerator from "./pages/tools/seo/MetaTagGenerator";
import RobotsTester from "./pages/tools/seo/RobotsTester";

// Code Tools
import JsonFormatter from "./pages/tools/code/JsonFormatter";
import CssBeautifier from "./pages/tools/code/CssBeautifier";

// Math & Conversion Tools
import UnitConverter from "./pages/tools/math/UnitConverter";
import AgeCalculator from "./pages/tools/math/AgeCalculator";

// Color Tools
import ColorPicker from "./pages/tools/color/ColorPicker";
import HexConverter from "./pages/tools/color/HexConverter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Text Tools */}
              <Route path="/tools/text/case-converter" element={<CaseConverter />} />
              <Route path="/tools/text/word-counter" element={<WordCounter />} />
              <Route path="/tools/text/lorem-generator" element={<LoremGenerator />} />
              <Route path="/tools/text/text-reverser" element={<TextReverser />} />
              <Route path="/tools/text/text-cleaner" element={<TextCleaner />} />
              
              {/* Image Tools */}
              <Route path="/tools/image/base64-converter" element={<Base64Converter />} />
              <Route path="/tools/image/image-compressor" element={<ImageCompressor />} />
              
              {/* Web & SEO Tools */}
              <Route path="/tools/seo/meta-tag-generator" element={<MetaTagGenerator />} />
              <Route path="/tools/seo/robots-tester" element={<RobotsTester />} />
              
              {/* Code Tools */}
              <Route path="/tools/code/json-formatter" element={<JsonFormatter />} />
              <Route path="/tools/code/css-beautifier" element={<CssBeautifier />} />
              
              {/* Math & Conversion Tools */}
              <Route path="/tools/math/unit-converter" element={<UnitConverter />} />
              <Route path="/tools/math/age-calculator" element={<AgeCalculator />} />
              
              {/* Color Tools */}
              <Route path="/tools/color/color-picker" element={<ColorPicker />} />
              <Route path="/tools/color/hex-converter" element={<HexConverter />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
