import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';
import { Select } from '../ui/Select';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
];

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromValue, setFromValue] = useState('');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH LIVE RATE (ECB / FRANKFURTER) ---------- */
  useEffect(() => {
    let cancelled = false;

    async function fetchRate() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        if (!cancelled) {
          setRate(data?.rates?.[toCurrency] ?? null);
        }
      } catch {
        if (!cancelled) setRate(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRate();
    return () => (cancelled = true);
  }, [fromCurrency, toCurrency]);

  /* ---------- DISPLAY LOGIC ---------- */
  const calculated =
    fromValue && rate
      ? (parseFloat(fromValue) * rate).toFixed(2)
      : '';

  const example =
    rate ? (100 * rate).toFixed(2) : '';

  const displayValue =
    calculated || example || (loading ? '…' : '—');

  /* ---------- SWAP ---------- */
  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue('');
  };

  const fromData = currencies.find(c => c.code === fromCurrency);
  const toData = currencies.find(c => c.code === toCurrency);

  return (
    <div className="max-w-md mx-auto space-y-4">

      {/* FROM */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{fromData.flag}</span>
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            variant="default"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} – {c.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            {fromData.symbol}
          </span>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            placeholder="e.g. 100"
            className="h-14 text-2xl font-light pl-10 pr-4 rounded-xl border border-slate-200 w-full focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* SWAP */}
      <div className="flex justify-center">
        <button
          onClick={swap}
          className="rounded-full h-12 w-12 border-2 border-slate-200 hover:bg-teal-50 hover:border-teal-500 flex items-center justify-center transition-all"
          aria-label="Swap currencies"
        >
          <ArrowRightLeft className="w-5 h-5 text-teal-600" />
        </button>
      </div>

      {/* TO */}
      <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{toData.flag}</span>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            variant="teal"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} – {c.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 text-lg">
            {toData.symbol}
          </span>
          <div className="h-14 bg-white rounded-xl flex items-center pl-10 pr-4 text-2xl font-light border border-teal-200">
            {displayValue}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-sm text-slate-500 pt-2">
        {rate && (
          <p>
            1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </p>
        )}
        <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
          <RefreshCw className="w-3 h-3" /> Rates are indicative and updated daily (ECB) - Informational Purposes Only
        </p>
      </div>
    </div>
  );
}
