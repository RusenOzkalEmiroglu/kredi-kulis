"use client";

import { Car, CheckCircle, Calculator, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TasitKredisi() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Taşıt Kredisi</h1>
        <p className="text-gray-600 mt-2">Araç alımınız için avantajlı taşıt kredisi seçenekleri.</p>
      </div>
      
      {/* Ana Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10">
        <img 
          src="https://picsum.photos/id/1071/1200/400" 
          alt="Taşıt Kredisi" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
          <div className="px-8 py-6 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-2">Hayalinizdeki Araç</h2>
            <p className="mb-4">Uygun ödeme koşulları ve hızlı kredi onayı ile aracınıza hemen kavuşun.</p>
            <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
              Hemen Başvur
            </button>
          </div>
        </div>
      </div>
      
      {/* Kredi Özellikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <Car className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Yeni ve İkinci El</h3>
          <p className="text-gray-600">Hem sıfır km hem de ikinci el araç alımları için kredi imkanı.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Hızlı Onay</h3>
          <p className="text-gray-600">24 saat içinde kredi değerlendirmesi ve hızlı onay süreci.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Esnek Vade</h3>
          <p className="text-gray-600">60 aya varan vade seçenekleri ile bütçenize uygun ödeme planı.</p>
        </div>
      </div>
      
      {/* Kredi Detayları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Taşıt Kredisi Detayları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Kredi Özellikleri</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>10.000 TL'den 1.000.000 TL'ye kadar kredi imkanı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>12 aydan 60 aya kadar vade seçenekleri</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Rekabetçi faiz oranları</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Araç değerinin %70'ine kadar kredi kullanımı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Kasko ve trafik sigortası avantajları</span>
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
                <span>Proforma fatura veya satış sözleşmesi</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>İkinci el araçlarda ekspertiz raporu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Hesaplama Aracı */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Taşıt Kredisi Hesaplama</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Araç Değeri (₺)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="200.000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı (₺)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="140.000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vade (Ay)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="36" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faiz Oranı (%)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="1.49" />
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/kredi/kredi-hesaplama">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Hesapla
            </button>
          </Link>
        </div>
      </div>
      
      {/* Başvuru Adımları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">Başvuru Süreci</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                1
              </div>
              <h3 className="font-medium">Başvuru</h3>
            </div>
            <p className="text-sm text-gray-600">Online, mobil veya şubelerimizden taşıt kredisi başvurunuzu yapın.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                2
              </div>
              <h3 className="font-medium">Değerlendirme</h3>
            </div>
            <p className="text-sm text-gray-600">Kredibilite değerlendirmesi yapılır, araç için ekspertiz talep edilebilir.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                3
              </div>
              <h3 className="font-medium">Onay</h3>
            </div>
            <p className="text-sm text-gray-600">Kredi onayı ve koşulları tarafınıza bildirilir.</p>
          </div>
          
          <div className="flex-1 md:pl-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                4
              </div>
              <h3 className="font-medium">Kullanım</h3>
            </div>
            <p className="text-sm text-gray-600">Rehin işlemi gerçekleştirilir ve kredi tutarı satıcıya ödenir.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Hemen Başvur
          </button>
        </div>
      </div>
      
      {/* Kampanyalar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Güncel Kampanyalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">Sıfır Araçlarda 0.89% Faiz Fırsatı</h3>
            <p className="text-sm text-gray-600 mb-2">Anlaşmalı markalarda sıfır araç alımlarında özel faiz oranları ve 60 aya varan vade imkanı.</p>
            <p className="text-xs text-gray-500">Son Tarih: 31 Aralık 2023</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">İkinci El Araçlar İçin Özel Kampanya</h3>
            <p className="text-sm text-gray-600 mb-2">5 yaşa kadar ikinci el araçlarda masrafsız kredi ve 1.29% faiz oranı avantajı.</p>
            <p className="text-xs text-gray-500">Son Tarih: 30 Eylül 2023</p>
          </div>
        </div>
      </div>
      
      {/* Sık Sorulan Sorular */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">İkinci el araç kredisi için araç yaşı önemli mi?</summary>
            <p className="mt-2 text-gray-600">Evet, genellikle 10 yaşa kadar olan araçlar için kredi kullanılabilir. Daha yaşlı araçlarda kredi koşulları değişebilir veya kredi onaylanmayabilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Taşıt kredisinde araç üzerine rehin konulur mu?</summary>
            <p className="mt-2 text-gray-600">Evet, taşıt kredilerinde aracın ruhsatına rehin konulur. Kredi tamamen ödendikten sonra rehin kaldırılır.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Taşıt kredisi ne kadar sürede onaylanır?</summary>
            <p className="mt-2 text-gray-600">Taşıt kredileri genellikle 1-2 iş günü içerisinde değerlendirilir ve onaylanır.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Taşıt kredisinde kasko zorunlu mu?</summary>
            <p className="mt-2 text-gray-600">Evet, taşıt kredilerinde kredi süresi boyunca aracın kasko ve trafik sigortasının yapılması ve yenilenmesi zorunludur.</p>
          </details>
        </div>
        <div className="mt-4 text-center">
          <Link href="/kredi/sik-sorulan-sorular" className="text-blue-600 font-medium flex items-center justify-center">
            Tüm Soruları Görüntüle <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 