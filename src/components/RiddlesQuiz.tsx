import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle } from 'lucide-react';
import Timer from './Timer';
import RefereeSelector from './RefereeSelector';

interface RiddlesQuizProps {
  updateScore: (player: string, points: number) => void;
}

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

const riddles = [
  {
    id: 1,
    question: 'What has keys but no locks, space but no room, and you can enter but not go inside?',
    options: ['A Piano', 'A Keyboard', 'A House', 'A Car'],
    correctAnswer: 1,
    explanation: 'A keyboard has keys, a space bar, and an enter key!',
  },
  {
    id: 2,
    question: 'I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?',
    options: ['A Ghost', 'An Echo', 'A Radio', 'A Telephone'],
    correctAnswer: 1,
    explanation: 'An echo repeats sounds and is carried by air/wind!',
  },
  {
    id: 3,
    question: 'The more you take, the more you leave behind. What am I?',
    options: ['Memories', 'Footsteps', 'Photographs', 'Time'],
    correctAnswer: 1,
    explanation: 'The more steps you take, the more footprints you leave behind!',
  },
  {
    id: 4,
    question: 'The more you take, the more you leave behind. What am I?',
    options: ['Memories', 'Footsteps', 'Photographs', 'Time'],
    correctAnswer: 1,
    explanation: 'The more steps you take, the more footprints you leave behind!',
  },
];

export default function RiddlesQuiz({ updateScore }: RiddlesQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [usedReferees, setUsedReferees] = useState<string[]>([]);
  const [currentReferee, setCurrentReferee] = useState('');
  const [timerKey, setTimerKey] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const currentRiddle = riddles[currentIndex];

  const handleNext = () => {
    if (currentIndex < riddles.length - 1) {
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
    setAnswerRevealed(true);
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
  };

  const resetRound = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setIsTimerActive(true);
    setAnswerRevealed(false);
    setTimerKey(prev => prev + 1);
    if (usedReferees.length >= PLAYERS.length) {
      setUsedReferees([]);
    }
  };

  const handleRefereeSelected = (referee: string) => {
    setCurrentReferee(referee);
    setUsedReferees(prev => [...prev, referee]);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (answerRevealed) return;
    setSelectedOption(optionIndex);
  };

  const isCorrect = selectedOption === currentRiddle.correctAnswer;

  return (
    <div className="space-y-6">
      <RefereeSelector
        onRefereeSelected={handleRefereeSelected}
        usedReferees={usedReferees}
        key={timerKey}
      />

      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Riddles & Quizzes
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-6">
          <p className="text-xl font-semibold text-gray-800 text-center">
            {currentRiddle.question}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentRiddle.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === currentRiddle.correctAnswer;
            const showCorrect = answerRevealed && isCorrectOption;
            const showIncorrect = answerRevealed && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={answerRevealed}
                className={`p-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                  showCorrect
                    ? 'bg-green-500 text-white animate-pulse-green border-4 border-green-600'
                    : showIncorrect
                    ? 'bg-red-500 text-white animate-shake border-4 border-red-600'
                    : isSelected
                    ? 'bg-blue-500 text-white border-2 border-blue-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-300'
                } ${answerRevealed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle className="animate-bounce" size={24} />}
                  {showIncorrect && <XCircle className="animate-bounce" size={24} />}
                </div>
              </button>
            );
          })}
        </div>

        <Timer
          key={timerKey}
          duration={18}
          isActive={isTimerActive}
          onTimeUp={handleTimeUp}
          onReset={resetRound}
        />

        {showAnswer && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-lg p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-green-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Answer</h3>
            </div>
            <p className="text-2xl font-bold text-green-700 mb-2">
              {currentRiddle.options[currentRiddle.correctAnswer]}
            </p>
            <p className="text-gray-700">{currentRiddle.explanation}</p>
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
            disabled={currentIndex === riddles.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Question {currentIndex + 1} of {riddles.length}
        </div>
      </div>
    </div>
  );
}
