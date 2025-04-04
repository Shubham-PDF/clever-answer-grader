
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, HelpCircle, Sparkles, Brain } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isEvaluating: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit, isEvaluating }) => {
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showWordSuggestions, setShowWordSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Count words and characters
    const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(answer.length);
    
    // Auto-show suggestions for short answers
    setShowWordSuggestions(words > 0 && words < 30);
  }, [answer]);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
      // Don't clear the answer so the user can see what they submitted
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const answerTips = [
    "Include key terminology related to the topic",
    "Explain concepts clearly with examples when possible",
    "Structure your answer with a brief introduction and conclusion",
    "Connect different concepts to show understanding of relationships"
  ];

  const handleFocusTextarea = () => {
    textareaRef.current?.focus();
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label 
          htmlFor="answer" 
          className="block text-sm font-medium text-gray-700 cursor-pointer"
          onClick={handleFocusTextarea}
        >
          <div className="flex items-center">
            <Brain className="h-4 w-4 mr-1 text-education-primary" />
            Your Answer
          </div>
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {wordCount} words | {charCount} chars
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" aria-label="Answer tips">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="text-sm font-medium mb-1">Tips for a good answer:</div>
                <ul className="text-xs list-disc pl-4 space-y-1">
                  {answerTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Textarea
        ref={textareaRef}
        id="answer"
        placeholder="Type your answer here... Explain the concept thoroughly and include key terminology."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-[200px] text-base resize-y transition-all focus:border-education-primary focus:ring-1 focus:ring-education-primary"
      />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Press Ctrl+Enter to submit
        </span>
        <div className="flex gap-2">
          {showWordSuggestions && (
            <div className="flex items-center text-amber-600 text-xs mr-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Consider writing a more thorough answer
            </div>
          )}
          <Button 
            onClick={handleSubmit} 
            disabled={!answer.trim() || isEvaluating}
            className="bg-education-primary hover:bg-education-primary/90 transition-all"
          >
            {isEvaluating ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Evaluating...
              </div>
            ) : (
              <>
                <Send className="mr-1 h-4 w-4" /> Evaluate Answer
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;
