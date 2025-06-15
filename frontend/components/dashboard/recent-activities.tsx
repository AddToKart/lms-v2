'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Eye, MoreHorizontal } from 'lucide-react';

const recentActivities = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment received from John Doe',
    description: 'Monthly installment for Business Loan #1001',
    amount: '$888.49',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'success',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    initials: 'JD',
  },
  {
    id: '2',
    type: 'loan_application',
    title: 'New loan application from Jane Smith',
    description: 'Equipment purchase loan for $15,000',
    amount: '$15,000',
    time: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'pending',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    initials: 'JS',
  },
  {
    id: '3',
    type: 'overdue',
    title: 'Payment overdue - Mike Johnson',
    description: 'Payment due 3 days ago for Loan #1003',
    amount: '$455.75',
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'warning',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    initials: 'MJ',
  },
  {
    id: '4',
    type: 'loan_approved',
    title: 'Loan approved for Sarah Wilson',
    description: 'Agricultural loan approved and disbursed',
    amount: '$8,500',
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'success',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    initials: 'SW',
  },
  {
    id: '5',
    type: 'client_registered',
    title: 'New client registered - David Brown',
    description: 'Profile completed and documents verified',
    amount: '',
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'info',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    initials: 'DB',
  },
];

export function RecentActivities() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Success</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>;
      case 'warning':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Overdue</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">New</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activities</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className="text-xs font-medium">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </p>
                  <div className="flex items-center space-x-2">
                    {activity.amount && (
                      <span className="text-sm font-medium">
                        {activity.amount}
                      </span>
                    )}
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}