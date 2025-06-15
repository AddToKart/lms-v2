'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { Charts } from '@/components/dashboard/charts';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview';
import { mockDashboardStats } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 ml-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground mt-1 text-sm lg:text-base">
                Welcome back! Here's what's happening with your loan portfolio today.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <QuickActions />
            </div>
          </div>

          <StatsCards stats={mockDashboardStats} />

          <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              <Charts />
              <div className="hidden lg:block">
                <PortfolioOverview />
              </div>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <RecentActivities />
              <div className="lg:hidden">
                <PortfolioOverview />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}