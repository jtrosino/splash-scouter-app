import React, { useState } from 'react';
import { User, Users, Instagram, MessageCircle, Phone, MessageSquare, StickyNote, Save, X } from 'lucide-react';
import { FormData, FormErrors, Client } from '../types/client';

interface ClientFormProps {
  onSave: (client: Client) => void;
  onCancel?: () => void;
  initialData?: Client;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    parentName: initialData?.parentName || '',
    instagram: initialData?.instagram || '',
    tiktok: initialData?.tiktok || '',
    phoneNumber: initialData?.phoneNumber || '',
    whatsappNumber: initialData?.whatsappNumber || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nome é obrigatório';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Nome do responsável é obrigatório';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Número de telefone é obrigatório';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Por favor, insira um número de telefone válido';
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Número do WhatsApp é obrigatório';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Por favor, insira um número de WhatsApp válido';
    }

    if (formData.instagram && !formData.instagram.includes('@')) {
      newErrors.instagram = 'O usuário do Instagram deve incluir @';
    }

    if (formData.tiktok && !formData.tiktok.includes('@')) {
      newErrors.tiktok = 'O usuário do TikTok deve incluir @';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const client: Client = {
      id: initialData?.id || Date.now().toString(),
      ...formData,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSave(client);
    setIsSubmitting(false);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 py-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-500 mb-2">
          {initialData ? 'EDITAR CLIENTE' : 'FICHA CADASTRAL'}
        </h2>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-700 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Creator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Nome *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.firstName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="Digite o nome"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Sobrenome *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.lastName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="Digite o sobrenome"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Nome do Responsável *
          </label>
          <input
            type="text"
            value={formData.parentName}
            onChange={(e) => handleChange('parentName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              errors.parentName
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-200`}
            placeholder="Digite o nome do responsável"
          />
          {errors.parentName && (
            <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>
          )}
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-700 flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-600" />
          Redes Sociais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Usuário do Instagram</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.instagram
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="@usuario"
            />
            {errors.instagram && (
              <p className="mt-1 text-sm text-red-600">{errors.instagram}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Usuário do TikTok</label>
            <input
              type="text"
              value={formData.tiktok}
              onChange={(e) => handleChange('tiktok', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.tiktok
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="@usuario"
            />
            {errors.tiktok && (
              <p className="mt-1 text-sm text-red-600">{errors.tiktok}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-700 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" />
          Informações de Contato
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Número de Telefone *</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.phoneNumber
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="(11) 99999-9999"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Número do WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                errors.whatsappNumber
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
              placeholder="(11) 99999-9999"
            />
            {errors.whatsappNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-700 flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-yellow-600" />
          Observações
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-2">Observações Adicionais</label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              errors.notes
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none`}
            placeholder="Qualquer informação adicional sobre o cliente..."
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? 'Salvando...' : 'CONCLUIR CADASTRO'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancelar
          </button>
        )}
      </div>
      </form>
    </div>
  );
};

export default ClientForm;