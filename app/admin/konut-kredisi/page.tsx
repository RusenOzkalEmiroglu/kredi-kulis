'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';

interface Bank {
  id: number;
  name: string;
}

interface HousingLoan {
  id: number;
  bank_id: number;
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
}

interface HousingLoanFormData {
  id?: number;
  bank_id?: number;
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

export default function HousingLoansPage() {
  const [loans, setLoans] = useState<HousingLoan[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<HousingLoan | null>(null);
  const [formData, setFormData] = useState<HousingLoanFormData>({
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

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchLoans = async () => {
    const { data, error } = await supabase
      .from('housing_loans')
      .select(`
        *,
        bank:banks(id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching loans:', error);
      return;
    }

    setLoans(data || []);
    setIsLoading(false);
  };

  const fetchBanks = async () => {
    const { data, error } = await supabase
      .from('banks')
      .select('id, name')
      .order('name');

    if (error) {
      console.error('Error fetching banks:', error);
      return;
    }

    setBanks(data || []);
  };

  useEffect(() => {
    fetchLoans();
    fetchBanks();
  }, []);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `%${value.toFixed(2)}`;
  };

  const formatTerm = (term: any): string => {
    if (Array.isArray(term)) {
      return term.join(', ');
    }
    if (typeof term === 'string') {
      try {
        const parsed = JSON.parse(term);
        if (Array.isArray(parsed)) {
          return parsed.join(', ');
        }
      } catch (e) {
        return term;
      }
    }
    return String(term);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'term') {
      setFormData(prev => ({
        ...prev,
        term: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requiredFields = ['bank_id', 'amount', 'term', 'interest_rate', 'monthly_payment', 
        'total_payment', 'allocation_fee', 'kkdf', 'bsmv', 'real_interest_rate', 'annual_cost_rate'];
      
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field} alanı boş bırakılamaz`);
        }
      }

      let termArray: number[];
      if (Array.isArray(formData.term)) {
        termArray = formData.term.map(t => {
          const num = parseInt(String(t));
          if (isNaN(num)) {
            throw new Error('Vade değerleri sadece sayı olmalıdır');
          }
          return num;
        });
      } else {
        termArray = String(formData.term)
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

      const numericFormData = {
        bank_id: typeof formData.bank_id === 'string' ? parseInt(formData.bank_id) : Number(formData.bank_id),
        amount: typeof formData.amount === 'string' ? parseFloat(formData.amount) : Number(formData.amount),
        term: termArray,
        interest_rate: typeof formData.interest_rate === 'string' ? parseFloat(formData.interest_rate) : Number(formData.interest_rate),
        monthly_payment: typeof formData.monthly_payment === 'string' ? parseFloat(formData.monthly_payment) : Number(formData.monthly_payment),
        total_payment: typeof formData.total_payment === 'string' ? parseFloat(formData.total_payment) : Number(formData.total_payment),
        allocation_fee: typeof formData.allocation_fee === 'string' ? parseFloat(formData.allocation_fee) : Number(formData.allocation_fee),
        kkdf: typeof formData.kkdf === 'string' ? parseFloat(formData.kkdf) : Number(formData.kkdf),
        bsmv: typeof formData.bsmv === 'string' ? parseFloat(formData.bsmv) : Number(formData.bsmv),
        real_interest_rate: typeof formData.real_interest_rate === 'string' ? parseFloat(formData.real_interest_rate) : Number(formData.real_interest_rate),
        annual_cost_rate: typeof formData.annual_cost_rate === 'string' ? parseFloat(formData.annual_cost_rate) : Number(formData.annual_cost_rate),
        description: formData.description
      };

      console.log('Form data being sent:', numericFormData);

      for (const [key, value] of Object.entries(numericFormData)) {
        if (key !== 'loan_type' && key !== 'term' && key !== 'description' && (typeof value === 'number' && (isNaN(value) || value === null))) {
          throw new Error(`${key} için geçerli bir sayısal değer giriniz`);
        }
      }

      if (editingLoan) {
        const { data, error } = await supabase
          .from('housing_loans')
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
          .from('housing_loans')
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu krediyi silmek istediğinizden emin misiniz?')) {
      const { error } = await supabase
        .from('housing_loans')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting loan:', error);
        alert('Kredi silinirken bir hata oluştu.');
        return;
      }

      fetchLoans();
    }
  };

  const handleEdit = (loan: HousingLoan) => {
    setEditingLoan(loan);
    setFormData({
      ...loan,
      term: loan.term.toString(),
    });
    setIsModalOpen(true);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Konut Kredileri</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Kredi Ekle
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingLoan ? 'Kredi Düzenle' : 'Yeni Kredi Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banka
                  </label>
                  <select
                    name="bank_id"
                    value={formData.bank_id || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Banka Seçin</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tutar
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vade (Ay)
                  </label>
                  <input
                    type="text"
                    name="term"
                    value={formData.term ? (Array.isArray(formData.term) ? formData.term.join(', ') : formData.term) : ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Örn: 12, 24, 36"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faiz Oranı (%)
                  </label>
                  <input
                    type="number"
                    name="interest_rate"
                    value={formData.interest_rate || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aylık Taksit
                  </label>
                  <input
                    type="number"
                    name="monthly_payment"
                    value={formData.monthly_payment || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Toplam Geri Ödeme
                  </label>
                  <input
                    type="number"
                    name="total_payment"
                    value={formData.total_payment || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tahsis Ücreti
                  </label>
                  <input
                    type="number"
                    name="allocation_fee"
                    value={formData.allocation_fee || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KKDF (%)
                  </label>
                  <input
                    type="number"
                    name="kkdf"
                    value={formData.kkdf || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    BSMV (%)
                  </label>
                  <input
                    type="number"
                    name="bsmv"
                    value={formData.bsmv || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gerçek Faiz Oranı (%)
                  </label>
                  <input
                    type="number"
                    name="real_interest_rate"
                    value={formData.real_interest_rate || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yıllık Maliyet Oranı (%)
                  </label>
                  <input
                    type="number"
                    name="annual_cost_rate"
                    value={formData.annual_cost_rate || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    step="0.01"
                    required
                  />
                </div>

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

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editingLoan ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Banka
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tutar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vade (Ay)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Faiz Oranı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aylık Taksit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Toplam Ödeme
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Açıklama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {banks.find((bank) => bank.id === loan.bank_id)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(loan.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Array.isArray(loan.term) ? loan.term.join(', ') : loan.term}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatPercentage(loan.interest_rate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(loan.monthly_payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(loan.total_payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {loan.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(loan)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(loan.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 