'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Bank {
  id: number;
  name: string;
}

interface ConsumerLoan {
  id: number;
  bank_id: number;
  loan_type: string;
  amount: number;
  term: number[];
  interest_rate: number;
  monthly_payment: number;
  total_payment: number;
  allocation_fee: number;
  kkdf: number;
  bsmv: number;
  real_interest_rate: number;
  annual_cost_rate: number;
  description?: string;
  created_at?: string;
  bank?: Bank;
}

interface ConsumerLoanFormData {
  id?: number;
  bank_id?: number;
  loan_type?: string;
  amount?: number;
  term?: string; // Form'da string olarak tutulur
  interest_rate?: number;
  monthly_payment?: number;
  total_payment?: number;
  allocation_fee?: number;
  kkdf?: number;
  bsmv?: number;
  real_interest_rate?: number;
  annual_cost_rate?: number;
  description?: string;
}

export default function AdminConsumerLoans() {
  const [loans, setLoans] = useState<ConsumerLoan[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<ConsumerLoan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ConsumerLoanFormData>({
    bank_id: 0,
    amount: 0,
    term: '',
    interest_rate: 0,
    monthly_payment: 0,
    total_payment: 0,
    allocation_fee: 0,
    kkdf: 0,
    bsmv: 0,
    real_interest_rate: 0,
    annual_cost_rate: 0,
    description: ''
  });

  // Fetch loans and banks from Supabase
  useEffect(() => {
    fetchLoans();
    fetchBanks();
  }, []);

  const fetchLoans = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('consumer_loans')
        .select(`
          *,
          bank:banks(id, name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLoans(data || []);
    } catch (error) {
      console.error('Error fetching loans:', error);
      alert('Krediler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const { data, error } = await supabase
        .from('banks')
        .select('id, name')
        .order('name');

      if (error) {
        throw error;
      }

      setBanks(data || []);
    } catch (error) {
      console.error('Error fetching banks:', error);
      alert('Bankalar yüklenirken bir hata oluştu.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle currency inputs (remove currency symbol and convert to number)
    if (['amount', 'monthly_payment', 'total_payment', 'allocation_fee'].includes(name)) {
      const numericValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    // Handle percentage inputs (remove % symbol)
    if (['interest_rate', 'kkdf', 'bsmv', 'real_interest_rate', 'annual_cost_rate'].includes(name)) {
      const numericValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields
      const requiredFields = ['bank_id', 'amount', 'term', 'interest_rate', 'monthly_payment', 
        'total_payment', 'allocation_fee', 'kkdf', 'bsmv', 'real_interest_rate', 'annual_cost_rate'];
      
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field} alanı boş bırakılamaz`);
        }
      }

      // Parse term string into array of integers
      let termArray: number[];
      if (Array.isArray(formData.term)) {
        termArray = formData.term;
      } else {
        termArray = (formData.term || '')
          .split(',')
          .map(t => t.trim())
          .filter(t => t !== '')
          .map(t => {
            const num = parseInt(t);
            if (isNaN(num)) {
              throw new Error('Vade değerleri sadece sayı olmalıdır');
            }
            return num;
          });
      }

      if (termArray.length === 0) {
        throw new Error('En az bir vade değeri girilmelidir');
      }

      // Clean and convert form data
      const numericFormData = {
        bank_id: parseInt(String(formData.bank_id)),
        amount: parseFloat(String(formData.amount)),
        term: termArray,
        interest_rate: parseFloat(String(formData.interest_rate)),
        monthly_payment: parseFloat(String(formData.monthly_payment)),
        total_payment: parseFloat(String(formData.total_payment)),
        allocation_fee: parseFloat(String(formData.allocation_fee)),
        kkdf: parseFloat(String(formData.kkdf)),
        bsmv: parseFloat(String(formData.bsmv)),
        real_interest_rate: parseFloat(String(formData.real_interest_rate)),
        annual_cost_rate: parseFloat(String(formData.annual_cost_rate)),
        description: formData.description
      };

      console.log('Form data being sent:', numericFormData); // Debug log

      // Validate numeric conversions
      for (const [key, value] of Object.entries(numericFormData)) {
        if (key !== 'loan_type' && key !== 'term' && key !== 'description' && typeof value === 'number' && (isNaN(value) || value === null)) {
          throw new Error(`${key} için geçerli bir sayısal değer giriniz`);
        }
      }

      if (editingLoan) {
        const { data, error } = await supabase
          .from('consumer_loans')
          .update(numericFormData)
          .eq('id', editingLoan.id)
          .select();

        if (error) {
          console.error('Supabase update error:', error);
          throw new Error(error.message);
        }

        console.log('Updated loan:', data);
      } else {
        const { data, error } = await supabase
          .from('consumer_loans')
          .insert([numericFormData])
          .select();

        if (error) {
          console.error('Supabase insert error:', error);
          throw new Error(error.message);
        }

        console.log('Inserted loan:', data);
      }

      fetchLoans();
      handleCloseModal();
    } catch (error) {
      console.error('Error details:', error);
      alert(error instanceof Error ? error.message : 'Kredi kaydedilirken bir hata oluştu.');
    }
  };

  const handleEdit = (loan: ConsumerLoan) => {
    setEditingLoan(loan);
    setFormData({
      id: loan.id,
      bank_id: loan.bank_id,
      loan_type: loan.loan_type,
      amount: loan.amount,
      term: Array.isArray(loan.term) ? loan.term.join(', ') : String(loan.term),
      interest_rate: loan.interest_rate,
      monthly_payment: loan.monthly_payment,
      total_payment: loan.total_payment,
      allocation_fee: loan.allocation_fee,
      kkdf: loan.kkdf,
      bsmv: loan.bsmv,
      real_interest_rate: loan.real_interest_rate,
      annual_cost_rate: loan.annual_cost_rate,
      description: loan.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu krediyi silmek istediğinizden emin misiniz?')) {
      try {
        const { error } = await supabase
          .from('consumer_loans')
          .delete()
          .eq('id', id);

        if (error) throw error;

        fetchLoans();
      } catch (error) {
        console.error('Error deleting loan:', error);
        alert('Kredi silinirken bir hata oluştu.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLoan(null);
    setFormData({
      bank_id: 0,
      amount: 0,
      term: '',
      interest_rate: 0,
      monthly_payment: 0,
      total_payment: 0,
      allocation_fee: 0,
      kkdf: 0,
      bsmv: 0,
      real_interest_rate: 0,
      annual_cost_rate: 0,
      description: ''
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  };

  const formatPercentage = (value: number) => {
    return `%${value.toFixed(2)}`;
  };

  const formatTerm = (term: any): string => {
    if (Array.isArray(term)) {
      return term.join(', ');
    }
    if (typeof term === 'string') {
      try {
        // Try to parse if it's a JSON string
        const parsed = JSON.parse(term);
        if (Array.isArray(parsed)) {
          return parsed.join(', ');
        }
      } catch (e) {
        // If it's already a comma-separated string, return as is
        return term;
      }
    }
    return String(term);
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Yeni Kredi Ekle
          </button>
        </div>

        {/* Loans List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faiz Oranı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aylık Taksit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.bank?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(loan.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTerm(loan.term)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercentage(loan.interest_rate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(loan.monthly_payment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(loan)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(loan.id)}
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
              {editingLoan ? 'Kredi Düzenle' : 'Yeni Kredi Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banka</label>
                  <select
                    name="bank_id"
                    value={formData.bank_id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Banka Seçin</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kredi Tutarı (₺)</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00 ₺"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vade (Ay olarak, virgülle ayırın)</label>
                  <input
                    type="text"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    placeholder="12, 24, 36"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Faiz Oranı (%)</label>
                  <input
                    type="text"
                    name="interest_rate"
                    value={formData.interest_rate}
                    onChange={handleInputChange}
                    placeholder="0.00%"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aylık Taksit (₺)</label>
                  <input
                    type="text"
                    name="monthly_payment"
                    value={formData.monthly_payment}
                    onChange={handleInputChange}
                    placeholder="0.00 ₺"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Toplam Ödeme (₺)</label>
                  <input
                    type="text"
                    name="total_payment"
                    value={formData.total_payment}
                    onChange={handleInputChange}
                    placeholder="0.00 ₺"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tahsis Ücreti (₺)</label>
                  <input
                    type="text"
                    name="allocation_fee"
                    value={formData.allocation_fee}
                    onChange={handleInputChange}
                    placeholder="0.00 ₺"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">KKDF (%)</label>
                  <input
                    type="text"
                    name="kkdf"
                    value={formData.kkdf}
                    onChange={handleInputChange}
                    placeholder="0.00%"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">BSMV (%)</label>
                  <input
                    type="text"
                    name="bsmv"
                    value={formData.bsmv}
                    onChange={handleInputChange}
                    placeholder="0.00%"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gerçek Faiz Oranı (%)</label>
                  <input
                    type="text"
                    name="real_interest_rate"
                    value={formData.real_interest_rate}
                    onChange={handleInputChange}
                    placeholder="0.00%"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Yıllık Maliyet Oranı (%)</label>
                  <input
                    type="text"
                    name="annual_cost_rate"
                    value={formData.annual_cost_rate}
                    onChange={handleInputChange}
                    placeholder="0.00%"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      placeholder="Kredi hakkında açıklama giriniz..."
                    />
                  </div>
                </div>
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
                  {editingLoan ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 