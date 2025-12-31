import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Clock } from 'lucide-react';

/* ---------- ALL TIME ZONES ---------- */
const ALL_TIME_ZONES = Intl.supportedValuesOf('timeZone');

/* ---------- PRIORITY ZONES ---------- */
const PRIORITY = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'Europe/London',
];

/* ---------- SEARCHABLE SELECT ---------- */
function SearchableSelect({
  value,
  onChange,
  options,
  placeholder,
  highlightDetected = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedLabel =
    options.find(o => o.value === value)?.label || placeholder;

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full h-12 rounded-xl border border-slate-200 px-4 pr-12 bg-white text-left truncate"
      >
        <span className={highlightDetected ? 'font-medium' : ''}>
          {selectedLabel}
        </span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-lg max-h-[70vh] overflow-hidden">
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search time zone…"
            className="w-full px-4 py-2 border-b border-slate-200 outline-none text-sm"
          />
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
            {filtered.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setQuery('');
                }}
                className="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm"
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-slate-400">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimeZoneConverter() {
  const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  /* ---------- FROM ZONES (DETECTED FIRST) ---------- */
  const FROM_ZONES = useMemo(() => {
    const detected = ALL_TIME_ZONES.includes(detectedZone)
      ? [{ value: detectedZone, label: `${detectedZone} (Detected)` }]
      : [];

    const priority = PRIORITY
      .filter(z => z !== detectedZone && ALL_TIME_ZONES.includes(z))
      .map(z => ({ value: z, label: z }));

    const rest = ALL_TIME_ZONES
      .filter(z => z !== detectedZone && !PRIORITY.includes(z))
      .map(z => ({ value: z, label: z }));

    return [...detected, ...priority, ...rest];
  }, [detectedZone]);

  /* ---------- TO ZONES ---------- */
  const TO_ZONES = useMemo(() => {
    const priority = PRIORITY
      .filter(z => ALL_TIME_ZONES.includes(z))
      .map(z => ({ value: z, label: z }));

    const rest = ALL_TIME_ZONES
      .filter(z => !PRIORITY.includes(z))
      .map(z => ({ value: z, label: z }));

    return [...priority, ...rest];
  }, []);

  const [fromZone, setFromZone] = useState(FROM_ZONES[0]?.value || 'UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [dateTime, setDateTime] = useState('');
  const [result, setResult] = useState('');

  /* ---------- DEFAULT DATE ---------- */
  useEffect(() => {
    const now = new Date();
    const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setDateTime(iso);
  }, []);

  /* ---------- CONVERSION ---------- */
  useEffect(() => {
    if (!dateTime || !fromZone || !toZone) {
      setResult('');
      return;
    }

    try {
      const base = new Date(dateTime);
      const fromDate = new Date(base.toLocaleString('en-US', { timeZone: fromZone }));
      const toDate = new Date(fromDate.toLocaleString('en-US', { timeZone: toZone }));

      setResult(
        toDate.toLocaleString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    } catch {
      setResult('');
    }
  }, [dateTime, fromZone, toZone]);

  return (
    /* 🔑 REMOVED max-w + mx-auto, MATCH accordion width */
    <div className="w-full space-y-5 overflow-x-hidden">

      {/* FROM */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <label className="text-xs text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          From Time Zone
        </label>

        <SearchableSelect
          value={fromZone}
          onChange={setFromZone}
          options={FROM_ZONES}
          highlightDetected
        />

        <label className="text-xs text-slate-500 uppercase tracking-wide mt-4 mb-2 block">
          Date & Time
        </label>

        <input
          type="datetime-local"
          value={dateTime}
          onChange={e => setDateTime(e.target.value)}
          className="w-full h-14 text-lg rounded-xl border border-slate-200 px-4 bg-white"
        />
      </div>

      {/* TO */}
      <div className="bg-teal-50 rounded-2xl p-4 ring ring-teal-100">

        <label className="text-xs text-teal-700 uppercase tracking-wide mb-2 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          To Time Zone
        </label>

        <SearchableSelect
          value={toZone}
          onChange={setToZone}
          options={TO_ZONES}
          placeholder="Select time zone"
        />

        <label className="text-xs text-teal-700 uppercase tracking-wide mt-4 mb-2 block">
          Converted Time
        </label>

        <div className="bg-teal-600 text-white rounded-xl px-4 py-4">
          <div className="text-xl sm:text-3xl font-light break-words leading-snug">
            {result || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}








