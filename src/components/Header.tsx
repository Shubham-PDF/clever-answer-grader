
import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-education-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={32} />
          <h1 className="text-xl md:text-2xl font-bold">Clever Answer Grader</h1>
        </div>
        <div className="text-sm md:text-base">
          AI-Powered Answer Evaluation
        </div>
      </div>
    </header>
  );
};

export default Header;
