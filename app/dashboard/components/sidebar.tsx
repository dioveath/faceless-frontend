"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Folder, Flag, Plus, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ProfileDropdown } from "./profile-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllVideoGenerationsByCurrentUser } from "@/hooks/generations/use-generations";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const { data: pagesData, isLoading, isFetching, error } = useAllVideoGenerationsByCurrentUser(1, 10);

  const SidebarContent = ({ isMobile = false }) => (
    <motion.div className="flex flex-col h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex-1 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && <div className="text-xl font-bold text-foreground">V0</div>}
          <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-accent", isCollapsed && "w-full")} onClick={isMobile ? onMobileClose : toggleSidebar}>
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </motion.div>
          </Button>
        </div>
        <div className="p-4">
          <Link href="/dashboard/generate/reddit-stories" passHref>
            <Button variant="ghost" className={cn("w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground", isCollapsed && !isMobile && "px-0 justify-center")}>
              <Plus className="w-5 h-5" />
              {(!isCollapsed || isMobile) && <span className="ml-2">New Generation</span>}
            </Button>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 px-2">
          <SidebarItemLink href="/dashboard/library" icon={Book} label="Library" isCollapsed={isCollapsed && !isMobile} isActive={pathname === "/dashboard/library"} />
          <SidebarItemLink href="/dashboard/projects" icon={Folder} label="Projects" isCollapsed={isCollapsed && !isMobile} isActive={pathname === "/dashboard/projects"} />
          <SidebarItemLink href="/dashboard/feedback" icon={Flag} label="Feedback" isCollapsed={isCollapsed && !isMobile} isActive={pathname === "/dashboard/feedback"} />
        </nav>
        {(!isCollapsed || isMobile) && (
          <ScrollArea className="flex-1 px-4 py-2">
            <div className="text-sm text-muted-foreground mb-2">Recent Generations</div>
            {isLoading || isFetching ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                {pagesData?.pages[0]?.data.map((generation) => (
                  <Link key={generation.id} href={`/dashboard/generations/${generation.id}`} passHref>
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground">
                      [{generation.status}] - {generation.id.slice(0, 12)}...
                    </Button>
                  </Link>
                ))}
                <Link href="/dashboard/generations" passHref>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground flex items-center">
                    View All
                    <ChevronRight className="ml-auto w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </ScrollArea>
        )}
      </div>
      <div className={cn("p-4 border-t border-border", isCollapsed && "flex flex-col items-center")}>
        {isCollapsed && (
          <div className="mb-4">
            <ThemeToggle />
          </div>
        )}
        <div className={cn("w-full flex items-center justify-between", isCollapsed && "flex-col")}>
          <ProfileDropdown isCollapsed={isCollapsed} />
          {!isCollapsed && <ThemeToggle />}
        </div>
      </div>
    </motion.div>
  );

  // Mobile sidebar using Sheet component
  const mobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
      <SheetContent side="left" className="w-[300px] p-0 bg-background border-r border-border">
        <SidebarContent isMobile={true} />
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar
  const desktopSidebar = (
    <motion.aside className={cn("bg-background text-foreground h-screen flex flex-col transition-all duration-300 relative hidden md:flex", isCollapsed ? "w-16" : "w-64")} initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
      <SidebarContent isMobile={false} />
    </motion.aside>
  );

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  );
}

interface SidebarItemLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
}

function SidebarItemLink({ href, icon: Icon, label, isCollapsed, isActive }: SidebarItemLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="ghost" className={cn("w-full text-foreground hover:bg-accent hover:text-accent-foreground", isCollapsed ? "px-0 justify-center" : "px-4 justify-start", isActive && "bg-accent text-accent-foreground")} asChild>
          <a>
            <Icon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">{label}</span>}
          </a>
        </Button>
      </motion.div>
    </Link>
  );
}
