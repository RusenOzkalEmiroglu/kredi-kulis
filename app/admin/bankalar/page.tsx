'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Bank {
  id: number;
  name: string;
  website: string;
  address: string;
  phone: string;
  logo: string;
  created_at?: string;
}

export default function AdminBankalar() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    phone: '',
    logo: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('banks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBanks(data || []);
    } catch (error) {
      console.error('Error fetching banks:', error);
      alert('Bankalar yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Dosya boyutu kontrolü (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo dosyası 2MB\'dan küçük olmalıdır.');
        return;
      }

      // Dosya tipi kontrolü
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Sadece JPEG, PNG ve GIF formatları desteklenmektedir.');
        return;
      }

      try {
        setIsLoading(true);
        
        // Benzersiz dosya adı oluştur
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Önce varsa eski logoyu sil
        if (editingBank?.logo) {
          try {
            const oldUrl = new URL(editingBank.logo);
            const oldPath = oldUrl.pathname.split('/').pop();
            if (oldPath) {
              const { error: deleteError } = await supabase.storage
                .from('bank-logos')
                .remove([oldPath]);
              
              if (deleteError) {
                console.error('Error deleting old logo:', deleteError);
              }
            }
          } catch (error) {
            console.error('Error parsing old logo URL:', error);
          }
        }

        // Yeni logoyu yükle
        const { data, error: uploadError } = await supabase.storage
          .from('bank-logos')
          .upload(fileName, file, {
            cacheControl: '3600',
            contentType: file.type,
            upsert: false
          });

        if (uploadError) {
          throw uploadError;
        }

        if (!data?.path) {
          throw new Error('Upload successful but path is missing');
        }

        // Public URL al
        const { data: { publicUrl } } = supabase.storage
          .from('bank-logos')
          .getPublicUrl(data.path);

        if (!publicUrl) {
          throw new Error('Failed to get public URL');
        }

        setFormData(prev => ({ ...prev, logo: publicUrl }));
      } catch (error: any) {
        console.error('Error uploading logo:', error);
        alert(`Logo yüklenirken bir hata oluştu: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBank) {
        // Update existing bank
        const { error } = await supabase
          .from('banks')
          .update(formData)
          .eq('id', editingBank.id);

        if (error) throw error;
      } else {
        // Add new bank
        const { error } = await supabase
          .from('banks')
          .insert([formData]);

        if (error) throw error;
      }

      // Refresh banks list
      fetchBanks();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving bank:', error);
      alert('Banka kaydedilirken bir hata oluştu.');
    }
  };

  const handleEdit = (bank: Bank) => {
    setEditingBank(bank);
    setFormData(bank);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu bankayı silmek istediğinizden emin misiniz?')) {
      try {
        const { error } = await supabase
          .from('banks')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Refresh banks list
        fetchBanks();
      } catch (error) {
        console.error('Error deleting bank:', error);
        alert('Banka silinirken bir hata oluştu.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBank(null);
    setFormData({
      name: '',
      website: '',
      address: '',
      phone: '',
      logo: ''
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-semibold text-gray-900">Banka Yönetimi</h1>
          <button
            onClick={() => {
              setFormData({
                name: '',
                website: '',
                address: '',
                phone: '',
                logo: ''
              });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Yeni Banka Ekle
          </button>
        </div>

        {/* Banks List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banks.map((bank) => (
                  <tr key={bank.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={bank.logo} alt={bank.name} className="h-10 w-10 object-contain"/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bank.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.website}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(bank)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(bank.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {editingBank ? 'Banka Düzenle' : 'Yeni Banka Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Banka İsmi</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Web Sayfası</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Banka Adresi</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Çağrı Merkezi Numarası</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.logo && (
                  <img src={formData.logo} alt="Preview" className="mt-2 h-20 object-contain"/>
                )}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingBank ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 