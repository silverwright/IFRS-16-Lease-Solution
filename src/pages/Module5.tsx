import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar, PieChart, Activity, Filter } from 'lucide-react';

const Module5: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('YTD');
  const [selectedView, setSelectedView] = useState('overview');

  const portfolioSummary = {
    totalAssets: '2,450,000',
    totalLiabilities: '2,180,000',
    monthlyDepreciation: '38,500',
    monthlyInterest: '12,800',
    activeContracts: 15,
    expiringContracts: 3
  };

  const assetByType = [
    { type: 'Real Estate', amount: 1850000, percentage: 75.5, count: 8 },
    { type: 'Vehicles', amount: 320000, percentage: 13.1, count: 4 },
    { type: 'Equipment', amount: 280000, percentage: 11.4, count: 3 }
  ];

  const monthlyTrends = [
    { month: 'Jan', liability: 2400000, asset: 2650000, depreciation: 42000 },
    { month: 'Feb', liability: 2350000, asset: 2590000, depreciation: 41000 },
    { month: 'Mar', liability: 2300000, asset: 2530000, depreciation: 40000 },
    { month: 'Apr', liability: 2250000, asset: 2470000, depreciation: 39500 },
    { month: 'May', liability: 2200000, asset: 2410000, depreciation: 39000 },
    { month: 'Jun', liability: 2180000, asset: 2450000, depreciation: 38500 }
  ];

  const upcomingMaturities = [
    { contract: 'Office Lease - Downtown', maturity: '2024-12-31', liability: 185000 },
    { contract: 'Vehicle Fleet - Sales', maturity: '2025-03-15', liability: 45000 },
    { contract: 'Warehouse - North', maturity: '2025-06-30', liability: 320000 }
  ];

  return (
    <div className="w-full px-6 py-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">IFRS 16 Leases 360° Dashboard</h1>
            <p className="text-slate-600">Comprehensive analytics and insights into your lease portfolio</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Timeframe</label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="YTD">Year to Date</option>
              <option value="Q4">Q4 2024</option>
              <option value="Q3">Q3 2024</option>
              <option value="12M">Last 12 Months</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">View</label>
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="overview">Overview</option>
              <option value="detailed">Detailed Analysis</option>
              <option value="compliance">Compliance View</option>
            </select>
          </div>
        </div>

        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Apply Filters</span>
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8 w-full">
        {[
          { title: 'Total ROU Assets', value: portfolioSummary.totalAssets, color: 'emerald', icon: TrendingUp },
          { title: 'Total Liabilities', value: portfolioSummary.totalLiabilities, color: 'blue', icon: DollarSign },
          { title: 'Monthly Depreciation', value: portfolioSummary.monthlyDepreciation, color: 'amber', icon: Activity },
          { title: 'Monthly Interest', value: portfolioSummary.monthlyInterest, color: 'red', icon: DollarSign },
          { title: 'Active Contracts', value: portfolioSummary.activeContracts, color: 'slate', icon: Calendar },
          { title: 'Expiring Soon', value: portfolioSummary.expiringContracts, color: 'orange', icon: Calendar }
        ].map((card, index) => {
          const Icon = card.icon;
          const formattedValue =
            typeof card.value === 'string'
              ? `$${(parseFloat(card.value.replace(',', '')) / (card.title.includes('Monthly') ? 1000 : 1000000)).toFixed(card.title.includes('Monthly') ? 0 : 1)}${card.title.includes('Monthly') ? 'K' : 'M'}`
              : card.value;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.title}</p>
                  <p className={`text-2xl font-bold text-${card.color}-600`}>{formattedValue}</p>
                </div>
                <Icon className={`h-8 w-8 text-${card.color}-500`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 w-full">
        {/* Asset Composition */}
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Portfolio Composition</h3>
            <PieChart className="h-5 w-5 text-slate-400" />
          </div>
          
          <div className="space-y-4">
            {assetByType.map((asset, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{asset.type}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">${(asset.amount / 1000000).toFixed(1)}M</span>
                    <span className="text-xs text-slate-500 ml-2">({asset.count} contracts)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${asset.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500 mt-1">{asset.percentage}% of total portfolio</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Monthly Trends</h3>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Period</span>
              <span className="text-slate-600">Liability</span>
              <span className="text-slate-600">Asset</span>
              <span className="text-slate-600">Depreciation</span>
            </div>
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex justify-between items-center text-sm py-2 hover:bg-slate-50 rounded">
                <span className="font-medium text-slate-900">{trend.month}</span>
                <span className="text-blue-600">${(trend.liability / 1000000).toFixed(1)}M</span>
                <span className="text-emerald-600">${(trend.asset / 1000000).toFixed(1)}M</span>
                <span className="text-amber-600">${(trend.depreciation / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Maturities */}
      <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming Contract Maturities</h3>
          <Calendar className="h-5 w-5 text-slate-400" />
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contract</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Maturity Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Outstanding Liability</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Days to Maturity</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {upcomingMaturities.map((contract, index) => {
                const daysToMaturity = Math.ceil((new Date(contract.maturity).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                const isUrgent = daysToMaturity <= 90;
                return (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{contract.contract}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{contract.maturity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900">${contract.liability.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-600">{daysToMaturity} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isUrgent ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {isUrgent ? 'Urgent' : 'Monitor'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Module5;
