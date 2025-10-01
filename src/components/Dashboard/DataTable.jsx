import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';
import { STATUS_COLORS } from '../utils/constants';

const DataTable = ({ filteredData }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const tableData = useMemo(() => {
    let sortedData = [...filteredData];

    if (tableSearch) {
      sortedData = sortedData.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(tableSearch.toLowerCase())
        )
      );
    }

    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, sortConfig, tableSearch, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
          <p className="text-sm text-gray-500 mt-1">Showing {tableData.length} of {filteredData.length} transactions</p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search transactions..."
            value={tableSearch}
            onChange={(e) => {
              setTableSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg sm:text-sm text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['transaction_id', 'customer_id', 'dpd_bucket', 'status', 'channel', 'amount_due', 'amount_paid', 'failure_reason'].map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {key.replace(/_/g, ' ')}
                    {sortConfig.key === key && (
                      <span className="text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.transaction_id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.customer_id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.dpd_bucket}</td>
                <td className="px-4 py-3 text-sm">
                  <span 
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: STATUS_COLORS[row.status] + '20', 
                      color: STATUS_COLORS[row.status] 
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.channel}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(row.amount_due)}</td>
                <td className="px-4 py-3 text-sm font-medium text-green-600">{formatCurrency(row.amount_paid)}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{row.failure_reason || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Added Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;