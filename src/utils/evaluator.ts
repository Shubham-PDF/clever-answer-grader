
import { QuestionData } from "../data/questions";

interface EvaluationResult {
  score: number;
  percentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  feedback: string;
}

// Helper function to calculate semantic similarity (simulating embedding-based matching)
const calculateSemanticSimilarity = (userAnswer: string, idealAnswer: string): number => {
  // In a real implementation, this would use embeddings and cosine similarity
  // For now, we'll use a simple heuristic based on word overlap
  const userWords = new Set(userAnswer.toLowerCase().split(/\s+/));
  const idealWords = new Set(idealAnswer.toLowerCase().split(/\s+/));
  
  let commonWords = 0;
  idealWords.forEach(word => {
    if (userWords.has(word) && word.length > 3) { // Only count substantial words
      commonWords++;
    }
  });
  
  return Math.min(0.9, commonWords / idealWords.size);
};

// Helper function to detect explanation quality
const detectExplanationQuality = (userAnswer: string): number => {
  // Check for explanation patterns like "because", "therefore", "this means", etc.
  const explanationPatterns = [
    "because", "therefore", "thus", "as a result", "consequently",
    "this means", "this leads to", "this results in", "this causes",
    "for example", "such as", "specifically", "in particular"
  ];
  
  let explanationPoints = 0;
  explanationPatterns.forEach(pattern => {
    if (userAnswer.toLowerCase().includes(pattern)) {
      explanationPoints += 0.05; // Add 5% for each explanation pattern
    }
  });
  
  return Math.min(0.3, explanationPoints); // Cap at 30% bonus
};

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
  
  // Calculate keyword-based score
  const maxKeywords = question.keywords.length;
  const keywordRatio = matchedKeywords.length / maxKeywords;
  
  // Calculate semantic similarity score (Phase 2 enhancement)
  const semanticScore = calculateSemanticSimilarity(userAnswer, question.ideal_answer);
  
  // Calculate explanation quality bonus (Phase 3 enhancement)
  const explanationBonus = detectExplanationQuality(userAnswer);
  
  // Combined score calculation with weights
  const keywordWeight = 0.7; // 70% weight to keywords
  const semanticWeight = 0.2; // 20% weight to semantic similarity
  const explanationWeight = 0.1; // 10% weight to explanation quality
  
  const combinedScore = (
    keywordRatio * keywordWeight +
    semanticScore * semanticWeight +
    explanationBonus * explanationWeight
  ) * question.marks;
  
  // Round to 1 decimal place
  const score = Math.round(combinedScore * 10) / 10;
  const percentage = Math.round((score / question.marks) * 100);
  
  // Generate detailed feedback
  let feedback = "";
  if (percentage >= 90) {
    feedback = "Excellent answer! You've covered all the important concepts and provided clear explanations.";
  } else if (percentage >= 75) {
    feedback = "Great answer! You've covered most of the important concepts with good explanations.";
  } else if (percentage >= 60) {
    feedback = "Good answer, but you could improve by explaining some concepts more thoroughly.";
  } else if (percentage >= 40) {
    feedback = "Satisfactory answer, but you missed some important concepts. Try to be more comprehensive.";
  } else {
    feedback = "Your answer needs improvement. Consider covering the key concepts and explaining them better.";
  }
  
  // Add specific feedback about missing keywords
  if (missingKeywords.length > 0) {
    const missingTerms = missingKeywords.length <= 3 
      ? missingKeywords.join(", ") 
      : `${missingKeywords.slice(0, 3).join(", ")}, and others`;
      
    feedback += ` Focus on including concepts like: ${missingTerms}.`;
  }
  
  return {
    score,
    percentage,
    matchedKeywords,
    missingKeywords,
    feedback,
  };
};
