import React from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Client } from '../types/client';
import { exportToExcel, exportToCSV } from '../utils/exportUtils';

interface ExportButtonsProps {
  clients: Client[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ clients }) => {
  const handleExportExcel = () => {
    if (clients.length === 0) {
      alert('Não há dados para exportar');
      return;
    }
    exportToExcel(clients, 'clientes_splash_assessoria');
  };

  const handleExportCSV = () => {
    if (clients.length === 0) {
      alert('Não há dados para exportar');
      return;
    }
    exportToCSV(clients, 'clientes_splash_assessoria');
  };

  if (clients.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleExportExcel}
          disabled
          className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed flex items-center gap-2 text-sm opacity-50"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Exportar Excel
        </button>
        
        <button
          onClick={handleExportCSV}
          disabled
          className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed flex items-center gap-2 text-sm opacity-50"
        >
          <FileText className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleExportExcel}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm"
      >
        <FileSpreadsheet className="w-4 h-4" />
        Exportar Excel
      </button>
      
      <button
        onClick={handleExportCSV}
        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm"
      >
        <FileText className="w-4 h-4" />
        Exportar CSV
      </button>
    </div>
  );
};

export default ExportButtons;