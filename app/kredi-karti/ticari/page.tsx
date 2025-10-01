'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, CreditCard, Check, ArrowRight } from 'lucide-react'

export default function TicariKartlar() {
  const ticariKartlar = [
    {
      banka: 'İş Bankası',
      kartAdi: 'Maximum Business',
      limitOzellikleri: [
        'Esnek limit imkanı',
        'Sektöre özel taksit avantajları',
        'İşletme harcamalarında MaxiPuan',
      ],
      resim: '/images/is logo.png'
    },
    {
      banka: 'Garanti BBVA',
      kartAdi: 'Business Bonus',
      limitOzellikleri: [
        'Yüksek limit imkanı',
        '12 aya varan taksit fırsatı',
        'Akaryakıt indirimi',
      ],
      resim: '/images/garanti logo.png'
    },
    {
      banka: 'Yapı Kredi',
      kartAdi: 'Business World',
      limitOzellikleri: [
        'Sektörel limit tanımlama',
        'Tedarikçi ödemelerinde avantaj',
        'World Puan kazanma',
      ],
      resim: '/images/Yapi logo.png'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Ticari Kredi Kartları</h1>
        <p className="text-gray-600 mb-6">
          İşletmenizin ihtiyaçlarına uygun ticari kredi kartlarını inceleyin.
          Nakit akışınızı yönetirken avantajlı fırsatlardan yararlanın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ticariKartlar.map((kart, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Image
                src={kart.resim}
                alt={kart.banka}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="ml-4">
                <h3 className="font-bold">{kart.banka}</h3>
                <p className="text-primary">{kart.kartAdi}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-gray-800 mb-2">
                <Briefcase className="mr-2" size={20} />
                <span className="font-semibold">Kart Özellikleri</span>
              </div>
              <ul className="space-y-2">
                {kart.limitOzellikleri.map((ozellik, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="mr-2 text-gray-500" size={16} />
                    {ozellik}
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              href="/kredi-karti-basvuru"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Hemen Başvur
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Ticari Kredi Kartı Avantajları</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <Check className="mr-2 text-gray-500 mt-1" size={16} />
            <p>İşletmenize özel yüksek limit imkanlarından yararlanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-gray-500 mt-1" size={16} />
            <p>Sektörünüze özel taksit ve indirim fırsatlarını kullanabilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-gray-500 mt-1" size={16} />
            <p>Tedarikçi ödemelerinizi ve nakit akışınızı daha kolay yönetebilirsiniz</p>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 text-gray-500 mt-1" size={16} />
            <p>İşletme harcamalarınızda puan ve mil kazanabilirsiniz</p>
          </li>
        </ul>
      </div>

      <div className="mt-8 bg-primary/5 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">Başvuru İçin Gerekli Belgeler</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600">
            <Check className="mr-2 text-primary" size={16} />
            Vergi levhası
          </li>
          <li className="flex items-center text-gray-600">
            <Check className="mr-2 text-primary" size={16} />
            Son 6 aylık banka hesap hareketleri
          </li>
          <li className="flex items-center text-gray-600">
            <Check className="mr-2 text-primary" size={16} />
            Şirket imza sirküleri
          </li>
          <li className="flex items-center text-gray-600">
            <Check className="mr-2 text-primary" size={16} />
            Ticaret sicil gazetesi
          </li>
        </ul>
      </div>
    </div>
  )
} 