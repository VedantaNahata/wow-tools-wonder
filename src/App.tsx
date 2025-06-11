
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// Text Tools
import CaseConverter from "@/pages/tools/text/CaseConverter";
import WordCounter from "@/pages/tools/text/WordCounter";
import DuplicateLineRemover from "@/pages/tools/text/DuplicateLineRemover";
import FindAndReplace from "@/pages/tools/text/FindAndReplace";
import LoremGenerator from "@/pages/tools/text/LoremGenerator";
import TextCleaner from "@/pages/tools/text/TextCleaner";
import TextEncryptor from "@/pages/tools/text/TextEncryptor";
import TextReverser from "@/pages/tools/text/TextReverser";
import TextSorter from "@/pages/tools/text/TextSorter";
import TextToBinary from "@/pages/tools/text/TextToBinary";
import WordFrequencyCounter from "@/pages/tools/text/WordFrequencyCounter";

// Code Tools
import JsonFormatter from "@/pages/tools/code/JsonFormatter";
import HtmlTableGenerator from "@/pages/tools/code/HtmlTableGenerator";
import ExcelToHtmlConverter from "@/pages/tools/code/ExcelToHtmlConverter";
import CsvToTableConverter from "@/pages/tools/code/CsvToTableConverter";
import CssBeautifier from "@/pages/tools/code/CssBeautifier";
import CssMinifier from "@/pages/tools/code/CssMinifier";
import HtmlBeautifier from "@/pages/tools/code/HtmlBeautifier";
import HtmlMinifier from "@/pages/tools/code/HtmlMinifier";
import JavaScriptBeautifier from "@/pages/tools/code/JavaScriptBeautifier";
import JavaScriptMinifier from "@/pages/tools/code/JavaScriptMinifier";
import JsonToHtmlTable from "@/pages/tools/code/JsonToHtmlTable";
import MarkdownTableGenerator from "@/pages/tools/code/MarkdownTableGenerator";

// Color Tools
import ColorPicker from "@/pages/tools/color/ColorPicker";
import ColorExtractor from "@/pages/tools/color/ColorExtractor";
import ColorToImage from "@/pages/tools/color/ColorToImage";
import ContrastChecker from "@/pages/tools/color/ContrastChecker";
import CssColorNames from "@/pages/tools/color/CssColorNames";
import GradientGenerator from "@/pages/tools/color/GradientGenerator";
import HexConverter from "@/pages/tools/color/HexConverter";
import PaletteGenerator from "@/pages/tools/color/PaletteGenerator";
import RandomColorGenerator from "@/pages/tools/color/RandomColorGenerator";
import ShadesTintsGenerator from "@/pages/tools/color/ShadesTintsGenerator";

// Image Tools
import Base64Converter from "@/pages/tools/image/Base64Converter";
import ImageToBase64 from "@/pages/tools/image/ImageToBase64";
import Base64ToImage from "@/pages/tools/image/Base64ToImage";
import ImageResizer from "@/pages/tools/image/ImageResizer";
import ImageFormatConverter from "@/pages/tools/image/ImageFormatConverter";

// SEO Tools
import RobotsTester from "@/pages/tools/seo/RobotsTester";
import AltTagChecker from "@/pages/tools/seo/AltTagChecker";
import BrokenLinkChecker from "@/pages/tools/seo/BrokenLinkChecker";
import MetaTagAnalyzer from "@/pages/tools/seo/MetaTagAnalyzer";
import MetaTagGenerator from "@/pages/tools/seo/MetaTagGenerator";
import OgPreview from "@/pages/tools/seo/OgPreview";
import PageSizeChecker from "@/pages/tools/seo/PageSizeChecker";
import RedirectChecker from "@/pages/tools/seo/RedirectChecker";
import RobotsGenerator from "@/pages/tools/seo/RobotsGenerator";
import SerpPreview from "@/pages/tools/seo/SerpPreview";
import SitemapGenerator from "@/pages/tools/seo/SitemapGenerator";

