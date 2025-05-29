
import { useEffect } from "react";

interface SEOWrapperProps {
  title: string;
  description: string;
  keywords?: string;
  children: React.ReactNode;
}

const SEOWrapper = ({ title, description, keywords, children }: SEOWrapperProps) => {
  useEffect(() => {
    document.title = `${title} | WowsomeTools - Free Online Tools`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    
    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }
  }, [title, description, keywords]);

  return <>{children}</>;
};

export default SEOWrapper;
