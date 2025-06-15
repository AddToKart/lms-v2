export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  nationalId: string;
  occupation: string;
  monthlyIncome: number;
  creditScore?: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface Loan {
  id: string;
  clientId: string;
  client?: Client;
  amount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalAmount: number;
  balance: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'defaulted';
  applicationDate: Date;
  approvalDate?: Date;
  disbursementDate?: Date;
  dueDate: Date;
  purpose: string;
  collateral?: string;
  guarantor?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  loanId: string;
  loan?: Loan;
  amount: number;
  principal: number;
  interest: number;
  penalty: number;
  paymentDate: Date;
  dueDate: Date;
  status: 'paid' | 'partial' | 'overdue' | 'penalty';
  method: 'cash' | 'bank_transfer' | 'mobile_money' | 'check';
  reference?: string;
  notes?: string;
  createdAt: Date;
}

export interface Schedule {
  id: string;
  loanId: string;
  loan?: Loan;
  installmentNumber: number;
  dueDate: Date;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  balance: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidAmount?: number;
  paidDate?: Date;
  penaltyAmount?: number;
  createdAt: Date;
}

export interface DashboardStats {
  totalClients: number;
  activeLoans: number;
  totalPortfolio: number;
  overdueAmount: number;
  collectionRate: number;
  defaultRate: number;
  monthlyDisbursements: number;
  monthlyCollections: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'loan_officer' | 'accountant' | 'client';
  permissions: string[];
  createdAt: Date;
}