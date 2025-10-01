'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, CreditCard, GraduationCap, Coffee, BookOpen, Bus } from 'lucide-react'

// Öğrenci kartları verileri
const ogrenciKartlari = [
  {
    id: 1,
    bankName: 'Yapı Kredi',
    cardName: 'Play Öğrenci',
    imageUrl: '/images/cards/yapikredi-play-ogrenci.png',
    features: [
      'Yıllık kart ücreti yok',
      'Kampüs içi harcamalarda %5 indirim',
      'Kitap ve kırtasiye alışverişlerinde %3 indirim',
      'Toplu taşımada %2 indirim'
    ],
    studentBenefits: 'Sinema biletlerinde her Pazartesi %50 indirim',
    limit: '1.500',
    interestRate: '3.85',
    applicationLink: '/kredi-karti/basvuru?card=yapikredi-play-ogrenci'
  },
  {
    id: 2,
    bankName: 'Garanti BBVA',
    cardName: 'Bonus Genç',
    imageUrl: '/images/cards/garanti-bonus-genc.png',
    features: [
      'Aidatsız kullanım',
      'Yemek harcamalarında %5 Bonus',
      'Kitap alışverişlerinde %10 indirim',
      'Online kurs ödemelerinde taksit avantajı'
    ],
    studentBenefits: 'Seçili kafelerde 1 alana 1 bedava',
    limit: '1.250',
    interestRate: '3.80',
    applicationLink: '/kredi-karti/basvuru?card=garanti-bonus-genc'
  },
  {
    id: 3,
    bankName: 'İş Bankası',
    cardName: 'Maximum Genç',
    imageUrl: '/images/cards/isbankasi-maximum-genc.png',
    features: [
      'Yıllık ücret yok',
      'Kafe harcamalarında %3 MaxiPuan',
      'Kitap ve kırtasiye alışverişlerinde %5 MaxiPuan',
      'E-ticaret sitelerinde taksit avantajı'
    ],
    studentBenefits: 'Ayda bir kez ücretsiz müze girişi',
    limit: '1.000',
    interestRate: '3.78',
    applicationLink: '/kredi-karti/basvuru?card=isbankasi-maximum-genc'
  },
  {
    id: 4,
    bankName: 'Akbank',
    cardName: 'Axess Campus',
    imageUrl: '/images/cards/akbank-axess-campus.png',
    features: [
      'Ücretsiz kullanım',
      'Yemek harcamalarında %4 Chip-Para',
      'Kırtasiye alışverişlerinde %5 indirim',
      'Ulaşım harcamalarında %3 Chip-Para'
    ],
    studentBenefits: 'Dijital müzik platformlarında %50 indirim',
    limit: '1.200',
    interestRate: '3.75',
    applicationLink: '/kredi-karti/basvuru?card=akbank-axess-campus'
  },
  {
    id: 5,
    bankName: 'QNB Finansbank',
    cardName: 'CardFinans Student',
    imageUrl: '/images/cards/finansbank-cardfinans-student.png',
    features: [
      'Aidatsız kullanım',
      'Kafe ve restoranlarda %3 ParaPuan',
      'Kitap alışverişlerinde %5 indirim',
      'Online alışverişlerde taksit avantajı'
    ],
    studentBenefits: 'Ayda 2 kez ücretsiz sinema bileti',
    limit: '1.100',
    interestRate: '3.82',
    applicationLink: '/kredi-karti/basvuru?card=finansbank-cardfinans-student'
  },
  {
    id: 6,
    bankName: 'Ziraat Bankası',
    cardName: 'Bankkart Genç',
    imageUrl: '/images/cards/ziraat-bankkart-genc.png',
    features: [
      'Yıllık ücret yok',
      'Kampüs içi harcamalarda %5 indirim',
      'Kitap ve kırtasiye alışverişlerinde %4 indirim',
      'Toplu taşımada %3 indirim'
    ],
    studentBenefits: 'Kütüphane ve müzelerde %25 indirim',
    limit: '1.000',
    interestRate: '3.70',
    applicationLink: '/kredi-karti/basvuru?card=ziraat-bankkart-genc'
  }
]

