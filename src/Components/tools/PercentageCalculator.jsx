import React, { useState, useEffect } from 'react';
import { Percent, TrendingUp, TrendingDown } from 'lucide-react';

export default function PercentageCalculator() {
  const [xPercent, setXPercent] = useState('');
  const [yValue, setYValue] = useState('');
  const [xOfY, setXOfY] = useState('');

  const [increaseValue, setIncreaseValue] = useState('');
  const [increasePercent, setIncreasePercent] = useState('');
  const [increaseResult, setIncreaseResult] = useState('');

  const [decreaseValue, setDecreaseValue] = useState('');
  const [decreasePercent, setDecreasePercent] = useState('');
  const [decreaseResult, setDecreaseResult] = useState('');

  /* X% of Y */
  useEffect(() => {
    if (xPercent !== '' && yValue !== '') {
      setXOfY(((parseFloat(xPercent) / 100) * parseFloat(yValue)).toFixed(2));
    } else {
      setXOfY('');
    }
  }, [xPercent, yValue]);

  /* Percentage Increase */
  useEffect(() => {
    if (increaseValue !== '' && increasePercent !== '') {
      const inc = (parseFloat(increaseValue) * parseFloat(increasePercent)) / 100;
      setIncreaseResult((parseFloat(increaseValue) + inc).toFixed(2));
    } else {
      setIncreaseResult('');
    }
  }, [increaseValue, increasePercent]);

  /* Percentage Decrease */
  useEffect(() => {
    if (decreaseValue !== '' && decreasePercent !== '') {
      const dec = (parseFloat(decreaseValue) * parseFloat(decreasePercent)) / 100;
      setDecreaseResult((parseFloat(decreaseValue) - dec).toFixed(2));
    } else {
      setDecreaseResult('');
    }
  }, [decreaseValue, decreasePercent]);

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 px-3 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* WHAT IS X% OF Y */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Percent className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">What is X% of Y?</h3>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-slate-500 mb-1 block">Percentage</label>
            <input
              type="number"
              value={xPercent}
              onChange={(e) => setXPercent(e.target.value)}
              className={inputClass}
              placeholder="10"
            />
          </div>

          <span className="text-xl text-slate-400 pb-3">%</span>
          <span className="text-slate-500 pb-3">of</span>

          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-slate-500 mb-1 block">Value</label>
            <input
              type="number"
              value={yValue}
              onChange={(e) => setYValue(e.target.value)}
              className={inputClass}
              placeholder="100"
            />
          </div>

          <span className="text-slate-500 pb-3">=</span>

          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 min-w-[120px]">
            <div className="text-2xl font-light text-blue-900">
              {xOfY || '0.00'}
            </div>
          </div>
        </div>
      </div>

      {/* INCREASE */}
      <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Percentage Increase</h3>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-green-700 mb-1 block">Initial Value</label>
            <input
              type="number"
              value={increaseValue}
              onChange={(e) => setIncreaseValue(e.target.value)}
              className={`${inputClass} border-green-200`}
              placeholder="100"
            />
          </div>

          <span className="text-green-600 pb-3">+</span>

          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-green-700 mb-1 block">Increase %</label>
            <input
              type="number"
              value={increasePercent}
              onChange={(e) => setIncreasePercent(e.target.value)}
              className={`${inputClass} border-green-200`}
              placeholder="10"
            />
          </div>

          <span className="text-green-600 pb-3">%</span>
          <span className="text-green-600 pb-3">=</span>

          <div className="bg-green-600 text-white rounded-xl px-4 py-3 min-w-[120px]">
            <div className="text-2xl font-light">
              {increaseResult || '0.00'}
            </div>
          </div>
        </div>
      </div>

      {/* DECREASE */}
      <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-red-900">Percentage Decrease</h3>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-red-700 mb-1 block">Initial Value</label>
            <input
              type="number"
              value={decreaseValue}
              onChange={(e) => setDecreaseValue(e.target.value)}
              className={`${inputClass} border-red-200`}
              placeholder="100"
            />
          </div>

          <span className="text-red-600 pb-3">−</span>

          <div className="flex-1 min-w-[120px]">
            <label className="text-xs text-red-700 mb-1 block">Decrease %</label>
            <input
              type="number"
              value={decreasePercent}
              onChange={(e) => setDecreasePercent(e.target.value)}
              className={`${inputClass} border-red-200`}
              placeholder="10"
            />
          </div>

          <span className="text-red-600 pb-3">%</span>
          <span className="text-red-600 pb-3">=</span>

          <div className="bg-red-600 text-white rounded-xl px-4 py-3 min-w-[120px]">
            <div className="text-2xl font-light">
              {decreaseResult || '0.00'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

