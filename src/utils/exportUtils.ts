import * as XLSX from 'xlsx';
import { Client } from '../types/client';

export const exportToExcel = (clients: Client[], filename: string = 'clientes') => {
  // Prepare data for export
  const exportData = clients.map(client => ({
    'Nome': client.firstName,
    'Sobrenome': client.lastName,
    'Nome do Responsável': client.parentName,
    'Telefone': client.phoneNumber,
    'WhatsApp': client.whatsappNumber,
    'Instagram': client.instagram || '',
    'TikTok': client.tiktok || '',
    'Observações': client.notes || '',
    'Data de Cadastro': new Date(client.createdAt).toLocaleDateString('pt-BR')
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // Nome
    { wch: 15 }, // Sobrenome
    { wch: 20 }, // Nome do Responsável
    { wch: 15 }, // Telefone
    { wch: 15 }, // WhatsApp
    { wch: 15 }, // Instagram
    { wch: 15 }, // TikTok
    { wch: 30 }, // Observações
    { wch: 15 }  // Data de Cadastro
  ];
  ws['!cols'] = colWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Clientes');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const finalFilename = `${filename}_${timestamp}.xlsx`;

  // Save file
  XLSX.writeFile(wb, finalFilename);
};

export const exportToCSV = (clients: Client[], filename: string = 'clientes') => {
  // Prepare data for export
  const exportData = clients.map(client => ({
    'Nome': client.firstName,
    'Sobrenome': client.lastName,
    'Nome do Responsável': client.parentName,
    'Telefone': client.phoneNumber,
    'WhatsApp': client.whatsappNumber,
    'Instagram': client.instagram || '',
    'TikTok': client.tiktok || '',
    'Observações': client.notes || '',
    'Data de Cadastro': new Date(client.createdAt).toLocaleDateString('pt-BR')
  }));

  // Convert to CSV
  const headers = Object.keys(exportData[0] || {});
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => 
      headers.map(header => {
        const value = row[header as keyof typeof row] || '';
        // Escape quotes and wrap in quotes if contains comma or quote
        return value.includes(',') || value.includes('"') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const timestamp = new Date().toISOString().split('T')[0];
  const finalFilename = `${filename}_${timestamp}.csv`;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', finalFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};