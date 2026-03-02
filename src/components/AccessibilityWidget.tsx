import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, Eye, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AccessibilityWidgetProps {
  highContrast: boolean;
  largeText: boolean;
  onHighContrastChange: (val: boolean) => void;
  onLargeTextChange: (val: boolean) => void;
}

const AccessibilityWidget = ({
  highContrast,
  largeText,
  onHighContrastChange,
  onLargeTextChange,
}: AccessibilityWidgetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-3 w-64 rounded-xl border border-border bg-card p-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Accessibility</h3>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm cursor-pointer" htmlFor="high-contrast">
                    High Contrast
                  </Label>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={onHighContrastChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm cursor-pointer" htmlFor="large-text">
                    Large Text
                  </Label>
                </div>
                <Switch
                  id="large-text"
                  checked={largeText}
                  onCheckedChange={onLargeTextChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setOpen(!open)}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-foreground text-background hover:bg-foreground/90"
        aria-label="Accessibility options"
      >
        <Accessibility className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default AccessibilityWidget;
