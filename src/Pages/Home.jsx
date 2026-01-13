import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator as CalcIcon, ArrowRightLeft, Timer as TimerIcon, Clock, DollarSign, Cake, Scale, Type, Sparkles, Percent, QrCode, Link2, Banknote, Globe, Search, Star,
  Briefcase, FileText, FileCode, CreditCard as CreditCardIcon, Shield, Palette, Target, Lock, MapPin, Network, TrendingUp, Link as LinkIcon, Image as ImageIcon, FileImage, Languages, Sparkles as SparklesIcon
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
import WorkHoursCalculator from '../Components/tools/WorkHoursCalculator';
import OnlineNotepad from '../Components/tools/OnlineNotepad';
import LoremIpsumGenerator from '../Components/tools/LoremIpsumGenerator';
import CreditCardValidator from '../Components/tools/CreditCardValidator';
import BINChecker from '../Components/tools/BINChecker';
import PasswordGenerator from '../Components/tools/PasswordGenerator';
import ColorPaletteGenerator from '../Components/tools/ColorPaletteGenerator';
import HabitTracker from '../Components/tools/HabitTracker';
import SSLChecker from '../Components/tools/SSLChecker';
import IPLookup from '../Components/tools/IPLookup';
import PortScanner from '../Components/tools/PortScanner';
import DNSLookup from '../Components/tools/DNSLookup';
import KeywordTool from '../Components/tools/KeywordTool';
import BacklinkChecker from '../Components/tools/BacklinkChecker';
import SERPTracker from '../Components/tools/SERPTracker';
import ImageCompressor from '../Components/tools/ImageCompressor';
import SVGConverter from '../Components/tools/SVGConverter';
import TextSummarizer from '../Components/tools/TextSummarizer';
import LanguageTranslator from '../Components/tools/LanguageTranslator';
import AIPromptGenerator from '../Components/tools/AIPromptGenerator';

const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'finance', name: 'Finance' },
  { id: 'security', name: 'Security' },
  { id: 'seo', name: 'SEO & Marketing' },
  { id: 'design', name: 'Design & Media' },
  { id: 'ai', name: 'AI Tools' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'lifestyle', name: 'Lifestyle' }
];

