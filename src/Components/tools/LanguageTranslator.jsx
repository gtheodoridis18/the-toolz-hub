import React, { useState } from 'react';
import { Languages, Loader } from 'lucide-react';
import { Select } from '../ui/Select';

export default function LanguageTranslator() {
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' }
  ];

  const translate = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      // Using LibreTranslate API (free and more accurate)
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text'
        })
      });
      const data = await response.json();
      
      if (data.translatedText) {
        setTranslation(data.translatedText);
      } else {
        setTranslation('Translation failed. Please try again.');
      }
    } catch (err) {
      setTranslation('Translation service unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </Select>

          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </Select>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate..."
          className="min-h-[150px] w-full text-base leading-relaxed resize-none rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />

        <button
          onClick={translate}
          disabled={loading || !text.trim()}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Languages className="w-5 h-5" />
              Translate
            </>
          )}
        </button>
      </div>

      {translation && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Translation</h3>
          <p className="text-slate-700 leading-relaxed">{translation}</p>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: Translations are performed via a third-party API (MyMemory). the Toolific Hub does not log or store your text or translations.
        </p>
      </div>
    </div>
  );
}
