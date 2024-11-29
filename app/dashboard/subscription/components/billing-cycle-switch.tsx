"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface BillingCycleSwitchProps {
  isYearly: boolean
  onToggle: () => void
}

export function BillingCycleSwitch({ isYearly, onToggle }: BillingCycleSwitchProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <Label htmlFor="billing-cycle" className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly</Label>
      <Switch
        id="billing-cycle"
        checked={isYearly}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="billing-cycle" className="text-sm font-medium text-gray-700 dark:text-gray-300">Yearly</Label>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
        Save 20%
      </span>
    </div>
  )
}