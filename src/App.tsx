import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import ComplaintWizard from "./pages/ComplaintWizard";
import TrackingView from "./pages/TrackingView";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Issues from "./pages/admin/Issues";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import AccessibilityWidget from "./components/AccessibilityWidget";
import CivicBot from "./components/CivicBot";

const queryClient = new QueryClient();

const App = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <div
            className={`${highContrast ? 'a11y-high-contrast' : ''} ${largeText ? 'a11y-large-text' : ''}`}
          >
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/file-complaint" element={<ComplaintWizard />} />
                <Route path="/track/:id" element={<TrackingView />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="issues" element={<Issues />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AccessibilityWidget
                highContrast={highContrast}
                largeText={largeText}
                onHighContrastChange={setHighContrast}
                onLargeTextChange={setLargeText}
              />
              <CivicBot />
            </BrowserRouter>
          </div>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
