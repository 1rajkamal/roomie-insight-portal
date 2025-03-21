
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 glass-morphism", 
        isScrolled ? "py-2 shadow-soft" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Building className="h-6 w-6 text-primary" />
          <span className="font-medium text-xl tracking-tight">HostelView</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" isActive={location.pathname === '/'} />
          <NavLink to="/search" label="Search" icon={<Search className="h-4 w-4" />} isActive={location.pathname === '/search'} />
        </nav>

        <button 
          className="md:hidden p-2 rounded-full hover:bg-accent/50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="py-4 px-4 flex flex-col space-y-4 border-t border-border">
            <MobileNavLink to="/" label="Home" isActive={location.pathname === '/'} />
            <MobileNavLink to="/search" label="Search" isActive={location.pathname === '/search'} />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label, icon, isActive }: { to: string; label: string; icon?: React.ReactNode; isActive: boolean }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-200",
      isActive 
        ? "text-primary-foreground bg-primary font-medium" 
        : "hover:bg-accent/50"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, label, isActive }: { to: string; label: string; isActive: boolean }) => (
  <Link
    to={to}
    className={cn(
      "py-3 px-4 rounded-lg transition-colors",
      isActive 
        ? "bg-primary text-primary-foreground font-medium" 
        : "hover:bg-accent/50"
    )}
  >
    {label}
  </Link>
);

export default Header;
