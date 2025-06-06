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
import DuplicateLineRemover from "./pages/tools/text/DuplicateLineRemover";
import TextSorter from "./pages/tools/text/TextSorter";
import WordFrequencyCounter from "./pages/tools/text/WordFrequencyCounter";
import FindAndReplace from "./pages/tools/text/FindAndReplace";
import TextEncryptor from "./pages/tools/text/TextEncryptor";
import TextToBinary from "./pages/tools/text/TextToBinary";

// Image Tools
import Base64Converter from "./pages/tools/image/Base64Converter";
import ImageCompressor from "./pages/tools/image/ImageCompressor";

// Web & SEO Tools
import MetaTagGenerator from "./pages/tools/seo/MetaTagGenerator";
import RobotsTester from "./pages/tools/seo/RobotsTester";
import RobotsGenerator from "./pages/tools/seo/RobotsGenerator";
import SitemapGenerator from "./pages/tools/seo/SitemapGenerator";
import OgPreview from "./pages/tools/seo/OgPreview";
import RedirectChecker from "./pages/tools/seo/RedirectChecker";
import SerpPreview from "./pages/tools/seo/SerpPreview";
import PageSizeChecker from "./pages/tools/seo/PageSizeChecker";
import BrokenLinkChecker from "./pages/tools/seo/BrokenLinkChecker";
import AltTagChecker from "./pages/tools/seo/AltTagChecker";
import MetaTagAnalyzer from "./pages/tools/seo/MetaTagAnalyzer";

// Code Tools
import JsonFormatter from "./pages/tools/code/JsonFormatter";
import CssBeautifier from "./pages/tools/code/CssBeautifier";
import JavaScriptMinifier from "./pages/tools/code/JavaScriptMinifier";
import HtmlMinifier from "./pages/tools/code/HtmlMinifier";
import JavaScriptBeautifier from "./pages/tools/code/JavaScriptBeautifier";
import HtmlBeautifier from "./pages/tools/code/HtmlBeautifier";
import CssMinifier from "./pages/tools/code/CssMinifier";
import HtmlTableGenerator from "./pages/tools/code/HtmlTableGenerator";
import ExcelToHtmlConverter from "./pages/tools/code/ExcelToHtmlConverter";
import MarkdownTableGenerator from "./pages/tools/code/MarkdownTableGenerator";
import CsvToTableConverter from "./pages/tools/code/CsvToTableConverter";
import JsonToHtmlTable from "./pages/tools/code/JsonToHtmlTable";

// Math & Conversion Tools
import UnitConverter from "./pages/tools/math/UnitConverter";
import AgeCalculator from "./pages/tools/math/AgeCalculator";
import PercentageCalculator from "./pages/tools/math/PercentageCalculator";
import ScientificCalculator from "./pages/tools/math/ScientificCalculator";
import InterestCalculator from "./pages/tools/math/InterestCalculator";
import FactorialCalculator from "./pages/tools/math/FactorialCalculator";
import QuadraticSolver from "./pages/tools/math/QuadraticSolver";
import PrimeChecker from "./pages/tools/math/PrimeChecker";
import LcmHcfFinder from "./pages/tools/math/LcmHcfFinder";
import MatrixCalculator from "./pages/tools/math/MatrixCalculator";
import BaseConverter from "./pages/tools/math/BaseConverter";
import ExpressionSimplifier from "./pages/tools/math/ExpressionSimplifier";

