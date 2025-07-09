import React, { useState } from 'react';
import { Cloud, CloudOff, RefreshCw, Settings } from 'lucide-react';
import { Client } from '../types/client';

interface GoogleSheetsSyncProps {
  clients: Client[];
  onSyncComplete?: () => void;
}

const GoogleSheetsSync: React.FC<GoogleSheetsSyncProps> = ({ clients, onSyncComplete }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [sheetId, setSheetId] = useState('');

  const handleConnect = async () => {
    if (!apiKey || !sheetId) {
      alert('Por favor, configure a API Key e o ID da planilha primeiro.');
      setShowConfig(true);
      return;
    }

    try {
      setIsSyncing(true);
      
      // Test connection to Google Sheets
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`
      );
      
      if (response.ok) {
        setIsConnected(true);
        setSheetUrl(`https://docs.google.com/spreadsheets/d/${sheetId}`);
        alert('Conectado com sucesso ao Google Sheets!');
      } else {
        throw new Error('Falha na conexão');
      }
    } catch (error) {
      alert('Erro ao conectar com Google Sheets. Verifique suas credenciais.');
      console.error('Connection error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSync = async () => {
    if (!isConnected || !apiKey || !sheetId) {
      alert('Conecte-se ao Google Sheets primeiro.');
      return;
    }

    if (clients.length === 0) {
      alert('Não há dados para sincronizar.');
      return;
    }

    try {
      setIsSyncing(true);

      // Prepare data for Google Sheets
      const headers = [
        'Nome',
        'Sobrenome', 
        'Nome do Responsável',
        'Telefone',
        'WhatsApp',
        'Instagram',
        'TikTok',
        'Observações',
        'Data de Cadastro'
      ];

      const rows = clients.map(client => [
        client.firstName,
        client.lastName,
        client.parentName,
        client.phoneNumber,
        client.whatsappNumber,
        client.instagram || '',
        client.tiktok || '',
        client.notes || '',
        new Date(client.createdAt).toLocaleDateString('pt-BR')
      ]);

      const values = [headers, ...rows];

      // Clear existing data and add new data
      const clearResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:Z:clear?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!clearResponse.ok) {
        throw new Error('Erro ao limpar dados existentes');
      }

      // Add new data
      const updateResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:append?valueInputOption=RAW&key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: values
          })
        }
      );

      if (updateResponse.ok) {
        alert(`${clients.length} clientes sincronizados com sucesso!`);
        onSyncComplete?.();
      } else {
        throw new Error('Erro ao enviar dados');
      }

    } catch (error) {
      alert('Erro durante a sincronização. Tente novamente.');
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSheetUrl('');
    setApiKey('');
    setSheetId('');
    alert('Desconectado do Google Sheets.');
  };

  if (showConfig) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurar Google Sheets
          </h3>
          <button
            onClick={() => setShowConfig(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Google Sheets API Key *
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="Sua API Key do Google Cloud Console"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              ID da Planilha Google Sheets *
            </label>
            <input
              type="text"
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="ID da planilha (encontrado na URL)"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Como configurar:</h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Acesse o <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
              <li>2. Crie um projeto ou selecione um existente</li>
              <li>3. Ative a Google Sheets API</li>
              <li>4. Crie uma API Key em "Credenciais"</li>
              <li>5. Crie uma planilha no Google Sheets</li>
              <li>6. Copie o ID da planilha da URL (entre /d/ e /edit)</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleConnect}
              disabled={!apiKey || !sheetId || isSyncing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  Conectar
                </>
              )}
            </button>
            <button
              onClick={() => setShowConfig(false)}
              className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
          {isConnected ? (
            <>
              <Cloud className="w-5 h-5 text-green-600" />
              Google Sheets Conectado
            </>
          ) : (
            <>
              <CloudOff className="w-5 h-5 text-gray-500" />
              Google Sheets
            </>
          )}
        </h3>
        
        {isConnected && sheetUrl && (
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Ver Planilha
          </a>
        )}
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Planilha conectada e pronta para sincronização.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleSync}
              disabled={isSyncing || clients.length === 0}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Sincronizar ({clients.length} clientes)
                </>
              )}
            </button>
            
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 border-2 border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-all duration-200"
            >
              Desconectar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Conecte-se ao Google Sheets para sincronizar automaticamente os dados dos clientes.
          </p>
          
          <button
            onClick={() => setShowConfig(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configurar Conexão
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleSheetsSync;