import React from "react"
import { motion } from "framer-motion"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Volume2, MoreVertical, Download } from 'lucide-react'

const historyItems = [
  {
    id: 1,
    title: "Its quite funny actually. Like I knew from the b...",
    timestamp: "2 weeks ago"
  },
  {
    id: 2,
    title: "Ex Spouse's AP left him.",
    timestamp: "2 weeks ago"
  },
  {
    id: 3,
    title: "So this is another story involving my flat earth ...",
    timestamp: "3 weeks ago"
  },
  {
    id: 4,
    title: "Kevin and Kevina Read the Screen",
    timestamp: "3 weeks ago"
  },
  {
    id: 5,
    title: "See history for the context... Yesterday i went ...",
    timestamp: "3 weeks ago"
  },
  {
    id: 6,
    title: "This time is worse than before",
    timestamp: "3 weeks ago"
  },
  {
    id: 7,
    title: "This Kevin has been in my life since age 6, we ...",
    timestamp: "3 weeks ago"
  },
  {
    id: 8,
    title: "Kevin makes a sandwich",
    timestamp: "3 weeks ago"
  }
]

export default function HistoryTab() {
  return (
    <TabsContent value="history" className="h-[calc(100%-40px)] overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        {historyItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <HistoryItem item={item} />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-between items-center pt-4"
        >
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </motion.div>
      </motion.div>
    </TabsContent>
  )
}

type HistoryItemProps = {
  item: {
    id: number
    title: string
    timestamp: string
  }
}

function HistoryItem({ item } : HistoryItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="flex items-center gap-1"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Copy text</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}

