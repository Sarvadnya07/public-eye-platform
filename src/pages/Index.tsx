import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bot, Link2, ShieldCheck, ArrowRight, TrendingUp, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { mockStats } from '@/data/mockData';
import Navbar from '@/components/Navbar';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Index = () => {
  const navigate = useNavigate();
  const [trackId, setTrackId] = useState('');

  const handleTrack = () => {
    if (trackId.trim()) {
      navigate(`/track/${trackId.trim()}`);
    }
  };

  const valueProps = [
    {
      icon: Bot,
      title: 'AI-Powered Routing',
      desc: 'Complaints are automatically categorized and routed to the right department in seconds.',
    },
    {
      icon: Link2,
      title: 'Blockchain Verified',
      desc: 'Every complaint is hashed on an immutable ledger — tamper-proof and publicly auditable.',
    },
    {
      icon: ShieldCheck,
      title: '100% Anonymous',
      desc: 'Whistleblower protection with zero-knowledge proofs. Your identity is cryptographically shielded.',
    },
  ];

  const tickerItems = [
    { icon: TrendingUp, text: `${mockStats.totalResolved.toLocaleString()} Complaints Resolved` },
    { icon: Clock, text: `Average Resolution: ${mockStats.avgResolutionHours} Hours` },
    { icon: Hash, text: `Latest Hash: ${mockStats.latestHash}` },
    { icon: Bot, text: `${mockStats.aiAccuracyRate}% AI Accuracy` },
    { icon: TrendingUp, text: `${mockStats.activeCases.toLocaleString()} Active Cases` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Empowering Citizens.{' '}
            <span className="text-primary">Ensuring Transparency.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Report civic issues in seconds. Track them on an immutable public ledger.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex gap-2 p-2 rounded-xl border border-border bg-card shadow-lg animate-glow">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Tracking ID (e.g., PE-2026-X89)"
                  className="pl-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={trackId}
                  onChange={e => setTrackId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleTrack()}
                />
              </div>
              <Button onClick={handleTrack} className="shrink-0">
                Track <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <Button size="lg" onClick={() => navigate('/file-complaint')} className="gap-2">
              File a Complaint <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/admin')}>
              Admin Authority View
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6"
        >
          {valueProps.map((vp, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="glass-card hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <vp.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">{vp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{vp.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Transparency Ticker */}
      <section className="py-8 border-t border-b border-border bg-muted/30 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-12" style={{ width: 'max-content' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="font-medium">{item.text}</span>
              <span className="text-border ml-8">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 PublicEye. Empowering Citizens. Ensuring Transparency.</p>
      </footer>
    </div>
  );
};

export default Index;
