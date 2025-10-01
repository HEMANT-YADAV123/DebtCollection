import React from 'react';
import { Filter } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, uniqueDpdBuckets, uniqueChannels, toggleFilter, clearFilters }) => {
  const hasActiveFilters = filters.dpdBuckets.length > 0 || filters.channels.length > 0 || filters.dateRange.start || filters.dateRange.end;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: e.target.value }
              }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: e.target.value }
              }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* DPD Bucket */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">DPD Bucket</label>
          <div className="flex flex-wrap gap-2">
            {uniqueDpdBuckets.map(bucket => (
              <button
                key={bucket}
                onClick={() => toggleFilter('dpdBuckets', bucket)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.dpdBuckets.includes(bucket)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {bucket}
              </button>
            ))}
          </div>
        </div>

        {/* Channel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
          <div className="flex flex-wrap gap-2">
            {uniqueChannels.map(channel => (
              <button
                key={channel}
                onClick={() => toggleFilter('channels', channel)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.channels.includes(channel)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;