import React, { useState, useEffect } from 'react';
import { Calendar, Cake, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (!day || !month || !year) {
      setAge(null);
      return;
    }

    const birth = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    if (isNaN(birth.getTime()) || birth > today) {
      setAge(null);
      return;
    }

    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();

    if (d < 0) {
      m--;
      d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (m < 0) {
      y--;
      m += 12;
    }

    const totalDays = Math.floor((today - birth) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = y * 12 + m;
    const totalHours = totalDays * 24;

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

    const daysUntilBirthday = Math.ceil(
      (nextBirthday - today) / 86400000
    );

    setAge({
      years: y,
      months: m,
      days: d,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysUntilBirthday,
      dayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' }),
    });
  }, [day, month, year]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* INPUT */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200 mb-6 w-full max-w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-teal-600" />
          </div>
          <p className="text-lg font-semibold text-slate-900">
            Select your date of birth
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 min-w-0">
          {/* Day */}
          <div className="min-w-0">
            <label className="text-xs font-medium text-slate-500 uppercase mb-2 block">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full h-14 rounded-xl border border-slate-300 bg-white px-3 text-lg"
            >
              <option value="">DD</option>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Month */}
          <div className="min-w-0">
            <label className="text-xs font-medium text-slate-500 uppercase mb-2 block">
              Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-14 rounded-xl border border-slate-300 bg-white px-3 text-lg"
            >
              <option value="">Month</option>
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="min-w-0">
            <label className="text-xs font-medium text-slate-500 uppercase mb-2 block">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-14 rounded-xl border border-slate-300 bg-white px-3 text-lg"
            >
              <option value="">YYYY</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULT */}
      <AnimatePresence>
        {age && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 w-full max-w-full"
          >
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl p-6 text-white">
              <p className="text-teal-100 text-sm uppercase mb-2">Your Age</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {['years', 'months', 'days'].map(k => (
                  <div key={k} className="text-center">
                    <div className="text-5xl font-light">{age[k]}</div>
                    <p className="text-sm text-teal-100 capitalize">{k}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['Total Days', age.totalDays],
                ['Total Weeks', age.totalWeeks],
                ['Total Months', age.totalMonths],
                ['Total Hours', age.totalHours],
              ].map(([label, val]) => (
                <div key={label} className="bg-white rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase mb-1">{label}</p>
                  <p className="text-2xl font-semibold">{val.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <Cake className="w-4 h-4 text-amber-600" />
                  <p className="text-xs uppercase text-amber-700">Next Birthday</p>
                </div>
                <p className="text-xl font-semibold text-amber-900">
                  {age.daysUntilBirthday === 0 ? '🎉 Today!' : `${age.daysUntilBirthday} days`}
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <p className="text-xs uppercase text-purple-700">Born On</p>
                </div>
                <p className="text-xl font-semibold text-purple-900">
                  {age.dayOfWeek}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


