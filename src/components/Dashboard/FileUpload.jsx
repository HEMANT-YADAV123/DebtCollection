import React from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onFileUpload, dataLength }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-700">Click to upload CSV file</span>
          <span className="text-xs text-gray-500 mt-1">
            {dataLength > 0 ? `${dataLength} rows loaded successfully` : 'Supports CSV format'}
          </span>
        </div>
        <input type="file" accept=".csv" onChange={onFileUpload} className="hidden" />
      </label>
    </div>
  );
};

export default FileUpload;