import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  icon: any;
}

interface HeaderProps {
  modules: Module[];
  currentModule: string;
  onNavigate: (moduleId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ modules, currentModule, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Pick out modules
  const home = modules.find(m => m.id === 'home');
  const dashboard = modules.find(m => m.id === 'module5'); // Dashboard
  const learn = modules.find(m => m.id === 'module6'); // Learn
  const grouped = modules.filter(m =>
    ['module1', 'module2', 'module3', 'module4'].includes(m.id)
  );

  return (
   <header className="fixed top-0 left-0 right-0 bg-black border-b border-black z-30 shadow-sm">
      
      <div className="px-6 py-4 flex items-center justify-between">
        
        {/* Left side: Logo */}
        <div className="flex items-center">
          <img
            src="/deloitte logo.png"
            alt="IFRS Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Right side navigation */}
        <div className="flex items-center space-x-6">
          {/* Home */}
          {home && (
            <button
              onClick={() => onNavigate(home.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentModule === home.id
                  ? 'text-green-400 font-semibold'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {home.title}
            </button>
          )}

          {/* Dropdown: All Modules */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-1 text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              <span>All Modules</span>
              <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute left-0 mt-2 w-56 origin-top-left bg-black rounded-lg shadow-lg border border-slate-700 z-50">
                <ul className="py-1 text-left">
                  {grouped.map((module) => {
                    const isActive = currentModule === module.id;
                    const Icon = module.icon;
                    return (
                      <li key={module.id}>
                        <button
                          onClick={() => {
                            onNavigate(module.id);
                            setOpen(false);
                          }}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left transition-colors duration-200 ${
                            isActive
                              ? 'bg-slate-800 text-green-400 font-semibold'
                              : 'text-white hover:bg-slate-900'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{module.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Dashboard */}
          {dashboard && (
            <button
              onClick={() => onNavigate(dashboard.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentModule === dashboard.id
                  ? 'text-green-400 font-semibold'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {dashboard.title}
            </button>
          )}

          {/* Learn */}
          {learn && (
            <button
              onClick={() => onNavigate(learn.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentModule === learn.id
                  ? 'text-green-400 font-semibold'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {learn.title}
            </button>
          )}

          {/* Login (small white circle with black user icon) */}
          <button
            onClick={() => alert('Redirect to login page')} // Replace with login logic
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-black transition-colors"
          >
            <User size={18} />
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;