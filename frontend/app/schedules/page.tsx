'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Calendar, AlertCircle } from 'lucide-react';
import { format, addMonths, isAfter, isBefore } from 'date-fns';
import { getLoansWithClients } from '@/lib/mock-data';
import { GenerateScheduleModal } from '@/components/modals/generate-schedule-modal';

// Generate mock schedule data
const generateSchedule = () => {
  const loans = getLoansWithClients().filter(loan => loan.status === 'active');
  const schedules = [];
  
  loans.forEach(loan => {
    const startDate = loan.disbursementDate || new Date();
    for (let i = 1; i <= loan.termMonths; i++) {
      const dueDate = addMonths(startDate, i);
      const isPastDue = isAfter(new Date(), dueDate);
      schedules.push({
        id: `${loan.id}-${i}`,
        loanId: loan.id,
        loan,
        installmentNumber: i,
        dueDate,
        principalAmount: loan.monthlyPayment * 0.8, // Simplified calculation
        interestAmount: loan.monthlyPayment * 0.2,
        totalAmount: loan.monthlyPayment,
        balance: loan.balance - (loan.monthlyPayment * (i - 1)),
        status: isPastDue ? 'overdue' : i <= 2 ? 'paid' : 'pending',
        paidAmount: i <= 2 ? loan.monthlyPayment : undefined,
        paidDate: i <= 2 ? addMonths(startDate, i - 1) : undefined,
      });
    }
  });
  
  return schedules;
};

export default function SchedulesPage() {
  const [schedules] = useState(generateSchedule());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.loan.client.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      schedule.loan.client.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || schedule.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case 'partial':
        return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const overdueCount = schedules.filter(s => s.status === 'overdue').length;
  const upcomingCount = schedules.filter(s => 
    s.status === 'pending' && 
    isBefore(s.dueDate, addMonths(new Date(), 1))
  ).length;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Payment Schedules
                </h1>
                <p className="text-muted-foreground">
                  Monitor repayment schedules and track payment due dates.
                </p>
              </div>
              <GenerateScheduleModal />
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Overdue
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {overdueCount}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Due This Month
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {upcomingCount}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Repayment Schedule</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search schedules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Installment #</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Paid Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">
                          {schedule.loan.client.firstName}{' '}
                          {schedule.loan.client.lastName}
                        </TableCell>
                        <TableCell>{schedule.installmentNumber}</TableCell>
                        <TableCell>
                          {format(schedule.dueDate, 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          ${schedule.principalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${schedule.interestAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${schedule.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${schedule.balance.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                        <TableCell>
                          {schedule.paidDate
                            ? format(schedule.paidDate, 'MMM dd, yyyy')
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}