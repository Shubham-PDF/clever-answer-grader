
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
  // For now, we'll use a simple heuristic based on word overlap and phrase matching
  const userWords = new Set(userAnswer.toLowerCase().split(/\s+/));
  const idealWords = new Set(idealAnswer.toLowerCase().split(/\s+/));
  
  let commonWords = 0;
  idealWords.forEach(word => {
    if (userWords.has(word) && word.length > 3) { // Only count substantial words
      commonWords++;
    }
  });

  // Check for phrase matches (bigrams and trigrams)
  const userLower = userAnswer.toLowerCase();
  const idealLower = idealAnswer.toLowerCase();
  const idealPhrases = extractPhrases(idealLower);
  let phraseMatches = 0;
  
  idealPhrases.forEach(phrase => {
    if (userLower.includes(phrase)) {
      phraseMatches++;
    }
  });
  
  // Combine word and phrase matching
  const wordSimilarity = commonWords / Math.max(1, idealWords.size);
  const phraseSimilarity = phraseMatches / Math.max(1, idealPhrases.length);
  
  return Math.min(0.95, (wordSimilarity * 0.5) + (phraseSimilarity * 0.5));
};

// Helper function to extract phrases for matching
const extractPhrases = (text: string): string[] => {
  const words = text.split(/\s+/);
  const phrases: string[] = [];
  
  // Extract bigrams
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].length > 3 && words[i+1].length > 3) {
      phrases.push(`${words[i]} ${words[i+1]}`);
    }
  }
  
  // Extract trigrams
  for (let i = 0; i < words.length - 2; i++) {
    if (words[i].length > 3 && words[i+2].length > 3) {
      phrases.push(`${words[i]} ${words[i+1]} ${words[i+2]}`);
    }
  }
  
  return phrases;
};

// Helper function to detect explanation quality
const detectExplanationQuality = (userAnswer: string): number => {
  // Check for explanation patterns like "because", "therefore", etc.
  const explanationPatterns = [
    "because", "therefore", "thus", "as a result", "consequently",
    "this means", "this leads to", "this results in", "this causes",
    "for example", "such as", "specifically", "in particular",
    "defines", "refers to", "is defined as", "can be understood as",
    "consists of", "comprises", "involves"
  ];
  
  let explanationPoints = 0;
  explanationPatterns.forEach(pattern => {
    if (userAnswer.toLowerCase().includes(pattern)) {
      explanationPoints += 0.05; // Add 5% for each explanation pattern
    }
  });
  
  // Check for sentence structure variety (rough heuristic)
  const sentences = userAnswer.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const uniqueSentenceStarts = new Set(
    sentences.map(s => s.trim().split(' ')[0].toLowerCase())
  ).size;
  const sentenceVarietyBonus = Math.min(0.1, uniqueSentenceStarts / sentences.length);
  
  // Check for answer length (more comprehensive answers get a bonus)
  const wordCount = userAnswer.split(/\s+/).length;
  const lengthBonus = Math.min(0.1, wordCount / 200);
  
  return Math.min(0.35, explanationPoints + sentenceVarietyBonus + lengthBonus);
};

// Function to detect specific examples in the answer
const detectExamples = (userAnswer: string): number => {
  const examplePatterns = [
    "for example", "such as", "for instance", "e.g.", "i.e.",
    "to illustrate", "consider", "let's say", "imagine", 
    "take the case", "in the case of"
  ];
  
  let examplePoints = 0;
  examplePatterns.forEach(pattern => {
    if (userAnswer.toLowerCase().includes(pattern)) {
      examplePoints += 0.08; // Add 8% for each example pattern
    }
  });
  
  return Math.min(0.2, examplePoints);
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
  
  // Calculate semantic similarity score
  const semanticScore = calculateSemanticSimilarity(userAnswer, question.ideal_answer);
  
  // Calculate explanation quality bonus
  const explanationBonus = detectExplanationQuality(userAnswer);
  
  // Calculate example usage bonus
  const exampleBonus = detectExamples(userAnswer);
  
  // Combined score calculation with weights
  const keywordWeight = 0.6; // 60% weight to keywords
  const semanticWeight = 0.2; // 20% weight to semantic similarity
  const explanationWeight = 0.15; // 15% weight to explanation quality
  const exampleWeight = 0.05; // 5% weight to examples
  
  const combinedScore = (
    keywordRatio * keywordWeight +
    semanticScore * semanticWeight +
    explanationBonus * explanationWeight +
    exampleBonus * exampleWeight
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
  
  // Add feedback on explanation style if score is medium
  if (percentage >= 40 && percentage < 75 && explanationBonus < 0.15) {
    feedback += " Try to improve your explanation by clearly defining terms and showing relationships between concepts.";
  }
  
  // Add feedback on examples if none were detected
  if (exampleBonus < 0.05 && percentage < 90) {
    feedback += " Consider adding examples to illustrate your explanation.";
  }
  
  return {
    score,
    percentage,
    matchedKeywords,
    missingKeywords,
    feedback,
  };
};
