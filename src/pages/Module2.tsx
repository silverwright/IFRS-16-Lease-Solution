import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, FileSpreadsheet, Info } from 'lucide-react';

const Module2: React.FC = () => {
  const [calculationInputs, setCalculationInputs] = useState({
    initialRent: '5000',
    leaseTermMonths: '36',
    discountRate: '5.5',
    escalationRate: '3.0',
    initialDirectCosts: '2500'
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculationInputs({
      ...calculationInputs,
      [e.target.name]: e.target.value
    });
  };

  const calculateLease = () => {
    const rent = parseFloat(calculationInputs.initialRent);
    const term = parseInt(calculationInputs.leaseTermMonths);
    const discount = parseFloat(calculationInputs.discountRate) / 100;
    const escalation = parseFloat(calculationInputs.escalationRate) / 100;
    const directCosts = parseFloat(calculationInputs.initialDirectCosts);

    const monthlyDiscount = discount / 12;
    let leaseliability = 0;
    
    for (let i = 1; i <= term; i++) {
      const monthlyRent = rent * Math.pow(1 + escalation / 12, i - 1);
      const pv = monthlyRent / Math.pow(1 + monthlyDiscount, i);
      leaseliability += pv;
    }

    const rightOfUseAsset = leaseliability + directCosts;
    const totalCostOfLease = rent * term * (1 + escalation * term / 24);

    setResults({
      leaseliability: leaseliability.toFixed(2),
      rightOfUseAsset: rightOfUseAsset.toFixed(2),
      totalCostOfLease: totalCostOfLease.toFixed(2),
      monthlyDepreciation: (rightOfUseAsset / term).toFixed(2)
    });
  };

  const generateAmortizationTable = () => {
    if (!results) return [];
    
    const table = [];
    const rent = parseFloat(calculationInputs.initialRent);
    const term = parseInt(calculationInputs.leaseTermMonths);
    const discount = parseFloat(calculationInputs.discountRate) / 100 / 12;
    let remainingLiability = parseFloat(results.leaseliability);
    let remainingAsset = parseFloat(results.rightOfUseAsset);
    const monthlyDepreciation = parseFloat(results.monthlyDepreciation);

    for (let month = 1; month <= Math.min(12, term); month++) {
      const interestExpense = remainingLiability * discount;
      const principalPayment = rent - interestExpense;
      remainingLiability -= principalPayment;
      remainingAsset -= monthlyDepreciation;

      table.push({
        month,
        payment: rent.toFixed(2),
        interest: interestExpense.toFixed(2),
        principal: principalPayment.toFixed(2),
        remainingLiability: Math.max(0, remainingLiability).toFixed(2),
        depreciation: monthlyDepreciation.toFixed(2),
        remainingAsset: Math.max(0, remainingAsset).toFixed(2)
      });
    }
    
    return table;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calculator className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Lease Calculation Engine</h1>
            <p className="text-slate-600">Calculate lease liability and right-of-use assets</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Calculation Inputs</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                <DollarSign className="h-4 w-4" />
                <span>Initial Monthly Rent</span>
              </label>
              <input
                type="number"
                name="initialRent"
                value={calculationInputs.initialRent}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Lease Term (months)</label>
              <input
                type="number"
                name="leaseTermMonths"
                value={calculationInputs.leaseTermMonths}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Discount Rate (%)</label>
              <input
                type="number"
                step="0.1"
                name="discountRate"
                value={calculationInputs.discountRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Annual Escalation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                name="escalationRate"
                value={calculationInputs.escalationRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                <DollarSign className="h-4 w-4" />
                <span>Initial Direct Costs</span>
              </label>
              <input
                type="number"
                name="initialDirectCosts"
                value={calculationInputs.initialDirectCosts}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={calculateLease}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Calculate Lease Values
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">Lease Liability (Initial Recognition)</span>
                  <span className="text-lg font-bold text-blue-600">${results.leaseliability}</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-900">Right-of-Use Asset</span>
                  <span className="text-lg font-bold text-emerald-600">${results.rightOfUseAsset}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-900">Total Cost of Lease</span>
                  <span className="text-lg font-bold text-amber-600">${results.totalCostOfLease}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Monthly Depreciation</span>
                  <span className="text-lg font-bold text-slate-600">${results.monthlyDepreciation}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Calculation Notes:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Lease liability calculated using present value of future payments</li>
                      <li>• Right-of-use asset includes lease liability plus initial direct costs</li>
                      <li>• Depreciation calculated on straight-line basis over lease term</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p>Enter lease details and click "Calculate Lease Values" to see results</p>
            </div>
          )}
        </div>
      </div>

      {/* Amortization Table */}
      {results && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6 w-full">
          <div className="flex items-center space-x-3 mb-6">
            <FileSpreadsheet className="h-5 w-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Amortization Schedule (First 12 Months)</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Interest</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Principal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Remaining Liability</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Depreciation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Remaining Asset</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {generateAmortizationTable().map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.month}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">${row.payment}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">${row.interest}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">${row.principal}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">${row.remainingLiability}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">${row.depreciation}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-emerald-600">${row.remainingAsset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module2;
