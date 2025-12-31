import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Type, Hash, Clock, FileText } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    const sentences =
      trimmedText === ''
        ? 0
        : (trimmedText.match(/[.!?]+/g) || []).length ||
          (trimmedText.length > 0 ? 1 : 0);
    const paragraphs =
      trimmedText === ''
        ? 0
        : trimmedText.split(/\n\n+/).filter((p) => p.trim()).length;
    const lines = trimmedText === '' ? 0 : trimmedText.split(/\n/).length;

    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    };
  }, [text]);

  const StatCard = ({ icon: Icon, label, value, subLabel }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 border border-slate-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-teal-600" />
        <span className="text-xs text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-3xl font-light text-slate-900">
        {value.toLocaleString()}
      </p>
      {subLabel && (
        <p className="text-xs text-slate-400 mt-1">{subLabel}</p>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="min-h-[200px] w-full text-base leading-relaxed resize-none rounded-2xl border border-slate-200 p-4 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400">
          {stats.characters}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard icon={Type} label="Words" value={stats.words} />
        <StatCard
          icon={Hash}
          label="Characters"
          value={stats.characters}
          subLabel={`${stats.charactersNoSpaces} without spaces`}
        />
        <StatCard
          icon={FileText}
          label="Sentences"
          value={stats.sentences}
        />
        <StatCard
          icon={Clock}
          label="Reading Time"
          value={stats.readingTime}
          subLabel="minutes"
        />
      </div>

      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm text-slate-600 mb-3 font-medium">
          Additional Stats
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-400">Paragraphs</p>
            <p className="text-lg font-light text-slate-900">
              {stats.paragraphs}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Lines</p>
            <p className="text-lg font-light text-slate-900">
              {stats.lines}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Speaking Time</p>
            <p className="text-lg font-light text-slate-900">
              {stats.speakingTime} min
            </p>
          </div>
          <div>
            <p className="text-slate-400">Avg Word Length</p>
            <p className="text-lg font-light text-slate-900">
              {stats.words > 0
                ? (stats.charactersNoSpaces / stats.words).toFixed(1)
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
