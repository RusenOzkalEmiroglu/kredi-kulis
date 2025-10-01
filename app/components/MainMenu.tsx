'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Home, Briefcase, FileText, ChevronDown, Menu, X, BookOpen } from 'lucide-react';

// Basit menü öğeleri
const menuItems = [
  { title: 'Kredi', href: '/kredi', icon: <Home size={16} className="mr-2" /> },
  { title: 'Kredi Kartı', href: '/kredi-karti', icon: <CreditCard size={16} className="mr-2" /> },
  { title: 'Varlıklar', href: '/varliklar', icon: <Briefcase size={16} className="mr-2" /> },
  { title: 'Hesaplama Araçları', href: '/hesaplama-araclari', icon: <FileText size={16} className="mr-2" /> }
];

// Alt menü verileri
const submenuData: { [key: string]: { img?: string, title: string, href: string }[] } = { // Added optional img type
  'Kredi': [
    { img: '/images/menu-backgrounds/ihtiyac-kredisi.png', title: 'İhtiyaç Kredisi', href: '/kredi/ihtiyac-kredisi' },
    { img: '/images/menu-backgrounds/tasit-kredisi.png', title: 'Taşıt Kredisi', href: '/kredi/tasit-kredisi' },
    { img: '/images/menu-backgrounds/konut-kredisi.png', title: 'Konut Kredisi', href: '/kredi/konut-kredisi' },
    { img: '/images/menu-backgrounds/ticari-kredi.png', title: 'Ticari Kredi', href: '/kredi/ticari-kredi' },
  ],
  'Kredi Kartı': [
    { img: '/images/menu-backgrounds/aidatsiz-kart.png', title: 'Aidatsız Kartlar', href: '/kredi-karti/aidatsiz-kartlar' },
    { img: '/images/menu-backgrounds/extrali-kartlar.png', title: 'Extralı Kartlar', href: '/kredi-karti/extrali-kartlar' },
    { img: '/images/menu-backgrounds/ogrenci-kart.png', title: 'Öğrenci Kartları', href: '/kredi-karti/ogrenci-kartlari' },
    { img: '/images/menu-backgrounds/ticari-kart.png', title: 'Ticari Kartlar', href: '/kredi-karti/ticari' },
  ],
  'Varlıklar': [
    { img: '/images/menu-backgrounds/mevduat.png', title: 'Mevduat', href: '/varliklar/mevduat' },
    { img: '/images/menu-backgrounds/doviz.png', title: 'Döviz', href: '/varliklar/doviz' },
    { img: '/images/menu-backgrounds/altin.png', title: 'Altın', href: '/varliklar/altin' },
    { img: '/images/menu-backgrounds/hisse-senedi.png', title: 'Hisse Senedi', href: '/varliklar/hisse-senetleri' },
    { img: '/images/menu-backgrounds/yatirim-fonlari.png', title: 'Yatırım Fonları', href: '/varliklar/yatirim-fonlari' },
  ],
  'Hesaplama Araçları': [
    { img: '/images/menu-backgrounds/kredi-hesaplama-araclari.png', title: 'Ne Kadar Kredi Çekebilirim?', href: '/hesaplama-araclari/ne-kadar-kredi' },
    { img: '/images/menu-backgrounds/1.png', title: 'Taksitli Nakit Avans', href: '/hesaplama-araclari/kredi-karti-taksitli-nakit-avans' },
    { img: '/images/menu-backgrounds/2.png', title: 'Kart Asgari Ödeme Tutarı', href: '/hesaplama-araclari/kredi-karti-asgari-odeme' },
    { img: '/images/menu-backgrounds/3.png', title: 'Kart Gecikme Faizi', href: '/hesaplama-araclari/kredi-karti-gecikme-faizi' },
    { img: '/images/menu-backgrounds/4.png', title: 'Faiz Oranına Göre Hesaplama', href: '/hesaplama-araclari/faiz-oranina-gore' },
    { img: '/images/menu-backgrounds/5.png', title: 'Kredi Yapılandırma', href: '/hesaplama-araclari/kredi-yapilandirma' },
    { img: '/images/menu-backgrounds/6.png', title: 'Bileşik Faiz Hesaplama', href: '/hesaplama-araclari/bilesik-faiz' },
    { img: '/images/menu-backgrounds/7.png', title: 'Taksite Göre Hesaplama', href: '/hesaplama-araclari/taksite-gore' },
  ]
};

