'use client'

import { motion } from 'framer-motion'
import { CreditCard, Home, Car, Wallet, PiggyBank, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from './ui/Card'

// ===== Category Data =====
const categories = [
  {
    title: 'İhtiyaç Kredisi',
    icon: Wallet,
    description: 'En uygun faiz oranlarıyla ihtiyaç kredisi',
    href: '/ihtiyac-kredisi',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Konut Kredisi',
    icon: Home,
    description: 'Hayalinizdeki eve en uygun konut kredisi',
    href: '/konut-kredisi',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Kredi Kartı',
    icon: CreditCard,
    description: 'Size en uygun kredi kartını seçin',
    href: '/kredi-karti',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Taşıt Kredisi',
    icon: Car,
    description: 'Araç alımlarınız için taşıt kredisi',
    href: '/tasit-kredisi',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Mevduat',
    icon: PiggyBank,
    description: 'En yüksek faizli mevduat hesapları',
    href: '/mevduat',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  }
]

// ===== Animation Variants =====
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
}

export default function CategoryGrid() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category, index) => {
        const Icon = category.icon
        return (
          <motion.div
            key={category.title}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Link href={category.href} className="block h-full">
              <Card 
                variant="elevated" 
                padding="lg" 
                hover={true}
                interactive={true}
                className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    {/* Icon Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-4 ${category.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${category.iconColor}`} />
                      </div>
                      
                      {/* Arrow Icon */}
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Gradient Bar */}
                    <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
} 