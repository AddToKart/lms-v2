'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, CreditCard, DollarSign, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats } from '@/lib/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Clients',
      value: stats.totalClients.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
      change: '+8 this month',
      trend: 'up',
      progress: 85,
    },
    {
      title: 'Active Loans',
      value: stats.activeLoans.toLocaleString(),
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/50',
      change: '+12 this week',
      trend: 'up',
      progress: 92,
    },
    {
      title: 'Portfolio Value',
      value: `$${stats.totalPortfolio.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/50',
      change: '+5.2% vs last month',
      trend: 'up',
      progress: 78,
    },
    {
      title: 'Overdue Amount',
      value: `$${stats.overdueAmount.toLocaleString()}`,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/50',
      change: '-2.1% vs last month',
      trend: 'down',
      progress: 15,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xl lg:text-2xl font-bold">{card.value}</div>
            <div className="flex items-center justify-between">
              <Badge 
                variant={card.trend === 'up' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {card.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                <span className="hidden sm:inline">{card.change}</span>
                <span className="sm:hidden">{card.trend === 'up' ? '+' : '-'}</span>
              </Badge>
            </div>
            <Progress value={card.progress} className="h-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}