// Öğrenci kartları avantajları
const advantages = [
  {
    title: 'Düşük Limit',
    description: 'Öğrenci kartları, bütçe kontrolünü kolaylaştıran düşük limitlerle sunulur.',
    icon: <CreditCard className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Eğitim İndirimleri',
    description: 'Kitap, kırtasiye ve online kurs ödemelerinde özel indirimler sunar.',
    icon: <BookOpen className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Kafe İndirimleri',
    description: 'Öğrencilerin sıklıkla ziyaret ettiği kafelerde indirim ve kampanyalar sağlar.',
    icon: <Coffee className="w-10 h-10 text-[#ff3d00]" />
  },
  {
    title: 'Ulaşım Avantajları',
    description: 'Toplu taşıma ve ulaşım harcamalarında indirim ve puan kazanma imkanı sunar.',
    icon: <Bus className="w-10 h-10 text-[#ff3d00]" />
  }
]

export default function OgrenciKartlariPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Öğrenci Kredi Kartları</h1>
          <p className="text-lg text-gray-600 mb-8">
            Öğrencilere özel avantajlar sunan, düşük limitli ve aidatsız kredi kartlarını inceleyin, 
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">Öğrenci Kartı Avantajları</h2>
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
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-10">En İyi Öğrenci Kredi Kartları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ogrenciKartlari.map((kart) => (
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
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Öğrenci Avantajı</h4>
                  <p className="text-[#ff3d00] font-medium">{kart.studentBenefits}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Kart Limiti</p>
                    <p className="font-semibold text-gray-800">{kart.limit} ₺</p>
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

      {/* Başvuru Koşulları Section */}
      <div className="bg-white rounded-xl p-8 shadow-md mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Öğrenci Kartı Başvuru Koşulları</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Öğrenci Belgesi</h3>
                <p className="text-gray-600">Aktif öğrenci olduğunuzu gösteren güncel bir öğrenci belgesi sunmanız gerekir.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Yaş Sınırı</h3>
                <p className="text-gray-600">Genellikle 18 yaşını doldurmuş olmanız gerekmektedir. Bazı bankalar 18 yaş altı öğrencilere veli onayı ile kart verebilir.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Gelir Beyanı</h3>
                <p className="text-gray-600">Düzenli bir geliriniz olmasa da burs, aile desteği veya part-time iş gelirini beyan edebilirsiniz.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-6 w-6 text-[#ff3d00] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Kimlik ve İletişim Bilgileri</h3>
                <p className="text-gray-600">Geçerli bir kimlik belgesi ve güncel iletişim bilgilerinizi sunmanız gerekir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SSS Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-3xl font-heading font-bold text-center text-gray-800 mb-8">Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Öğrenci kartı için yaş sınırı var mı?</h3>
            <p className="text-gray-600">
              Genellikle öğrenci kredi kartları için 18 yaş ve üzeri olmanız gerekmektedir. Bazı bankalar 18 yaş altı öğrencilere veli onayı ile kart verebilmektedir. Her bankanın kendi politikası olduğundan başvuru öncesi kontrol etmeniz önerilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Öğrenci kartlarının limitleri ne kadardır?</h3>
            <p className="text-gray-600">
              Öğrenci kredi kartları genellikle 1.000 TL ile 2.000 TL arasında limitlerle sunulur. Bu limitler, öğrencilerin bütçe yönetimini kolaylaştırmak ve aşırı borçlanmayı önlemek için düşük tutulur. Düzenli ödemelerinizle zamanla limit artışı talep edebilirsiniz.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Öğrenci kartları aidatsız mıdır?</h3>
            <p className="text-gray-600">
              Evet, çoğu banka öğrenci kredi kartlarını yıllık ücret almadan sunmaktadır. Öğrenci olduğunuz sürece kart genellikle aidatsız olarak kullanılabilir. Mezun olduktan sonra kartınız standart bir karta dönüştürülebilir ve ücret politikası değişebilir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Mezun olduğumda öğrenci kartım ne olacak?</h3>
            <p className="text-gray-600">
              Mezun olduğunuzda, bankanız öğrenci statünüzün sona erdiğini tespit edebilir ve kartınızı standart bir karta dönüştürebilir. Bu durumda yeni kart şartları ve ücretleri geçerli olacaktır. Bazı bankalar mezuniyet sonrası belirli bir süre daha öğrenci kartı avantajlarını sunabilir.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">Öğrenci Hayatınızı Kolaylaştıracak Kartı Seçin</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Eğitim hayatınızda size en çok avantaj sağlayacak öğrenci kredi kartını seçin, 
          kampüs yaşamınızı daha ekonomik ve keyifli hale getirin.
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
