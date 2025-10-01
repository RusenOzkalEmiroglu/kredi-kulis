"use client";

import { motion } from 'framer-motion';
import AnasayfaHesaplamaTabs from './components/AnasayfaHesaplamaTabs'
import AnasayfaGuncelDoviz from './components/anasayfa-guncel-doviz'
import BankPartners from './components/BankPartners'
import EmailSubscription from './components/EmailSubscription'
import HomeCarousel from './components/HomeCarousel'
import SpecialCampaigns from './components/SpecialCampaigns'

// ===== Animation Variants =====
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.6
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      duration: 0.8
    }
  }
};

export default function Home() {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      {/* Hero Section with Modern Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Current Exchange Rates - Top Banner */}
          <motion.div
            variants={sectionVariants}
            className="mb-8"
          >
            <AnasayfaGuncelDoviz 
              backgroundColorClass="bg-white/80 backdrop-blur-sm"
              titleColorClass="text-primary"
              valueColorClass="text-gray-700"
              showTitle={false}
              displayCount={5} 
              enabledCurrencies={[
                'USD', 'EUR', 'GBP', 'CHF', 'KWD', 
                'SAR', 'JPY', 'AUD', 'CAD', 'SEK', 
                'NOK', 'DKK', 'BGN', 'RON', 'CNY'
              ]}
              autoSlide={true} 
              slideInterval={5000} 
            />
          </motion.div>
          
          {/* Hero Title Section - Enhanced */}
          <motion.div 
            variants={heroVariants}
            className="text-center py-12 relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="w-96 h-96 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <motion.h1 
                className="heading-hero text-primary mb-4 font-display"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Türkiye'nin Kredi Süpermarketi
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                En uygun faiz oranları, şeffaf karşılaştırma, hızlı başvuru. 
                Kredi ihtiyaçlarınız için tek adres.
              </motion.p>
              
              {/* Trust indicators */}
              <motion.div 
                className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>%100 Güvenli</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Hızlı Onay</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Ücretsiz Karşılaştırma</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4">
        {/* Hesaplama Aracı Section - Enhanced */}
        <motion.section 
          variants={sectionVariants}
          className="py-16"
        >
          <div className="text-center mb-12">
            <h2 className="heading-section text-gray-900 mb-4">
              Kredi Hesaplama Araçları
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              İhtiyacınıza uygun kredi seçeneklerini karşılaştırın ve en avantajlı teklifi bulun.
            </p>
          </div>
          
          <AnasayfaHesaplamaTabs />
        </motion.section>

        {/* Sana Özel Kampanyalar Section */}
        <motion.section 
          variants={sectionVariants}
          className="py-16 bg-gray-50 -mx-4 px-4 rounded-2xl"
        >
          <SpecialCampaigns />
        </motion.section>
        
        {/* Bank Partners Section */}
        <motion.section 
          variants={sectionVariants}
          className="py-16"
        >
          <BankPartners />
        </motion.section>
        
        {/* Carousel Section */}
        <motion.section 
          variants={sectionVariants}
          className="py-16"
        >
          <HomeCarousel />
        </motion.section>
        
        {/* Email Subscription Section */}
        <motion.section 
          variants={sectionVariants}
          className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 -mx-4 px-4 rounded-2xl"
        >
          <EmailSubscription />
        </motion.section>
      </div>
    </motion.main>
  )
}