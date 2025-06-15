import { z } from 'zod';

export const clientSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
  }),
  nationalId: z.string().min(5, 'National ID must be at least 5 characters'),
  occupation: z.string().min(2, 'Occupation must be at least 2 characters'),
  monthlyIncome: z.number().min(0, 'Monthly income must be positive'),
});

export const loanApplicationSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  amount: z.number().min(100, 'Loan amount must be at least $100'),
  interestRate: z.number().min(0.1).max(50, 'Interest rate must be between 0.1% and 50%'),
  termMonths: z.number().min(1).max(60, 'Term must be between 1 and 60 months'),
  purpose: z.string().min(10, 'Purpose must be at least 10 characters'),
  collateral: z.string().optional(),
  guarantor: z.string().optional(),
});

export const paymentSchema = z.object({
  loanId: z.string().min(1, 'Loan is required'),
  amount: z.number().min(0.01, 'Payment amount must be positive'),
  method: z.enum(['cash', 'bank_transfer', 'mobile_money', 'check']),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type LoanApplicationFormData = z.infer<typeof loanApplicationSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;