// Color Tools
import ColorPicker from "./pages/tools/color/ColorPicker";
import HexConverter from "./pages/tools/color/HexConverter";
import GradientGenerator from "./pages/tools/color/GradientGenerator";
import PaletteGenerator from "./pages/tools/color/PaletteGenerator";
import ContrastChecker from "./pages/tools/color/ContrastChecker";
import RandomColorGenerator from "./pages/tools/color/RandomColorGenerator";
import ShadesTintsGenerator from "./pages/tools/color/ShadesTintsGenerator";
import CssColorNames from "./pages/tools/color/CssColorNames";
import ColorToImage from "./pages/tools/color/ColorToImage";
import ColorExtractor from "./pages/tools/color/ColorExtractor";

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
              <Route path="/text/case-converter" element={<CaseConverter />} />
              <Route path="/text/word-counter" element={<WordCounter />} />
              <Route path="/text/lorem-generator" element={<LoremGenerator />} />
              <Route path="/text/text-reverser" element={<TextReverser />} />
              <Route path="/text/text-cleaner" element={<TextCleaner />} />
              <Route path="/text/duplicate-line-remover" element={<DuplicateLineRemover />} />
              <Route path="/text/text-sorter" element={<TextSorter />} />
              <Route path="/text/word-frequency-counter" element={<WordFrequencyCounter />} />
              <Route path="/text/find-and-replace" element={<FindAndReplace />} />
              <Route path="/text/text-encryptor" element={<TextEncryptor />} />
              <Route path="/text/text-to-binary" element={<TextToBinary />} />
              
              {/* Image Tools */}
              <Route path="/image/base64-converter" element={<Base64Converter />} />
              <Route path="/image/image-compressor" element={<ImageCompressor />} />
              
              {/* Web & SEO Tools */}
              <Route path="/seo/meta-tag-generator" element={<MetaTagGenerator />} />
              <Route path="/seo/robots-tester" element={<RobotsTester />} />
              <Route path="/seo/robots-generator" element={<RobotsGenerator />} />
              <Route path="/seo/sitemap-generator" element={<SitemapGenerator />} />
              <Route path="/seo/og-preview" element={<OgPreview />} />
              <Route path="/seo/redirect-checker" element={<RedirectChecker />} />
              <Route path="/seo/serp-preview" element={<SerpPreview />} />
              <Route path="/seo/page-size-checker" element={<PageSizeChecker />} />
              <Route path="/seo/broken-link-checker" element={<BrokenLinkChecker />} />
              <Route path="/seo/alt-tag-checker" element={<AltTagChecker />} />
              <Route path="/seo/meta-tag-analyzer" element={<MetaTagAnalyzer />} />
              
              {/* Code Tools */}
              <Route path="/code/json-formatter" element={<JsonFormatter />} />
              <Route path="/code/css-beautifier" element={<CssBeautifier />} />
              <Route path="/code/javascript-minifier" element={<JavaScriptMinifier />} />
              <Route path="/code/html-minifier" element={<HtmlMinifier />} />
              <Route path="/code/javascript-beautifier" element={<JavaScriptBeautifier />} />
              <Route path="/code/html-beautifier" element={<HtmlBeautifier />} />
              <Route path="/code/css-minifier" element={<CssMinifier />} />
              <Route path="/code/html-table-generator" element={<HtmlTableGenerator />} />
              <Route path="/code/excel-to-html" element={<ExcelToHtmlConverter />} />
              <Route path="/code/markdown-table-generator" element={<MarkdownTableGenerator />} />
              <Route path="/code/csv-to-table" element={<CsvToTableConverter />} />
              <Route path="/code/json-to-html-table" element={<JsonToHtmlTable />} />
              
              {/* Math & Conversion Tools */}
              <Route path="/math/unit-converter" element={<UnitConverter />} />
              <Route path="/math/age-calculator" element={<AgeCalculator />} />
              <Route path="/math/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/math/scientific-calculator" element={<ScientificCalculator />} />
              <Route path="/math/interest-calculator" element={<InterestCalculator />} />
              <Route path="/math/factorial-calculator" element={<FactorialCalculator />} />
              <Route path="/math/quadratic-solver" element={<QuadraticSolver />} />
              <Route path="/math/prime-checker" element={<PrimeChecker />} />
              <Route path="/math/lcm-hcf-finder" element={<LcmHcfFinder />} />
              <Route path="/math/matrix-calculator" element={<MatrixCalculator />} />
              <Route path="/math/base-converter" element={<BaseConverter />} />
              <Route path="/math/expression-simplifier" element={<ExpressionSimplifier />} />
              
              {/* Color Tools */}
              <Route path="/color/color-picker" element={<ColorPicker />} />
              <Route path="/color/hex-converter" element={<HexConverter />} />
              <Route path="/color/gradient-generator" element={<GradientGenerator />} />
              <Route path="/color/palette-generator" element={<PaletteGenerator />} />
              <Route path="/color/contrast-checker" element={<ContrastChecker />} />
              <Route path="/color/random-generator" element={<RandomColorGenerator />} />
              <Route path="/color/shades-tints" element={<ShadesTintsGenerator />} />
              <Route path="/color/css-names" element={<CssColorNames />} />
              <Route path="/color/color-to-image" element={<ColorToImage />} />
              <Route path="/color/color-extractor" element={<ColorExtractor />} />
              
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
