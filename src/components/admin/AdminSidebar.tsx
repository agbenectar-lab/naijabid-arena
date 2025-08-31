import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Users, Gavel, DollarSign, Shield, BarChart3, Settings,
  Megaphone, MessageSquare, Activity, TrendingUp
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface SidebarItem {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

const adminNavItems: SidebarItem[] = [
  { title: "Users", value: "users", icon: Users },
  { title: "Auctions", value: "auctions", icon: Gavel },
  { title: "Finances", value: "financial", icon: DollarSign },
  { title: "Content Moderation", value: "moderation", icon: Shield },
  { title: "Analytics", value: "analytics", icon: BarChart3 },
  { title: "Settings", value: "settings", icon: Settings },
  { title: "Marketing", value: "marketing", icon: Megaphone },
  { title: "Support", value: "support", icon: MessageSquare },
  { title: "Operations", value: "operations", icon: Activity },
  { title: "Business Intelligence", value: "intelligence", icon: TrendingUp },
]

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    isActive={activeSection === item.value}
                    onClick={() => onSectionChange(item.value)}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}