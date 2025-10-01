# 🚀 Teknoloji Yığını Rehberi - Kredi Kulis Projesi

## 📋 Genel Bakış

Bu dokümantasyon, Kredi Kulis projesinde kullanılan teknoloji yığınını ve gelecekteki projeler için en iyi uygulamaları içerir.

## 🎯 Ana Teknolojiler

### Frontend Framework
- **Next.js 14.1.0** - React tabanlı full-stack framework
  - App Router kullanımı (app/ dizin yapısı)
  - Server-side rendering (SSR) ve static site generation (SSG)
  - API Routes ile backend entegrasyonu
  - Gelişmiş resim optimizasyonu

### UI ve Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
  - Özel renk paleti (primary: #ff3d00 - Turuncu)
  - Responsive tasarım sistemi
  - Custom animations ve keyframes
- **Framer Motion 12.11.0** - Animasyon kütüphanesi
  - Sayfa geçişleri
  - Hover efektleri
  - Scroll-based animasyonlar

### UI Components
- **Radix UI** - Headless UI bileşenleri
  - `@radix-ui/react-select 2.2.2` - Select component
  - `@radix-ui/react-slot 1.2.0` - Slot component
  - `@radix-ui/react-tabs 1.1.8` - Tabs component
- **Lucide React 0.329.0** - Modern ikon seti
- **React Icons 5.5.0** - Popüler ikon kütüphaneleri

### Database ve Backend
- **Supabase 2.49.4** - Backend-as-a-Service
  - PostgreSQL veritabanı
  - Real-time subscriptions
  - Authentication sistemi
  - File storage
- **Supabase Auth Helpers** - Next.js entegrasyonu
  - `@supabase/auth-helpers-nextjs 0.10.0`
  - `@supabase/ssr 0.6.1`

### Data Processing
- **CSV Parse 5.6.0** - CSV dosya işleme
- **Papa Parse 5.5.2** - CSV parser
- **Fast XML Parser 5.0.9** - XML işleme
- **XML2JS 0.6.2** - XML to JSON dönüştürme
- **Cheerio 1.0.0** - Server-side HTML parsing

### HTTP ve API
- **Axios 1.8.4** - HTTP client
- **Date-fns 4.1.0** - Tarih işlemleri

### Carousel ve Slider
- **Swiper 11.2.6** - Modern slider/carousel

### Development Tools
- **TypeScript 5.3.3** - Type safety
- **ESLint** - Code linting
- **Stylelint** - CSS linting
- **Bundle Analyzer** - Bundle size analizi

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── admin/             # Admin paneli
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
├── data/                  # Static data ve types
├── lib/                   # Utility fonksiyonları
├── models/                # Database modelleri
├── styles/                # Global CSS
├── types/                 # TypeScript type definitions
└── utils/                 # Yardımcı fonksiyonlar
```

## 🎨 Tasarım Sistemi

### Renk Paleti
```css
:root {
  --primary: #8A2BE2;        /* Ana mor */
  --primary-light: #9D4EDD;  /* Açık mor */
  --primary-dark: #6A0DAD;   /* Koyu mor */
  --dark: #000000;           /* Siyah */
  --light: #F8F8F8;          /* Açık gri */
}
```

### Font Sistemi
- **Inter** - Ana font (Google Fonts)
- **Montserrat** - Display font (Google Fonts)
- **Library 3 am** - Özel brand font (.otf)

### Animasyon Stratejisi
- **Framer Motion** - React bileşen animasyonları
- **GSAP** - Karmaşık timeline animasyonları
- **CSS Animations** - Basit hover efektleri

## 🔧 Konfigürasyon Dosyaları

### Next.js Konfigürasyonu
```javascript
// next.config.js
{
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    formats: ['image/webp', 'image/avif']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}
```

### Tailwind Konfigürasyonu
```javascript
// tailwind.config.js
{
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: '#8A2BE2' },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    }
  }
}
```

## 📦 Önemli Paketler ve Kullanım Alanları

### Production Dependencies
| Paket | Versiyon | Kullanım Alanı |
|-------|----------|----------------|
| next | 14.2.29 | Framework |
| react | 18.2.0 | UI Library |
| @supabase/supabase-js | 2.54.0 | Database |
| framer-motion | 11.0.3 | Animasyonlar |
| tailwindcss | 3.4.1 | Styling |
| gsap | 3.12.5 | Gelişmiş animasyonlar |
| @react-three/fiber | 8.15.16 | 3D grafik |

### Development Dependencies
| Paket | Versiyon | Kullanım Alanı |
|-------|----------|----------------|
| typescript | 5.3.3 | Type checking |
| eslint | 8.56.0 | Code linting |
| @next/bundle-analyzer | 15.3.4 | Bundle analizi |

## 🚀 Performans Optimizasyonları

### Resim Optimizasyonu
- Next.js Image component kullanımı
- WebP ve AVIF format desteği
- Lazy loading
- Responsive images

### Bundle Optimizasyonu
- Tree shaking
- Code splitting
- Dynamic imports
- Production console.log removal

### Caching Stratejisi
- Static generation
- ISR (Incremental Static Regeneration)
- API route caching
- CDN integration

## 🔐 Güvenlik Önlemleri

### Authentication
- NextAuth.js ile güvenli authentication
- Iron Session ile session yönetimi
- bcryptjs ile password hashing

### API Güvenliği
- Environment variables
- CORS konfigürasyonu
- Rate limiting (önerilir)
- Input validation

## 📱 Responsive Tasarım

### Breakpoints
```css
/* Mobile First Approach */
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### Mobile Optimizasyonlar
- Touch-friendly interfaces
- Optimized animations
- Reduced bundle size
- Fast loading times

## 🛠️ Geliştirme Araçları

### Code Quality
- ESLint konfigürasyonu
- Prettier formatting
- TypeScript strict mode
- Husky pre-commit hooks (önerilir)

### Testing (Önerilir)
- Jest unit testing
- Cypress e2e testing
- React Testing Library

## 📈 Monitoring ve Analytics

### Önerilen Araçlar
- Vercel Analytics
- Google Analytics 4
- Sentry error tracking
- Web Vitals monitoring

## 🔄 Deployment

### Vercel Deployment
- Automatic deployments
- Preview deployments
- Environment variables
- Edge functions

### Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
MONGODB_URI=
NEXTAUTH_SECRET=
```

## 📚 Öğrenme Kaynakları

### Dokümantasyonlar
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)

### Best Practices
- React 18 concurrent features
- Next.js 14 app router patterns
- TypeScript best practices
- Performance optimization techniques

## 🎯 Gelecek Projeler İçin Öneriler

1. **Bu teknoloji yığınını temel alın**
2. **Component library oluşturun**
3. **Design system dokümantasyonu yapın**
4. **Testing stratejisi geliştirin**
5. **CI/CD pipeline kurun**
6. **Monitoring ve logging ekleyin**
7. **SEO optimizasyonları yapın**
8. **Accessibility standartlarını uygulayın**

---

*Bu dokümantasyon, Appective projesinin başarılı teknoloji yığını analizi sonucu oluşturulmuştur.*
