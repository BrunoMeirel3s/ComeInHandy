import { useState } from "react";

export default function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(true);
  
    const copyToClipboard = (text) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
          .then(() => {
            setIsCopied(true);
          })
          .catch((error) => {
            console.error('Failed to copy text to clipboard:', error);
          });
      } else {
        fallbackCopyToClipboard(text);
      }
    };
  
    const fallbackCopyToClipboard = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
  
      try {
        document.execCommand('copy');
        setIsCopied(true);
      } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
      }
  
      document.body.removeChild(textarea);
    };
  
    return { isCopied, copyToClipboard };
  }