// Math Tools
import AgeCalculator from "@/pages/tools/math/AgeCalculator";
import BaseConverter from "@/pages/tools/math/BaseConverter";
import ExpressionSimplifier from "@/pages/tools/math/ExpressionSimplifier";
import FactorialCalculator from "@/pages/tools/math/FactorialCalculator";
import InterestCalculator from "@/pages/tools/math/InterestCalculator";
import LcmHcfFinder from "@/pages/tools/math/LcmHcfFinder";
import MatrixCalculator from "@/pages/tools/math/MatrixCalculator";
import PercentageCalculator from "@/pages/tools/math/PercentageCalculator";
import PrimeChecker from "@/pages/tools/math/PrimeChecker";
import QuadraticSolver from "@/pages/tools/math/QuadraticSolver";
import UnitConverter from "@/pages/tools/math/UnitConverter";

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
            
            {/* Text Tools */}
            <Route path="/text/case-converter" element={<CaseConverter />} />
            <Route path="/text/word-counter" element={<WordCounter />} />
            <Route path="/text/duplicate-line-remover" element={<DuplicateLineRemover />} />
            <Route path="/text/find-and-replace" element={<FindAndReplace />} />
            <Route path="/text/lorem-generator" element={<LoremGenerator />} />
            <Route path="/text/text-cleaner" element={<TextCleaner />} />
            <Route path="/text/text-encryptor" element={<TextEncryptor />} />
            <Route path="/text/text-reverser" element={<TextReverser />} />
            <Route path="/text/text-sorter" element={<TextSorter />} />
            <Route path="/text/text-to-binary" element={<TextToBinary />} />
            <Route path="/text/word-frequency-counter" element={<WordFrequencyCounter />} />

            {/* Code Tools */}
            <Route path="/code/json-formatter" element={<JsonFormatter />} />
            <Route path="/code/html-table-generator" element={<HtmlTableGenerator />} />
            <Route path="/code/excel-to-html" element={<ExcelToHtmlConverter />} />
            <Route path="/code/csv-to-table" element={<CsvToTableConverter />} />
            <Route path="/code/css-beautifier" element={<CssBeautifier />} />
            <Route path="/code/css-minifier" element={<CssMinifier />} />
            <Route path="/code/html-beautifier" element={<HtmlBeautifier />} />
            <Route path="/code/html-minifier" element={<HtmlMinifier />} />
            <Route path="/code/javascript-beautifier" element={<JavaScriptBeautifier />} />
            <Route path="/code/javascript-minifier" element={<JavaScriptMinifier />} />
            <Route path="/code/json-to-html-table" element={<JsonToHtmlTable />} />
            <Route path="/code/markdown-table-generator" element={<MarkdownTableGenerator />} />

            {/* Color Tools */}
            <Route path="/color/color-picker" element={<ColorPicker />} />
            <Route path="/color/color-extractor" element={<ColorExtractor />} />
            <Route path="/color/color-to-image" element={<ColorToImage />} />
            <Route path="/color/contrast-checker" element={<ContrastChecker />} />
            <Route path="/color/css-color-names" element={<CssColorNames />} />
            <Route path="/color/gradient-generator" element={<GradientGenerator />} />
            <Route path="/color/hex-converter" element={<HexConverter />} />
            <Route path="/color/palette-generator" element={<PaletteGenerator />} />
            <Route path="/color/random-color-generator" element={<RandomColorGenerator />} />
            <Route path="/color/shades-tints-generator" element={<ShadesTintsGenerator />} />

            {/* Image Tools */}
            <Route path="/image/base64-converter" element={<Base64Converter />} />
            <Route path="/image/image-to-base64" element={<ImageToBase64 />} />
            <Route path="/image/base64-to-image" element={<Base64ToImage />} />
            <Route path="/image/image-resizer" element={<ImageResizer />} />
            <Route path="/image/format-converter" element={<ImageFormatConverter />} />

            {/* SEO Tools */}
            <Route path="/seo/robots-tester" element={<RobotsTester />} />
            <Route path="/seo/alt-tag-checker" element={<AltTagChecker />} />
            <Route path="/seo/broken-link-checker" element={<BrokenLinkChecker />} />
            <Route path="/seo/meta-tag-analyzer" element={<MetaTagAnalyzer />} />
            <Route path="/seo/meta-tag-generator" element={<MetaTagGenerator />} />
            <Route path="/seo/og-preview" element={<OgPreview />} />
            <Route path="/seo/page-size-checker" element={<PageSizeChecker />} />
            <Route path="/seo/redirect-checker" element={<RedirectChecker />} />
            <Route path="/seo/robots-generator" element={<RobotsGenerator />} />
            <Route path="/seo/serp-preview" element={<SerpPreview />} />
            <Route path="/seo/sitemap-generator" element={<SitemapGenerator />} />

            {/* Math Tools */}
            <Route path="/math/age-calculator" element={<AgeCalculator />} />
            <Route path="/math/base-converter" element={<BaseConverter />} />
            <Route path="/math/expression-simplifier" element={<ExpressionSimplifier />} />
            <Route path="/math/factorial-calculator" element={<FactorialCalculator />} />
            <Route path="/math/interest-calculator" element={<InterestCalculator />} />
            <Route path="/math/lcm-hcf-finder" element={<LcmHcfFinder />} />
            <Route path="/math/matrix-calculator" element={<MatrixCalculator />} />
            <Route path="/math/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/math/prime-checker" element={<PrimeChecker />} />
            <Route path="/math/quadratic-solver" element={<QuadraticSolver />} />
            <Route path="/math/unit-converter" element={<UnitConverter />} />
            
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
