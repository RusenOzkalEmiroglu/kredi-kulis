"use client";

import { Home, CheckCircle, Calculator, Percent, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function KonutKredisi() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Konut Kredisi</h1>
        <p className="text-gray-600 mt-2">Hayalinizdeki eve uygun koşullarla sahip olmanızı sağlayan konut kredisi çözümleri.</p>
      </div>
      
      {/* Ana Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10">
        <img 
          src="https://picsum.photos/id/1067/1200/400" 
          alt="Konut Kredisi" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
          <div className="px-8 py-6 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-2">Ev Sahibi Olma Fırsatı</h2>
            <p className="mb-4">Uygun faiz oranları ve esnek ödeme seçenekleriyle hayalinizdeki eve sahip olun.</p>
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
            <Home className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Yüksek Finansman</h3>
          <p className="text-gray-600">Evin değerinin %80'ine kadar finansman imkanı sunuyoruz.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Uzun Vade</h3>
          <p className="text-gray-600">120 aya varan vade seçenekleriyle aylık ödemelerinizi düşürün.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <Percent className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Uygun Faiz</h3>
          <p className="text-gray-600">Piyasanın en cazip faiz oranlarıyla bütçenizi zorlamayın.</p>
        </div>
      </div>
      
      {/* Kredi Detayları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Konut Kredisi Detayları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Kredi Özellikleri</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>50.000 TL'den 5.000.000 TL'ye kadar kredi imkanı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>12 aydan 120 aya kadar vade seçenekleri</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Sabit veya değişken faiz seçenekleri</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Ekspertiz değerinin %80'ine kadar kredi kullanımı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Yeni konut alımı, ikinci el konut alımı veya konut yapımı için kullanım</span>
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
                <span>Satın alınacak konutun tapu fotokopisi</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Satın alınacak konutun satış sözleşmesi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Hesaplama Aracı */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Konut Kredisi Hesaplama</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konut Değeri (₺)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="500.000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kredi Tutarı (₺)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="400.000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vade (Ay)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="120" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faiz Oranı (%)</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="0.99" />
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
            <p className="text-sm text-gray-600">Online, mobil veya şubelerimizden konut kredisi başvurunuzu yapın.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                2
              </div>
              <h3 className="font-medium">Değerlendirme</h3>
            </div>
            <p className="text-sm text-gray-600">Başvurunuz kredibilite ve ekspertiz değerlendirmesine alınır.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                3
              </div>
              <h3 className="font-medium">Onay</h3>
            </div>
            <p className="text-sm text-gray-600">Değerlendirme sonucu, kredi tutarı ve koşulları tarafınıza bildirilir.</p>
          </div>
          
          <div className="flex-1 md:pl-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                4
              </div>
              <h3 className="font-medium">Kullanım</h3>
            </div>
            <p className="text-sm text-gray-600">Onay sonrası sözleşme imzalanır ve kredi hesabınıza aktarılır.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Hemen Başvur
          </button>
        </div>
      </div>
      
      {/* Sık Sorulan Sorular */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Konut kredisi başvurusu için ne kadar süre beklemeliyim?</summary>
            <p className="mt-2 text-gray-600">Başvurular genellikle 3-5 iş günü içerisinde sonuçlandırılır. Ekspertiz raporu süreyi uzatabilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Konut kredisi için ekspertiz ücreti ne kadardır?</summary>
            <p className="mt-2 text-gray-600">Ekspertiz ücreti konutun büyüklüğüne ve konumuna göre değişiklik gösterir. Güncel ücret bilgisi için şubelerimize danışabilirsiniz.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Kredi kullanmak istediğim konut için ipotek işlemi nasıl yapılır?</summary>
            <p className="mt-2 text-gray-600">İpotek işlemi, tapu dairesinde konut sahibi ve banka yetkililerinin hazır bulunduğu bir ortamda gerçekleştirilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Konut kredisi vadesinden önce kapatılabilir mi?</summary>
            <p className="mt-2 text-gray-600">Evet, istediğiniz zaman kredi borcunuzu kapatabilirsiniz. Erken ödeme durumunda kalan anapara üzerinden belirli oranda erken ödeme indirimi yapılır.</p>
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