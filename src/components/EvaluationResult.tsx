
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, BookOpen, Brain } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface EvaluationResultProps {
  score: number;
  maxScore: number;
  percentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  feedback: string;
}

const EvaluationResult: React.FC<EvaluationResultProps> = ({
  score,
  maxScore,
  percentage,
  matchedKeywords,
  missingKeywords,
  feedback
}) => {
  let scoreColor = 'bg-red-100 text-red-700';
  let scoreIcon = <AlertCircle className="mr-1" size={18} />;
  
  if (percentage >= 80) {
    scoreColor = 'bg-green-100 text-green-700';
    scoreIcon = <CheckCircle2 className="mr-1" size={18} />;
  } else if (percentage >= 50) {
    scoreColor = 'bg-yellow-100 text-yellow-700';
    scoreIcon = <AlertCircle className="mr-1" size={18} />;
  } else {
    scoreIcon = <XCircle className="mr-1" size={18} />;
  }

  // Calculate score breakdown
  const keywordScore = Math.round((matchedKeywords.length / (matchedKeywords.length + missingKeywords.length)) * 100);
  const explanationScore = percentage > keywordScore ? percentage : keywordScore;

  return (
    <Card className="mt-6 border-t-4 border-t-education-primary animate-score-animation">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Evaluation Result</span>
          <div className={`${scoreColor} px-3 py-1 rounded-full text-sm font-semibold flex items-center`}>
            {scoreIcon} {score}/{maxScore} ({percentage}%)
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-lg font-medium mb-2">{feedback}</p>
        </div>
        
        <div className="space-y-5">
          {/* Score breakdown section */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Answer Assessment</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1">
                    <BookOpen size={16} className="text-education-primary" />
                    Key Concepts
                  </span>
                  <span>{keywordScore}%</span>
                </div>
                <Progress value={keywordScore} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1">
                    <Brain size={16} className="text-education-primary" />
                    Explanation Quality
                  </span>
                  <span>{explanationScore}%</span>
                </div>
                <Progress value={explanationScore} className="h-2" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">Concepts You Covered:</h4>
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.length > 0 ? (
                matchedKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {keyword}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No key concepts were identified in your answer.</p>
              )}
            </div>
          </div>
          
          {missingKeywords.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Missing Concepts:</h4>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">Study Tips:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              {missingKeywords.length > 0 && (
                <li>Review the key concepts you missed in your textbook or lecture notes.</li>
              )}
              <li>Practice writing more complete explanations that connect concepts together.</li>
              <li>Use specific examples to illustrate theoretical concepts when appropriate.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationResult;
