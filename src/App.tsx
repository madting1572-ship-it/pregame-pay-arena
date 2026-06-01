import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from './components/LandingPage';
import Lobby from './components/Lobby';
import PaymentFlow from './components/PaymentFlow';
import GameRoom from './components/GameRoom';
import Navigation from './components/Navigation';

export type View = 'landing' | 'lobby' | 'payment' | 'game';

export interface Game {
  id: string;
  title: string;
  players: number;
  maxPlayers: number;
  entryFee: number;
  prizePool: number;
  status: 'waiting' | 'starting' | 'active';
}

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('tapin_username') || '';
  });

  useEffect(() => {
    if (userName) {
      localStorage.setItem('tapin_username', userName);
    }
  }, [userName]);

  const handleJoinGame = (game: Game) => {
    setSelectedGame(game);
    if (isPaid) {
      setCurrentView('game');
    } else {
      setCurrentView('payment');
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setCurrentView('game');
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navigation 
        currentView={currentView} 
        onNavigate={navigateTo} 
        userName={userName}
        setUserName={setUserName}
      />
      
      <main className="container mx-auto px-4 py-6">
        {currentView === 'landing' && (
          <LandingPage onStart={() => navigateTo('lobby')} />
        )}
        
        {currentView === 'lobby' && (
          <Lobby onJoin={handleJoinGame} />
        )}
        
        {currentView === 'payment' && selectedGame && (
          <PaymentFlow 
            game={selectedGame} 
            onSuccess={handlePaymentSuccess}
            onCancel={() => navigateTo('lobby')}
          />
        )}
        
        {currentView === 'game' && selectedGame && (
          <GameRoom 
            game={selectedGame} 
            onExit={() => {
              setIsPaid(false);
              setCurrentView('lobby');
            }} 
          />
        )}
      </main>
      
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;