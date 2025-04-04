
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SubjectSelector from '@/components/SubjectSelector';
import QuestionCard from '@/components/QuestionCard';
import AnswerInput from '@/components/AnswerInput';
import EvaluationResult from '@/components/EvaluationResult';
import { evaluateAnswer } from '@/utils/evaluator';
import { questions, QuestionData } from '@/data/questions';
import { useToast } from '@/hooks/use-toast';
import { Brain, BookOpen } from 'lucide-react';

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<'OS' | 'CN' | 'DSA' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedSubject) {
      // Get a random question from the selected subject
      const subjectQuestions = questions.filter(q => q.subject === selectedSubject);
      const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
      setCurrentQuestion(subjectQuestions[randomIndex]);
      setEvaluationResult(null);
    } else {
      setCurrentQuestion(null);
    }
  }, [selectedSubject]);

  const handleSubjectSelect = (subject: 'OS' | 'CN' | 'DSA') => {
    setSelectedSubject(subject);
  };

  const handleAnswerSubmit = (answer: string) => {
    if (!currentQuestion) return;
    
    setIsEvaluating(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const result = evaluateAnswer(currentQuestion, answer);
        setEvaluationResult(result);
        
        // Update statistics
        setQuestionsAnswered(prev => prev + 1);
        setAverageScore(prev => {
          const total = prev * (questionsAnswered) + result.percentage;
          return Math.round(total / (questionsAnswered + 1));
        });
        
        // Display toast based on score
        if (result.percentage >= 80) {
          toast({
            title: "Excellent!",
            description: "You've mastered this concept.",
            variant: "default",
          });
        } else if (result.percentage >= 50) {
          toast({
            title: "Good effort!",
            description: "You're on the right track.",
            variant: "default",
          });
        } else {
          toast({
            title: "Keep learning!",
            description: "Focus on the missing concepts.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Evaluation error:", error);
        toast({
          title: "Evaluation Error",
          description: "There was a problem evaluating your answer.",
          variant: "destructive",
        });
      } finally {
        setIsEvaluating(false);
      }
    }, 1500);
  };

  const handleNewQuestion = () => {
    if (selectedSubject) {
      const subjectQuestions = questions.filter(q => q.subject === selectedSubject);
      const currentIndex = currentQuestion 
        ? subjectQuestions.findIndex(q => q.id === currentQuestion.id) 
        : -1;
      
      let newIndex = Math.floor(Math.random() * subjectQuestions.length);
      // Ensure we don't get the same question again
      if (subjectQuestions.length > 1) {
        while (newIndex === currentIndex) {
          newIndex = Math.floor(Math.random() * subjectQuestions.length);
        }
      }
      
      setCurrentQuestion(subjectQuestions[newIndex]);
      setEvaluationResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif text-center font-bold text-education-secondary mb-2">
            Test Your Knowledge
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Answer subjective questions and get instant feedback on your understanding
          </p>
          
          {questionsAnswered > 0 && (
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-lg shadow-sm px-6 py-3 flex items-center space-x-8">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-education-primary mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Questions Answered</div>
                    <div className="font-semibold text-lg">{questionsAnswered}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-education-primary mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Average Score</div>
                    <div className="font-semibold text-lg">{averageScore}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <SubjectSelector 
            selectedSubject={selectedSubject} 
            onSubjectSelect={handleSubjectSelect} 
          />
          
          {currentQuestion && (
            <div className="mt-6 animate-fade-in">
              <QuestionCard question={currentQuestion} />
              <AnswerInput 
                onSubmit={handleAnswerSubmit} 
                isEvaluating={isEvaluating} 
              />
            </div>
          )}
          
          {evaluationResult && (
            <div className="mt-6 animate-fade-in">
              <EvaluationResult 
                score={evaluationResult.score}
                maxScore={currentQuestion?.marks || 10}
                percentage={evaluationResult.percentage}
                matchedKeywords={evaluationResult.matchedKeywords}
                missingKeywords={evaluationResult.missingKeywords}
                feedback={evaluationResult.feedback}
              />
              
              <div className="mt-6 text-center">
                <button 
                  onClick={handleNewQuestion}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-education-primary bg-education-primary/10 hover:bg-education-primary/20 transition-colors"
                >
                  Try Another Question
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
