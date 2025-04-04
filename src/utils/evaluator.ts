
import { QuestionData } from "../data/questions";

interface EvaluationResult {
  score: number;
  percentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  feedback: string;
}

export const evaluateAnswer = (
  question: QuestionData,
  userAnswer: string
): EvaluationResult => {
  // Preprocess the user's answer - convert to lowercase
  const preprocessedAnswer = userAnswer.toLowerCase();
  
  // Count matched keywords
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  
  question.keywords.forEach(keyword => {
    if (preprocessedAnswer.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });
  
  // Calculate score based on matched keywords
  const maxKeywords = question.keywords.length;
  const keywordRatio = matchedKeywords.length / maxKeywords;
  const rawScore = keywordRatio * question.marks;
  const score = Math.round(rawScore * 10) / 10; // Round to 1 decimal place
  const percentage = Math.round((score / question.marks) * 100);
  
  // Generate feedback
  let feedback = "";
  if (percentage >= 90) {
    feedback = "Excellent answer! You've covered all the important concepts.";
  } else if (percentage >= 70) {
    feedback = "Good answer! You've covered most of the important concepts.";
  } else if (percentage >= 50) {
    feedback = "Satisfactory answer, but you missed some important concepts.";
  } else {
    feedback = "Your answer needs improvement. Consider covering more key concepts.";
  }
  
  return {
    score,
    percentage,
    matchedKeywords,
    missingKeywords,
    feedback,
  };
};
