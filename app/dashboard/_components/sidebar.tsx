"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Folder, Flag, Plus, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ProfileDropdown } from "./profile-dropdown"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isMobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        {!isMobile && (
          <div className="p-4 flex items-center justify-between">
            {!isCollapsed && <div className="text-xl font-bold">V0</div>}
            <Button 
              variant="ghost" 
              size="icon"
              className={cn("text-gray-400 hover:text-foreground", isCollapsed && "w-full")}
              onClick={toggleSidebar}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          </div>
        )}
        <div className="p-4">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground",
              (isCollapsed && !isMobile) && "px-0 justify-center"
            )}
          >
            <Plus className="w-5 h-5" />
            {(!isCollapsed || isMobile) && <span className="ml-2">New Chat</span>}
          </Button>
        </div>
        <nav className="flex flex-col gap-2 px-2">
          <SidebarItemLink href="/dashboard/library" icon={Book} label="Library" isCollapsed={isCollapsed && !isMobile} isActive={pathname === "/dashboard/library"} />
          <SidebarItemLink href="/dashboard/projects" icon={Folder} label="Projects" isCollapsed={isCollapsed && !isMobile} isActive={pathname === "/dashboard/projects"} />
          <SidebarItemLink href="/dashboard/feedback" icon={Flag} label="Feedback" isCollapsed={isCollapsed && !isMobile} isActive={pathname === "/dashboard/feedback"} />
        </nav>
        {(!isCollapsed || isMobile) && (
          <ScrollArea className="flex-1 px-4 py-2">
            <div className="text-sm text-muted-foreground mb-2">Recent Chats</div>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground">
                Similar dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground flex items-center">
                View All
                <ChevronRight className="ml-auto w-4 h-4" />
              </Button>
            </div>
          </ScrollArea>
        )}
      </div>
      {!isMobile && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <ProfileDropdown isCollapsed={isCollapsed} />
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  )

  // Mobile sidebar using Sheet component
  const mobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
      <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
        <SheetHeader className="p-4 text-left border-b border-border">
          <SheetTitle className="text-foreground flex items-center justify-between">
            <span>V0</span>
            <Button variant="ghost" size="icon" onClick={onMobileClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <SidebarContent isMobile={true} />
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <ProfileDropdown isCollapsed={false} />
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  // Desktop sidebar
  const desktopSidebar = (
    <aside className={cn(
      "bg-background text-foreground h-screen flex flex-col transition-all duration-300 relative hidden md:flex",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <SidebarContent />
    </aside>
  )

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  )
}

interface SidebarItemLinkProps {
  href: string
  icon: React.ElementType
  label: string
  isCollapsed: boolean
  isActive: boolean
}

function SidebarItemLink({ href, icon: Icon, label, isCollapsed, isActive }: SidebarItemLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full text-foreground hover:bg-accent hover:text-accent-foreground",
          isCollapsed ? "px-0 justify-center" : "px-4 justify-start",
          isActive && "bg-accent text-accent-foreground"
        )}
        asChild
      >
        <a>
          <Icon className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">{label}</span>}
        </a>
      </Button>
    </Link>
  )
}

