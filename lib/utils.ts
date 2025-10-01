import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  LoanCalculationParams, 
  LoanResult, 
  PaymentScheduleItem, 
  LoanOffer, 
  LoanComparison 
} from './types'

// ===== Tailwind CSS Utility =====
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ===== Loan Calculation Utilities =====

/**
 * Eşit taksit hesaplama (Annuity)
 * En yaygın kullanılan kredi hesaplama yöntemi
 */
export function calculateEqualInstallment(params: LoanCalculationParams): LoanResult {
  const { principal, interestRate, termMonths } = params;
  const monthlyRate = interestRate / 100 / 12;
  
  // Eşit taksit formülü: P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;
  
  // Ödeme planı oluşturma
  const paymentSchedule = generatePaymentSchedule(params, monthlyPayment);
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    paymentSchedule
  };
}

/**
 * Eşit anapara hesaplama
 * Her ay aynı miktarda anapara ödenir, faiz azalır
 */
export function calculateEqualPrincipal(params: LoanCalculationParams): LoanResult {
  const { principal, interestRate, termMonths } = params;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPrincipal = principal / termMonths;
  
  let remainingBalance = principal;
  let totalPayment = 0;
  const paymentSchedule: PaymentScheduleItem[] = [];
  
  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const totalMonthlyPayment = monthlyPrincipal + interestPayment;
    
    remainingBalance -= monthlyPrincipal;
    totalPayment += totalMonthlyPayment;
    
    paymentSchedule.push({
      month,
      payment: Math.round(totalMonthlyPayment * 100) / 100,
      principal: Math.round(monthlyPrincipal * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      remainingBalance: Math.round(remainingBalance * 100) / 100
    });
  }
  
  const totalInterest = totalPayment - principal;
  
  return {
    monthlyPayment: paymentSchedule[0].payment, // İlk taksit
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    paymentSchedule
  };
}

/**
 * Ödeme planı oluşturma (Eşit taksit için)
 */
function generatePaymentSchedule(
  params: LoanCalculationParams, 
  monthlyPayment: number
): PaymentScheduleItem[] {
  const { principal, interestRate, termMonths } = params;
  const monthlyRate = interestRate / 100 / 12;
  
  let remainingBalance = principal;
  const schedule: PaymentScheduleItem[] = [];
  
  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    
    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      remainingBalance: Math.round(Math.max(0, remainingBalance) * 100) / 100
    });
  }
  
  return schedule;
}

/**
 * Kredi karşılaştırma ve skorlama
 */
export function compareLoanOffers(offers: LoanOffer[]): LoanComparison[] {
  return offers.map(offer => {
    const params: LoanCalculationParams = {
      principal: offer.loanAmount,
      interestRate: offer.interestRate,
      termMonths: offer.termMonths,
      loanType: 'equal_installment'
    };
    const calculation = calculateEqualInstallment(params);
    const score = calculateLoanScore(offer, calculation);
    
    return {
      ...offer,
      calculation,
      score
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Kredi skorlama algoritması
 * Faiz oranı, ücretler ve toplam maliyet dikkate alınır
 */
function calculateLoanScore(offer: LoanOffer, calculation: LoanResult): number {
  let score = 100;
  
  // Faiz oranı penaltısı (yüksek faiz = düşük skor)
  score -= (offer.interestRate - 10) * 2; // 10% üzerindeki her % için -2 puan
  
  // Aylık ücret penaltısı
  if (offer.monthlyFee) {
    score -= (offer.monthlyFee / 10); // Her 10 TL aylık ücret için -1 puan
  }
  
  // Dosya masrafı penaltısı
  if (offer.processingFee) {
    score -= (offer.processingFee / 100); // Her 100 TL dosya masrafı için -1 puan
  }
  
  // Toplam maliyet penaltısı
  const totalCostRatio = calculation.totalInterest / offer.loanAmount;
  score -= totalCostRatio * 50; // Toplam faiz/ana para oranı için puan düşürme
  
  return Math.max(0, Math.round(score * 100) / 100);
}

// ===== Currency & Number Formatting =====

/**
 * Para formatı (Türk Lirası)
 */
export function formatCurrency(amount: number, currency: string = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Sayı formatı (Türkçe)
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

/**
 * Yüzde formatı
 */
export function formatPercentage(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num / 100);
}

// ===== Date Utilities =====

/**
 * Tarih formatı (Türkçe)
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

/**
 * Saat formatı (Türkçe)
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

// ===== Validation Utilities =====

/**
 * Email validasyonu
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Türk telefon numarası validasyonu
 */
export function isValidTurkishPhone(phone: string): boolean {
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * TC Kimlik No validasyonu
 */
export function isValidTCKN(tckn: string): boolean {
  if (!/^\d{11}$/.test(tckn)) return false;
  
  const digits = tckn.split('').map(Number);
  
  // İlk rakam 0 olamaz
  if (digits[0] === 0) return false;
  
  // 10. rakam kontrolü
  const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7;
  const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
  const check1 = (sum1 - sum2) % 10;
  
  if (check1 !== digits[9]) return false;
  
  // 11. rakam kontrolü
  const totalSum = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0);
  const check2 = totalSum % 10;
  
  return check2 === digits[10];
}

// ===== String Utilities =====

/**
 * URL slug oluşturma (Türkçe karakterler dahil)
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Metin kısaltma
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// ===== Array Utilities =====

/**
 * Dizi karıştırma (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Dizi gruplandırma
 */
export function groupBy<T, K extends keyof any>(
  array: T[], 
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

// ===== Performance Utilities =====

/**
 * Debounce fonksiyonu
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle fonksiyonu
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
