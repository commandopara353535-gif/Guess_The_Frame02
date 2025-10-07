import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Plus, Minus } from 'lucide-react';
import Timer from './Timer';
import RefereeSelector from './RefereeSelector';

interface GuessIndianFrameProps {
  updateScore: (player: string, points: number) => void;
}

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

const indianFrames = [
  { id: 1, image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800', answer: 'Indian Movie Title 1' },
  { id: 2, image: 'https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=800', answer: 'Indian Movie Title 2' },
  { id: 3, image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800', answer: 'Indian Movie Title 3' },
];

export default function GuessIndianFrame({ updateScore }: GuessIndianFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedReferees, setUsedReferees] = useState<string[]>([]);
  const [currentReferee, setCurrentReferee] = useState('');
  const [timerKey, setTimerKey] = useState(0);

  const currentFrame = indianFrames[currentIndex];

  const handleNext = () => {
    if (currentIndex < indianFrames.length - 1) {
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
          Guess the Indian Movie Frame
        </h2>

        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
          <img
            src={currentFrame.image}
            alt="Movie frame"
            className="w-full h-full object-cover"
          />
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
            <p className="text-2xl font-bold text-green-700">{currentFrame.answer}</p>
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
            disabled={currentIndex === indianFrames.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Frame {currentIndex + 1} of {indianFrames.length}
        </div>
      </div>
    </div>
  );
}
