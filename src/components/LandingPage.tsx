import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Zap, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tap In, Play Big.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The ultimate social gaming platform where you can compete with friends and win real rewards. Quick games, instant payouts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9707c265-3afa-4e17-82bd-5efa6f858d87/gaming-community-1c70dabf-1780316303090.webp" 
            alt="Gaming Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 rounded-2xl shadow-lg transform transition-transform hover:scale-105"
              onClick={onStart}
            >
              Enter Lobby
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Zap className="w-8 h-8 text-amber-500" />}
          title="Fast Games"
          description="Competitive 60-second challenges that test your reflexes and strategy."
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8 text-indigo-500" />}
          title="Play Together"
          description="Match with players across the country or invite your friends for a private duel."
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-8 h-8 text-green-500" />}
          title="Secure Payments"
          description="Verified payments sent directly to your mobile number. Trusted by thousands."
        />
      </section>

      {/* Social Proof */}
      <section className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Ready to win?</h2>
          <p className="text-slate-500 text-lg">Join 5,000+ active players on Tap In today.</p>
        </div>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shadow-sm">
            +1k
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4 p-3 bg-slate-50 rounded-2xl w-fit">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-500">{description}</p>
  </div>
);

export default LandingPage;