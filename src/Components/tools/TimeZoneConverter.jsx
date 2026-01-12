import React, { useState, useEffect, useMemo } from 'react';
import { Clock } from 'lucide-react';
import SearchableSelect from '../ui/searchable-select';

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

  /* ---------- CONVERSION (FIXED LOGIC) ---------- */
  useEffect(() => {
    if (!dateTime || !fromZone || !toZone) {
      setResult('');
      return;
    }

    try {
      // Parse the datetime-local input as if it's in the "from" timezone
      const [datePart, timePart] = dateTime.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);

      // Create a date string in ISO format for the "from" timezone
      const isoString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
      
      // Format using Intl to handle timezone properly
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: toZone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Create a date object and interpret it as being in the "from" timezone
      // Then convert to the "to" timezone
      const parts = isoString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
      const utcDate = new Date(Date.UTC(
        parseInt(parts[1]),
        parseInt(parts[2]) - 1,
        parseInt(parts[3]),
        parseInt(parts[4]),
        parseInt(parts[5]),
        parseInt(parts[6])
      ));

      // Get offset for "from" timezone
      const fromFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: fromZone,
        timeZoneName: 'shortOffset'
      });
      
      const fromParts = fromFormatter.formatToParts(utcDate);
      const fromOffset = fromParts.find(p => p.type === 'timeZoneName')?.value || 'GMT+0';
      const fromOffsetMinutes = parseTimezoneOffset(fromOffset);

      // Adjust UTC date by the offset difference
      const adjustedDate = new Date(utcDate.getTime() - (fromOffsetMinutes * 60000));

      setResult(formatter.format(adjustedDate));
    } catch (error) {
      console.error('Timezone conversion error:', error);
      setResult('Invalid date or timezone');
    }
  }, [dateTime, fromZone, toZone]);

  // Helper to parse timezone offset strings like "GMT+5:30"
  function parseTimezoneOffset(offsetString) {
    const match = offsetString.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
    if (!match) return 0;
    
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2]) || 0;
    const minutes = parseInt(match[3]) || 0;
    
    return sign * (hours * 60 + minutes);
  }

  return (
    <div className="w-full space-y-5">

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
          variant="default"
        />

        <label className="text-xs text-slate-500 uppercase tracking-wide mt-4 mb-2 block">
          Date & Time
        </label>

        <input
          type="datetime-local"
          value={dateTime}
          onChange={e => setDateTime(e.target.value)}
          placeholder="e.g. 2026-01-09 14:30"
          className="w-full h-14 text-base sm:text-lg rounded-xl border border-slate-200 px-4 bg-white focus:border-teal-500 focus:outline-none transition-colors"
        />
      </div>

      {/* TO */}
      <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">

        <label className="text-xs text-teal-700 uppercase tracking-wide mb-2 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          To Time Zone
        </label>

        <SearchableSelect
          value={toZone}
          onChange={setToZone}
          options={TO_ZONES}
          placeholder="Select time zone"
          variant="teal"
        />

        <label className="text-xs text-teal-700 uppercase tracking-wide mt-4 mb-2 block">
          Converted Time
        </label>

        <div className="bg-teal-600 text-white rounded-xl px-4 py-4">
          <div className="text-xl sm:text-2xl font-light break-words leading-snug">
            {result || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
