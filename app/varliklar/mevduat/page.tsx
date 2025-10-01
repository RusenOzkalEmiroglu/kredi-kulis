'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calculator, 
  Info, 
  ChevronDown, 
  Clock, 
  Percent, 
  Shield, 
  CreditCard,
  TrendingUp,
  HelpCircle,
  ExternalLink,
  Check
} from 'lucide-react'

// Banka verileri
const bankData = [
  {
    id: 1,
    name: 'Akbank',
    logo: '/images/banks/akbank.png',
    color: '#e11c24',
    accounts: [
      {
        type: 'Vadeli Hesap TL',
        interestRate: 47.50,
        minAmount: 10000,
        term: 32
      }
    ]
  },
  {
    id: 2,
    name: 'Odeabank',
    logo: '/images/banks/odeabank.png',
    color: '#6a1b9a',
    accounts: [
      {
        type: 'Oksijen Hesap',
        interestRate: 49.00,
        minAmount: 10000,
        term: 32
      }
    ]
  },
  {
    id: 3,
    name: 'Alternatif Bank',
    logo: '/images/banks/alternatifbank.png',
    color: '#9c0033',
    accounts: [
      {
        type: 'VOV Hesap',
        interestRate: 50.00,
        minAmount: 10000,
        term: 32
      }
    ]
  },
  {
    id: 4,
    name: 'Yapı Kredi',
    logo: '/images/banks/yapikredi.png',
    color: '#004d9f',
    accounts: [
      {
        type: 'Vadeli Mevduat',
        interestRate: 46.75,
        minAmount: 5000,
        term: 32
      }
    ]
  },
  {
    id: 5,
    name: 'Garanti BBVA',
    logo: '/images/banks/garanti.png',
    color: '#009640',
    accounts: [
      {
        type: 'e-Vadeli Mevduat',
        interestRate: 46.50,
        minAmount: 5000,
        term: 32
      }
    ]
  },
  {
    id: 6,
    name: 'İş Bankası',
    logo: '/images/banks/isbankasi.png',
    color: '#0056b8',
    accounts: [
      {
        type: 'e-Mevduat',
        interestRate: 46.25,
        minAmount: 5000,
        term: 32
      }
    ]
  }
]

// Vade seçenekleri
const termOptions = [
  { value: 32, label: '32 Gün' },
  { value: 45, label: '45 Gün' },
  { value: 60, label: '60 Gün' },
  { value: 90, label: '90 Gün' },
  { value: 180, label: '180 Gün' },
  { value: 365, label: '365 Gün' }
]

