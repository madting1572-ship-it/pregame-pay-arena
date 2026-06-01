import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle2, Loader2, Phone, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import { Game } from '../App';

interface PaymentFlowProps {
  game: Game;
  onSuccess: () => void;
  onCancel: () => void;
}

const RECIPIENT_NUMBER = "0704106323";
const MINIMUM_AMOUNT = 50;

const PaymentFlow: React.FC<PaymentFlowProps> = ({ game, onSuccess, onCancel }) => {
  const [step, setStep] = useState<'details' | 'confirm' | 'processing' | 'success'>('details');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState<string>(game.entryFee.toString());

  const handleInitiate = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < MINIMUM_AMOUNT) {
      toast.error(`Minimum payment amount is ${MINIMUM_AMOUNT} UGX`);
      return;
    }

    setStep('confirm');
  };

  const handlePay = () => {
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
      toast.success("Payment verified! Entering the room...");
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto py-4">
      <Button 
        variant="ghost" 
        onClick={onCancel} 
        className="mb-6 -ml-2 text-slate-500 hover:text-slate-900"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Lobby
      </Button>

      <AnimatePresence mode="wait">
        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-indigo-600 p-6 text-white text-center">
                <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <h2 className="text-2xl font-bold">Secure Checkout</h2>
                <p className="opacity-80">Tap In securely handles your transaction</p>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Payment Details</CardTitle>
                <p className="text-sm text-slate-500">Processing payment for {game.title}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount (UGX)</Label>
                  <div className="relative">
                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="amount" 
                      type="number"
                      placeholder={`Min ${MINIMUM_AMOUNT}`} 
                      className="pl-10 h-12"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-slate-400">Minimum: {MINIMUM_AMOUNT} UGX. Entry fee: {game.entryFee} UGX</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Your Mobile Money Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="phone" 
                      placeholder="e.g. 0770 000 000" 
                      className="pl-10 h-12"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-slate-400">Transaction fee may apply</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700" onClick={handleInitiate}>
                  Pay Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="border-indigo-200 bg-indigo-50 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Phone className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Confirm Transaction</h3>
                  <p className="text-slate-600">
                    You are sending <span className="font-bold text-slate-900">{amount} UGX</span> to 
                    <span className="block mt-1 font-mono text-indigo-700 font-bold text-lg">{RECIPIENT_NUMBER}</span>
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-indigo-600 h-12" onClick={handlePay}>
                    Confirm & Send
                  </Button>
                  <Button variant="outline" className="w-full bg-white" onClick={() => setStep('details')}>
                    Change Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Encrypted by Tap In Payment Gateway</span>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-6"
          >
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Verifying Payment</h3>
              <p className="text-slate-500">Checking transaction status with the provider...</p>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 space-y-6 text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-14 h-14 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-slate-900">Success!</h3>
              <p className="text-slate-500 text-lg">Your payment of {amount} UGX has been received. <br/> Redirecting to the game room...</p>
            </div>
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9707c265-3afa-4e17-82bd-5efa6f858d87/secure-payment-3ef00068-1780316302072.webp" 
              alt="Payment Success"
              className="w-48 h-48 rounded-2xl object-cover shadow-lg border-4 border-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentFlow;