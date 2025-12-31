import React, { useState } from 'react';
import { Type, Copy, Check } from 'lucide-react';

export default function TextCaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const toUpperCase = () => text.toUpperCase();
  const toLowerCase = () => text.toLowerCase();
  const toTitleCase = () =>
    text.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
  const toSentenceCase = () =>
    text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const copyToClipboard = (value, type) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 1500);
  };

  const CaseCard = ({ title, value, type }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-slate-600">{title}</h4>
        <button
          onClick={() => copyToClipboard(value, type)}
          className="p-1 rounded-md hover:bg-slate-100 transition"
          aria-label={`Copy ${title}`}
        >
          {copied === type ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 min-h-[96px] max-h-[240px] overflow-y-auto resize-y text-slate-900 text-sm break-words">
        {value || (
          <span className="text-slate-400 italic">
            Your converted text will appear here
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Input */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-5 h-5 text-teal-600" />
          <label className="font-medium text-slate-900">
            Enter Your Text
          </label>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-white p-3 text-base resize-y focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />

        <p className="text-xs text-slate-400 mt-2">
          {text.length} characters
        </p>
      </div>

      {/* Output cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CaseCard title="UPPERCASE" value={toUpperCase()} type="upper" />
        <CaseCard title="lowercase" value={toLowerCase()} type="lower" />
        <CaseCard title="Title Case" value={toTitleCase()} type="title" />
        <CaseCard title="Sentence case" value={toSentenceCase()} type="sentence" />
      </div>
    </div>
  );
}


