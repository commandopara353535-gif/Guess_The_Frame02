import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Plus, Minus, Quote } from 'lucide-react';
import Timer from './Timer';
import RefereeSelector from './RefereeSelector';

interface GuessDialoguesProps {
  updateScore: (player: string, points: number) => void;
}

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

const dialogues = [
  {
    id: 1,
    dialogue: "I'm going to make him an offer he can't refuse.",
    movieAnswer: 'The Godfather',
    context: 'Don Vito Corleone',
  },
  {
    id: 2,
    dialogue: "May the Force be with you.",
    movieAnswer: 'Star Wars',
    context: 'Multiple characters',
  },
  {
    id: 3,
    dialogue: "Here's looking at you, kid.",
    movieAnswer: 'Casablanca',
    context: 'Rick Blaine',
  },
];

export default function GuessDialogues({ updateScore }: GuessDialoguesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedReferees, setUsedReferees] = useState<string[]>([]);
  const [currentReferee, setCurrentReferee] = useState('');
  const [timerKey, setTimerKey] = useState(0);

  const currentDialogue = dialogues[currentIndex];

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetRound();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetRound();
    }
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setIsTimerActive(false);
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
  };

  const resetRound = () => {
    setShowAnswer(false);
    setIsTimerActive(true);
    setTimerKey(prev => prev + 1);
    if (usedReferees.length >= PLAYERS.length) {
      setUsedReferees([]);
    }
  };

  const handleRefereeSelected = (referee: string) => {
    setCurrentReferee(referee);
    setUsedReferees(prev => [...prev, referee]);
  };

  const handleScoreChange = (player: string, delta: number) => {
    updateScore(player, delta);
  };

  return (
    <div className="space-y-6">
      <RefereeSelector
        onRefereeSelected={handleRefereeSelected}
        usedReferees={usedReferees}
        key={timerKey}
      />

      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Guess the Dialogues
        </h2>

        <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-lg p-12 mb-6 relative">
          <Quote className="absolute top-4 left-4 text-red-300" size={48} />
          <Quote className="absolute bottom-4 right-4 text-red-300 rotate-180" size={48} />
          <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center italic leading-relaxed">
            "{currentDialogue.dialogue}"
          </p>
          <p className="text-center text-gray-600 mt-4 font-medium">
            - {currentDialogue.context}
          </p>
        </div>

        <Timer
          key={timerKey}
          duration={18}
          isActive={isTimerActive}
          onTimeUp={handleTimeUp}
          onReset={resetRound}
        />

        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Manual Scoring</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLAYERS.map(player => (
              <div
                key={player}
                className={`bg-white rounded-lg p-4 border-2 ${
                  player === currentReferee ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="text-center mb-2">
                  <span className="font-semibold text-gray-700">{player}</span>
                  {player === currentReferee && (
                    <span className="block text-xs text-purple-600 font-medium">Referee</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleScoreChange(player, -10)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 transition-colors"
                    disabled={player === currentReferee}
                  >
                    <Minus size={16} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => handleScoreChange(player, 10)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 transition-colors"
                    disabled={player === currentReferee}
                  >
                    <Plus size={16} className="mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAnswer && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-lg p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-green-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Answer</h3>
            </div>
            <p className="text-2xl font-bold text-green-700">{currentDialogue.movieAnswer}</p>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <button
            onClick={handleRevealAnswer}
            disabled={showAnswer}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <Eye size={20} />
            Reveal Answer
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === dialogues.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Dialogue {currentIndex + 1} of {dialogues.length}
        </div>
      </div>
    </div>
  );
}
