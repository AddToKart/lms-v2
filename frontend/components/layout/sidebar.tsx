'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  Building2,
  LogOut,
  TrendingUp,
  AlertTriangle,
  Menu,
} from 'lucide-react';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    name: 'Clients', 
    href: '/clients', 
    icon: Users,
    badge: '156'
  },
  { 
    name: 'Loans', 
    href: '/loans', 
    icon: CreditCard,
    badge: '89'
  },
  { 
    name: 'Payments', 
    href: '/payments', 
    icon: DollarSign,
    badge: null
  },
  { 
    name: 'Schedules', 
    href: '/schedules', 
    icon: Calendar,
    badge: '12'
  },
  { 
    name: 'Reports', 
    href: '/reports', 
    icon: FileText,
    badge: null
  },
];

const quickStats = [
  { label: 'Portfolio', value: '$425K', icon: TrendingUp, color: 'text-green-600' },
  { label: 'Overdue', value: '$12.5K', icon: AlertTriangle, color: 'text-red-600' },
];

function SidebarContent({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                LoanFlow
              </span>
              <div className="text-xs text-muted-foreground">Pro</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="p-4 space-y-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <stat.icon className={cn('h-4 w-4', stat.color)} />
                <div>
                  <div className="text-sm font-medium">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} onClick={onNavigate}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start h-11 transition-all duration-200',
                    collapsed && 'justify-center px-2',
                    isActive && 'bg-primary/10 text-primary border border-primary/20'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && (
                    <>
                      <span className="ml-3">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-muted-foreground h-11',
            collapsed && 'justify-center px-2'
          )}
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden lg:flex h-screen flex-col border-r bg-card transition-all duration-300',
          collapsed ? 'w-16' : 'w-72'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  LoanFlow
                </span>
                <div className="text-xs text-muted-foreground">Pro</div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform',
                collapsed && 'rotate-180'
              )}
            />
          </Button>
        </div>
        <SidebarContent collapsed={collapsed} />
      </div>
    </>
  );
}