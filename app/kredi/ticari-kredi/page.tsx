"use client";

import { Briefcase, CheckCircle, BarChart, PieChart, ArrowRight, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

export default function TicariKredi() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ticari Kredi</h1>
        <p className="text-gray-600 mt-2">İşletmenizin başarısı için özel ticari finansman çözümleri.</p>
      </div>
      
      {/* Ana Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10">
        <img 
          src="https://picsum.photos/id/0/1200/400" 
          alt="Ticari Kredi" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center">
          <div className="px-8 py-6 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-2">İşinizi Büyütün</h2>
            <p className="mb-4">Büyük ve küçük ölçekli işletmeler için özel hazırlanmış finansman çözümleri.</p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Hemen Başvur
            </button>
          </div>
        </div>
      </div>
      
      {/* Kredi Özellikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Sektöre Özel</h3>
          <p className="text-gray-600">Sektörünüzün özelliklerine uygun kredi çözümleri.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
            <BarChart className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Esnek Ödeme</h3>
          <p className="text-gray-600">İşletmenizin nakit akışına uygun ödeme planları.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
            <PieChart className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Finansal Analiz</h3>
          <p className="text-gray-600">İşletmenize özel finansal analiz ve danışmanlık.</p>
        </div>
      </div>
      
      {/* Kredi Detayları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Ticari Kredi Detayları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Kredi Özellikleri</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>100.000 TL'den 50.000.000 TL'ye kadar kredi imkanı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>3 aydan 120 aya kadar vade seçenekleri</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Sabit veya değişken faiz seçenekleri</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>İşletme sermayesi ve yatırım amaçlı krediler</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Proje bazlı özel finansman yapılandırması</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Gerekli Belgeler</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Son 3 yıla ait finansal tablolar</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Vergi levhası ve sicil gazetesi</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>İmza sirküleri ve ortaklık yapısı</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Proje veya yatırım planı (gerekli hallerde)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Teminat belgeleri</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Ticari Kredi Türleri */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">Ticari Kredi Çeşitleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">İşletme Sermayesi Kredisi</h3>
            <p className="text-gray-600 mb-4">İşletmenizin günlük faaliyetlerini sürdürmesi, hammadde alımı, stok finansmanı ve kısa vadeli nakit ihtiyaçları için.</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>3-36 ay vade seçenekleri</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Aylık, 3 aylık veya 6 aylık ödeme periyotları</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>İşletme çapına uygun kredi limiti</span>
              </li>
            </ul>
            <Link href="/kredi/isletme-sermayesi-kredisi" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              Detaylı Bilgi <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Yatırım Kredisi</h3>
            <p className="text-gray-600 mb-4">Fabrika, üretim tesisi, makine ve ekipman yatırımları, kapasite artırımı ve yeni şube açılışı gibi uzun vadeli yatırımlarınız için.</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>36-120 ay vade seçenekleri</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Yatırım projelerine özel ödeme planı</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Ödemesiz dönem imkanı</span>
              </li>
            </ul>
            <Link href="/kredi/yatirim-kredisi" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              Detaylı Bilgi <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Dış Ticaret Finansmanı</h3>
            <p className="text-gray-600 mb-4">İhracat ve ithalat faaliyetleriniz için özel kredi çözümleri, akreditif, döviz kredileri ve teminat mektupları.</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Döviz veya TL cinsinden kredi kullanımı</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>İhracat taahhüdüne bağlı uygun faiz oranları</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Uluslararası ticari işlemlere özel çözümler</span>
              </li>
            </ul>
            <Link href="/kredi/dis-ticaret-finansmani" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              Detaylı Bilgi <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Nakit Akışı Finansmanı</h3>
            <p className="text-gray-600 mb-4">Alacak ve fatura finansmanı, çek/senet iskontosu gibi alacaklarınızı nakde çevirmenizi sağlayan çözümler.</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Hızlı finansman erişimi</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Alacak vadesine uygun kredi yapılandırması</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Gelecek nakit akışınıza göre planlama</span>
              </li>
            </ul>
            <Link href="/kredi/nakit-akisi-finansmani" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              Detaylı Bilgi <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Başvuru Adımları */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">Başvuru Süreci</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mr-2">
                1
              </div>
              <h3 className="font-medium">Ön Başvuru</h3>
            </div>
            <p className="text-sm text-gray-600">Online, mobil veya şubelerimizden ticari kredi ön başvurunuzu yapın.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mr-2">
                2
              </div>
              <h3 className="font-medium">Finansal Analiz</h3>
            </div>
            <p className="text-sm text-gray-600">Şirketinizin finansal durumu ve kredibilite değerlendirmesi yapılır.</p>
          </div>
          
          <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mr-2">
                3
              </div>
              <h3 className="font-medium">Teklifin Sunulması</h3>
            </div>
            <p className="text-sm text-gray-600">Finansman ihtiyacınıza özel kredi teklifiniz hazırlanır.</p>
          </div>
          
          <div className="flex-1 md:pl-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mr-2">
                4
              </div>
              <h3 className="font-medium">Sözleşme ve Kullanım</h3>
            </div>
            <p className="text-sm text-gray-600">Onay sonrası sözleşme imzalanır ve kredi hesabınıza aktarılır.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Hemen Başvur
          </button>
        </div>
      </div>
      
      {/* Müşteri Hikayeleri */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">Başarı Hikayeleri</h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 italic mb-4">"Üretim tesisimizi genişletmek için aldığımız yatırım kredisi ile kapasitemizi %40 artırdık ve ihracat hacmimizi genişlettik. Bankamızın sunduğu esnek ödeme planı sayesinde nakit akışımızı etkin bir şekilde yönetebildik."</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">Ahmet Yılmaz</p>
                <p className="text-sm text-gray-500">ABC Tekstil A.Ş, Genel Müdür</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 italic mb-4">"Dış ticaret finansmanı alanında aldığımız destekle uluslararası pazarlarda daha rekabetçi bir konuma geldik. Bankamızın sağladığı döviz kredisi ve akreditif imkanları ile güvenle ticaret yapabiliyoruz."</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">Zeynep Kaya</p>
                <p className="text-sm text-gray-500">XYZ İthalat İhracat Ltd., İş Geliştirme Direktörü</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sık Sorulan Sorular */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Ticari kredi başvurusu için firmanın kaç yıllık olması gerekir?</summary>
            <p className="mt-2 text-gray-600">Genellikle en az 2 yıllık işletmeler için ticari kredi başvurusu değerlendirmeye alınmaktadır. Ancak belirli sektörler ve projeler için farklı kriterler uygulanabilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Ticari krediler için ne tür teminatlar kabul edilmektedir?</summary>
            <p className="mt-2 text-gray-600">Gayrimenkul ipoteği, araç rehni, mevduat rehni, ticari alacak temliği, çek/senet, şirket ortaklarının kefaleti gibi çeşitli teminat türleri kredi tutarına ve yapısına göre kabul edilmektedir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">Yatırım kredileri için hangi değerlendirme kriterleri uygulanır?</summary>
            <p className="mt-2 text-gray-600">Yatırım kredilerinde işletmenin finansal performansı, projenin fizibilitesi, sektörel dinamikler, yatırımın geri dönüş süresi ve firmanın yönetim kalitesi gibi kriterler değerlendirilir.</p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer">KOBİ tanımına giren işletmeler için özel avantajlar var mı?</summary>
            <p className="mt-2 text-gray-600">Evet, KOBİ'ler için KOSGEB destekli, düşük faizli ve uzun vadeli kredi seçenekleri bulunmaktadır. Ayrıca çeşitli sektörel teşvik programları kapsamında KOBİ'lere özel finansman paketleri sunulmaktadır.</p>
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