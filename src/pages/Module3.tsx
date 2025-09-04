import React, { useState } from 'react';
import { BookOpen, FileText, Calculator, Download, Eye } from 'lucide-react';

const Module3: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-12');
  
  const journalEntries = [
    {
      date: '2024-12-01',
      description: 'Monthly lease payment - Office Building',
      debit: { account: 'Lease Liability', amount: '4,200.00' },
      credit: { account: 'Cash', amount: '4,200.00' }
    },
    {
      date: '2024-12-01',
      description: 'Interest expense on lease liability',
      debit: { account: 'Interest Expense', amount: '800.00' },
      credit: { account: 'Lease Liability', amount: '800.00' }
    },
    {
      date: '2024-12-31',
      description: 'Monthly depreciation - Right of Use Asset',
      debit: { account: 'Depreciation Expense - ROU Asset', amount: '1,250.00' },
      credit: { account: 'Accumulated Depreciation - ROU Asset', amount: '1,250.00' }
    }
  ];

  const disclosureData = {
    currentPeriod: {
      depreciation: '15,000.00',
      accumulatedDepreciation: '45,000.00',
      rightOfUseAsset: '135,000.00',
      openingLiability: '142,500.00',
      financeCost: '9,600.00',
      closingLiability: '127,100.00'
    }
  };

  const maturityAnalysis = [
    { period: 'Within 1 year', amount: '48,000.00' },
    { period: '1-2 years', amount: '48,000.00' },
    { period: '2-3 years', amount: '31,100.00' },
    { period: 'Total', amount: '127,100.00' }
  ];

  return (
    <div className="w-full px-6 py-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Disclosures & Journal Entries</h1>
            <p className="text-slate-600">Generate compliant disclosures and accounting entries</p>
          </div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="mb-6 w-full max-w-sm">
        <label className="block text-sm font-medium text-slate-700 mb-2">Reporting Period</label>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="2024-12">December 2024</option>
          <option value="2024-11">November 2024</option>
          <option value="2024-10">October 2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Journal Entries */}
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Journal Entries</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="space-y-4">
            {journalEntries.map((entry, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">{entry.date}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-900 mb-3">{entry.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Dr. {entry.debit.account}</span>
                    <span className="font-medium text-slate-900">${entry.debit.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span className="text-slate-600">Cr. {entry.credit.account}</span>
                    <span className="font-medium text-slate-900">${entry.credit.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Disclosure Figures */}
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Key Disclosure Figures</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
              <FileText className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(disclosureData.currentPeriod).map(([key, value], index) => (
              <div key={index} className={`p-4 rounded-lg ${index % 2 === 0 ? 'bg-blue-50' : 'bg-slate-50'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-900">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-lg font-bold text-slate-600">${value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maturity Analysis */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6 w-full">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Lease Liability Maturity Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Maturity Period
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount (USD)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {maturityAnalysis.map((item, index) => (
                <tr key={index} className={item.period === 'Total' ? 'bg-slate-50 font-semibold' : 'hover:bg-slate-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {item.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-900">
                    ${item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500">
                    {item.period !== 'Total' ? 
                      `${((parseFloat(item.amount.replace(',', '')) / parseFloat(maturityAnalysis[3].amount.replace(',', ''))) * 100).toFixed(1)}%` : 
                      '100.0%'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Calculator className="h-4 w-4" />
          <span>Recalculate Entries</span>
        </button>
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export to Excel</span>
        </button>
        <button className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors">
          <FileText className="h-4 w-4" />
          <span>Generate Disclosure Note</span>
        </button>
      </div>
    </div>
  );
};

export default Module3;
