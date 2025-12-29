import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import About from './Pages/About';
import Contact from './Pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Main content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} the Toolific Hub. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm">
              <Link
                to="/"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/privacy-policy"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/about"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-slate-500 hover:text-teal-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}
