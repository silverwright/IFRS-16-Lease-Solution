import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface NavigationProps {
  modules: Module[];
  currentModule: string;
  onNavigate: (moduleId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ modules, currentModule, onNavigate }) => {
  return (
    <nav className="flex-1 bg-white border-r border-slate-200 px-4 py-6 overflow-y-auto">
      <ul className="space-y-2">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = currentModule === module.id;
          
          return (
            <li key={module.id}>
              <button
                onClick={() => onNavigate(module.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${
                    isActive 
                      ? 'text-blue-600' 
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`} 
                />
                <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {module.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;