import { useState } from 'react';
import { Film, Clapperboard, Brain, MessageSquareQuote } from 'lucide-react';
import GuessHollywoodFrame from './components/GuessHollywoodFrame';
import GuessIndianFrame from './components/GuessIndianFrame';
import RiddlesQuiz from './components/RiddlesQuiz';
import GuessDialogues from './components/GuessDialogues';
import Scoreboard from './components/Scoreboard';

function App() {
  const [currentSection, setCurrentSection] = useState('hollywood');
  const [scores, setScores] = useState({
    Aman: 0,
    Amish: 0,
    WVish: 0,
    Aziz: 0,
  });

  const updateScore = (player: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [player]: prev[player] + points,
    }));
  };

  const sections = [
    { id: 'hollywood', label: 'Guess the Hollywood Frame', icon: Film },
    { id: 'indian', label: 'Guess the Indian Movie Frame', icon: Clapperboard },
    { id: 'riddles', label: 'Riddles & Quizzes', icon: Brain },
    { id: 'dialogues', label: 'Guess the Dialogues', icon: MessageSquareQuote },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center tracking-wide">
            Scoopcast💖
          </h1>
          <p className="text-center text-red-100 mt-2">The Ultimate Movie & Quiz Challenge</p>
        </div>
      </header>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    currentSection === section.id
                      ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={20} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {currentSection === 'hollywood' && (
              <GuessHollywoodFrame updateScore={updateScore} />
            )}
            {currentSection === 'indian' && (
              <GuessIndianFrame updateScore={updateScore} />
            )}
            {currentSection === 'riddles' && (
              <RiddlesQuiz updateScore={updateScore} />
            )}
            {currentSection === 'dialogues' && (
              <GuessDialogues updateScore={updateScore} />
            )}
          </div>
          <div className="lg:col-span-1">
            <Scoreboard scores={scores} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
