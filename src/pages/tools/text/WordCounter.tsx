import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = text.trim()
      ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
      : 0;
    const averageWordsPerSentence =
      sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0;
    const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      averageWordsPerSentence,
      readingTime,
    };
  }, [text]);

  const faqs = [
    {
      question: "What is a word counter tool?",
      answer:
        "A word counter tool calculates the number of words, characters, sentences, and sometimes paragraphs in a given text. It's commonly used for academic, writing, and SEO purposes.",
    },
    {
      question: "How do I use this free online word counter?",
      answer:
        "Paste or type your content into the input box. The tool will automatically display word count, character count (with and without spaces), and sentence count in real time.",
    },
    {
      question: "Can I use this tool for essays, resumes, or SEO content?",
      answer:
        "Absolutely. This tool is perfect for checking word limits in essays, optimizing SEO articles, or editing resumes to fit application requirements.",
    },
    {
      question: "Is the word counter tool really free to use?",
      answer:
        "Yes, this word counter is 100% free, online, and browser-based. There’s no need to download anything or create an account.",
    },
    {
      question: "Does the word counter count characters and sentences too?",
      answer:
        "Yes, in addition to words, it shows character count (with/without spaces) and the number of sentences, making it a full-featured text analysis tool.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Word Counter - Count Words, Characters & Sentences Instantly"
      description="Use this free online word counter to count words, characters, and sentences in real-time. Perfect for essays, articles, SEO content, and more. No login, browser-based."
      keywords="free online word counter, word and character counter, count words online, essay word counter, SEO word count tool, character count tool, sentence counter, count text length"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Word Counter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze your text with detailed statistics. Count words, characters,
            sentences, paragraphs, and get reading time estimates instantly.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Enter Your Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start typing or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-64"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.words}
                  </div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.characters}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Characters
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.charactersNoSpaces}
                  </div>
                  <div className="text-sm text-muted-foreground">No Spaces</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.sentences}
                  </div>
                  <div className="text-sm text-muted-foreground">Sentences</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Paragraphs:</span>
                      <Badge variant="secondary">{stats.paragraphs}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Average words per sentence:
                      </span>
                      <Badge variant="secondary">
                        {stats.averageWordsPerSentence}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Estimated reading time:
                      </span>
                      <Badge variant="secondary">{stats.readingTime} min</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Characters with spaces:
                      </span>
                      <Badge variant="outline">{stats.characters}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Characters without spaces:
                      </span>
                      <Badge variant="outline">
                        {stats.charactersNoSpaces}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Word density:
                      </span>
                      <Badge variant="outline">
                        {stats.characters > 0
                          ? Math.round(
                              (stats.words / stats.characters) * 1000
                            ) / 10
                          : 0}
                        %
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>About Word Counter</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  This word counter tool provides comprehensive text analysis to
                  help writers, students, and professionals track their writing
                  progress and ensure content meets specific requirements.
                </p>

                <h3>Features:</h3>
                <ul>
                  <li>Real-time word and character counting</li>
                  <li>Sentence and paragraph analysis</li>
                  <li>Reading time estimation</li>
                  <li>Average words per sentence calculation</li>
                  <li>Character count with and without spaces</li>
                </ul>

                <h3>Use Cases:</h3>
                <ul>
                  <li>Academic essays and research papers</li>
                  <li>Blog posts and articles</li>
                  <li>Social media content</li>
                  <li>SEO content optimization</li>
                  <li>Copywriting and marketing materials</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Writing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">Ideal sentence length:</div>
                  <div className="text-muted-foreground">
                    15-20 words for readability
                  </div>
                </div>
                <div>
                  <div className="font-medium">Blog post length:</div>
                  <div className="text-muted-foreground">
                    1,500-2,000 words for SEO
                  </div>
                </div>
                <div>
                  <div className="font-medium">Reading speed:</div>
                  <div className="text-muted-foreground">
                    200-250 words per minute
                  </div>
                </div>
                <div>
                  <div className="font-medium">Tweet length:</div>
                  <div className="text-muted-foreground">
                    280 characters max
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </SEOWrapper>
  );
};

export default WordCounter;
