import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Select } from '../../Components/ui/Select';

const conversions = {
  length: {
    units: [
      'Meters','Kilometers','Centimeters','Millimeters','Micrometers',
      'Nanometers','Miles','Yards','Feet','Inches','Nautical Miles','Light Years'
    ],
    toBase: {
      Meters: 1,
      Kilometers: 1000,
      Centimeters: 0.01,
      Millimeters: 0.001,
      Micrometers: 0.000001,
      Nanometers: 0.000000001,
      Miles: 1609.344,
      Yards: 0.9144,
      Feet: 0.3048,
      Inches: 0.0254,
      'Nautical Miles': 1852,
      'Light Years': 9460730472580800,
    }
  },
  weight: {
    units: ['Kilograms','Grams','Milligrams','Micrograms','Metric Tons','Pounds','Ounces','Tons (US)','Tons (UK)','Stone','Carats'],
    toBase: {
      Kilograms: 1,
      Grams: 0.001,
      Milligrams: 0.000001,
      Micrograms: 0.000000001,
      'Metric Tons': 1000,
      Pounds: 0.453592,
      Ounces: 0.0283495,
      'Tons (US)': 907.185,
      'Tons (UK)': 1016.05,
      Stone: 6.35029,
      Carats: 0.0002,
    }
  },
  temperature: {
    units: ['Celsius','Fahrenheit','Kelvin','Rankine'],
    special: true
  },
  speed: {
    units: ['Meters/Second','Kilometers/Hour','Miles/Hour','Feet/Second','Knots','Mach','Speed of Light'],
    toBase: {
      'Meters/Second': 1,
      'Kilometers/Hour': 0.277778,
      'Miles/Hour': 0.44704,
      'Feet/Second': 0.3048,
      Knots: 0.514444,
      Mach: 343,
      'Speed of Light': 299792458,
    }
  },
  volume: {
    units: ['Liters','Milliliters','Cubic Meters','Cubic Centimeters','Gallons (US)','Gallons (UK)','Quarts (US)','Pints (US)','Cups (US)','Fluid Ounces (US)','Tablespoons','Teaspoons'],
    toBase: {
      Liters: 1,
      Milliliters: 0.001,
      'Cubic Meters': 1000,
      'Cubic Centimeters': 0.001,
      'Gallons (US)': 3.78541,
      'Gallons (UK)': 4.54609,
      'Quarts (US)': 0.946353,
      'Pints (US)': 0.473176,
      'Cups (US)': 0.236588,
      'Fluid Ounces (US)': 0.0295735,
      Tablespoons: 0.0147868,
      Teaspoons: 0.00492892,
    }
  },
  pressure: {
    units: ['Pascal','Kilopascal','Bar','PSI','Atmosphere','Torr','mmHg'],
    toBase: {
      Pascal: 1,
      Kilopascal: 1000,
      Bar: 100000,
      PSI: 6894.76,
      Atmosphere: 101325,
      Torr: 133.322,
      mmHg: 133.322,
    }
  },
  area: {
    units: ['Square Meters','Square Kilometers','Square Centimeters','Square Feet','Square Yards','Square Miles','Acres','Hectares'],
    toBase: {
      'Square Meters': 1,
      'Square Kilometers': 1000000,
      'Square Centimeters': 0.0001,
      'Square Feet': 0.092903,
      'Square Yards': 0.836127,
      'Square Miles': 2589988,
      Acres: 4046.86,
      Hectares: 10000,
    }
  },
  data: {
    units: ['Bytes','Kilobytes','Megabytes','Gigabytes','Terabytes','Petabytes','Bits','Kilobits','Megabits','Gigabits'],
    toBase: {
      Bytes: 1,
      Kilobytes: 1024,
      Megabytes: 1048576,
      Gigabytes: 1073741824,
      Terabytes: 1099511627776,
      Petabytes: 1125899906842624,
      Bits: 0.125,
      Kilobits: 128,
      Megabits: 131072,
      Gigabits: 134217728,
    }
  },
  time: {
    units: ['Seconds','Minutes','Hours','Days','Weeks','Months','Years','Decades','Centuries'],
    toBase: {
      Seconds: 1,
      Minutes: 60,
      Hours: 3600,
      Days: 86400,
      Weeks: 604800,
      Months: 2628000,
      Years: 31536000,
      Decades: 315360000,
      Centuries: 3153600000,
    }
  },
  energy: {
    units: ['Joules','Kilojoules','Calories','Kilocalories','Watt-Hours','Kilowatt-Hours','Electronvolts','BTU'],
    toBase: {
      Joules: 1,
      Kilojoules: 1000,
      Calories: 4.184,
      Kilocalories: 4184,
      'Watt-Hours': 3600,
      'Kilowatt-Hours': 3600000,
      Electronvolts: 1.60218e-19,
      BTU: 1055.06,
    }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const convert = (value, from, to, cat) => {
    if (value === '' || isNaN(value)) return '';
    const num = parseFloat(value);

    if (cat === 'temperature') {
      let celsius;
      switch (from) {
        case 'Fahrenheit': celsius = (num - 32) * 5/9; break;
        case 'Kelvin': celsius = num - 273.15; break;
        case 'Rankine': celsius = (num - 491.67) * 5/9; break;
        default: celsius = num;
      }
      switch (to) {
        case 'Fahrenheit': return ((celsius * 9/5) + 32).toFixed(4);
        case 'Kelvin': return (celsius + 273.15).toFixed(4);
        case 'Rankine': return ((celsius + 273.15) * 9/5).toFixed(4);
        default: return celsius.toFixed(4);
      }
    }

    const base = num * conversions[cat].toBase[from];
    const result = base / conversions[cat].toBase[to];
    
    // Smart formatting: remove trailing zeros, but keep significant digits
    if (Math.abs(result) < 0.0001) {
      return result.toExponential(4);
    }
    return result.toFixed(8).replace(/\.?0+$/, '');
  };

  useEffect(() => {
    if (fromValue === '') {
      setToValue('');
    } else {
      setToValue(convert(fromValue, fromUnit, toUnit, category));
    }
  }, [fromValue, fromUnit, toUnit, category]);

  useEffect(() => {
    const units = conversions[category].units;
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setFromValue('');
    setToValue('');
  }, [category]);

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  // Example value for display when input is empty
  const exampleValue = fromValue === '' ? convert('100', fromUnit, toUnit, category) : '';
  const displayValue = fromValue === '' && exampleValue ? exampleValue : toValue;

  return (
    <div className="w-full max-w-xl mx-auto">

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(conversions).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === cat 
                ? 'bg-teal-500 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* FROM */}
      <div className="bg-slate-50 rounded-2xl p-4 mb-4">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3 block">
          From
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={fromValue}
            onChange={e => setFromValue(e.target.value)}
            placeholder="e.g. 100"
            className="flex-1 h-14 px-4 text-lg font-medium border border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
          />
          <div className="sm:w-48">
            <Select
              value={fromUnit}
              onChange={e => setFromUnit(e.target.value)}
              variant="default"
            >
              {conversions[category].units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Swap */}
      <div className="flex justify-center mb-4">
        <button
          onClick={swap}
          className="h-12 w-12 rounded-full border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center transition-all"
          aria-label="Swap units"
        >
          <ArrowRightLeft className="w-5 h-5 text-teal-600" />
        </button>
      </div>

      {/* TO */}
      <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
        <label className="text-xs font-medium text-teal-700 uppercase tracking-wide mb-3 block">
          To
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-14 bg-white px-4 flex items-center text-lg font-medium border border-teal-200 rounded-xl">
            <span className={fromValue === '' && exampleValue ? 'text-slate-400' : 'text-slate-900'}>
              {displayValue || '—'}
            </span>
          </div>
          <div className="sm:w-48">
            <Select
              value={toUnit}
              onChange={e => setToUnit(e.target.value)}
              variant="teal"
            >
              {conversions[category].units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      {fromValue === '' && (
        <p className="text-center text-xs text-slate-400 mt-4">
          Enter a value above to convert between units
        </p>
      )}

    </div>
  );
}
