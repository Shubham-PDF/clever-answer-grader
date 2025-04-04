
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

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
        
        <div className="space-y-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationResult;
