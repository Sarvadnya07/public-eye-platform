import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DuplicateAlertProps {
  visible: boolean;
  keyword: string;
}

const DuplicateAlert = ({ visible, keyword }: DuplicateAlertProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="overflow-hidden"
        >
          <div className="mt-2 rounded-lg border border-warning/30 bg-warning/5 p-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Wait! 3 similar issues were reported nearby.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Other citizens have reported "{keyword}" issues in your area. Upvoting existing complaints helps prioritize faster resolution.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 gap-1.5 text-xs border-warning/30 hover:bg-warning/10"
                  onClick={() => toast.info('Redirecting to similar complaints... (demo)')}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  View & Upvote Instead
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DuplicateAlert;
