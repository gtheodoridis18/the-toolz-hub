import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Minus, Calendar } from 'lucide-react';

export default function WorkHoursCalculator() {
  const [entries, setEntries] = useState([
    { id: 1, date: '', timeIn: '', timeOut: '', breakMinutes: 0 }
  ]);

  const addEntry = () => {
    setEntries([...entries, { 
      id: Date.now(), 
      date: '', 
      timeIn: '', 
      timeOut: '', 
      breakMinutes: 0 
    }]);
  };

  const removeEntry = (id) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const updateEntry = (id, field, value) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const calculateHours = (timeIn, timeOut, breakMinutes) => {
    if (!timeIn || !timeOut) return 0;
    
    const [inHour, inMin] = timeIn.split(':').map(Number);
    const [outHour, outMin] = timeOut.split(':').map(Number);
    
    let totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);
    
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    
    totalMinutes -= Number(breakMinutes) || 0;
    
    return Math.max(0, totalMinutes / 60);
  };

  const totalHours = entries.reduce((sum, entry) => {
    return sum + calculateHours(entry.timeIn, entry.timeOut, entry.breakMinutes);
  }, 0);

  const regularHours = Math.min(totalHours, 40);
  const overtimeHours = Math.max(0, totalHours - 40);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Entries */}
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 rounded-2xl p-4"
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block font-medium">Date</label>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                  className="w-full h-12 px-3 text-sm rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block font-medium">Time In</label>
                <input
                  type="time"
                  value={entry.timeIn}
                  onChange={(e) => updateEntry(entry.id, 'timeIn', e.target.value)}
                  className="w-full h-12 px-3 text-sm rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block font-medium">Time Out</label>
                <input
                  type="time"
                  value={entry.timeOut}
                  onChange={(e) => updateEntry(entry.id, 'timeOut', e.target.value)}
                  className="w-full h-12 px-3 text-sm rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block font-medium">Break (min)</label>
                  <input
                    type="number"
                    min="0"
                    value={entry.breakMinutes}
                    onChange={(e) => updateEntry(entry.id, 'breakMinutes', e.target.value)}
                    className="w-full h-12 px-3 text-sm rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => removeEntry(entry.id)}
                    disabled={entries.length === 1}
                    className="w-full h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {entry.timeIn && entry.timeOut && (
              <div className="mt-3 text-sm text-slate-600">
                Hours: <span className="font-semibold text-slate-900">
                  {calculateHours(entry.timeIn, entry.timeOut, entry.breakMinutes).toFixed(2)}h
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={addEntry}
        className="w-full h-12 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Entry
      </button>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-1">Total Hours</p>
            <p className="text-3xl font-light text-slate-900">{totalHours.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Regular Hours</p>
            <p className="text-3xl font-light text-green-600">{regularHours.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Overtime Hours</p>
            <p className="text-3xl font-light text-amber-600">{overtimeHours.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: All time calculations are processed locally in your browser. the Toolific Hub does not collect, store, or transmit your work hours or timesheet data.
        </p>
      </div>
    </div>
  );
}
