export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  parentName: string;
  instagram: string;
  tiktok: string;
  phoneNumber: string;
  whatsappNumber: string;
  notes: string;
  createdAt: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  parentName: string;
  instagram: string;
  tiktok: string;
  phoneNumber: string;
  whatsappNumber: string;
  notes: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  parentName?: string;
  instagram?: string;
  tiktok?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  notes?: string;
}