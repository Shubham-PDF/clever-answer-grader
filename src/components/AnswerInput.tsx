
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isEvaluating: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit, isEvaluating }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  return (
    <div className="mt-4">
      <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
        Your Answer
      </label>
      <Textarea
        id="answer"
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="min-h-[200px] text-base"
      />
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!answer.trim() || isEvaluating}
          className="bg-education-primary hover:bg-education-primary/90"
        >
          {isEvaluating ? 'Evaluating...' : 'Evaluate Answer'}
        </Button>
      </div>
    </div>
  );
};

export default AnswerInput;