// Para birimleri
const currencyOptions = [
  { value: 'TL', label: 'TL' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' }
]



function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = [
    {
      question: 'Mevduat faizi nasıl hesaplanır?',
      answer: (
        <>
          Mevduat faizi, bankalara yatırdığınız paranın size sağladığı getiridir. Hesaplama formülü:
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-2">
            <span className="font-mono text-sm">Faiz Tutarı = Anapara × (Faiz Oranı / 100) × (Vade Günü / 365)</span>
          </div>
          Hesaplanan faiz tutarından %5 stopaj vergisi düşülür ve net kazancınız hesaplanır.
        </>
      ),
    },
    {
      question: 'Vadeli mevduat hesabı açmak için ne gerekir?',
      answer: (
        <>Vadeli mevduat hesabı açmak için kimlik belgeniz ve yatırmak istediğiniz tutarla birlikte bankanıza başvurabilirsiniz. Birçok banka internet bankacılığı veya mobil uygulamaları üzerinden de vadeli mevduat hesabı açmanıza olanak tanır.</>
      ),
    },
    {
      question: 'Vadeli mevduat hesabımı vadesinden önce bozdurabiliyor muyum?',
      answer: (
        <>Evet, vadeli mevduat hesabınızı vadesinden önce bozdurmak mümkündür. Ancak bu durumda bankanın belirlediği vade bozma kuralları geçerli olur ve genellikle daha düşük bir faiz oranı uygulanır veya hiç faiz alamayabilirsiniz.</>
      ),
    },
    {
      question: 'Mevduat faizinden kesilen vergiler nelerdir?',
      answer: (
        <>Mevduat faiz gelirlerinden %5 oranında stopaj vergisi kesilir. Bu vergi, banka tarafından otomatik olarak kesilerek devlete ödenir ve size net faiz tutarı ödenir.</>
      ),
    },
    {
      question: 'Mevduat hesabı açmanın avantajları nelerdir?',
      answer: (
        <>
          <ul className="list-disc ml-6 space-y-1">
            <li>Güvenli ve risksiz bir yatırım aracıdır.</li>
            <li>Getirisi önceden bellidir, sürpriz yoktur.</li>
            <li>TMSF güvencesi ile 400.000 TL'ye kadar koruma altındadır.</li>
            <li>İnternet bankacılığı üzerinden kolayca açılabilir.</li>
          </ul>
        </>
      ),
    },
  ]
  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            className={
              'w-full flex justify-between items-center py-4 px-6 text-left focus:outline-none transition-all ' +
              (openIndex === i
                ? 'bg-[#ff3d00] bg-opacity-10 text-[#ff3d00] font-bold'
                : 'bg-white text-gray-800 hover:bg-gray-50')
            }
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{faq.question}</span>
            <svg
              className={
                'w-5 h-5 ml-2 transform transition-transform duration-200 ' +
                (openIndex === i ? 'rotate-180 text-[#ff3d00]' : 'rotate-0 text-gray-400')
              }
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={
              'transition-all duration-300 px-6 overflow-hidden ' +
              (openIndex === i ? 'max-h-96 py-2 opacity-100' : 'max-h-0 py-0 opacity-0')
            }
            style={{ background: openIndex === i ? 'rgba(255, 61, 0, 0.05)' : 'transparent' }}
          >
            {openIndex === i && <div className="text-gray-700 text-base pb-4">{faq.answer}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MevduatPage() {
  // Hesaplama için state'ler
  const [amount, setAmount] = useState<number>(50000)
  const [term, setTerm] = useState<number>(32)
  const [currency, setCurrency] = useState<string>('TL')
  const [calculatedResults, setCalculatedResults] = useState<any[]>([])
  const [sliderValue, setSliderValue] = useState<number>(50000)
  const [termSliderValue, setTermSliderValue] = useState<number>(32)
  const [formattedAmount, setFormattedAmount] = useState<string>('50.000')
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>('TL')
  
  const amountSliderRef = useRef<HTMLInputElement>(null)
  const termSliderRef = useRef<HTMLInputElement>(null)

  // Faiz hesaplama fonksiyonu
  const calculateInterest = (principal: number, rate: number, days: number) => {
    // Basit faiz hesaplaması: Anapara * (Oran / 100) * (Gün / 365)
    const interest = principal * (rate / 100) * (days / 365)
    return interest
  }

  // Hesaplama işlemi
  const calculateResults = () => {
    const results = bankData.map(bank => {
      const account = bank.accounts[0]
      const interest = calculateInterest(amount, account.interestRate, term)
      const totalAmount = amount + interest
      const netGain = interest * 0.95 // %5 stopaj vergisi düşülmüş hali
      
      return {
        ...bank,
        account: account,
        interest: interest,
        totalAmount: totalAmount,
        netGain: netGain,
        netInterest: netGain / amount * 365 / term * 100 // Yıllık net getiri oranı
      }
    })

    // Faiz oranına göre sırala
    results.sort((a, b) => b.account.interestRate - a.account.interestRate)
    
    setCalculatedResults(results)
    
    // En yüksek faiz oranına sahip bankayı bul
    const highestInterestBank = results[0]
    setTotalInterest(highestInterestBank.netGain)
    setTotalAmount(highestInterestBank.totalAmount)
  }

  // Para formatı
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  // Tutar değişikliği
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setSliderValue(value)
    setAmount(value)
    setFormattedAmount(new Intl.NumberFormat('tr-TR').format(value))
  }

  // Vade değişikliği
  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setTermSliderValue(value)
    setTerm(value)
  }

  // Input değişikliği
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value === '') {
      setAmount(0)
      setFormattedAmount('')
      return
    }
    
    const number = parseInt(value, 10)
    setAmount(number)
    setSliderValue(number)
    setFormattedAmount(new Intl.NumberFormat('tr-TR').format(number))
  }

  // Para birimi değişikliği
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
    setActiveTab(newCurrency)
  }

  // Sayfa yüklendiğinde ve değerler değiştiğinde hesapla
  useEffect(() => {
    calculateResults()
  }, [amount, term, currency])

  // Slider renk değişimi için
  useEffect(() => {
    if (amountSliderRef.current) {
      const percentage = ((sliderValue - 5000) / (1000000 - 5000)) * 100
      amountSliderRef.current.style.background = `linear-gradient(to right, #ff3d00 0%, #ff3d00 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
    }
    
    if (termSliderRef.current) {
      const percentage = ((termSliderValue - 32) / (365 - 32)) * 100
      termSliderRef.current.style.background = `linear-gradient(to right, #ff3d00 0%, #ff3d00 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
    }
  }, [sliderValue, termSliderValue])

  return (
    <div className="container mx-auto px-4 py-8">
    

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Sol Kolon - Hesaplama Aracı */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="bg-[#ff3d00] p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Mevduat Hesaplama
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Para Birimi Seçimi */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                {currencyOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`flex-1 py-2 text-center font-medium ${
                      activeTab === option.value
                        ? 'bg-[#ff3d00] text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleCurrencyChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Ana Para */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 font-medium">Ana Para</label>
                  <div className="text-[#ff3d00] font-medium">{formattedAmount} {currency}</div>
                </div>
                <div className="mb-4">
                  <input
                    type="range"
                    min="5000"
                    max="1000000"
                    step="1000"
                    value={sliderValue}
                    onChange={handleAmountChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    ref={amountSliderRef}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5.000 {currency}</span>
                    <span>1.000.000 {currency}</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formattedAmount}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3d00] focus:border-[#ff3d00] transition-all"
                    placeholder="Ana para girin"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-gray-500">{currency}</span>
                  </div>
                </div>
              </div>
              
              {/* Vade */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 font-medium">Vade</label>
                  <div className="text-[#ff3d00] font-medium">{term} Gün</div>
                </div>
                <div className="mb-4">
                  <input
                    type="range"
                    min="32"
                    max="365"
                    step="1"
                    value={termSliderValue}
                    onChange={handleTermChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    ref={termSliderRef}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>32 Gün</span>
                    <span>365 Gün</span>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={term}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setTerm(value);
                      setTermSliderValue(value);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff3d00] focus:border-[#ff3d00] transition-all appearance-none"
                  >
                    {termOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
              
              {/* Sonuçlar */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Hesaplama Sonucu</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ana Para:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(amount)} {currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Faiz Kazancı:</span>
                    <span className="font-medium text-green-600">{formatCurrency(totalInterest)} {currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vade Sonu Toplam:</span>
                    <span className="font-medium text-[#ff3d00]">{formatCurrency(totalAmount)} {currency}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">* %5 stopaj vergisi düşülmüştür</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Info className="h-5 w-5 text-[#ff3d00] mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-500">
                  Bu hesaplama tahmini değerler içerir. Kesin sonuçlar için bankanızla iletişime geçiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sağ Kolon - Banka Karşılaştırma */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">En Yüksek Faizli Mevduat Hesapları</h2>
          
          {/* Banka Kartları */}
          <div className="space-y-6 mb-8">
            {calculatedResults.map((bank) => (
              <div 
                key={bank.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                style={{ borderLeft: `6px solid ${bank.color}` }}
              >
                <div className="p-6 grid grid-cols-12 gap-6 items-center">
                  {/* Banka Logosu */}
                  <div className="col-span-12 sm:col-span-3 md:col-span-3 flex justify-center sm:justify-start">
                    <div 
                      className="w-[200px] h-[100px] relative flex items-center justify-center p-3 rounded-lg"
                      style={{ backgroundColor: `${bank.color}15` }} // Çok hafif banka rengi arka plan
                    >
                      <Image 
                        src={`/images/mevduat/${bank.name.toLowerCase().replace(/\s+/g, '-').replace('alternatif bank', 'alternatif-bank').replace('yapı kredi', 'yapi-kredi').replace('garanti bbva', 'garanti-bbva').replace('iş bankası', 'is-bankasi')}.svg`} 
                        alt={bank.name} 
                        width={200} 
                        height={100} 
                        className="object-contain max-h-[80px] max-w-[180px]"
                        onError={(e) => { 
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='75' viewBox='0 0 150 75'%3E%3Crect width='150' height='75' fill='${encodeURIComponent(bank.color)}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${bank.name.charAt(0)}${bank.name.split(' ')[1]?.charAt(0) || ''}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>
                    <div className="hidden">
                      <h3 className="font-bold text-gray-800">{bank.name}</h3>
                      <p className="text-sm text-gray-600">{bank.account.type}</p>
                    </div>
                  </div>
                  
                  {/* Hesap Bilgileri - Mobil için ayrı düzen */}
                  <div className="col-span-12 sm:hidden flex flex-col items-center mt-2 mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">{bank.name}</h3>
                    <p className="text-sm text-gray-600">{bank.account.type}</p>
                  </div>
                  
                  {/* Faiz Oranı */}
                  <div className="col-span-4 sm:col-span-2 md:col-span-2 text-center">
                    <div className="text-sm text-gray-500 mb-1 font-medium">Faiz Oranı</div>
                    <div 
                      className="text-xl font-bold rounded-lg py-2 px-3 inline-block"
                      style={{ color: bank.color, backgroundColor: `${bank.color}15` }}
                    >
                      %{bank.account.interestRate.toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Net Kazanç */}
                  <div className="col-span-4 sm:col-span-3 md:col-span-3 text-center">
                    <div className="text-sm text-gray-500 mb-1 font-medium">Net Kazanç</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(bank.netGain)} {currency}
                    </div>
                  </div>
                  
                  {/* Vade Sonu */}
                  <div className="col-span-4 sm:col-span-2 md:col-span-2 text-center">
                    <div className="text-sm text-gray-500 mb-1 font-medium">Vade Sonu Tutar</div>
                    <div className="text-xl font-bold text-gray-800">
                      {formatCurrency(bank.totalAmount)} {currency}
                    </div>
                  </div>
                  
                  {/* Başvur Butonu */}
                  <div className="col-span-12 sm:col-span-2 md:col-span-2 flex justify-center sm:justify-end mt-4 sm:mt-0">
                    <button 
                      className="font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      style={{ 
                        backgroundColor: bank.color, 
                        color: 'white',
                      }}
                    >
                      Başvur
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

          
          {/* Sık Sorulan Sorular - Accordion */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Sık Sorulan Sorular</h3>
            </div>
            <Accordion />
          </div>
        </div>
      </div>
      
      {/* Mevduat Avantajları */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Mevduat Avantajları</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#ff3d00] bg-opacity-10 rounded-full flex items-center justify-center">
                <Percent className="h-8 w-8 text-[#ff3d00]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Yüksek Faiz Oranları</h3>
            <p className="text-center text-gray-600">
              Birikimlerinizi en yüksek faiz oranlarıyla değerlendirin ve paranızın değerini koruyun.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#ff3d00] bg-opacity-10 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#ff3d00]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Esnek Vade Seçenekleri</h3>
            <p className="text-center text-gray-600">
              İhtiyaçlarınıza uygun vade seçenekleri ile paranızı istediğiniz süre kadar değerlendirin.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Güvenli Yatırım</h3>
            <p className="text-center text-gray-600">
              Mevduat hesapları TMSF güvencesi altındadır. Birikimleriniz 400.000 TL'ye kadar güvence altındadır.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bölümü */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Birikimlerinizi Değerlendirmeye Başlayın</h2>
        <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
          En yüksek faiz oranlarıyla birikimlerinizi güvenle değerlendirin. Hemen hesaplama yapın ve size en uygun mevduat hesabını seçin.
        </p>
        <a href="#" className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
          Başvuru Yap
        </a>
      </div>
    </div>
  )
}
