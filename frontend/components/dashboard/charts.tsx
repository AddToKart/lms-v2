'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';

const monthlyData = [
  { name: 'Jan', disbursements: 65000, collections: 58000, applications: 45 },
  { name: 'Feb', disbursements: 75000, collections: 68500, applications: 52 },
  { name: 'Mar', disbursements: 80000, collections: 72000, applications: 48 },
  { name: 'Apr', disbursements: 70000, collections: 75000, applications: 61 },
  { name: 'May', disbursements: 85000, collections: 78000, applications: 55 },
  { name: 'Jun', disbursements: 90000, collections: 82000, applications: 58 },
];

const loanStatusData = [
  { name: 'Active', value: 89, color: '#22c55e' },
  { name: 'Pending', value: 12, color: '#f59e0b' },
  { name: 'Completed', value: 45, color: '#3b82f6' },
  { name: 'Defaulted', value: 8, color: '#ef4444' },
];

const performanceData = [
  { name: 'Jan', rate: 92.5, target: 95 },
  { name: 'Feb', rate: 94.2, target: 95 },
  { name: 'Mar', rate: 91.8, target: 95 },
  { name: 'Apr', rate: 95.1, target: 95 },
  { name: 'May', rate: 93.7, target: 95 },
  { name: 'Jun', rate: 94.9, target: 95 },
];

const riskData = [
  { name: 'Jan', lowRisk: 85, mediumRisk: 12, highRisk: 3 },
  { name: 'Feb', lowRisk: 87, mediumRisk: 10, highRisk: 3 },
  { name: 'Mar', lowRisk: 82, mediumRisk: 15, highRisk: 3 },
  { name: 'Apr', lowRisk: 89, mediumRisk: 8, highRisk: 3 },
  { name: 'May', lowRisk: 86, mediumRisk: 11, highRisk: 3 },
  { name: 'Jun', lowRisk: 88, mediumRisk: 9, highRisk: 3 },
];

export function Charts() {
  return (
    <div className="grid gap-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Disbursements vs Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="disbursements" fill="#3b82f6" name="Disbursements" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="collections" fill="#22c55e" name="Collections" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collection Rate Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis domain={[85, 100]} className="text-muted-foreground" />
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    name="Actual Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    name="Target Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={loanStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {loanStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="lowRisk"
                    stackId="1"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.6}
                    name="Low Risk"
                  />
                  <Area
                    type="monotone"
                    dataKey="mediumRisk"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                    name="Medium Risk"
                  />
                  <Area
                    type="monotone"
                    dataKey="highRisk"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="High Risk"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}