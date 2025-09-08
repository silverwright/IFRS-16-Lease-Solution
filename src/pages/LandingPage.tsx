import React from 'react';

import { 
  FileText, 
  Calculator, 
  BookOpen, 
  Shield, 
  BarChart3, 
  GraduationCap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";

interface LandingPageProps {
  onNavigate: (moduleId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'module1',
      title: 'Contract Initiation & Approval',
      description: 'Streamline lease contract creation and approval processes with comprehensive data capture and validation.',
      icon: FileText,
      features: ['Full lease contract management', 'CSV import for existing contracts', 'Approval workflows', 'Data validation']
    },
    {
      id: 'module2',
      title: 'Lease Calculation Engine',
      description: 'Advanced calculations for lease liability and right-of-use assets with automated amortization schedules.',
      icon: Calculator,
      features: ['Lease liability calculations', 'Right-of-use asset valuation', 'Amortization tables', 'Total cost analysis']
    },
    {
      id: 'module3',
      title: 'Disclosures & Journal Entries',
      description: 'Generate compliant disclosures and accounting journal entries automatically.',
      icon: BookOpen,
      features: ['Automated journal entries', 'Depreciation calculations', 'Period-end reporting', 'Compliance disclosures']
    },
    {
      id: 'module4',
      title: 'IFRS 16 Methodology',
      description: 'Comprehensive methodology guide covering assumptions, processes, and best practices.',
      icon: Shield,
      features: ['Methodology documentation', 'Assumptions framework', 'Best practices', 'Implementation guides']
    },
    {
      id: 'module5',
      title: 'Dashboard',
      description: 'Comprehensive analytics and insights into your lease portfolio with interactive visualizations.',
      icon: BarChart3,
      features: ['Portfolio analytics', 'Interactive dashboards', 'Trend analysis', 'Performance metrics']
    },
    {
      id: 'module6',
      title: 'Learn IFRS 16',
      description: 'Self-paced e-learning platform to master IFRS 16 lease accounting fundamentals.',
      icon: GraduationCap,
      features: ['Interactive courses', 'Self-assessment tools', 'Progress tracking', 'Certification']
    }
  ];

  const text = "IFRS 16 Lease Solution";

  return (
    <div className="w-full m-0 p-0 font-sans">
      {/* Hero Section */}
      <div 
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/LandingPage.jpg')" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex flex-wrap justify-center">
            {text.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.9 + index * 0.6,
                  duration: 0.6 
                }}
                className="mr-2"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Benefits Typing Animation */}
          <div className="flex flex-wrap justify-center gap-3 text-white text-xl md:text-2xl font-bold mt-4">
            <TypeAnimation
              sequence={[
                4000,
                "✅ IFRS 16 Compliant",
                2000,
                "⚡ Automated Calculations",
                2000,
                "👥 Multi-User Support",
                2000,
                "🌍 Multi-Currency",
                2000,
                "IFRS 16 Compliant | Automated Calculations | Multi-User Support | Multi-Currency"
              ]}
              speed={50}
              repeat={0}
              wrapper="span"
              cursor={false}
              className="whitespace-pre inline-block min-h-[40px]"
            />
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="relative z-20 mt-[90vh] px-6 py-12 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => onNavigate(module.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-500">Module {index + 1}</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {module.title}
                </h3>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {module.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                  Access Module
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Streamline Your Lease Accounting?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Start with Module 1 to initiate your first lease contract, or explore our methodology guide to understand the framework.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('module1')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Start with Contract Initiation
          </button>
          <button
            onClick={() => onNavigate('module4')}
            className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
          >
            View Methodology
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
