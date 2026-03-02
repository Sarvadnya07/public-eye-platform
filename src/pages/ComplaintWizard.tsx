import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Sparkles, Upload, ShieldCheck, CheckCircle2, Copy, ArrowLeft, ArrowRight,
  Lock, Bot, X, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import LocationPicker from '@/components/LocationPicker';
import DuplicateAlert from '@/components/DuplicateAlert';
import { useApp } from '@/contexts/AppContext';
import { generateTrackingId, generateBlockchainHash, categoryLabels, type ComplaintCategory } from '@/data/mockData';

const steps = [
  { label: 'Details', icon: FileText },
  { label: 'Category', icon: Sparkles },
  { label: 'Evidence', icon: Upload },
  { label: 'Privacy', icon: ShieldCheck },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

const ComplaintWizard = () => {
  const navigate = useNavigate();
  const { addComplaint } = useApp();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [hash, setHash] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory | ''>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiConfidence, setAiConfidence] = useState<number | null>(null);
  const [files, setFiles] = useState<{ name: string; progress: number }[]>([]);
  const [whistleblower, setWhistleblower] = useState(false);
  const [pinLocation, setPinLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [duplicateKeyword, setDuplicateKeyword] = useState('');
  const [showDuplicate, setShowDuplicate] = useState(false);

  const maxDesc = 2000;

  const duplicateKeywords = ['pothole', 'water leak', 'sewage', 'garbage', 'power outage', 'flooding', 'streetlight'];

  const handleTitleChange = (value: string) => {
    setTitle(value);
    const lower = value.toLowerCase();
    const found = duplicateKeywords.find(kw => lower.includes(kw));
    if (found) {
      setDuplicateKeyword(found);
      setShowDuplicate(true);
    } else {
      setShowDuplicate(false);
    }
  };

  const goNext = () => { setDirection(1); setStep(s => Math.min(s + 1, 3)); };
  const goBack = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)); };

  const handleAICategorize = useCallback(() => {
    setAiLoading(true);
    setAiConfidence(null);
    setTimeout(() => {
      const keywords: Record<string, ComplaintCategory> = {
        water: 'water', pipe: 'water', flood: 'water', hydrant: 'water', pressure: 'water',
        road: 'roads', pothole: 'roads', bridge: 'roads', highway: 'roads', sign: 'roads',
        power: 'electricity', electric: 'electricity', light: 'electricity', transformer: 'electricity', outage: 'electricity',
        sewage: 'sanitation', waste: 'sanitation', garbage: 'sanitation', dump: 'sanitation', drain: 'sanitation',
      };
      const lower = (title + ' ' + description).toLowerCase();
      let detected: ComplaintCategory = 'sanitation';
      for (const [kw, cat] of Object.entries(keywords)) {
        if (lower.includes(kw)) { detected = cat; break; }
      }
      setCategory(detected);
      setAiConfidence(Math.floor(Math.random() * 10) + 88);
      setAiLoading(false);
      toast.success('AI categorization complete');
    }, 2000);
  }, [title, description]);

  const simulateUpload = (name: string) => {
    setFiles(f => [...f, { name, progress: 0 }]);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 20) + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setFiles(prev => prev.map(f => f.name === name ? { ...f, progress: p } : f));
    }, 200);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const id = generateTrackingId();
      const bh = generateBlockchainHash();
      setTrackingId(id);
      setHash(bh);
      addComplaint({
        id,
        title,
        description,
        category: (category || 'sanitation') as ComplaintCategory,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        aiConfidence: aiConfidence || 90,
        blockchainHash: bh,
        department: categoryLabels[(category || 'sanitation') as ComplaintCategory],
        isAnonymous: whistleblower,
        location: pinLocation ? `${pinLocation.lat.toFixed(4)}, ${pinLocation.lng.toFixed(4)}` : 'User Submitted Location',
        ledgerVerified: true,
        timeline: [
          {
            stage: 'Submitted',
            timestamp: new Date().toLocaleString(),
            department: 'Public Portal',
            description: 'Complaint registered via citizen portal',
            hash: bh.slice(0, 8) + '...' + bh.slice(-3),
          },
        ],
      });
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Complaint submitted and verified on chain!');
    }, 1500);
  };

  const canProceed = step === 0 ? title.trim().length > 0 && description.trim().length > 0
    : step === 1 ? category !== ''
    : true;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 px-4 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-success" />
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Complaint Submitted!</h2>
            <p className="text-muted-foreground mb-6">Your complaint has been registered and verified on the blockchain.</p>

            <div className="bg-muted rounded-lg p-4 mb-4 text-left space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Tracking ID</p>
                <p className="text-lg font-bold text-foreground">{trackingId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Blockchain Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-foreground break-all">{hash}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-7 w-7"
                    onClick={() => { navigator.clipboard.writeText(hash); toast.success('Hash copied!'); }}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => navigate(`/track/${trackingId}`)}>Track Complaint</Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>Back Home</Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${whistleblower ? 'bg-foreground/[0.03]' : 'bg-background'}`}>
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-foreground">{s.label}</span>
                {i < 3 && <div className={`hidden sm:block w-8 md:w-16 h-0.5 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Complaint Details</h2>
                    <p className="text-muted-foreground text-sm">Describe the civic issue you'd like to report.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
                      <Input placeholder="Brief title of the issue" value={title} onChange={e => handleTitleChange(e.target.value)} />
                      <DuplicateAlert visible={showDuplicate} keyword={duplicateKeyword} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                      <Textarea
                        placeholder="Provide detailed information about the issue..."
                        className="min-h-[160px]"
                        value={description}
                        onChange={e => setDescription(e.target.value.slice(0, maxDesc))}
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-right">{description.length}/{maxDesc}</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Smart Category</h2>
                    <p className="text-muted-foreground text-sm">Select or let AI determine the category.</p>
                  </div>
                  <div className="space-y-4">
                    <Select value={category} onValueChange={v => { setCategory(v as ComplaintCategory); setAiConfidence(null); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.entries(categoryLabels) as [ComplaintCategory, string][]).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="w-full gap-2" onClick={handleAICategorize} disabled={aiLoading || !description.trim()}>
                      <Bot className="w-4 h-4" />
                      🤖 AI Auto-Categorize
                    </Button>

                    {aiLoading && (
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    )}

                    {aiConfidence !== null && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge className="bg-success text-success-foreground">AI Confidence: {aiConfidence}%</Badge>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Evidence & Location</h2>
                    <p className="text-muted-foreground text-sm">Upload photos/documents and pin the location.</p>
                  </div>

                  {/* Drop zone */}
                  <div
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => simulateUpload(`evidence_${files.length + 1}.jpg`)}
                  >
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 bg-muted rounded-lg p-3">
                          <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                            <Progress value={f.progress} className="h-1.5 mt-1" />
                          </div>
                          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Map */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1.5">Pin Location on Map</p>
                    <LocationPicker onLocationSelect={(lat, lng) => setPinLocation({ lat, lng })} />
                    {pinLocation && (
                      <p className="text-xs text-muted-foreground mt-1.5">
                        Selected: {pinLocation.lat.toFixed(4)}, {pinLocation.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">Privacy Settings</h2>
                    <p className="text-muted-foreground text-sm">Configure your identity protection preferences.</p>
                  </div>

                  <div className={`rounded-xl p-6 border transition-colors duration-500 ${whistleblower ? 'bg-foreground/5 border-primary/30' : 'bg-card border-border'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {whistleblower && <Lock className="w-5 h-5 text-primary" />}
                        <div>
                          <p className="font-semibold text-foreground">Whistleblower Mode</p>
                          <p className="text-sm text-muted-foreground">File this complaint anonymously</p>
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Switch checked={whistleblower} onCheckedChange={setWhistleblower} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-[240px]">
                          Zero-Knowledge Proof active. Your identity is cryptographically shielded.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {whistleblower && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-xs text-muted-foreground bg-muted rounded-lg p-3">
                        🔒 Your identity will be protected using zero-knowledge cryptographic proofs. No personal data will be linked to this complaint.
                      </motion.p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10">
            <Button variant="outline" onClick={step === 0 ? () => navigate('/') : goBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            {step < 3 ? (
              <Button onClick={goNext} disabled={!canProceed} className="gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                {submitting ? 'Submitting...' : 'Submit Complaint'} <CheckCircle2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintWizard;
