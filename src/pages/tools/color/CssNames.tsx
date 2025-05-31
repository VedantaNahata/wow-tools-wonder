
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Palette, Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CssNames = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const cssColors = [
    { name: "aliceblue", hex: "#f0f8ff" },
    { name: "antiquewhite", hex: "#faebd7" },
    { name: "aqua", hex: "#00ffff" },
    { name: "aquamarine", hex: "#7fffd4" },
    { name: "azure", hex: "#f0ffff" },
    { name: "beige", hex: "#f5f5dc" },
    { name: "bisque", hex: "#ffe4c4" },
    { name: "black", hex: "#000000" },
    { name: "blanchedalmond", hex: "#ffebcd" },
    { name: "blue", hex: "#0000ff" },
    { name: "blueviolet", hex: "#8a2be2" },
    { name: "brown", hex: "#a52a2a" },
    { name: "burlywood", hex: "#deb887" },
    { name: "cadetblue", hex: "#5f9ea0" },
    { name: "chartreuse", hex: "#7fff00" },
    { name: "chocolate", hex: "#d2691e" },
    { name: "coral", hex: "#ff7f50" },
    { name: "cornflowerblue", hex: "#6495ed" },
    { name: "cornsilk", hex: "#fff8dc" },
    { name: "crimson", hex: "#dc143c" },
    { name: "cyan", hex: "#00ffff" },
    { name: "darkblue", hex: "#00008b" },
    { name: "darkcyan", hex: "#008b8b" },
    { name: "darkgoldenrod", hex: "#b8860b" },
    { name: "darkgray", hex: "#a9a9a9" },
    { name: "darkgreen", hex: "#006400" },
    { name: "darkkhaki", hex: "#bdb76b" },
    { name: "darkmagenta", hex: "#8b008b" },
    { name: "darkolivegreen", hex: "#556b2f" },
    { name: "darkorange", hex: "#ff8c00" },
    { name: "darkorchid", hex: "#9932cc" },
    { name: "darkred", hex: "#8b0000" },
    { name: "darksalmon", hex: "#e9967a" },
    { name: "darkseagreen", hex: "#8fbc8f" },
    { name: "darkslateblue", hex: "#483d8b" },
    { name: "darkslategray", hex: "#2f4f4f" },
    { name: "darkturquoise", hex: "#00ced1" },
    { name: "darkviolet", hex: "#9400d3" },
    { name: "deeppink", hex: "#ff1493" },
    { name: "deepskyblue", hex: "#00bfff" },
    { name: "dimgray", hex: "#696969" },
    { name: "dodgerblue", hex: "#1e90ff" },
    { name: "firebrick", hex: "#b22222" },
    { name: "floralwhite", hex: "#fffaf0" },
    { name: "forestgreen", hex: "#228b22" },
    { name: "fuchsia", hex: "#ff00ff" },
    { name: "gainsboro", hex: "#dcdcdc" },
    { name: "ghostwhite", hex: "#f8f8ff" },
    { name: "gold", hex: "#ffd700" },
    { name: "goldenrod", hex: "#daa520" },
    { name: "gray", hex: "#808080" },
    { name: "green", hex: "#008000" },
    { name: "greenyellow", hex: "#adff2f" },
    { name: "honeydew", hex: "#f0fff0" },
    { name: "hotpink", hex: "#ff69b4" },
    { name: "indianred", hex: "#cd5c5c" },
    { name: "indigo", hex: "#4b0082" },
    { name: "ivory", hex: "#fffff0" },
    { name: "khaki", hex: "#f0e68c" },
    { name: "lavender", hex: "#e6e6fa" },
    { name: "lavenderblush", hex: "#fff0f5" },
    { name: "lawngreen", hex: "#7cfc00" },
    { name: "lemonchiffon", hex: "#fffacd" },
    { name: "lightblue", hex: "#add8e6" },
    { name: "lightcoral", hex: "#f08080" },
    { name: "lightcyan", hex: "#e0ffff" },
    { name: "lightgoldenrodyellow", hex: "#fafad2" },
    { name: "lightgray", hex: "#d3d3d3" },
    { name: "lightgreen", hex: "#90ee90" },
    { name: "lightpink", hex: "#ffb6c1" },
    { name: "lightsalmon", hex: "#ffa07a" },
    { name: "lightseagreen", hex: "#20b2aa" },
    { name: "lightskyblue", hex: "#87cefa" },
    { name: "lightslategray", hex: "#778899" },
    { name: "lightsteelblue", hex: "#b0c4de" },
    { name: "lightyellow", hex: "#ffffe0" },
    { name: "lime", hex: "#00ff00" },
    { name: "limegreen", hex: "#32cd32" },
    { name: "linen", hex: "#faf0e6" },
    { name: "magenta", hex: "#ff00ff" },
    { name: "maroon", hex: "#800000" },
    { name: "mediumaquamarine", hex: "#66cdaa" },
    { name: "mediumblue", hex: "#0000cd" },
    { name: "mediumorchid", hex: "#ba55d3" },
    { name: "mediumpurple", hex: "#9370db" },
    { name: "mediumseagreen", hex: "#3cb371" },
    { name: "mediumslateblue", hex: "#7b68ee" },
    { name: "mediumspringgreen", hex: "#00fa9a" },
    { name: "mediumturquoise", hex: "#48d1cc" },
    { name: "mediumvioletred", hex: "#c71585" },
    { name: "midnightblue", hex: "#191970" },
    { name: "mintcream", hex: "#f5fffa" },
    { name: "mistyrose", hex: "#ffe4e1" },
    { name: "moccasin", hex: "#ffe4b5" },
    { name: "navajowhite", hex: "#ffdead" },
    { name: "navy", hex: "#000080" },
    { name: "oldlace", hex: "#fdf5e6" },
    { name: "olive", hex: "#808000" },
    { name: "olivedrab", hex: "#6b8e23" },
    { name: "orange", hex: "#ffa500" },
    { name: "orangered", hex: "#ff4500" },
    { name: "orchid", hex: "#da70d6" },
    { name: "palegoldenrod", hex: "#eee8aa" },
    { name: "palegreen", hex: "#98fb98" },
    { name: "paleturquoise", hex: "#afeeee" },
    { name: "palevioletred", hex: "#db7093" },
    { name: "papayawhip", hex: "#ffefd5" },
    { name: "peachpuff", hex: "#ffdab9" },
    { name: "peru", hex: "#cd853f" },
    { name: "pink", hex: "#ffc0cb" },
    { name: "plum", hex: "#dda0dd" },
    { name: "powderblue", hex: "#b0e0e6" },
    { name: "purple", hex: "#800080" },
    { name: "red", hex: "#ff0000" },
    { name: "rosybrown", hex: "#bc8f8f" },
    { name: "royalblue", hex: "#4169e1" },
    { name: "saddlebrown", hex: "#8b4513" },
    { name: "salmon", hex: "#fa8072" },
    { name: "sandybrown", hex: "#f4a460" },
    { name: "seagreen", hex: "#2e8b57" },
    { name: "seashell", hex: "#fff5ee" },
    { name: "sienna", hex: "#a0522d" },
    { name: "silver", hex: "#c0c0c0" },
    { name: "skyblue", hex: "#87ceeb" },
    { name: "slateblue", hex: "#6a5acd" },
    { name: "slategray", hex: "#708090" },
    { name: "snow", hex: "#fffafa" },
    { name: "springgreen", hex: "#00ff7f" },
    { name: "steelblue", hex: "#4682b4" },
    { name: "tan", hex: "#d2b48c" },
    { name: "teal", hex: "#008080" },
    { name: "thistle", hex: "#d8bfd8" },
    { name: "tomato", hex: "#ff6347" },
    { name: "turquoise", hex: "#40e0d0" },
    { name: "violet", hex: "#ee82ee" },
    { name: "wheat", hex: "#f5deb3" },
    { name: "white", hex: "#ffffff" },
    { name: "whitesmoke", hex: "#f5f5f5" },
    { name: "yellow", hex: "#ffff00" },
    { name: "yellowgreen", hex: "#9acd32" }
  ];

  const filteredColors = cssColors.filter(color =>
    color.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyColor = (color: { name: string; hex: string }) => {
    navigator.clipboard.writeText(color.hex);
    toast({
      title: "Copied!",
      description: `${color.name} (${color.hex}) copied to clipboard`,
    });
  };

  const faqs = [
    {
      question: "What are CSS color names?",
      answer: "CSS color names are predefined color keywords that can be used directly in CSS instead of hex codes. There are 147 named colors in the CSS specification."
    },
    {
      question: "Can I use these in any CSS property?",
      answer: "Yes, CSS color names can be used anywhere you would use a color value: background-color, color, border-color, etc."
    },
    {
      question: "Are CSS color names supported everywhere?",
      answer: "CSS color names are widely supported across all modern browsers and have been part of the CSS specification for many years."
    }
  ];

  return (
    <SEOWrapper
      title="CSS Color Names Explorer - 147 Named Colors with HEX Codes"
      description="Explore all 147 CSS named colors with live previews and HEX codes. Find the perfect CSS color name for your web projects."
      keywords="css color names, named colors, css colors, web colors, color keywords"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              CSS Color Names
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore all 147 CSS named colors with previews and HEX codes.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSS Color Names Explorer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Label htmlFor="search">Search Colors</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by color name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Showing {filteredColors.length} of {cssColors.length} colors
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredColors.map((color, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => copyColor(color)}
                    >
                      <div
                        className="w-full h-16 rounded-lg border mb-3"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{color.name}</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {color.hex}
                        </div>
                      </div>
                      <div className="flex items-center justify-end mt-2">
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>

                {filteredColors.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No colors found matching "{searchTerm}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="CSS Color Names" faqs={faqs} />
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

export default CssNames;
