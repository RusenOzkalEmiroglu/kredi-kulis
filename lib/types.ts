// Global Type Definitions
// Bu dosya projenin tüm type tanımlarını içerir

// ===== API Response Types =====
export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
}

// ===== Currency & Exchange Rate Types =====
export interface Currency {
  code: string;
  name: string;
  rate: number;
  change: number;
  symbol?: string;
}

export interface ExchangeRateResponse {
  rates: Currency[];
  lastUpdated?: string;
}

// ===== Gold Price Types =====
export interface GoldPrice {
  name: string;
  buyPrice: string;
  sellPrice: string;
  change: string;
  updateTime: string;
  url?: string;
}

// ===== Loan Calculation Types =====
export interface LoanCalculationParams {
  principal: number;      // Ana para
  interestRate: number;   // Faiz oranı (yıllık %)
  termMonths: number;     // Vade (ay)
  loanType: 'equal_installment' | 'equal_principal' | 'balloon';
}

export interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: PaymentScheduleItem[];
}

export interface LoanOffer {
  bankName: string;
  interestRate: number;
  loanAmount: number;
  termMonths: number;
  monthlyFee?: number;
  processingFee?: number;
}

export interface LoanComparison extends LoanOffer {
  calculation: LoanResult;
  score: number;
}

// ===== Bank & Financial Institution Types =====
export interface Bank {
  id: string;
  name: string;
  logo: string;
  website: string;
  isActive: boolean;
}

export interface BankProduct {
  id: string;
  bankId: string;
  productType: 'loan' | 'credit_card' | 'deposit' | 'investment';
  name: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  features: string[];
  isActive: boolean;
}

// ===== Credit Card Types =====
export interface CreditCard {
  id: string;
  bankId: string;
  name: string;
  annualFee: number;
  interestRate: number;
  cashAdvanceRate: number;
  minCreditLimit: number;
  maxCreditLimit: number;
  features: string[];
  category: 'standard' | 'gold' | 'platinum' | 'student' | 'business';
  isActive: boolean;
}

// ===== Investment Types =====
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

export interface InvestmentFund {
  id: string;
  name: string;
  type: 'equity' | 'bond' | 'mixed' | 'money_market';
  price: number;
  change: number;
  changePercent: number;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  minInvestment: number;
}

// ===== User & Subscription Types =====
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
}

// ===== Campaign & Marketing Types =====
export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  priority: number;
}

export interface MastheadItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  button_text: string;
  background_color: string;
  text_color: string;
  button_color: string;
  display_order: number;
  is_active: boolean;
}

// ===== Form & Validation Types =====
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

// ===== Component Props Types =====
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageHeaderProps extends BaseComponentProps {
  title: string;
  description?: string;
}

export interface DropdownMenuProps {
  isOpen: boolean;
  categories: { title: string; href: string; description?: string }[];
  onClose: () => void;
  title: string;
}

// ===== Utility Types =====
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// ===== Database Types (Supabase) =====
export interface DatabaseRow {
  id: string;
  created_at: string;
  updated_at: string;
}

// ===== API Endpoint Types =====
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface APIEndpoint {
  method: HTTPMethod;
  path: string;
  description: string;
  params?: Record<string, string>;
  body?: Record<string, any>;
  response: Record<string, any>;
}

// ===== Error Types =====
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// ===== Configuration Types =====
export interface AppConfig {
  apiBaseUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableExperiments: boolean;
  };
}
