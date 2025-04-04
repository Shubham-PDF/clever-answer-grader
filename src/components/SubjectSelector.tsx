
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Globe, Database } from 'lucide-react';

interface SubjectSelectorProps {
  selectedSubject: string | null;
  onSubjectSelect: (subject: 'OS' | 'CN' | 'DSA') => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubject, onSubjectSelect }) => {
  const subjects = [
    { id: 'OS', name: 'Operating Systems', icon: <BookOpen size={24} />, color: 'bg-blue-100 text-blue-600' },
    { id: 'CN', name: 'Computer Networks', icon: <Globe size={24} />, color: 'bg-green-100 text-green-600' },
    { id: 'DSA', name: 'Data Structures & Algorithms', icon: <Database size={24} />, color: 'bg-purple-100 text-purple-600' },
  ] as const;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-education-secondary">Select a Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card 
            key={subject.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSubject === subject.id ? 'ring-2 ring-education-primary shadow-md' : ''
            }`}
            onClick={() => onSubjectSelect(subject.id)}
          >
            <CardContent className="flex items-center p-6 gap-3">
              <div className={`${subject.color} p-3 rounded-full`}>
                {subject.icon}
              </div>
              <span className="font-medium">{subject.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
