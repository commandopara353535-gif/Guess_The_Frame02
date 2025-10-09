import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Plus, Minus } from 'lucide-react';

interface RiddlesQuizProps {
  updateScore: (player: string, points: number) => void;
  currentReferee: string;
  onTimerUpdate: (time: number) => void;
  onTimerStart: () => void;
  onTimerStop: () => void;
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
    question: 'What can travel around the world while staying in a corner?',
    options: ['A stamp', 'A coin', 'A map', 'A passport'],
    correctAnswer: 0,
    explanation: 'A stamp stays in the corner of an envelope but travels around the world!',
  },
  {
    id: 5,
    question: 'What gets wetter the more it dries?',
    options: ['A sponge', 'A towel', 'Water', 'A mop'],
    correctAnswer: 1,
    explanation: 'A towel gets wetter as it dries things!',
  },
  {
    id: 6,
    question: 'What has a head and a tail but no body?',
    options: ['A snake', 'A coin', 'A river', 'A comet'],
    correctAnswer: 1,
    explanation: 'A coin has a head side and a tail side but no body!',
  },
  {
    id: 7,
    question: 'What runs but never walks, has a mouth but never talks?',
    options: ['A clock', 'A river', 'A car', 'A train'],
    correctAnswer: 1,
    explanation: 'A river runs, has a mouth where it meets the sea, but never walks or talks!',
  },
  {
    id: 8,
    question: 'What comes once in a minute, twice in a moment, but never in a thousand years?',
    options: ['The letter M', 'Time', 'A second', 'The letter O'],
    correctAnswer: 0,
    explanation: 'The letter M appears once in "minute", twice in "moment", and never in "thousand years"!',
  },
  {
    id: 9,
    question: 'What has hands but cannot clap?',
    options: ['A statue', 'A clock', 'A robot', 'A mannequin'],
    correctAnswer: 1,
    explanation: 'A clock has hands that point to the time but cannot clap!',
  },
  {
    id: 10,
    question: 'What goes up but never comes down?',
    options: ['A balloon', 'Your age', 'Temperature', 'A plane'],
    correctAnswer: 1,
    explanation: 'Your age only goes up and never comes down!',
  },
  {
    id: 11,
    question: 'What can you catch but not throw?',
    options: ['A ball', 'A cold', 'A fish', 'A frisbee'],
    correctAnswer: 1,
    explanation: 'You can catch a cold but you cannot throw it!',
  },
];

export default function RiddlesQuiz({
  updateScore,
  currentReferee,
  onTimerUpdate,
  onTimerStart,
  onTimerStop
}: RiddlesQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentRiddle = riddles[currentIndex];

  useEffect(() => {
    resetRound();
  }, [currentIndex]);

  useEffect(() => {
    if (!isTimerActive) return;

    if (timeLeft <= 0) {
      setShowAnswer(true);
      setAnswerRevealed(true);
      setIsTimerActive(false);
      onTimerStop();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        onTimerUpdate(newTime);
        if (newTime <= 0) {
          setShowAnswer(true);
          setAnswerRevealed(true);
          setIsTimerActive(false);
          onTimerStop();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive, onTimerUpdate, onTimerStop]);

  const handleNext = () => {
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setIsTimerActive(false);
    setAnswerRevealed(true);
    onTimerStop();
  };

  const resetRound = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    setAnswerRevealed(false);
    setTimeLeft(18);
    setIsTimerActive(true);
    setTimerKey(prev => prev + 1);
    onTimerUpdate(18);
    onTimerStart();
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (answerRevealed) return;
    setSelectedOption(optionIndex);
  };

  const handleScoreChange = (player: string, delta: number) => {
    updateScore(player, delta);
  };

  const isCorrect = selectedOption === currentRiddle.correctAnswer;

  return (
    <div className="space-y-6">
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

        {showAnswer && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-lg p-6 animate-fade-in">
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

        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              Question {currentIndex + 1} of {riddles.length}
            </span>
          </div>

          <button
            onClick={handleRevealAnswer}
            disabled={showAnswer}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <Eye size={20} />
            Reveal
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

        <div className="bg-blue-50 rounded-lg p-6">
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
      </div>
    </div>
  );
}
