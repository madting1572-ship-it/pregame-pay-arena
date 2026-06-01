import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Timer, MousePointer2, LogOut, Users, Zap } from 'lucide-react';
import { Game } from '../App';
import { toast } from 'sonner';

interface GameRoomProps {
  game: Game;
  onExit: () => void;
}

const GameRoom: React.FC<GameRoomProps> = ({ game, onExit }) => {
  const [gameState, setGameState] = useState<'countdown' | 'playing' | 'results'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [opponents, setOpponents] = useState([
    { name: 'Alex_Pro', score: 0 },
    { name: 'Ninja_Tap', score: 0 },
    { name: 'GamerX', score: 0 }
  ]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('playing');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setGameState('results');
            return 0;
          }
          return prev - 1;
        });

        // Simulate opponent scores
        setOpponents(prev => prev.map(opp => ({
          ...opp,
          score: opp.score + Math.floor(Math.random() * 5)
        })));
      }, 1000);
      return () => clearInterval(timerRef.current!);
    }
  }, [gameState]);

  const handleTap = () => {
    if (gameState === 'playing') {
      setScore(prev => prev + 1);
    }
  };

  const sortedResults = [...opponents, { name: 'You', score }]
    .sort((a, b) => b.score - a.score);

  const userRank = sortedResults.findIndex(r => r.name === 'You') + 1;

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-2xl">
            <Trophy className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{game.title}</h2>
            <div className="flex items-center text-sm text-slate-500">
              <Users className="w-4 h-4 mr-1" />
              <span>4 Players Online</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" onClick={onExit} className="text-slate-500 hover:text-red-500 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" />
          Exit Room
        </Button>
      </div>

      <div className="flex-1 grid md:grid-cols-3 gap-8">
        {/* Leaderboard Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 rounded-3xl border-slate-100 shadow-sm h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-amber-500" />
              Live Leaderboard
            </h3>
            <div className="space-y-4">
              {sortedResults.map((player, i) => (
                <div 
                  key={player.name} 
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    player.name === 'You' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold w-6">{i + 1}.</span>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <span className="font-bold">{player.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Game Area */}
        <div className="md:col-span-2 relative">
          <AnimatePresence mode="wait">
            {gameState === 'countdown' && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 2 }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-white/50 backdrop-blur-sm rounded-3xl"
              >
                <h3 className="text-2xl font-bold text-slate-400">Game Starting In</h3>
                <span className="text-9xl font-black text-indigo-600 tabular-nums">{countdown}</span>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col space-y-8"
              >
                <div className="flex justify-between items-center px-4">
                  <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg">
                    <Timer className="w-6 h-6 text-amber-400" />
                    <span className="text-2xl font-black tabular-nums">{timeLeft}s</span>
                  </div>
                  <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg">
                    <Zap className="w-6 h-6 text-amber-400" />
                    <span className="text-2xl font-black tabular-nums">{score}</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleTap}
                    className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl flex flex-col items-center justify-center text-white border-[12px] border-white/20 group"
                  >
                    <MousePointer2 className="w-16 h-16 mb-2 group-active:scale-125 transition-transform" />
                    <span className="text-3xl font-black">TAP ME!</span>
                  </motion.button>
                </div>
                
                <p className="text-center text-slate-400 animate-pulse">Tap as fast as you can to win the {game.prizePool} UGX pool!</p>
              </motion.div>
            )}

            {gameState === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center text-center space-y-8 border-4 border-indigo-100"
              >
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-slate-900">Game Over!</h3>
                  <p className="text-xl text-slate-500">You finished at <span className="text-indigo-600 font-bold">Rank #{userRank}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <span className="block text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Your Score</span>
                    <span className="text-4xl font-black text-slate-900">{score}</span>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-2xl">
                    <span className="block text-indigo-400 text-sm font-bold uppercase tracking-wider mb-1">Prize Earned</span>
                    <span className="text-4xl font-black text-indigo-600">{userRank === 1 ? game.prizePool : 0} <span className="text-sm">UGX</span></span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="bg-indigo-600 px-8" onClick={() => {
                    setGameState('countdown');
                    setCountdown(3);
                    setTimeLeft(15);
                    setScore(0);
                  }}>
                    Play Again
                  </Button>
                  <Button size="lg" variant="outline" onClick={onExit}>
                    Back to Lobby
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm ${className}`}>
    {children}
  </div>
);

export default GameRoom;