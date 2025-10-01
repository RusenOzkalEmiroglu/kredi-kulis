'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, CreditCard, DollarSign, Percent, Shield } from 'lucide-react'

// Aidatsız kart verileri
const aidatsizKartlar = [
  {
    id: 1,
    bankName: 'Akbank',
    cardName: 'Free Kart',
    imageUrl: '/images/cards/akbank-free.png',
    features: [
      'Yıllık kart ücreti yok',
      'Nakit avans imkanı',
      'Taksit fırsatları',
      'Mobil ödeme desteği'
    ],
    minIncome: 3500,
    interestRate: '3.75',
    applicationLink: '/kredi-karti/basvuru?card=akbank-free'
  },
  {
    id: 2,
    bankName: 'Yapı Kredi',
    cardName: 'Play Kart',
    imageUrl: '/images/cards/yapikredi-play.png',
    features: [
      'Ömür boyu aidatsız',
      'Anında alışveriş puanları',
      '3 ay ertelemeli alışveriş',
      'Ücretsiz ek kart'
    ],
    minIncome: 4000,
    interestRate: '3.85',
    applicationLink: '/kredi-karti/basvuru?card=yapikredi-play'
  },
  {
    id: 3,
    bankName: 'Garanti BBVA',
    cardName: 'Flexi Kart',
    imageUrl: '/images/cards/garanti-flexi.png',
    features: [
      'Ücretsiz kullanım',
      'Bonus puan kazanma',
      'Taksitli nakit avans',
      'Fatura ödeme kolaylığı'
    ],
    minIncome: 3750,
    interestRate: '3.80',
    applicationLink: '/kredi-karti/basvuru?card=garanti-flexi'
  },
  {
    id: 4,
    bankName: 'İş Bankası',
    cardName: 'Sıfır Kart',
    imageUrl: '/images/cards/isbankasi-sifir.png',
    features: [
      'Aidatsız kullanım',
      'Maximum puan kazanma',
      'Taksit avantajları',
      'Temassız ödeme'
    ],
    minIncome: 3600,
    interestRate: '3.78',
    applicationLink: '/kredi-karti/basvuru?card=isbankasi-sifir'
  },
  {
    id: 5,
    bankName: 'QNB Finansbank',
    cardName: 'Zero Kart',
    imageUrl: '/images/cards/finansbank-zero.png',
    features: [
      'Ömür boyu ücretsiz',
      'CardFinans puan kazanma',
      'Taksit imkanları',
      'Mobil uygulama entegrasyonu'
    ],
    minIncome: 3500,
    interestRate: '3.82',
    applicationLink: '/kredi-karti/basvuru?card=finansbank-zero'
  },
  {
    id: 6,
    bankName: 'Ziraat Bankası',
    cardName: 'Basic Kart',
    imageUrl: '/images/cards/ziraat-basic.png',
    features: [
      'Yıllık ücret yok',
      'Bankkart puan kazanma',
      'Faizsiz taksit fırsatları',
      'Kampanya avantajları'
    ],
    minIncome: 3000,
    interestRate: '3.70',
    applicationLink: '/kredi-karti/basvuru?card=ziraat-basic'
  }
]

// Avantajlar ve bilgiler
const advantages = [
  {
    title: 'Yıllık Ücret Yok',
    description: 'Aidatsız kartlar, yıllık kart ücreti ödemeden kullanabileceğiniz kredi kartlarıdır.',
    icon: <DollarSign className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Ömür Boyu Ücretsiz',
    description: 'Harcama şartı olmadan, ömür boyu ücretsiz kullanım imkanı sunar.',
    icon: <Shield className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Puan Avantajları',
    description: 'Birçok aidatsız kart, alışverişlerinizde puan kazanma imkanı da sağlar.',
    icon: <Percent className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Kolay Başvuru',
    description: 'Online başvuru ile dakikalar içinde kart başvurunuzu tamamlayabilirsiniz.',
    icon: <CreditCard className="w-10 h-10 text-[#ff3d00]" />
  }
]

export default function AidatsizKartlarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Aidatsız Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            Yıllık ücret ödemeden kullanabileceğiniz, avantajlı aidatsız kredi kartlarını inceleyin, 
            karşılaştırın ve hemen başvurun.
          </p>
          <div className="flex justify-center">
            <Link 
              href="#kartlar" 
              className="bg-[#ff3d00] hover:bg-[#e63600] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center"
            >
              Kartları İncele
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Avantajlar Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Aidatsız Kart Avantajları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-3">{advantage.title}</h3>
              <p className="text-gray-600 text-center">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kartlar Section */}
      <div id="kartlar" className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">En İyi Aidatsız Kredi Kartları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aidatsizKartlar.map((kart) => (
            <div key={kart.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-6 bg-gray-50 flex justify-between items-center border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{kart.cardName}</h3>
                  <p className="text-gray-600">{kart.bankName}</p>
                </div>
                <div className="w-16 h-16 relative">
                  <Image 
                    src={kart.imageUrl} 
                    alt={`${kart.bankName} ${kart.cardName}`}
                    width={64}
                    height={64}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/images/cards/default-card.png';
                    }}
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Kart Özellikleri</h4>
                  <ul className="space-y-2">
                    {kart.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#ff3d00] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Minimum Gelir</p>
                    <p className="font-semibold text-gray-800">{kart.minIncome} ₺</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Akdi Faiz Oranı</p>
                    <p className="font-semibold text-gray-800">%{kart.interestRate}</p>
                  </div>
                </div>
                <Link 
                  href={kart.applicationLink} 
                  className="block w-full bg-[#ff3d00] hover:bg-[#e63600] text-white text-center font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Hemen Başvur
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SSS Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kart ne demektir?</h3>
            <p className="text-gray-600">
              Aidatsız kart, yıllık kart ücreti ödemeden kullanabileceğiniz kredi kartlarıdır. Bu kartlar genellikle harcama şartı olmadan veya belirli bir harcama tutarını aştığınızda yıllık ücret alınmayan kartlardır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kartların dezavantajları var mıdır?</h3>
            <p className="text-gray-600">
              Aidatsız kartlar genellikle standart kartlara göre daha az puan/mil kazandırabilir veya daha az ek hizmet sunabilir. Ancak günümüzde birçok aidatsız kart, puan kazanma ve kampanya avantajları da sunmaktadır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kart başvurusu için gerekli şartlar nelerdir?</h3>
            <p className="text-gray-600">
              Aidatsız kart başvurusu için genellikle düzenli gelir sahibi olmanız ve kredi skorunuzun belirli bir seviyenin üzerinde olması gerekmektedir. Her bankanın minimum gelir şartı farklılık gösterebilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Aidatsız kartlar gerçekten ömür boyu ücretsiz midir?</h3>
            <p className="text-gray-600">
              Birçok banka aidatsız kartlarını ömür boyu ücretsiz olarak sunmaktadır. Ancak bankaların kart sözleşmelerinde değişiklik yapma hakları saklıdır. Bu nedenle başvuru yapmadan önce kart sözleşmesini incelemeniz önerilir.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">Sizin İçin En Uygun Aidatsız Kartı Bulun</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Harcama alışkanlıklarınıza ve ihtiyaçlarınıza göre en uygun aidatsız kredi kartını seçin, 
          yıllık ücret ödemeden avantajlı alışverişin keyfini çıkarın.
        </p>
        <Link 
          href="#kartlar" 
          className="inline-block bg-[#ff3d00] hover:bg-[#e63600] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
        >
          Kartları Karşılaştır
        </Link>
      </div>
    </div>
  )
}
