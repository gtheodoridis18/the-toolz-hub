import React, { useState, useEffect } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const months = parseFloat(loanTerm);

    if (!principal || months <= 0 || rate < 0) {
      setMonthlyPayment(null);
      return;
    }

    if (rate === 0) {
      const emi = principal / months;
      setMonthlyPayment(emi);
      setTotalPayment(principal);
      setTotalInterest(0);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = emi * months;
    const interest = total - principal;

    setMonthlyPayment(emi);
    setTotalPayment(total);
    setTotalInterest(interest);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase mb-2">Loan Amount</p>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="100000"
            className="h-12 w-full rounded-xl border border-slate-200 px-3 text-lg"
          />
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase mb-2">Interest Rate (%)</p>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="5"
            className="h-12 w-full rounded-xl border border-slate-200 px-3 text-lg"
          />
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase mb-2">Loan Term (Months)</p>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="12"
            className="h-12 w-full rounded-xl border border-slate-200 px-3 text-lg"
          />
        </div>
      </div>

      {/* Results */}
      {monthlyPayment !== null && (
        <div className="space-y-4">

          {/* EMI */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
            <p className="text-teal-100 text-sm uppercase mb-2">
              Monthly Payment (EMI)
            </p>
            <p className="text-5xl font-light">
              ${monthlyPayment.toFixed(2)}
            </p>
            <p className="text-teal-200 text-sm mt-2">
              Per month for {loanTerm} months
            </p>
          </div>

          {/* Totals */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase mb-1">Total Payment</p>
              <p className="text-2xl font-light">${totalPayment.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase mb-1">Total Interest</p>
              <p className="text-2xl font-light text-amber-600">
                ${totalInterest.toFixed(2)}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase mb-1">Principal</p>
              <p className="text-2xl font-light">
                ${parseFloat(loanAmount).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Principal</span>
              <span className="text-teal-600 font-medium">
                {((loanAmount / totalPayment) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-teal-500"
                style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-sm mb-1">
              <span>Interest</span>
              <span className="text-amber-600 font-medium">
                {((totalInterest / totalPayment) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500"
                style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

