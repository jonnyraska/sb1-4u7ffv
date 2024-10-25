"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Image, 
  Layout,
  MonitorSmartphone,
  ChevronLeft,
  Search,
  User,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  {
    name: 'Insights',
    href: '/insights',
    icon: BarChart3
  },
  {
    name: 'Images',
    href: '/images',
    icon: Image
  },
  {
    name: 'Widgets',
    href: '/widgets',
    icon: Layout
  }
];

const lowerNavigationItems = [
  {
    name: 'Notifications',
    icon: Bell,
    onClick: () => {}, // This would open the notifications panel
    badge: 3 // Number of unread notifications
  },
  {
    name: 'Help',
    icon: HelpCircle,
    onClick: () => {}, // This would open the help dialog
  }
];

export function Navigation() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "flex flex-col bg-[#FAFBFC] border-r border-gray-200 transition-all duration-300 h-screen",
        isCollapsed ? "w-[60px]" : "w-64"
      )}
    >
      <div className="flex items-center gap-2 p-4">
        <MonitorSmartphone className="h-6 w-6 text-[#0d3366] flex-shrink-0" />
        {!isCollapsed && <span className="text-xl font-semibold text-[#0d3366]">Property Vue</span>}
      </div>
      
      {!isCollapsed && (
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-white"
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-md my-1 transition-colors",
                isActive 
                  ? "bg-[#EEF1F8] text-[#0d3366]" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </div>

      <div className="px-2 mb-4">
        {lowerNavigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-2 py-2 h-auto",
                isCollapsed && "justify-center px-0"
              )}
              onClick={item.onClick}
            >
              <div className="relative">
                <Icon className="h-5 w-5 flex-shrink-0" />
                {item.badge && !isCollapsed && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              {!isCollapsed && item.name}
            </Button>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <Badge 
              variant="secondary" 
              className="absolute -bottom-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-gray-700 text-white"
            >
              G
            </Badge>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">Christopher</p>
              <p className="text-xs text-gray-500">Growth</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 text-gray-400 transition-transform",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>
      </div>
    </div>
  );
}