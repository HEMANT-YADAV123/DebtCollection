import React from 'react';
import { DollarSign, Users, TrendingUp, Calendar, FileText, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const KPICards = ({ kpis }) => {
  const kpiData = [
    { label: 'Total Due', value: formatCurrency(kpis.totalDue), icon: DollarSign, color: 'red', bgColor: 'bg-red-50', iconColor: 'text-red-500' },
    { label: 'Total Collected', value: formatCurrency(kpis.totalCollected), icon: DollarSign, color: 'green', bgColor: 'bg-green-50', iconColor: 'text-green-500' },
    { label: 'Collection Rate', value: `${kpis.collectionRate.toFixed(2)}%`, icon: TrendingUp, color: 'blue', bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
    { label: 'Unique Customers', value: kpis.uniqueCustomers.toLocaleString(), icon: Users, color: 'purple', bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
    { label: 'PTP Count', value: kpis.ptpCount.toLocaleString(), icon: MessageCircle, color: 'orange', bgColor: 'bg-orange-50', iconColor: 'text-orange-500' },
    { label: 'PTP Rate', value: `${kpis.ptpRate.toFixed(2)}%`, icon: Calendar, color: 'teal', bgColor: 'bg-teal-50', iconColor: 'text-teal-500' },
    { label: 'Avg Ticket', value: formatCurrency(kpis.avgTicket), icon: FileText, color: 'indigo', bgColor: 'bg-indigo-50', iconColor: 'text-indigo-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <div key={index} className={`${kpi.bgColor} rounded-xl shadow-md p-5 border border-${kpi.color}-100 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{kpi.label}</span>
            <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;