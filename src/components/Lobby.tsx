import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Coins } from 'lucide-react';
import { Game } from '../App';

interface LobbyProps {
  onJoin: (game: Game) => void;
}

const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Speed Tapper Classic',
    players: 12,
    maxPlayers: 20,
    entryFee: 500,
    prizePool: 8000,
    status: 'waiting'
  },
  {
    id: '2',
    title: 'Reaction Challenge',
    players: 8,
    maxPlayers: 10,
    entryFee: 1000,
    prizePool: 15000,
    status: 'waiting'
  },
  {
    id: '3',
    title: 'Tap Blitz',
    players: 20,
    maxPlayers: 20,
    entryFee: 200,
    prizePool: 3500,
    status: 'active'
  },
  {
    id: '4',
    title: 'Neon Rush',
    players: 4,
    maxPlayers: 8,
    entryFee: 2000,
    prizePool: 30000,
    status: 'starting'
  }
];

const Lobby: React.FC<LobbyProps> = ({ onJoin }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Game Lobby</h2>
          <p className="text-slate-500">Pick a challenge and tap in to win.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <Badge variant="outline" className="px-3 py-1 bg-white whitespace-nowrap">All Games</Badge>
          <Badge variant="secondary" className="px-3 py-1 whitespace-nowrap">High Stakes</Badge>
          <Badge variant="secondary" className="px-3 py-1 whitespace-nowrap">Social</Badge>
          <Badge variant="secondary" className="px-3 py-1 whitespace-nowrap">Beginner</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_GAMES.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-slate-200 hover:border-indigo-300 transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Trophy className="w-6 h-6 text-indigo-600" />
                  </div>
                  <Badge className={
                    game.status === 'waiting' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none' :
                    game.status === 'starting' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-none' :
                    'bg-slate-100 text-slate-700 hover:bg-slate-100 border-none'
                  }>
                    {game.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-slate-500">
                    <Users className="w-4 h-4 mr-1.5" />
                    <span>{game.players}/{game.maxPlayers} players</span>
                  </div>
                  <div className="flex items-center text-indigo-600 font-semibold">
                    <Coins className="w-4 h-4 mr-1.5" />
                    <span>Prize: {game.prizePool} UGX</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full" 
                    style={{ width: `${(game.players / game.maxPlayers) * 100}%` }}
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4">
                <Button 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                  disabled={game.status === 'active'}
                  onClick={() => onJoin(game)}
                >
                  {game.status === 'active' ? 'Full House' : `Join for ${game.entryFee} UGX`}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;