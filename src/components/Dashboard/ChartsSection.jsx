import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DPD_ORDER, STATUS_COLORS } from '../utils/constants';

const ChartsSection = ({ filteredData }) => {
  const statusData = useMemo(() => {
    const statusCount = {};
    filteredData.forEach(row => {
      const status = row.status || 'unknown';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count
    }));
  }, [filteredData]);

  const dpdCollectionData = useMemo(() => {
    const dpdStats = {};
    
    filteredData.forEach(row => {
      const bucket = row.dpd_bucket || 'unknown';
      if (!dpdStats[bucket]) {
        dpdStats[bucket] = { due: 0, paid: 0 };
      }
      dpdStats[bucket].due += row.amount_due;
      dpdStats[bucket].paid += row.amount_paid;
    });

    const result = Object.entries(dpdStats).map(([bucket, stats]) => ({
      dpd_bucket: bucket,
      collection_rate: stats.due > 0 ? (stats.paid / stats.due) * 100 : 0,
      amount_due: stats.due,
      amount_collected: stats.paid
    }));

    return result.sort((a, b) => 
      DPD_ORDER.indexOf(a.dpd_bucket) - DPD_ORDER.indexOf(b.dpd_bucket)
    );
  }, [filteredData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Status Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Payment Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.status}: ${entry.count}`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || '#9ca3af'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Collection Rate by DPD Bar Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Collection Rate by DPD Bucket</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dpdCollectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dpd_bucket" tick={{ fontSize: 12 }} />
            <YAxis label={{ value: 'Collection Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'collection_rate') return [`${value.toFixed(2)}%`, 'Collection Rate'];
                return [value, name];
              }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="collection_rate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;