import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Ruler } from 'lucide-react';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    let heightInMeters, weightInKg;

    if (unit === 'metric') {
      if (!height || !weight) return setBmi(null);
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      if ((!heightFeet && !heightInches) || !weight) return setBmi(null);
      const totalInches =
        (parseFloat(heightFeet) || 0) * 12 +
        (parseFloat(heightInches) || 0);
      heightInMeters = totalInches * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (heightInMeters <= 0 || weightInKg <= 0) return setBmi(null);
    setBmi(weightInKg / (heightInMeters * heightInMeters));
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, heightFeet, heightInches, unit]);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const getPointerPosition = (bmi) => {
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 15) / 25) * 100;
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Unit Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        {['metric', 'imperial'].map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              unit === u ? 'bg-white shadow' : 'hover:bg-slate-200'
            }`}
          >
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft)'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div className="bg-slate-50 rounded-2xl p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
            <Ruler className="w-4 h-4" /> Height
          </label>

          {unit === 'metric' ? (
            <div className="relative">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-12 w-full px-4 pr-14 text-lg rounded-xl border border-slate-200"
                placeholder="170"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                cm
              </span>
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type="number"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                className="h-12 w-full px-4 pr-10 text-lg rounded-xl border border-slate-200"
                placeholder="5"
              />
              <input
                type="number"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                className="h-12 w-full px-4 pr-10 text-lg rounded-xl border border-slate-200"
                placeholder="10"
              />
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
            <Scale className="w-4 h-4" /> Weight
          </label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-12 w-full px-4 pr-14 text-lg rounded-xl border border-slate-200"
              placeholder={unit === 'metric' ? '70' : '154'}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {unit === 'metric' ? 'kg' : 'lb'}
            </span>
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className={`${category.bg} ${category.border} border rounded-2xl p-6 text-center`}>
              <p className="text-slate-500 text-sm uppercase tracking-wide mb-2">
                Your BMI
              </p>
              <p className={`text-5xl font-light ${category.color}`}>
                {bmi.toFixed(1)}
              </p>
              <p className={`text-lg font-medium ${category.color} mt-2`}>
                {category.label}
              </p>
            </div>

            {/* Scale */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200">
              <div className="relative h-8 mb-2">
                <div className="absolute inset-0 flex rounded-full overflow-hidden">
                  <div className="bg-blue-400 flex-1" />
                  <div className="bg-green-400 flex-1" />
                  <div className="bg-amber-400 flex-1" />
                  <div className="bg-red-400 flex-1" />
                </div>
                <motion.div
                  className="absolute top-0 w-1 h-8 bg-slate-900 rounded-full"
                  animate={{ left: `${getPointerPosition(bmi)}%` }}
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                ['Under', 'bg-blue-50', 'bg-blue-400'],
                ['Normal', 'bg-green-50', 'bg-green-400'],
                ['Over', 'bg-amber-50', 'bg-amber-400'],
                ['Obese', 'bg-red-50', 'bg-red-400'],
              ].map(([label, bg, dot]) => (
                <div key={label} className={`${bg} rounded-lg p-2`}>
                  <div className={`w-2 h-2 ${dot} rounded-full mx-auto mb-1`} />
                  <span className="text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