export default function MainMenu() {
  // State management
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fare menü alanına girdiğinde ilgili menüyü aç
  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(title);
  };

  // Fare menü alanından çıktığında kısa bir gecikmeyle menüyü kapat
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Delay closing the menu slightly to allow moving mouse to submenu
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // 150ms delay
  };

  // Dışarı tıklayınca kapatmak için
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null); // Close menu if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
    };
  }, []);

  // Basit SVG placeholder
  const getImageUrl = (img: string | undefined, title: string) => {
    if (img) return img;
    // Simple gray placeholder with first letter
    const svg = `<svg width='80' height='64' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' rx='8' fill='#f3f4f6'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='#9ca3af' font-family='Arial, sans-serif'>${title[0]}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const submenuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      ref={menuRef} 
      className="relative z-50"
      initial="hidden"
      animate="visible"
      variants={menuVariants}
    >
      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-t-4 border-t-primary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Kredi Kulis Logo"
                  width={150}
                  height={40}
                  priority
                  className="h-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Menu Items */}
            <div className="hidden lg:flex flex-1 justify-center h-full">
              {menuItems.map((menu, index) => (
                <motion.div
                  key={menu.title}
                  className="h-full flex items-center relative"
                  onMouseEnter={() => handleMouseEnter(menu.title)}
                  onMouseLeave={handleMouseLeave}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={menu.href}
                    className={`
                      h-full px-6 flex items-center gap-2 font-medium text-base 
                      transition-all duration-300 ease-out
                      border-b-2 border-transparent
                      hover:border-primary hover:bg-primary/5
                      focus:outline-none focus:ring-2 focus:ring-primary/50
                      ${activeMenu === menu.title 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'text-gray-700 hover:text-primary'
                      }
                    `}
                  >
                    {menu.icon}
                    <span>{menu.title}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMenu === menu.title ? 'rotate-180' : ''
                      }`} 
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link 
                  href="/rapor" 
                  className="px-4 py-2 flex items-center gap-2 font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  <FileText size={16} />
                  <span>Finansal Rapor</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link 
                  href="/bilgi" 
                  className="px-4 py-2 flex items-center gap-2 font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                >
                  <BookOpen size={16} />
                  <span>Blog</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Desktop Dropdown Submenu */}
      <AnimatePresence>
        {activeMenu && submenuData[activeMenu] && (
          <motion.div
            className="absolute left-0 right-0 top-full w-full bg-white/95 backdrop-blur-md shadow-xl z-40 border-t border-gray-100"
            variants={submenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto py-8 px-4">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                variants={submenuVariants}
              >
                {submenuData[activeMenu]?.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex flex-col items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20"
                      onClick={() => setActiveMenu(null)}
                    >
                      <div
                        className="w-full h-20 bg-contain bg-center bg-no-repeat mb-3 rounded-lg overflow-hidden"
                        style={{ backgroundImage: `url(${getImageUrl(item.img, item.title)})` }}
                      />
                      <span className="text-sm font-medium text-center text-gray-700 group-hover:text-primary transition-colors duration-200">
                        {item.title}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl z-40 border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto py-6 px-4">
              <div className="space-y-4">
                {menuItems.map((menu, index) => (
                  <motion.div
                    key={menu.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={menu.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {menu.icon}
                      <span className="font-medium">{menu.title}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <hr className="my-4 border-gray-200" />
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/rapor"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText size={16} />
                    <span className="font-medium">Finansal Rapor</span>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/bilgi"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen size={16} />
                    <span className="font-medium">Blog</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}