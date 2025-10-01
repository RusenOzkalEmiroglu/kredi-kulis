'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, CreditCard, Gift, Percent, Tag, Star } from 'lucide-react'

// Extralı kart verileri
const extraliKartlar = [
  {
    id: 1,
    bankName: 'Garanti BBVA',
    cardName: 'Bonus Platinum',
    imageUrl: '/images/cards/garanti-bonus-platinum.png',
    features: [
      'Her 100 TL alışverişe 5 Bonus',
      'Restoranlarda %10 indirim',
      'Ücretsiz lounge erişimi',
      'Araç kiralama avantajları'
    ],
    extraFeatures: 'Sinema, tiyatro, konser biletlerinde %20 indirim',
    annualFee: 250,
    interestRate: '3.80',
    applicationLink: '/kredi-karti/basvuru?card=garanti-bonus-platinum'
  },
  {
    id: 2,
    bankName: 'Yapı Kredi',
    cardName: 'World Gold',
    imageUrl: '/images/cards/yapikredi-world-gold.png',
    features: [
      'Her 100 TL alışverişe 4 WorldPuan',
      'Akaryakıtta %5 indirim',
      'Seçili restoranlarda %15 indirim',
      'Ücretsiz asistans hizmetleri'
    ],
    extraFeatures: 'Yurtdışı alışverişlerde 2 kat puan',
    annualFee: 220,
    interestRate: '3.85',
    applicationLink: '/kredi-karti/basvuru?card=yapikredi-world-gold'
  },
  {
    id: 3,
    bankName: 'İş Bankası',
    cardName: 'Maximum Premium',
    imageUrl: '/images/cards/isbankasi-maximum-premium.png',
    features: [
      'Her 100 TL alışverişe 6 MaxiPuan',
      'Seyahat sigortası',
      'Restoranlarda %10 indirim',
      'Ücretsiz havalimanı transferi'
    ],
    extraFeatures: 'Yılda 2 kez ücretsiz vale hizmeti',
    annualFee: 275,
    interestRate: '3.78',
    applicationLink: '/kredi-karti/basvuru?card=isbankasi-maximum-premium'
  },
  {
    id: 4,
    bankName: 'Akbank',
    cardName: 'Axess Platinum',
    imageUrl: '/images/cards/akbank-axess-platinum.png',
    features: [
      'Her 100 TL alışverişe 5 Chip-Para',
      'Seyahat sigortası',
      'Seçili restoranlarda %15 indirim',
      'Ücretsiz araç bakım hizmeti'
    ],
    extraFeatures: 'Yılda 4 kez ücretsiz otopark hizmeti',
    annualFee: 240,
    interestRate: '3.75',
    applicationLink: '/kredi-karti/basvuru?card=akbank-axess-platinum'
  },
  {
    id: 5,
    bankName: 'QNB Finansbank',
    cardName: 'CardFinans Gold',
    imageUrl: '/images/cards/finansbank-cardfinans-gold.png',
    features: [
      'Her 100 TL alışverişe 4 ParaPuan',
      'Akaryakıtta %3 indirim',
      'Seçili mağazalarda %10 indirim',
      'Ücretsiz asistans hizmetleri'
    ],
    extraFeatures: 'Yılda 2 kez ücretsiz sinema bileti',
    annualFee: 200,
    interestRate: '3.82',
    applicationLink: '/kredi-karti/basvuru?card=finansbank-cardfinans-gold'
  },
  {
    id: 6,
    bankName: 'TEB',
    cardName: 'Star Platinum',
    imageUrl: '/images/cards/teb-star-platinum.png',
    features: [
      'Her 100 TL alışverişe 5 TEB Puan',
      'Seyahat sigortası',
      'Restoranlarda %10 indirim',
      'Ücretsiz lounge erişimi'
    ],
    extraFeatures: 'Yılda 4 kez ücretsiz vale hizmeti',
    annualFee: 260,
    interestRate: '3.79',
    applicationLink: '/kredi-karti/basvuru?card=teb-star-platinum'
  }
]

// Extralı kart avantajları
const advantages = [
  {
    title: 'Ekstra Puan Kazanımı',
    description: 'Extralı kartlar, standart kartlara göre daha yüksek puan kazanma oranları sunar.',
    icon: <Star className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Özel İndirimler',
    description: 'Seçili mağaza ve restoranlarda özel indirim fırsatları elde edersiniz.',
    icon: <Percent className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Ücretsiz Hizmetler',
    description: 'Havalimanı transferi, vale, otopark gibi ücretsiz hizmetlerden yararlanabilirsiniz.',
    icon: <Gift className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Özel Kampanyalar',
    description: 'Sadece extralı kart sahiplerine özel kampanya ve fırsatlara erişim sağlarsınız.',
    icon: <Tag className="w-10 h-10 text-[#ff3d00]" />
  }
]

export default function ExtraliKartlarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Extralı Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            Alışverişlerinizde ekstra puan, indirim ve ayrıcalıklar sunan, avantajlı extralı kredi kartlarını inceleyin, 
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Extralı Kart Avantajları</h2>
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">En İyi Extralı Kredi Kartları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {extraliKartlar.map((kart) => (
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
                <div className="mb-6 bg-orange-50 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Ekstra Avantaj</h4>
                  <p className="text-[#ff3d00] font-medium">{kart.extraFeatures}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Yıllık Ücret</p>
                    <p className="font-semibold text-gray-800">{kart.annualFee} ₺</p>
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
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kart ne demektir?</h3>
            <p className="text-gray-600">
              Extralı kartlar, standart kredi kartlarına göre daha fazla avantaj, puan kazanma oranı, indirim ve özel hizmet sunan premium kredi kartlarıdır. Bu kartlar genellikle yıllık ücrete sahiptir ancak sundukları avantajlar bu ücreti fazlasıyla karşılar.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kartların yıllık ücreti nasıl hesaplanır?</h3>
            <p className="text-gray-600">
              Extralı kartların yıllık ücretleri, kartın sunduğu avantajlara, banka politikalarına ve kart tipine göre değişiklik gösterir. Bazı bankalar belirli harcama tutarlarını aştığınızda yıllık ücreti iade edebilir veya bir sonraki yıl için muafiyet sağlayabilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kart başvurusu için gerekli şartlar nelerdir?</h3>
            <p className="text-gray-600">
              Extralı kart başvurusu için genellikle daha yüksek gelir seviyesi ve iyi bir kredi skoruna sahip olmanız gerekir. Her bankanın kendi değerlendirme kriterleri vardır, ancak genellikle standart kartlara göre daha yüksek gelir şartı aranır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Extralı kartların sunduğu özel hizmetler nelerdir?</h3>
            <p className="text-gray-600">
              Extralı kartlar genellikle havalimanı lounge erişimi, ücretsiz vale ve otopark hizmetleri, seyahat sigortası, concierge hizmetleri, özel indirimler, yüksek puan kazanma oranları ve özel kampanyalara erişim gibi ayrıcalıklar sunar.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">Sizin İçin En Uygun Extralı Kartı Bulun</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Harcama alışkanlıklarınıza ve ihtiyaçlarınıza göre en uygun extralı kredi kartını seçin, 
          özel avantajlardan ve ayrıcalıklardan yararlanın.
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
