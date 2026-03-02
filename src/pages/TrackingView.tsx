import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Bot, AlertTriangle, ArrowLeft, Copy, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

const stageIcons: Record<string, typeof CheckCircle2> = {
  Submitted: Clock,
  'AI Routed': Bot,
  'In Progress': Clock,
  Resolved: CheckCircle2,
  Escalated: AlertTriangle,
  'Status Updated': Clock,
};

const stageColors: Record<string, string> = {
  Submitted: 'bg-primary',
  'AI Routed': 'bg-primary',
  'In Progress': 'bg-warning',
  Resolved: 'bg-success',
  Escalated: 'bg-destructive',
  'Status Updated': 'bg-primary',
};

const TrackingView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getComplaint } = useApp();
  const complaint = getComplaint(id || '');

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Complaint Not Found</h2>
          <p className="text-muted-foreground mb-6">No complaint found with ID: {id}</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const statusMap: Record<string, string> = {
    pending: 'destructive',
    'in-progress': 'default',
    resolved: 'default',
    escalated: 'destructive',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{complaint.id}</h1>
                <Badge
                  variant={statusMap[complaint.status] as 'default' | 'destructive'}
                  className={complaint.status === 'resolved' ? 'bg-success text-success-foreground' : complaint.status === 'in-progress' ? 'bg-warning text-warning-foreground' : ''}
                >
                  {complaint.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              <h2 className="text-lg text-foreground font-medium mb-1">{complaint.title}</h2>
              <p className="text-sm text-muted-foreground">{complaint.description}</p>

              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span>📍 {complaint.location}</span>
                <span>🏢 {complaint.department}</span>
              </div>

              {/* Hash */}
              <div className="flex items-center gap-2 mt-3 bg-muted rounded-lg p-3">
                <Shield className="w-4 h-4 text-success shrink-0" />
                <code className="text-xs text-foreground break-all flex-1">{complaint.blockchainHash}</code>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"
                  onClick={() => { navigator.clipboard.writeText(complaint.blockchainHash); toast.success('Hash copied!'); }}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <h3 className="text-lg font-bold tracking-tight text-foreground mb-4">Status Timeline</h3>
            <div className="relative pl-8 space-y-0 mb-8">
              {complaint.timeline.map((entry, i) => {
                const Icon = stageIcons[entry.stage] || Clock;
                const color = stageColors[entry.stage] || 'bg-muted';
                const isLast = i === complaint.timeline.length - 1;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pb-8"
                  >
                    {/* Connector */}
                    {!isLast && <div className="absolute left-[-20px] top-8 w-0.5 h-full bg-border" />}
                    {/* Dot */}
                    <div className={`absolute left-[-28px] top-1 w-5 h-5 rounded-full ${color} flex items-center justify-center`}>
                      <Icon className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">{entry.stage}</span>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{entry.department}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Audit Log */}
            <Accordion type="single" collapsible>
              <AccordionItem value="audit">
                <AccordionTrigger className="text-base font-bold tracking-tight">
                  🔗 Immutable Audit Log
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {complaint.timeline.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs bg-muted/50 rounded-lg p-3">
                        <span className="text-muted-foreground whitespace-nowrap">{entry.timestamp}</span>
                        <span className="text-foreground flex-1">{entry.description}</span>
                        {entry.hash && <code className="text-muted-foreground shrink-0">{entry.hash}</code>}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrackingView;
