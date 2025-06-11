import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const CssColorNames = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const cssColors = [
    { name: "aliceblue", hex: "#F0F8FF" },
    { name: "antiquewhite", hex: "#FAEBD7" },
    { name: "aqua", hex: "#00FFFF" },
    { name: "aquamarine", hex: "#7FFFD4" },
    { name: "azure", hex: "#F0FFFF" },
    { name: "beige", hex: "#F5F5DC" },
    { name: "bisque", hex: "#FFE4C4" },
    { name: "black", hex: "#000000" },
    { name: "blanchedalmond", hex: "#FFEBCD" },
    { name: "blue", hex: "#0000FF" },
    { name: "blueviolet", hex: "#8A2BE2" },
    { name: "brown", hex: "#A52A2A" },
    { name: "burlywood", hex: "#DEB887" },
    { name: "cadetblue", hex: "#5F9EA0" },
    { name: "chartreuse", hex: "#7FFF00" },
    { name: "chocolate", hex: "#D2691E" },
    { name: "coral", hex: "#FF7F50" },
    { name: "cornflowerblue", hex: "#6495ED" },
    { name: "cornsilk", hex: "#FFF8DC" },
    { name: "crimson", hex: "#DC143C" },
    { name: "cyan", hex: "#00FFFF" },
    { name: "darkblue", hex: "#00008B" },
    { name: "darkcyan", hex: "#008B8B" },
    { name: "darkgoldenrod", hex: "#B8860B" },
    { name: "darkgray", hex: "#A9A9A9" },
    { name: "darkgreen", hex: "#006400" },
    { name: "darkkhaki", hex: "#BDB76B" },
    { name: "darkmagenta", hex: "#8B008B" },
    { name: "darkolivegreen", hex: "#556B2F" },
    { name: "darkorange", hex: "#FF8C00" },
    { name: "darkorchid", hex: "#9932CC" },
    { name: "darkred", hex: "#8B0000" },
    { name: "darksalmon", hex: "#E9967A" },
    { name: "darkseagreen", hex: "#8FBC8F" },
    { name: "darkslateblue", hex: "#483D8B" },
    { name: "darkslategray", hex: "#2F4F4F" },
    { name: "darkturquoise", hex: "#00CED1" },
    { name: "darkviolet", hex: "#9400D3" },
    { name: "deeppink", hex: "#FF1493" },
    { name: "deepskyblue", hex: "#00BFFF" },
    { name: "dimgray", hex: "#696969" },
    { name: "dodgerblue", hex: "#1E90FF" },
    { name: "firebrick", hex: "#B22222" },
    { name: "floralwhite", hex: "#FFFAF0" },
    { name: "forestgreen", hex: "#228B22" },
    { name: "fuchsia", hex: "#FF00FF" },
    { name: "gainsboro", hex: "#DCDCDC" },
    { name: "ghostwhite", hex: "#F8F8FF" },
    { name: "gold", hex: "#FFD700" },
    { name: "goldenrod", hex: "#DAA520" },
    { name: "gray", hex: "#808080" },
    { name: "green", hex: "#008000" },
    { name: "greenyellow", hex: "#ADFF2F" },
    { name: "honeydew", hex: "#F0FFF0" },
    { name: "hotpink", hex: "#FF69B4" },
    { name: "indianred", hex: "#CD5C5C" },
    { name: "indigo", hex: "#4B0082" },
    { name: "ivory", hex: "#FFFFF0" },
    { name: "khaki", hex: "#F0E68C" },
    { name: "lavender", hex: "#E6E6FA" },
    { name: "lavenderblush", hex: "#FFF0F5" },
    { name: "lawngreen", hex: "#7CFC00" },
    { name: "lemonchiffon", hex: "#FFFACD" },
    { name: "lightblue", hex: "#ADD8E6" },
    { name: "lightcoral", hex: "#F08080" },
    { name: "lightcyan", hex: "#E0FFFF" },
    { name: "lightgoldenrodyellow", hex: "#FAFAD2" },
    { name: "lightgray", hex: "#D3D3D3" },
    { name: "lightgreen", hex: "#90EE90" },
    { name: "lightpink", hex: "#FFB6C1" },
    { name: "lightsalmon", hex: "#FFA07A" },
    { name: "lightseagreen", hex: "#20B2AA" },
    { name: "lightskyblue", hex: "#87CEFA" },
    { name: "lightslategray", hex: "#778899" },
    { name: "lightsteelblue", hex: "#B0C4DE" },
    { name: "lightyellow", hex: "#FFFFE0" },
    { name: "lime", hex: "#00FF00" },
    { name: "limegreen", hex: "#32CD32" },
    { name: "linen", hex: "#FAF0E6" },
    { name: "magenta", hex: "#FF00FF" },
    { name: "maroon", hex: "#800000" },
    { name: "mediumaquamarine", hex: "#66CDAA" },
    { name: "mediumblue", hex: "#0000CD" },
    { name: "mediumorchid", hex: "#BA55D3" },
    { name: "mediumpurple", hex: "#9370DB" },
    { name: "mediumseagreen", hex: "#3CB371" },
    { name: "mediumslateblue", hex: "#7B68EE" },
    { name: "mediumspringgreen", hex: "#00FA9A" },
    { name: "mediumturquoise", hex: "#48D1CC" },
    { name: "mediumvioletred", hex: "#C71585" },
    { name: "midnightblue", hex: "#191970" },
    { name: "mintcream", hex: "#F5FFFA" },
    { name: "mistyrose", hex: "#FFE4E1" },
    { name: "moccasin", hex: "#FFE4B5" },
    { name: "navajowhite", hex: "#FFDEAD" },
    { name: "navy", hex: "#000080" },
    { name: "oldlace", hex: "#FDF5E6" },
    { name: "olive", hex: "#808000" },
    { name: "olivedrab", hex: "#6B8E23" },
    { name: "orange", hex: "#FFA500" },
    { name: "orangered", hex: "#FF4500" },
    { name: "orchid", hex: "#DA70D6" },
    { name: "palegoldenrod", hex: "#EEE8AA" },
    { name: "palegreen", hex: "#98FB98" },
    { name: "paleturquoise", hex: "#AFEEEE" },
    { name: "palevioletred", hex: "#DB7093" },
    { name: "papayawhip", hex: "#FFEFD5" },
    { name: "peachpuff", hex: "#FFDAB9" },
    { name: "peru", hex: "#CD853F" },
    { name: "pink", hex: "#FFC0CB" },
    { name: "plum", hex: "#DDA0DD" },
    { name: "powderblue", hex: "#B0E0E6" },
    { name: "purple", hex: "#800080" },
    { name: "red", hex: "#FF0000" },
    { name: "rosybrown", hex: "#BC8F8F" },
    { name: "royalblue", hex: "#4169E1" },
    { name: "saddlebrown", hex: "#8B4513" },
    { name: "salmon", hex: "#FA8072" },
    { name: "sandybrown", hex: "#F4A460" },
    { name: "seagreen", hex: "#2E8B57" },
    { name: "seashell", hex: "#FFF5EE" },
    { name: "sienna", hex: "#A0522D" },
    { name: "silver", hex: "#C0C0C0" },
    { name: "skyblue", hex: "#87CEEB" },
    { name: "slateblue", hex: "#6A5ACD" },
    { name: "slategray", hex: "#708090" },
    { name: "snow", hex: "#FFFAFA" },
    { name: "springgreen", hex: "#00FF7F" },
    { name: "steelblue", hex: "#4682B4" },
    { name: "tan", hex: "#D2B48C" },
    { name: "teal", hex: "#008080" },
    { name: "thistle", hex: "#D8BFD8" },
    { name: "tomato", hex: "#FF6347" },
    { name: "turquoise", hex: "#40E0D0" },
    { name: "violet", hex: "#EE82EE" },
    { name: "wheat", hex: "#F5DEB3" },
    { name: "white", hex: "#FFFFFF" },
    { name: "whitesmoke", hex: "#F5F5F5" },
    { name: "yellow", hex: "#FFFF00" },
    { name: "yellowgreen", hex: "#9ACD32" }
  ];

  const filteredColors = cssColors.filter(color =>
    color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.hex.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyColor = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${value} copied to clipboard`
    });
  };

  const faqs = [
    {
      question: "Can I use these color names in CSS?",
      answer: "Yes! All these color names are standard CSS named colors that work in all modern browsers. You can use them directly in CSS like 'color: red;' or 'background-color: lightblue;'"
    },
    {
      question: "Are HEX codes better than color names?",
      answer: "Both work fine, but HEX codes give you access to millions more colors. Named colors are convenient for common colors and quick prototyping."
    }
  ];

  return (
    <SEOWrapper
      title="CSS Color Names Explorer - All Named CSS Colors"
      description="Browse all 140+ named CSS colors with previews and HEX codes. Copy color names or HEX values for your projects."
      keywords="css color names, named colors, css colors, web colors, color reference"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSS Color Names Explorer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse all 140+ named CSS colors with live previews and HEX codes.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSS Color Names</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Colors</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name or HEX code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  Showing {filteredColors.length} of {cssColors.length} colors
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredColors.map((color, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div 
                        className="h-20 cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => copyColor(color.hex)}
                      />
                      <CardContent className="p-3 space-y-2">
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyColor(color.name)}
                            className="w-full justify-start font-mono text-sm"
                          >
                            {color.name}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyColor(color.hex)}
                            className="w-full justify-start font-mono text-sm"
                          >
                            {color.hex}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredColors.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No colors found matching "{searchTerm}"
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="CSS Color Names Explorer" faqs={faqs} />
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

export default CssColorNames;
