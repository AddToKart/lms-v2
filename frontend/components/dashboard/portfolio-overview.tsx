'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const portfolioData = [
  {
    category: 'Performing Loans',
    amount: 385000,
    percentage: 90.6,
    trend: 'up',
    trendValue: '+2.3%',
    color: 'bg-green-500',
    icon: CheckCircle,
  },
  {
    category: 'At Risk (30-60 days)',
    amount: 28000,
    percentage: 6.6,
    trend: 'down',
    trendValue: '-0.8%',
    color: 'bg-yellow-500',
    icon: AlertTriangle,
  },
  {
    category: 'Non-Performing (60+ days)',
    amount: 12000,
    percentage: 2.8,
    trend: 'up',
    trendValue: '+0.2%',
    color: 'bg-red-500',
    icon: TrendingDown,
  },
];

export function PortfolioOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Portfolio Health Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {portfolioData.map((item) => (
          <div key={item.category} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item.color}/10`}>
                  <item.icon className={`h-4 w-4 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <div className="font-medium">{item.category}</div>
                  <div className="text-sm text-muted-foreground">
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{item.percentage}%</div>
                <Badge 
                  variant={item.trend === 'up' ? 'destructive' : 'default'}
                  className="text-xs"
                >
                  {item.trendValue}
                </Badge>
              </div>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}