import { Client, Loan, Payment, Schedule, DashboardStats } from './types';

// Mock clients data
export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    address: '123 Main St, Cityville',
    dateOfBirth: new Date('1985-05-15'),
    nationalId: 'ID123456789',
    occupation: 'Small Business Owner',
    monthlyIncome: 5000,
    creditScore: 720,
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '+1234567891',
    address: '456 Oak Ave, Townsburg',
    dateOfBirth: new Date('1990-08-22'),
    nationalId: 'ID123456790',
    occupation: 'Teacher',
    monthlyIncome: 3500,
    creditScore: 680,
    status: 'active',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1234567892',
    address: '789 Pine Rd, Villageton',
    dateOfBirth: new Date('1988-12-10'),
    nationalId: 'ID123456791',
    occupation: 'Farmer',
    monthlyIncome: 2800,
    creditScore: 650,
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Mock loans data
export const mockLoans: Loan[] = [
  {
    id: '1',
    clientId: '1',
    amount: 10000,
    interestRate: 12,
    termMonths: 12,
    monthlyPayment: 888.49,
    totalAmount: 10661.88,
    balance: 8500,
    status: 'active',
    applicationDate: new Date('2024-01-15'),
    approvalDate: new Date('2024-01-16'),
    disbursementDate: new Date('2024-01-17'),
    dueDate: new Date('2025-01-17'),
    purpose: 'Business expansion',
    collateral: 'Shop inventory',
    guarantor: 'Mary Doe',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '2',
    clientId: '2',
    amount: 5000,
    interestRate: 10,
    termMonths: 6,
    monthlyPayment: 855.24,
    totalAmount: 5131.44,
    balance: 4276.20,
    status: 'active',
    applicationDate: new Date('2024-02-01'),
    approvalDate: new Date('2024-02-02'),
    disbursementDate: new Date('2024-02-03'),
    dueDate: new Date('2024-08-03'),
    purpose: 'Equipment purchase',
    collateral: 'Teaching certificate',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-03')
  },
  {
    id: '3',
    clientId: '3',
    amount: 7500,
    interestRate: 15,
    termMonths: 18,
    monthlyPayment: 488.82,
    totalAmount: 8798.76,
    balance: 7500,
    status: 'pending',
    applicationDate: new Date('2024-02-10'),
    dueDate: new Date('2025-08-10'),
    purpose: 'Agricultural tools',
    collateral: 'Farm land deed',
    guarantor: 'Local Farmers Cooperative',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];

// Mock payments data
export const mockPayments: Payment[] = [
  {
    id: '1',
    loanId: '1',
    amount: 888.49,
    principal: 788.49,
    interest: 100,
    penalty: 0,
    paymentDate: new Date('2024-02-17'),
    dueDate: new Date('2024-02-17'),
    status: 'paid',
    method: 'bank_transfer',
    reference: 'TXN001',
    createdAt: new Date('2024-02-17')
  },
  {
    id: '2',
    loanId: '1',
    amount: 888.49,
    principal: 794.97,
    interest: 93.52,
    penalty: 0,
    paymentDate: new Date('2024-03-17'),
    dueDate: new Date('2024-03-17'),
    status: 'paid',
    method: 'cash',
    reference: 'CASH002',
    createdAt: new Date('2024-03-17')
  },
  {
    id: '3',
    loanId: '2',
    amount: 855.24,
    principal: 813.57,
    interest: 41.67,
    penalty: 0,
    paymentDate: new Date('2024-03-03'),
    dueDate: new Date('2024-03-03'),
    status: 'paid',
    method: 'mobile_money',
    reference: 'MM003',
    createdAt: new Date('2024-03-03')
  }
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalClients: 156,
  activeLoans: 89,
  totalPortfolio: 425000,
  overdueAmount: 12500,
  collectionRate: 94.2,
  defaultRate: 2.1,
  monthlyDisbursements: 75000,
  monthlyCollections: 68500
};

// Helper function to get client by ID
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

// Helper function to get loans with client data
export const getLoansWithClients = (): (Loan & { client: Client })[] => {
  return mockLoans.map(loan => ({
    ...loan,
    client: getClientById(loan.clientId)!
  }));
};

// Helper function to get payments with loan and client data
export const getPaymentsWithDetails = (): (Payment & { loan: Loan & { client: Client } })[] => {
  const loansWithClients = getLoansWithClients();
  return mockPayments.map(payment => ({
    ...payment,
    loan: loansWithClients.find(loan => loan.id === payment.loanId)!
  }));
};