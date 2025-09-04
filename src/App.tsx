import React, { useState } from 'react';
import { 
  FileText, 
  Calculator, 
  BookOpen, 
  TrendingUp, 
  GraduationCap, 
  BarChart3,
  Building,
  Shield
} from 'lucide-react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Module1 from './pages/Module1';
import Module2 from './pages/Module2';
import Module3 from './pages/Module3';
import Module4 from './pages/Module4';
import Module5 from './pages/Module5';
import Module6 from './pages/Module6';

function App() {
  const [currentModule, setCurrentModule] = useState('home');

  const modules = [
    { id: 'home', title: 'Home', icon: Building },
    { id: 'module1', title: 'Contract Initiation & Approval', icon: FileText },
    { id: 'module2', title: 'Lease Calculation Engine', icon: Calculator },
    { id: 'module3', title: 'Disclosures & Journal Entries', icon: BookOpen },
    { id: 'module4', title: 'IFRS 16 Methodology', icon: Shield },
    { id: 'module5', title: 'Dashboard', icon: BarChart3 },
    { id: 'module6', title: 'Learn IFRS 16', icon: GraduationCap },
  ];

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 'home': return <LandingPage onNavigate={setCurrentModule} />;
      case 'module1': return <Module1 />;
      case 'module2': return <Module2 />;
      case 'module3': return <Module3 />;
      case 'module4': return <Module4 />;
      case 'module5': return <Module5 />;
      case 'module6': return <Module6 />;
      default: return <LandingPage onNavigate={setCurrentModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header now contains all nav items */}
      <Header
        modules={modules}
        currentModule={currentModule}
        onNavigate={setCurrentModule}
      />

      {/* Main content */}
      <div className="pt-24">
        <main className="p-6">
          {renderCurrentModule()}
        </main>
      </div>
    </div>
  );
}

export default App;