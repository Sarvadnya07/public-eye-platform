import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">PublicEye</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/file-complaint" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              File Complaint
            </Link>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 ml-4">
              <Button
                variant={!isAdmin ? 'default' : 'ghost'}
                size="sm"
                className="text-xs h-7 gap-1.5"
                onClick={() => navigate('/')}
              >
                <Eye className="w-3.5 h-3.5" />
                Citizen
              </Button>
              <Button
                variant={isAdmin ? 'default' : 'ghost'}
                size="sm"
                className="text-xs h-7 gap-1.5"
                onClick={() => navigate('/admin')}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground">Home</Link>
            <Link to="/file-complaint" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-foreground">File Complaint</Link>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant={!isAdmin ? 'default' : 'outline'} className="flex-1" onClick={() => { navigate('/'); setMobileOpen(false); }}>Citizen View</Button>
              <Button size="sm" variant={isAdmin ? 'default' : 'outline'} className="flex-1" onClick={() => { navigate('/admin'); setMobileOpen(false); }}>Admin View</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