const tools = [
  { id: 'calculator', icon: CalcIcon, title: 'Calculator', description: 'Basic arithmetic operations', keywords: ['math', 'arithmetic', 'calculate'], category: 'utilities', gradient: 'bg-gradient-to-br from-violet-500 to-purple-600', component: Calculator, helpText: 'Perform basic math operations like addition, subtraction, multiplication, and division. Perfect for quick calculations without opening another app.' },
  { id: 'unit-converter', icon: ArrowRightLeft, title: 'Unit Converter', description: 'Length, weight & temperature', keywords: ['convert', 'units', 'metric'], category: 'utilities', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600', component: UnitConverter, helpText: 'Convert between different units of measurement including length, weight, temperature, speed, volume, pressure, area, and data storage.' },
  { id: 'timer', icon: TimerIcon, title: 'Timer', description: 'Countdown timer with alerts', keywords: ['countdown', 'alarm', 'time'], category: 'productivity', gradient: 'bg-gradient-to-br from-amber-500 to-orange-600', component: Timer, helpText: 'Set a countdown timer with audio alerts. Great for cooking, workouts, study sessions, or any time-based activities.' },
  { id: 'stopwatch', icon: Clock, title: 'Stopwatch', description: 'Precise time tracking with laps', keywords: ['timer', 'track', 'laps'], category: 'productivity', gradient: 'bg-gradient-to-br from-rose-500 to-pink-600', component: Stopwatch, helpText: 'Track elapsed time with precision. Record lap times for sports, racing, or any activity requiring time measurement.' },
  { id: 'currency', icon: DollarSign, title: 'Currency Converter', description: 'Convert between major currencies', keywords: ['money', 'exchange', 'forex'], category: 'finance', gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600', component: CurrencyConverter, helpText: 'Convert amounts between major world currencies with real-time exchange rates. Essential for travel, shopping, or international business.' },
  { id: 'age', icon: Cake, title: 'Age Calculator', description: 'Calculate exact age from birth date', keywords: ['birthday', 'years', 'date'], category: 'lifestyle', gradient: 'bg-gradient-to-br from-fuchsia-500 to-purple-600', component: AgeCalculator, helpText: 'Calculate your exact age in years, months, and days from your birth date. Also shows time until your next birthday.' },
  { id: 'bmi', icon: Scale, title: 'BMI Calculator', description: 'Body Mass Index calculator', keywords: ['health', 'weight', 'fitness'], category: 'lifestyle', gradient: 'bg-gradient-to-br from-lime-500 to-green-600', component: BMICalculator, helpText: 'Calculate your Body Mass Index (BMI) based on height and weight. Get health category classification from underweight to obese.' },
  { id: 'word-counter', icon: Type, title: 'Word Counter', description: 'Count words, characters & more', keywords: ['text', 'count', 'characters'], category: 'productivity', gradient: 'bg-gradient-to-br from-sky-500 to-indigo-600', component: WordCounter, helpText: 'Count words, characters, sentences, and paragraphs in your text. Useful for essays, articles, social media posts, and content limits.' },
  { id: 'percentage', icon: Percent, title: 'Percentage Calculator', description: 'Calculate percentages & changes', keywords: ['percent', 'ratio', 'math'], category: 'utilities', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600', component: PercentageCalculator, helpText: 'Calculate percentages, percentage increases/decreases, and find what percentage one number is of another. Great for discounts, tips, and statistics.' },
  { id: 'text-case', icon: Type, title: 'Text Case Converter', description: 'Convert text to different cases', keywords: ['uppercase', 'lowercase', 'capitalize'], category: 'productivity', gradient: 'bg-gradient-to-br from-violet-500 to-fuchsia-600', component: TextCaseConverter, helpText: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and more. Perfect for formatting text quickly.' },
  { id: 'qr-code', icon: QrCode, title: 'QR Code Generator', description: 'Generate QR codes instantly', keywords: ['qr', 'barcode', 'scan'], category: 'utilities', gradient: 'bg-gradient-to-br from-slate-600 to-slate-800', component: QRCodeGenerator, helpText: 'Generate QR codes from text, URLs, or any data. Scan with smartphones to instantly access links, contact info, or text.' },
  { id: 'url-cleaner', icon: Link2, title: 'URL Cleaner', description: 'Remove tracking parameters', keywords: ['link', 'url', 'clean', 'tracking'], category: 'utilities', gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600', component: URLCleaner, helpText: 'Remove tracking parameters and unnecessary clutter from URLs. Get clean, shareable links without UTM tags and other tracking codes.' },
  { id: 'loan', icon: Banknote, title: 'Loan Calculator', description: 'Calculate EMI & loan payments', keywords: ['mortgage', 'emi', 'interest'], category: 'finance', gradient: 'bg-gradient-to-br from-green-500 to-emerald-600', component: LoanCalculator, helpText: 'Calculate monthly loan payments (EMI), total interest, and payment breakdowns. Useful for mortgages, car loans, and personal loans.' },
  { id: 'timezone', icon: Globe, title: 'Time Zone Converter', description: 'Convert time between zones', keywords: ['timezone', 'world clock'], category: 'utilities', gradient: 'bg-gradient-to-br from-orange-500 to-red-600', component: TimeZoneConverter, helpText: 'Convert times between different time zones worldwide. Essential for scheduling meetings, calls, or events across global locations.' },
  { id: 'work-hours', icon: Briefcase, title: 'Work Hours Calculator', description: 'Track time and calculate overtime', keywords: ['timecard', 'timesheet', 'payroll', 'overtime'], category: 'productivity', gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600', component: WorkHoursCalculator, helpText: 'Calculate total work hours including overtime. Enter your clock-in/out times and breaks for each day. Hours over 40 per week are automatically calculated as overtime. Perfect for timesheets and payroll.' },
  { id: 'notepad', icon: FileText, title: 'Online Notepad', description: 'Quick text editor with auto-save', keywords: ['notes', 'text editor', 'memo'], category: 'productivity', gradient: 'bg-gradient-to-br from-amber-500 to-yellow-600', component: OnlineNotepad, helpText: 'Quick text editor with local auto-save. Your notes persist even after closing the tool. Download as text file or save locally.' },
  { id: 'lorem-ipsum', icon: FileCode, title: 'Lorem Ipsum Generator', description: 'Generate placeholder text', keywords: ['lorem', 'ipsum', 'placeholder', 'dummy text'], category: 'design', gradient: 'bg-gradient-to-br from-slate-500 to-gray-600', component: LoremIpsumGenerator, helpText: 'Generate Lorem Ipsum placeholder text for design mockups and layouts. Choose between paragraphs, words, or sentences.' },
  { id: 'credit-card-validator', icon: CreditCardIcon, title: 'Credit Card Validator', description: 'Validate card numbers with Luhn check', keywords: ['credit card', 'validation', 'luhn'], category: 'finance', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600', component: CreditCardValidator, helpText: 'Validate credit card numbers using the Luhn algorithm. Detects card type (Visa, Mastercard, etc.) and checks if the number format is valid. Note: Does not verify if card is active or has funds.' },
  { id: 'bin-checker', icon: CreditCardIcon, title: 'BIN Checker', description: 'Bank Identification Number lookup', keywords: ['bin', 'iin', 'bank'], category: 'finance', gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600', component: BINChecker, helpText: 'Lookup Bank Identification Numbers (BIN) - the first 4-8 digits of a card. Get information about the issuing bank, card type, and country.' },
  { id: 'password-generator', icon: Lock, title: 'Password Generator', description: 'Create strong, secure passwords', keywords: ['password', 'security', 'generate'], category: 'security', gradient: 'bg-gradient-to-br from-red-500 to-rose-600', component: PasswordGenerator, helpText: 'Generate strong, random passwords with customizable length and character types. Includes password strength tester to check your existing passwords.' },
  { id: 'color-palette', icon: Palette, title: 'Color Palette Generator', description: 'Create beautiful color schemes', keywords: ['color', 'palette', 'scheme', 'design'], category: 'design', gradient: 'bg-gradient-to-br from-pink-500 to-purple-600', component: ColorPaletteGenerator, helpText: 'Generate beautiful, harmonious color palettes. Randomly create color schemes or build from a base color. Perfect for design projects, websites, and branding.' },
  { id: 'habit-tracker', icon: Target, title: 'Habit Tracker', description: 'Track daily habits and goals', keywords: ['habit', 'goal', 'tracker', 'routine'], category: 'lifestyle', gradient: 'bg-gradient-to-br from-green-500 to-teal-600', component: HabitTracker, helpText: 'Track daily habits and build streaks. Mark habits as complete each day and monitor your progress. Data persists even after closing the tool.' },
  { id: 'ssl-checker', icon: Shield, title: 'SSL Certificate Checker', description: 'Check SSL certificate validity', keywords: ['ssl', 'certificate', 'https', 'security'], category: 'security', gradient: 'bg-gradient-to-br from-emerald-500 to-green-600', component: SSLChecker, helpText: 'SSL/TLS certificates secure website connections (HTTPS). This tool checks certificate validity, expiration date, and issuer information to ensure your site is properly secured.' },
  { id: 'ip-lookup', icon: MapPin, title: 'IP Address Lookup', description: 'Geolocation and ISP info', keywords: ['ip', 'address', 'location', 'isp'], category: 'utilities', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600', component: IPLookup, helpText: 'Look up geolocation information for any IP address. Get country, city, ISP, and timezone data. Useful for network diagnostics and visitor analysis.' },
  { id: 'port-scanner', icon: Network, title: 'Port Scanner', description: 'Check common port status', keywords: ['port', 'scanner', 'network'], category: 'security', gradient: 'bg-gradient-to-br from-slate-500 to-slate-700', component: PortScanner, helpText: 'Port scanning checks which network ports are open on a server. Common ports include 80 (HTTP), 443 (HTTPS), and 22 (SSH). Note: This is a simulation for educational purposes.' },
  { id: 'dns-lookup', icon: Globe, title: 'DNS Lookup', description: 'Domain name system records', keywords: ['dns', 'domain', 'lookup', 'whois'], category: 'utilities', gradient: 'bg-gradient-to-br from-indigo-500 to-blue-600', component: DNSLookup, helpText: 'DNS (Domain Name System) translates domain names into IP addresses. Enter a domain like \'google.com\' to see its IP address and DNS records.' },
  { id: 'keyword-tool', icon: Search, title: 'Keyword Suggestion Tool', description: 'Generate SEO keyword ideas', keywords: ['keyword', 'seo', 'search'], category: 'seo', gradient: 'bg-gradient-to-br from-purple-500 to-pink-600', component: KeywordTool, helpText: 'Enter a main keyword (seed) to generate related keyword variations. This helps find content ideas and SEO opportunities. The tool shows common search patterns like \'best [keyword]\', \'how to [keyword]\', etc.' },
  { id: 'backlink-checker', icon: LinkIcon, title: 'Backlink Checker', description: 'Analyze website backlinks', keywords: ['backlink', 'seo', 'links'], category: 'seo', gradient: 'bg-gradient-to-br from-cyan-500 to-teal-600', component: BacklinkChecker, helpText: 'Backlinks are links from other websites to yours. They\'re crucial for SEO - more quality backlinks typically mean better search rankings. DoFollow links pass SEO value, NoFollow don\'t. Note: This tool provides simulated data.' },
  { id: 'serp-tracker', icon: TrendingUp, title: 'SERP Rank Tracker', description: 'Track search rankings', keywords: ['serp', 'ranking', 'seo'], category: 'seo', gradient: 'bg-gradient-to-br from-orange-500 to-red-600', component: SERPTracker, helpText: 'SERP (Search Engine Results Page) tracking monitors where your website ranks for specific keywords in search engines. Track your position over time to measure SEO performance. Note: This tool provides simulated data.' },
  { id: 'image-compressor', icon: ImageIcon, title: 'Image Compressor', description: 'Compress and resize images', keywords: ['image', 'compress', 'resize', 'optimize'], category: 'design', gradient: 'bg-gradient-to-br from-green-500 to-emerald-600', component: ImageCompressor, helpText: 'Compress and reduce image file sizes without significant quality loss. Adjust compression quality and see the size difference. Perfect for optimizing images for websites and faster loading.' },
  { id: 'svg-converter', icon: FileImage, title: 'SVG Converter', description: 'Convert SVG to PNG/JPEG', keywords: ['svg', 'convert', 'png'], category: 'design', gradient: 'bg-gradient-to-br from-violet-500 to-purple-600', component: SVGConverter, helpText: 'Convert SVG (Scalable Vector Graphics) files to PNG or JPEG format. Useful when you need raster images from vector graphics.' },
  { id: 'text-summarizer', icon: FileText, title: 'Text Summarizer', description: 'Summarize long text quickly', keywords: ['summarize', 'summary', 'text', 'ai'], category: 'ai', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600', component: TextSummarizer, helpText: 'Automatically condense long text into shorter summaries. Uses extractive summarization to pull out key sentences. Great for quick reading of articles or documents.' },
  { id: 'translator', icon: Languages, title: 'Language Translator', description: 'Translate between languages', keywords: ['translate', 'translation', 'language'], category: 'ai', gradient: 'bg-gradient-to-br from-pink-500 to-rose-600', component: LanguageTranslator, helpText: 'Translate text between multiple languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, and Arabic.' },
  { id: 'ai-prompt', icon: SparklesIcon, title: 'AI Prompt Generator', description: 'Generate AI prompts for ChatGPT', keywords: ['ai', 'prompt', 'chatgpt'], category: 'ai', gradient: 'bg-gradient-to-br from-fuchsia-500 to-purple-600', component: AIPromptGenerator, helpText: 'Generate structured prompts for AI assistants like ChatGPT. Choose task types (writing, coding, analysis) and add context to get well-formatted prompts that produce better AI responses.' },
];

export default function Home() {
  const [openTool, setOpenTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTools');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const handleToggle = (id) => setOpenTool(openTool === id ? null : id);

  const toggleFavorite = (toolId) => {
    const newFavorites = favorites.includes(toolId) ? favorites.filter(id => id !== toolId) : [...favorites, toolId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTools', JSON.stringify(newFavorites));
  };

  const filteredTools = tools.filter(tool => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query) || (tool.keywords && tool.keywords.some(k => k.toLowerCase().includes(query)));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteTools = filteredTools.filter(tool => favorites.includes(tool.id));
  const regularTools = filteredTools.filter(tool => !favorites.includes(tool.id));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <title>Free Online Tools | the Toolific Hub</title>
        <meta name="description" content="the Toolific Hub offers 34 free, fast online tools including calculators, converters, timers, design tools, SEO tools, AI tools and more. No signup required." />
      </Helmet>
      
      <header className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free & Fast Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">the Toolific Hub</h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Your essential everyday utilities in one place. No sign-up required. Fast, simple, and always free.</p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tools by name or keyword..." className="w-full h-14 pl-12 pr-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white shadow-sm" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap text-sm flex-shrink-0 snap-start ${selectedCategory === cat.id ? 'bg-teal-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-slate-50'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {(searchQuery || selectedCategory !== 'all') && (
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <p className="text-sm text-slate-500">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mb-8">
        {/* Hide banner on mobile, show on tablet+ */}
        <div className="hidden sm:block">
          <AdPlaceholder variant="banner" />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 pb-16">
        <div className="flex gap-6 items-start justify-center">
          
          <aside className="hidden xl:block sticky top-4 shrink-0 w-[300px]">
            <div className="space-y-6">
              <AdPlaceholder variant="sidebar" />
              <div className="pt-6"><AdPlaceholder variant="square" /></div>
            </div>
          </aside>

          <main className="flex-1 max-w-4xl w-full">
            <div className="space-y-4 w-full max-w-full overflow-x-hidden">
              
              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg mb-2">No tools found</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-teal-600 hover:text-teal-700 underline text-sm">Clear filters</button>
                </div>
              )}

              {favoriteTools.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h2 className="text-lg font-semibold text-slate-700">Favorites</h2>
                  </div>

                  {favoriteTools.map((tool, index) => (
                    <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                      <ToolAccordion icon={tool.icon} title={tool.title} description={tool.description} gradient={tool.gradient} isOpen={openTool === tool.id} onToggle={() => handleToggle(tool.id)} helpText={tool.helpText} rightElement={
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }} aria-label={`Remove ${tool.title} from favorites`} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        </button>
                      }>
                        <tool.component />
                      </ToolAccordion>
                    </motion.div>
                  ))}
                </>
              )}

              {favoriteTools.length > 0 && regularTools.length > 0 && (
                <div className="my-8"><AdPlaceholder variant="horizontal" /></div>
              )}

              {favoriteTools.length > 0 && regularTools.length > 0 && (
                <div className="mb-4 mt-8"><h2 className="text-lg font-semibold text-slate-700">All Tools</h2></div>
              )}

              {regularTools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: (favoriteTools.length + index) * 0.05 }}>
                    <ToolAccordion icon={tool.icon} title={tool.title} description={tool.description} gradient={tool.gradient} isOpen={openTool === tool.id} onToggle={() => handleToggle(tool.id)} helpText={tool.helpText} rightElement={
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }} aria-label={`Add ${tool.title} to favorites`} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <Star className="w-5 h-5 text-slate-300 hover:text-amber-400" />
                      </button>
                    }>
                      <tool.component />
                    </ToolAccordion>
                  </motion.div>

                  {favoriteTools.length === 0 && (index === 4 || index === 9 || index === 14 || index === 19 || index === 24 || index === 29) && (
                    <div className="py-6">
                      {/* Show square ad on mobile, horizontal on desktop */}
                      <div className="block md:hidden">
                        <AdPlaceholder variant="square" />
                      </div>
                      <div className="hidden md:block">
                        <AdPlaceholder variant="horizontal" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-12">
              {/* Bottom ad - square on mobile, horizontal on desktop */}
              <div className="block sm:hidden">
                <AdPlaceholder variant="square" />
              </div>
              <div className="hidden sm:block">
                <AdPlaceholder variant="horizontal" />
              </div>
            </div>
          </main>

          <aside className="hidden xl:block sticky top-4 shrink-0 w-[300px]">
            <div className="space-y-6">
              <AdPlaceholder variant="sidebar" />
              <div className="pt-6"><AdPlaceholder variant="square" /></div>
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
