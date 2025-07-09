import React from 'react';
import { User, Instagram, MessageCircle, Phone, Edit, Trash2, Calendar } from 'lucide-react';
import { Client } from '../types/client';

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Nenhum cliente ainda</h3>
        <p className="text-purple-600">Comece adicionando seu primeiro cliente</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">
                    {client.firstName} {client.lastName}
                  </h3>
                  <p className="text-purple-600 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Adicionado em {formatDate(client.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-purple-600 mb-1">Nome do Responsável</p>
                  <p className="font-medium text-purple-800">{client.parentName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-purple-600 mb-1">Número de Telefone</p>
                  <p className="font-medium text-purple-800 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    {client.phoneNumber}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-purple-600 mb-1">WhatsApp</p>
                  <p className="font-medium text-purple-800 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    {client.whatsappNumber}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-purple-600 mb-1">Redes Sociais</p>
                  <div className="flex gap-3">
                    {client.instagram && (
                      <span className="flex items-center gap-1 text-pink-600">
                        <Instagram className="w-4 h-4" />
                        {client.instagram}
                      </span>
                    )}
                    {client.tiktok && (
                      <span className="flex items-center gap-1 text-purple-600">
                        <MessageCircle className="w-4 h-4" />
                        {client.tiktok}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {client.notes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">Observações</p>
                  <p className="text-purple-800">{client.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(client)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Editar cliente"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(client.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Excluir cliente"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;