import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import FileUpload from './FileUpload';
import FilterPanel from './FilterPanel';
import KPICards from './KPICards';
import ChartsSection from './ChartsSection';
import DataTable from './DataTable';
import { DPD_ORDER } from '../utils/constants';

const DebtCollectionsDashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    dpdBuckets: [],
    channels: []
  });

  // Parse CSV
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, '_'),
      complete: (results) => {
        const cleanedData = results.data.map(row => {
          // Enhanced PTP parsing to handle various formats
          let isPtp = false;
          const ptpValue = row.is_ptp || row.ptp || row.promise_to_pay;
          
          if (ptpValue !== undefined && ptpValue !== null) {
            if (typeof ptpValue === 'boolean') {
              isPtp = ptpValue;
            } else if (typeof ptpValue === 'string') {
              const lowerPtp = ptpValue.toLowerCase().trim();
              isPtp = lowerPtp === 'true' || lowerPtp === 'yes' || lowerPtp === '1' || lowerPtp === 'y';
            } else if (typeof ptpValue === 'number') {
              isPtp = ptpValue === 1;
            }
          }

          return {
            ...row,
            channel: row.channel || '(unknown)',
            amount_due: parseFloat(row.amount_due) || 0,
            amount_paid: parseFloat(row.amount_paid) || 0,
            is_ptp: isPtp
          };
        });
        
        console.log('Parsed data sample:', cleanedData.slice(0, 5)); // Debug log
        console.log('PTP count:', cleanedData.filter(row => row.is_ptp).length); // Debug log
        
        setData(cleanedData);
      },
      error: (error) => {
        console.error('CSV Parse Error:', error);
        alert('Error parsing CSV file');
      }
    });
  };

  // Get unique values for filters
  const uniqueDpdBuckets = useMemo(() => {
    const buckets = [...new Set(data.map(d => d.dpd_bucket).filter(Boolean))];
    return buckets.sort((a, b) => DPD_ORDER.indexOf(a) - DPD_ORDER.indexOf(b));
  }, [data]);

  const uniqueChannels = useMemo(() => {
    return [...new Set(data.map(d => d.channel).filter(Boolean))];
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(row => {
      if (filters.dateRange.start && row.transaction_date) {
        if (row.transaction_date < filters.dateRange.start) return false;
      }
      if (filters.dateRange.end && row.transaction_date) {
        if (row.transaction_date > filters.dateRange.end) return false;
      }

      if (filters.dpdBuckets.length > 0 && !filters.dpdBuckets.includes(row.dpd_bucket)) {
        return false;
      }

      if (filters.channels.length > 0 && !filters.channels.includes(row.channel)) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalDue = filteredData.reduce((sum, row) => sum + row.amount_due, 0);
    const totalCollected = filteredData.reduce((sum, row) => sum + row.amount_paid, 0);
    const collectionRate = totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
    const uniqueCustomers = new Set(filteredData.map(row => row.customer_id)).size;
    
    // Enhanced PTP calculation with debugging
    const ptpCount = filteredData.filter(row => {
      const isPtp = row.is_ptp === true;
      return isPtp;
    }).length;
    
    const ptpRate = filteredData.length > 0 ? (ptpCount / filteredData.length) * 100 : 0;
    
    const nonZeroAmounts = filteredData.filter(row => row.amount_due > 0);
    const avgTicket = nonZeroAmounts.length > 0 
      ? nonZeroAmounts.reduce((sum, row) => sum + row.amount_due, 0) / nonZeroAmounts.length 
      : 0;

    console.log('KPI Calculation:', { // Debug log
      totalRecords: filteredData.length,
      ptpCount,
      ptpRate,
      ptpRecords: filteredData.filter(row => row.is_ptp).slice(0, 3)
    });

    return {
      totalDue,
      totalCollected,
      collectionRate,
      uniqueCustomers,
      ptpCount,
      ptpRate,
      avgTicket
    };
  }, [filteredData]);

  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({ dateRange: { start: '', end: '' }, dpdBuckets: [], channels: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Debt Collections Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Monitor and analyze collection performance with real-time insights</p>
        </div>

        {/* Upload Section */}
        <FileUpload onFileUpload={handleFileUpload} dataLength={data.length} />

        {data.length > 0 && (
          <>
            {/* Filters */}
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              uniqueDpdBuckets={uniqueDpdBuckets}
              uniqueChannels={uniqueChannels}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
            />

            {/* KPI Cards */}
            <KPICards kpis={kpis} />

            {/* Charts */}
            <ChartsSection filteredData={filteredData} />

            {/* Table */}
            <DataTable filteredData={filteredData} />
          </>
        )}
      </div>
    </div>
  );
};

export default DebtCollectionsDashboard;