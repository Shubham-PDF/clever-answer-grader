
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionData } from '@/data/questions';

interface QuestionCardProps {
  question: QuestionData;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <Card className="mt-6">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-education-primary text-white px-2 py-1 rounded text-sm font-medium">
              {question.subject}
            </span>
            <span className="text-gray-500 text-sm">
              {question.topic}
            </span>
          </div>
          <div className="text-sm font-medium">
            {question.marks} marks
          </div>
        </div>
        <CardTitle className="text-lg md:text-xl font-serif mt-2">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-500 mb-1">
          Your answer should include key concepts related to this topic.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
