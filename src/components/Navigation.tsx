import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { LayoutDashboard, Wallet, Settings, LogOut, User, Bell, Search, Gamepad2 } from 'lucide-react';
import { View } from '../App';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, userName, setUserName }) => {
  const [isEditingName, setIsEditingName] = useState(!userName);
  const [tempName, setTempName] = useState(userName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      setIsEditingName(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('landing')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            TAP<span className="text-indigo-600">IN</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button 
            onClick={() => onNavigate('lobby')}
            className={`hover:text-indigo-600 transition-colors ${currentView === 'lobby' ? 'text-indigo-600' : ''}`}
          >
            Lobby
          </button>
          <button className="hover:text-indigo-600 transition-colors">How it works</button>
          <button className="hover:text-indigo-600 transition-colors">Tournaments</button>
          <button className="hover:text-indigo-600 transition-colors">Winners</button>
        </div>

        <div className="flex items-center gap-4">
          {userName && !isEditingName ? (
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1">
                UGX 0.00
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-slate-100">
                    <User className="w-5 h-5 text-slate-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 border-slate-100 shadow-xl">
                  <div className="px-3 py-3">
                    <p className="text-sm font-bold text-slate-900">{userName}</p>
                    <p className="text-xs text-slate-500">Player ID: #7281</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl py-2 cursor-pointer" onClick={() => onNavigate('lobby')}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl py-2 cursor-pointer">
                    <Wallet className="w-4 h-4 mr-2" />
                    My Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl py-2 cursor-pointer" onClick={() => setIsEditingName(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl py-2 cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Enter Username" 
                className="w-32 md:w-48 h-9 rounded-full bg-slate-50 border-slate-200"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <Button size="sm" className="rounded-full bg-indigo-600" onClick={handleSaveName}>
                Join
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;