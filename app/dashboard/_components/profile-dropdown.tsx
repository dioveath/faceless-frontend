"use client"

import { useState, useEffect } from "react"
import { CreditCard, LogOut, Settings, Sun, Globe, Trash2 } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/user/use-user"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { redirect } from "next/navigation"

interface UserProfile {
  name: string
  email: string
  avatar: string
  plan: string
}

export function ProfileDropdown({ isCollapsed }: { isCollapsed: boolean }) {
  const { user, loading, logout } = useUser()

  if (loading) {
    return (
      <div className={cn(
        "flex items-center space-x-2",
        isCollapsed && "flex-col space-x-0 space-y-2"
      )}>
        <Skeleton className="h-8 w-8 rounded-full" />
        {!isCollapsed && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-3 w-[60px]" />
          </div>
        )}
      </div>
    )
  }

  const { avatar_url, full_name, email } = user?.user_metadata || {}

  const handleLogout = async () => {
    await logout()
    // refresh the page to clear the cache
    redirect("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex flex-1 items-center py-6",
              isCollapsed ? "w-full p-0 justify-center" : "w-full justify-start"
            )}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={avatar_url} />
              <AvatarFallback>{full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-3 text-left">
                <div className="font-semibold">{full_name}</div>
                <div className="text-sm">{`Pro`}</div>
              </div>
            )}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-popover text-popover-foreground">
        <div className="p-4">
          <div className="font-semibold">{email}</div>
          {/* <Button variant="outline" className="w-full mt-2 text-foreground border-border hover:bg-accent hover:text-accent-foreground">Switch Team</Button> */}
        </div>
        <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
          <CreditCard className="w-4 h-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DeleteAlertDialog handleLogout={logout} loading={loading} />
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-2">Preferences</div>
          <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
            <Sun className="w-4 h-4 mr-2" />
            Theme
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
            <Globe className="w-4 h-4 mr-2" />
            Language
          </DropdownMenuItem>
        </div>
        <div className="p-4 pt-0">
          <Button variant="outline" className="w-full text-foreground border-border hover:bg-accent hover:text-accent-foreground">Upgrade Plan</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type LogoutAlertDialogProps = {
  handleLogout: () => void
  loading: boolean
}

const DeleteAlertDialog = ({ handleLogout, loading }: LogoutAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground" disabled={loading}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will log you out of your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}