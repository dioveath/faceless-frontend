"use client"

import { CreditCard, LogOut, Settings, Sun, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ProfileDropdown({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`w-full flex items-center text-foreground hover:bg-accent hover:text-accent-foreground ${isCollapsed ? 'justify-center' : ''}`}>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-3 text-left">
              <div className="font-semibold">dioveath</div>
              <div className="text-sm text-muted-foreground">Free</div>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <div className="p-4">
          <div className="font-semibold">raisaroj360@gmail.com</div>
          <Button variant="outline" className="w-full mt-2">Switch Team</Button>
        </div>
        <DropdownMenuItem>
          <CreditCard className="w-4 h-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-2">Preferences</div>
          <DropdownMenuItem>
            <Sun className="w-4 h-4 mr-2" />
            Theme
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Globe className="w-4 h-4 mr-2" />
            Language
          </DropdownMenuItem>
        </div>
        <div className="p-4 pt-0">
          <Button variant="outline" className="w-full">Upgrade Plan</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

