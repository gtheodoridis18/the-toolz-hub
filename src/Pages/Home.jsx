import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 

  Calculator as CalcIcon, 
  ArrowRightLeft, 
  Timer as TimerIcon, 
  Clock, 
  DollarSign, 
  Cake, 
  Scale, 
  Type,
  Sparkles,
  Percent,
  QrCode,
  Link2,
  Banknote,
  Globe,
  Search,
  Star
} from 'lucide-react';

import ToolAccordion from '../Components/ToolAccordion';
import AdPlaceholder from '../Components/AdPlaceholder';

import Calculator from '../Components/tools/Calculator';
import UnitConverter from '../Components/tools/UnitConverter';
import Timer from '../Components/tools/Timer';
import Stopwatch from '../Components/tools/Stopwatch';
import CurrencyConverter from '../Components/tools/CurrencyConverter';
import AgeCalculator from '../Components/tools/AgeCalculator';
import BMICalculator from '../Components/tools/BMICalculator';
import WordCounter from '../Components/tools/WordCounter';
import PercentageCalculator from '../Components/tools/PercentageCalculator';
import TextCaseConverter from '../Components/tools/TextCaseConverter';
import QRCodeGenerator from '../Components/tools/QRCodeGenerator';
import URLCleaner from '../Components/tools/URLCleaner';
import LoanCalculator from '../Components/tools/LoanCalculator';
import TimeZoneConverter from '../Components/tools/TimeZoneConverter';

const tools = [
  {
    id: 'calculator',
    icon: CalcIcon,
    title: 'Calculator',
    description: 'Basic arithmetic operations',
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
    component: Calculator,
  },
  {
    id: 'unit-converter',
    icon: ArrowRightLeft,
    title: 'Unit Converter',
    description: 'Length, weight & temperature',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    component: UnitConverter,
  },
  {
    id: 'timer',
    icon: TimerIcon,
    title: 'Timer',
    description: 'Countdown timer with alerts',
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    component: Timer,
  },
  {
    id: 'stopwatch',
    icon: Clock,
    title: 'Stopwatch',
    description: 'Precise time tracking with laps',
    gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
    component: Stopwatch,
  },
  {
    id: 'currency',
    icon: DollarSign,
    title: 'Currency Converter',
    description: 'Convert between major currencies',
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    component: CurrencyConverter,
  },
  {
    id: 'age',
    icon: Cake,
    title: 'Age Calculator',
    description: 'Calculate exact age from birth date',
    gradient: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
    component: AgeCalculator,
  },
  {
    id: 'bmi',
    icon: Scale,
    title: 'BMI Calculator',
    description: 'Body Mass Index calculator',
    gradient: 'bg-gradient-to-br from-lime-500 to-green-600',
    component: BMICalculator,
  },
  {
    id: 'word-counter',
    icon: Type,
    title: 'Word Counter',
    description: 'Count words, characters & more',
    gradient: 'bg-gradient-to-br from-sky-500 to-indigo-600',
    component: WordCounter,
  },
  {
    id: 'percentage',
    icon: Percent,
    title: 'Percentage Calculator',
    description: 'Calculate percentages & changes',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    component: PercentageCalculator,
  },
  {
    id: 'text-case',
    icon: Type,
    title: 'Text Case Converter',
    description: 'Convert text to different cases',
    gradient: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
    component: TextCaseConverter,
  },
  {
    id: 'qr-code',
    icon: QrCode,
    title: 'QR Code Generator',
    description: 'Generate QR codes instantly',
    gradient: 'bg-gradient-to-br from-slate-600 to-slate-800',
    component: QRCodeGenerator,
  },
  {
    id: 'url-cleaner',
    icon: Link2,
    title: 'URL Cleaner',
    description: 'Remove tracking parameters',
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    component: URLCleaner,
  },
  {
    id: 'loan',
    icon: Banknote,
    title: 'Loan Calculator',
    description: 'Calculate EMI & loan payments',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    component: LoanCalculator,
  },
  {
    id: 'timezone',
    icon: Globe,
    title: 'Time Zone Converter',
    description: 'Convert time between zones',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    component: TimeZoneConverter,
  },
];

export default function Home() {
  const [openTool, setOpenTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTools');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleToggle = (id) => {
    setOpenTool(openTool === id ? null : id);
  };

  const toggleFavorite = (toolId) => {
    const newFavorites = favorites.includes(toolId)
      ? favorites.filter(id => id !== toolId)
      : [...favorites, toolId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTools', JSON.stringify(newFavorites));
  };

  const filteredTools = tools.filter(tool => {
    const query = searchQuery.toLowerCase();
    return tool.title.toLowerCase().includes(query) || 
           tool.description.toLowerCase().includes(query);
  });

  const favoriteTools = filteredTools.filter(tool => favorites.includes(tool.id));
  const regularTools = filteredTools.filter(tool => !favorites.includes(tool.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
      <Helmet>
        <title>Free Online Tools – Calculator, Converter, Timer | the Toolific Hub</title>
        <meta
          name="description"
          content="the Toolific Hub offers free, fast online tools including calculators, unit converters, timers, QR code generators, and more. No signup required."
        />
      </Helmet>
      {/* Header */}
      <header className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free & Fast Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">
              the Toolific Hub
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Your essential everyday utilities in one place. 
              No sign-up required. Fast, simple, and always free.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full h-14 pl-12 pr-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <AdPlaceholder variant="banner" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex gap-6 items-start">
          <aside className="hidden xl:block sticky top-4 shrink-0">
            <AdPlaceholder variant="sidebar" />
          </aside>

          <main className="flex-1 max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">
                    No tools found matching "{searchQuery}"
                  </p>
                </div>
              )}

              {favoriteTools.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h2 className="text-lg font-semibold text-slate-700">Favorites</h2>
                  </div>

                  {favoriteTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ToolAccordion
                        icon={tool.icon}
                        title={tool.title}
                        description={tool.description}
                        gradient={tool.gradient}
                        isOpen={openTool === tool.id}
                        onToggle={() => handleToggle(tool.id)}
                        rightElement={
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(tool.id);
                            }}
                            aria-label={`Remove ${tool.title} from favorites`}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          </button>
                        }
                      >
                        <tool.component />
                      </ToolAccordion>
                    </motion.div>
                  ))}
                </>
              )}

              {favoriteTools.length > 0 && regularTools.length > 0 && (
                   <div className="my-8">
                  <AdPlaceholder variant="horizontal" />
                </div>
              )}

              {favoriteTools.length > 0 && regularTools.length > 0 && (
                   <div className="mb-4">
                     <h2 className="text-lg font-semibold text-slate-700">
                       All Tools
                     </h2>
                   </div>
              )}

              {regularTools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (favoriteTools.length + index) * 0.05 }}
                  >
                    <ToolAccordion
                      icon={tool.icon}
                      title={tool.title}
                      description={tool.description}
                      gradient={tool.gradient}
                      isOpen={openTool === tool.id}
                      onToggle={() => handleToggle(tool.id)}
                      rightElement={
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool.id);
                          }}
                          aria-label={`Add ${tool.title} to favorites`}
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <Star className="w-5 h-5 text-slate-300 hover:text-amber-400" />
                        </button>
                      }
                    >
                      <tool.component />
                    </ToolAccordion>
                  </motion.div>

                  {favoriteTools.length === 0 && (index === 4 || index === 9) && (
                    <div className="py-4">
                      <AdPlaceholder variant="horizontal" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-12">
              <AdPlaceholder variant="horizontal" />
            </div>
          </main>

          <aside className="hidden xl:block sticky top-4 shrink-0">
            <AdPlaceholder variant="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}


