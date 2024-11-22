"use client"

import { Menu, Share2, MoreVertical, Plus } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BreadcrumbNav } from "@/dashboard/_components/breadcrumb"

interface MobileHeaderProps {
  onMenuClick: () => void
  title: string
}

export function MobileHeader({ onMenuClick, title }: MobileHeaderProps) {
  return (
    <div className="md:hidden">
      <motion.div 
        className="flex items-center justify-between p-4 bg-background text-foreground border-b border-border"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        </motion.div>
        <motion.span 
          className="font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.span>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="ml-2 bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

