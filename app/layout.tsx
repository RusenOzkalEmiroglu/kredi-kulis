import './globals.css'
import { Montserrat, Open_Sans, Roboto_Mono } from 'next/font/google'
import Footer from './components/Footer'
import MainMenu from './components/MainMenu'
import Masthead from './components/Masthead'
import { Metadata } from 'next'
import { headers } from 'next/headers'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Kredi Kulis',
  description: 'Türkiye\'nin Finansal Süpermarketi',
  icons: {
    icon: '/images/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';
  const isHomePage = pathname === '/' || pathname === '';

  // Debug log (production'da kaldırılabilir)
  console.log('Root Layout - pathname:', pathname, 'isAdminPage:', isAdminPage, 'isLoginPage:', isLoginPage);

  return (
    <html lang="tr" className={`${montserrat.variable} ${openSans.variable} ${robotoMono.variable}`}>
      <body className="flex min-h-screen flex-col font-body transparent-selection">
        {!isAdminPage && !isLoginPage && (
          <>
            {/* Masthead alanı - menünün üzerinde */}
            {isHomePage && <Masthead />}
            <MainMenu />
          </>
        )}
        <main className={`flex-grow ${!isAdminPage && !isHomePage && !isLoginPage ? 'mt-5' : 'mt-0'}`}>
          {children}
        </main>
        {!isAdminPage && !isLoginPage && <Footer />}
      </body>
    </html>
  )
} 