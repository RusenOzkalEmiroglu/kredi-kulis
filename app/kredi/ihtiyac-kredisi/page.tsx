"use client";

import { ShoppingBag, CheckCircle, DollarSign, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function IhtiyacKredisi() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('12');
  const [bankAmounts, setBankAmounts] = useState({
    akbank: '50000',
    isbank: '55000',
    ing: '125000',
    enpara: '50000'
  });
  const [bankTerms, setBankTerms] = useState({
    akbank: '36',
    isbank: '12',
    ing: '36',
    enpara: '6'
  });

  const termOptions = [12, 18, 24, 36, 48];

  const handleCalculate = () => {
    const searchParams = new URLSearchParams();
    searchParams.append('amount', amount);
    searchParams.append('term', term);
    window.location.href = `/kredi/ihtiyac-kredisi/sorgulama?${searchParams.toString()}`;
  };

  const handleBankAmountChange = (bank: string, value: string) => {
    setBankAmounts(prev => ({ ...prev, [bank]: value }));
  };

  const handleBankTermChange = (bank: string, value: string) => {
    setBankTerms(prev => ({ ...prev, [bank]: value }));
  };

  const formatCurrency = (value: string, withSymbol: boolean = true) => {
    const formatter = new Intl.NumberFormat('tr-TR', {
      style: withSymbol ? 'currency' : 'decimal',
      currency: 'TRY',
      minimumFractionDigits: withSymbol ? 0 : 2,
      maximumFractionDigits: withSymbol ? 0 : 2
    });
    const formatted = formatter.format(Number(value));
    return withSymbol ? formatted : formatted + ' ₺';
  };

  const formatAmount = (value: string) => {
    return new Intl.NumberFormat('tr-TR').format(Number(value));
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hesaplama Aracı */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">İhtiyaç Kredisi Hesaplama</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı (₺)</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="25.000" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vade (Ay)</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            >
              {termOptions.map((months) => (
                <option key={months} value={months}>
                  {months} Ay
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleCalculate}
            className="bg-purple-600 text-white px-8 py-2 rounded-md hover:bg-purple-700 transition-colors h-[42px]"
          >
            Hesapla
          </button>
        </div>

        {/* Banka Teklifleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {/* Akbank */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-red-600 hover:scale-[1.02] cursor-pointer">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-red-600">AKBANK</h3>
              <a href="#" className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Detay</a>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı</label>
                <input 
                  type="text" 
                  value={formatAmount(bankAmounts.akbank)}
                  onChange={(e) => handleBankAmountChange('akbank', e.target.value)}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                />
                <span className="absolute right-3 top-[38px] text-gray-500">₺</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vade</label>
                <select
                  value={bankTerms.akbank}
                  onChange={(e) => handleBankTermChange('akbank', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                >
                  {termOptions.map((months) => (
                    <option key={months} value={months}>{months} Ay</option>
                  ))}
                </select>
              </div>
              <div className="bg-gray-50 py-0 px-2 rounded-lg space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Faiz</span>
                  <span className="font-medium text-[10px]">%4,28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Taksit</span>
                  <span className="font-medium text-[10px]">{formatCurrency('3243.84', false)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Toplam</span>
                  <span className="font-medium text-[10px]">{formatCurrency('117065.74', false)}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Hızlı Başvur
              </button>
            </div>
          </div>

          {/* İş Bankası */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-800 hover:scale-[1.02] cursor-pointer">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-blue-800">İş Bankası</h3>
              <a href="#" className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Detay</a>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı</label>
                <input 
                  type="text" 
                  value={formatAmount(bankAmounts.isbank)}
                  onChange={(e) => handleBankAmountChange('isbank', e.target.value)}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all" 
                />
                <span className="absolute right-3 top-[38px] text-gray-500">₺</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vade</label>
                <select
                  value={bankTerms.isbank}
                  onChange={(e) => handleBankTermChange('isbank', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                >
                  {termOptions.map((months) => (
                    <option key={months} value={months}>{months} Ay</option>
                  ))}
                </select>
              </div>
              <div className="bg-gray-50 py-0 px-2 rounded-lg space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Faiz</span>
                  <span className="font-medium text-[10px]">%3,99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Taksit</span>
                  <span className="font-medium text-[10px]">{formatCurrency('5833.33', false)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Toplam</span>
                  <span className="font-medium text-[10px]">{formatCurrency('70000', false)}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Hızlı Başvur
              </button>
            </div>
          </div>

          {/* ING */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500 hover:scale-[1.02] cursor-pointer">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-orange-500">ING</h3>
              <a href="#" className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Detay</a>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı</label>
                <input 
                  type="text" 
                  value={formatAmount(bankAmounts.ing)}
                  onChange={(e) => handleBankAmountChange('ing', e.target.value)}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" 
                />
                <span className="absolute right-3 top-[38px] text-gray-500">₺</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vade</label>
                <select
                  value={bankTerms.ing}
                  onChange={(e) => handleBankTermChange('ing', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  {termOptions.map((months) => (
                    <option key={months} value={months}>{months} Ay</option>
                  ))}
                </select>
              </div>
              <div className="bg-gray-50 py-0 px-2 rounded-lg space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Faiz</span>
                  <span className="font-medium text-[10px]">%3,69</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Taksit</span>
                  <span className="font-medium text-[10px]">{formatCurrency('7358.40', false)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Toplam</span>
                  <span className="font-medium text-[10px]">{formatCurrency('265527.40', false)}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Hızlı Başvur
              </button>
            </div>
          </div>

          {/* Enpara */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-600 hover:scale-[1.02] cursor-pointer">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-purple-600">Enpara.com</h3>
              <a href="#" className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Detay</a>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı</label>
                <input 
                  type="text" 
                  value={formatAmount(bankAmounts.enpara)}
                  onChange={(e) => handleBankAmountChange('enpara', e.target.value)}
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                />
                <span className="absolute right-3 top-[38px] text-gray-500">₺</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vade</label>
                <select
                  value={bankTerms.enpara}
                  onChange={(e) => handleBankTermChange('enpara', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {termOptions.map((months) => (
                    <option key={months} value={months}>{months} Ay</option>
                  ))}
                </select>
              </div>
              <div className="bg-gray-50 py-0 px-2 rounded-lg space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Faiz</span>
                  <span className="font-medium text-[10px]">%0,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Taksit</span>
                  <span className="font-medium text-[10px]">{formatCurrency('8333.33', false)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[10px]">Toplam</span>
                  <span className="font-medium text-[10px]">{formatCurrency('50000', false)}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Hızlı Başvur
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Ana Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10">
        <img 
          src="https://picsum.photos/id/1077/1200/400" 
          alt="İhtiyaç Kredisi" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
          <div className="px-8 py-6 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-2">Hayallerinizi Ertelemeyin</h2>
            <p className="mb-4">İhtiyaç kredisi ile anında nakit, hızlı onay ve uygun ödeme planları.</p>

          </div>
        </div>
      </div>
      
      {/* Kredi Özellikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Esnek Kullanım</h3>
          <p className="text-gray-600">Dilediğiniz amaç için kullanabileceğiniz nakit finansman.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Anında Onay</h3>
          <p className="text-gray-600">Aynı gün içinde kredi değerlendirmesi ve hızlı onay süreci.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <DollarSign className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Uygun Faiz</h3>
          <p className="text-gray-600">Rekabetçi faiz oranları ve kişiye özel kampanyalar.</p>
        </div>
      </div>
      
      {/* Kredi Detayları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">İhtiyaç Kredisi Detayları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Kredi Özellikleri</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>5.000 TL'den 100.000 TL'ye kadar kredi imkanı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>3 aydan 36 aya kadar vade seçenekleri</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Cazip faiz oranları</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Esnek ödeme planları</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Erken ödeme avantajı</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Gerekli Belgeler</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Kimlik belgesi</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Gelir belgesi (maaş bordrosu, vergi levhası vb.)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>İkametgah belgesi (opsiyonel)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Nerelerde Kullanılabilir */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">İhtiyaç Kredisi Ne İçin Kullanılabilir?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-medium">Ev Yenileme</h3>
            </div>
            <p className="text-sm text-gray-600">Evinizi yenilemek, tadilat yapmak veya mobilya almak için</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-medium">Tatil</h3>
            </div>
            <p className="text-sm text-gray-600">Hayalinizdeki tatil için finansman desteği</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-medium">Düğün</h3>
            </div>
            <p className="text-sm text-gray-600">Düğün organizasyonu ve evlilik hazırlıkları</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-medium">Eğitim</h3>
            </div>
            <p className="text-sm text-gray-600">Kendinizin veya çocuklarınızın eğitim masrafları</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium">Sağlık</h3>
            </div>
            <p className="text-sm text-gray-600">Beklenmedik sağlık giderleri ve tedavi masrafları</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium">Borç Kapatma</h3>
            </div>
            <p className="text-sm text-gray-600">Yüksek faizli mevcut borçlarınızı kapatma ve tek ödemeye dönüştürme</p>
          </div>
        </div>
      </div>
      
      {/* Başvuru Adımları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">Başvuru Süreci</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                1
              </div>
              <h3 className="font-medium">Başvuru</h3>
            </div>
            <p className="text-sm text-gray-600">Online, mobil veya şubelerimizden ihtiyaç kredisi başvurunuzu yapın.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                2
              </div>
              <h3 className="font-medium">Değerlendirme</h3>
            </div>
            <p className="text-sm text-gray-600">Başvurunuz kredibilite değerlendirmesine alınır.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                3
              </div>
              <h3 className="font-medium">Onay</h3>
            </div>
            <p className="text-sm text-gray-600">Başvurunuz onaylandığında SMS ile bilgilendirilirsiniz.</p>
          </div>
          
          <div className="flex-1 md:pl-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                4
              </div>
              <h3 className="font-medium">Kullanım</h3>
            </div>
            <p className="text-sm text-gray-600">Sözleşme imzalanır ve kredi tutarı hesabınıza aktarılır.</p>
          </div>
        </div>

      </div>
      
      {/* Kampanyalar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Güncel Kampanyalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">İlk Kredi Avantajı</h3>
            <p className="text-sm text-gray-600 mb-2">İlk kez kredi kullanacak müşterilerimize özel %0.25 faiz indirimi ve masraf muafiyeti.</p>
            <p className="text-xs text-gray-500">Son Tarih: 31 Aralık 2023</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">Öğretmenlere Özel Kampanya</h3>
            <p className="text-sm text-gray-600 mb-2">Öğretmenlerimize özel %1.69 faiz oranı ve 36 aya varan vade seçeneği.</p>
            <p className="text-xs text-gray-500">Son Tarih: 24 Kasım 2023</p>
          </div>
        </div>
      </div>
      
      {/* Sık Sorulan Sorular */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">İhtiyaç kredisi başvurusu hangi kanallardan yapılabilir?</summary>
            <p className="mt-2 text-gray-600">İhtiyaç kredisi başvurunuzu internet bankacılığı, mobil bankacılık, telefon bankacılığı veya şubelerimizden yapabilirsiniz.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredi onayı ne kadar sürede verilir?</summary>
            <p className="mt-2 text-gray-600">İhtiyaç kredisi başvuruları genellikle aynı gün içerisinde değerlendirilir ve sonuçlandırılır.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredimi erken kapatabilir miyim?</summary>
            <p className="mt-2 text-gray-600">Evet, ihtiyaç kredinizi istediğiniz zaman erken kapatabilirsiniz. Erken kapama durumunda kalan anapara üzerinden hesaplanan faiz indirimi yapılır.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredi başvurumun reddedilme nedenleri neler olabilir?</summary>
            <p className="mt-2 text-gray-600">Kredi başvurunuzun reddedilme nedenleri arasında kredi skorunuzun düşük olması, gelir durumunuzun yeterli olmaması, mevcut kredi yükünüzün fazla olması veya geçmiş ödeme performansınız sayılabilir.</p>
          </details>
        </div>
        <div className="mt-4 text-center">
          <Link href="/pages/sik-sorulan-sorular" className="text-purple-600 font-medium flex items-center justify-center">
            Tüm Soruları Görüntüle <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}