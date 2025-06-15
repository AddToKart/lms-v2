'use client';

import { Button } from '@/components/ui/button';
import { Plus, UserPlus, FileText, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddClientModal } from '@/components/modals/add-client-modal';
import { AddLoanModal } from '@/components/modals/add-loan-modal';
import { AddPaymentModal } from '@/components/modals/add-payment-modal';

export function QuickActions() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <FileText className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Generate Report</span>
        <span className="sm:hidden">Report</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Quick Add</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <AddClientModal>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UserPlus className="mr-2 h-4 w-4" />
              New Client
            </DropdownMenuItem>
          </AddClientModal>
          <AddLoanModal>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Plus className="mr-2 h-4 w-4" />
              Loan Application
            </DropdownMenuItem>
          </AddLoanModal>
          <AddPaymentModal>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DollarSign className="mr-2 h-4 w-4" />
              Record Payment
            </DropdownMenuItem>
          </AddPaymentModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}