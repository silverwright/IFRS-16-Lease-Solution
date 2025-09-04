import React, { useState } from "react";

const Module1: React.FC = () => {
  const [activeTab, setActiveTab] = useState("new-contract");
  const [contractData, setContractData] = useState({
    lessor: "",
    lessee: "",
    assetType: "",
    assetDescription: "",
    commencement: "",
    leaseterm: "",
    rentAmount: "",
    currency: "USD",
    paymentFrequency: "monthly",
    discountRate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setContractData({
      ...contractData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveContract = () => {
    alert("Contract saved successfully!");
  };

  const handleResetContract = () => {
    setContractData({
      lessor: "",
      lessee: "",
      assetType: "",
      assetDescription: "",
      commencement: "",
      leaseterm: "",
      rentAmount: "",
      currency: "USD",
      paymentFrequency: "monthly",
      discountRate: "",
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Page Heading */}
      <div className="w-full px-6 py-6 bg-white border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">
          Contract Initiation & Approval
        </h1>
        <p className="text-slate-600 mt-1">
          Manage lease contracts and approval workflows
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full border-b border-slate-200">
        <nav className="flex space-x-8 px-6 py-4">
          {[
            { key: "new-contract", label: "New Contract" },
            { key: "csv-import", label: "CSV Import" },
            { key: "contracts-list", label: "Contracts List" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="w-full px-6 py-8">
        {/* New Contract Tab */}
        {activeTab === "new-contract" && (
          <div className="bg-white rounded-lg shadow border p-6 w-full">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Create New Lease Contract
            </h2>

            <form className="space-y-6">
              {/* Party Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lessor (Landlord)
                  </label>
                  <input
                    type="text"
                    name="lessor"
                    value={contractData.lessor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter lessor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lessee (Tenant)
                  </label>
                  <input
                    type="text"
                    name="lessee"
                    value={contractData.lessee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter lessee name"
                  />
                </div>
              </div>

              {/* Asset Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Asset Type
                  </label>
                  <select
                    name="assetType"
                    value={contractData.assetType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select asset type</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="equipment">Equipment</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Asset Description
                  </label>
                  <input
                    type="text"
                    name="assetDescription"
                    value={contractData.assetDescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the leased asset"
                  />
                </div>
              </div>

              {/* Lease Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Commencement Date
                  </label>
                  <input
                    type="date"
                    name="commencement"
                    value={contractData.commencement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lease Term (months)
                  </label>
                  <input
                    type="number"
                    name="leaseterm"
                    value={contractData.leaseterm}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter lease term in months"
                  />
                </div>
              </div>

              {/* Financial Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rent Amount
                  </label>
                  <input
                    type="number"
                    name="rentAmount"
                    value={contractData.rentAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter rent amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={contractData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Payment Frequency
                  </label>
                  <select
                    name="paymentFrequency"
                    value={contractData.paymentFrequency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Discount Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="discountRate"
                  value={contractData.discountRate}
                  onChange={handleInputChange}
                  className="w-full md:w-1/3 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter discount rate"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleResetContract}
                  className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSaveContract}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Contract
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CSV Import Tab */}
        {activeTab === "csv-import" && (
          <div className="bg-white rounded-lg shadow border p-6 w-full">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Import Existing Contracts
            </h2>

            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Upload CSV File
              </h3>
              <p className="text-slate-500 mb-4">
                Import your existing lease contracts from a CSV file
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                CSV Format Requirements:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  • Include columns: Lessor, Lessee, Asset Type, Commencement
                  Date, Lease Term, Rent Amount
                </li>
                <li>• Date format: YYYY-MM-DD</li>
                <li>• Numeric values without currency symbols</li>
                <li>• First row should contain column headers</li>
              </ul>
            </div>
          </div>
        )}

        {/* Contracts List Tab */}
        {activeTab === "contracts-list" && (
          <div className="bg-white rounded-lg shadow border p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Active Contracts
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                New Contract
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Contract ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Lessor/Lessee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Commencement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      LC-2024-001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      Property Holdings / ABC Corp
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      Office Building - Downtown
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      2024-01-01
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </button>
                      <button className="text-slate-600 hover:text-slate-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module1;
