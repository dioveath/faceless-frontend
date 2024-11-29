'use client'

import { motion } from 'framer-motion'
import { PricingCard, PricingCardSkeleton } from './pricing-card'
import { useSubscriptions } from '@/hooks/subscription/use-subscription'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { BillingCycleSwitch } from './billing-cycle-switch'

export default function SubscriptionPage() {
  const { data, isLoading, error } = useSubscriptions()
  const [isYearly, setIsYearly] = useState(false)

  const toggleBillingCycle = () => {
    setIsYearly(prev => !prev)
  }

  return (
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative"
        >
          {/* Subtle background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute right-1/2 bottom-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-12 relative"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">Choose Your Plan</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Select the perfect plan for your needs</p>
          </motion.div>

          <BillingCycleSwitch isYearly={isYearly} onToggle={toggleBillingCycle} />

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || 'An error occurred while fetching subscription data.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3 relative">
            {isLoading ? (
              <>
                <PricingCardSkeleton />
                <PricingCardSkeleton />
                <PricingCardSkeleton />
              </>
            ) : (
              data?.map((product, index) => (
                <PricingCard
                  key={product.id}
                  product={product}
                  features={product.description?.split(', ') || []}
                  isPopular={product.name === 'Hobby Plan'}
                  index={index}
                  isYearly={isYearly}
                />
              ))
            )}
          </div>
        </motion.div>
      </div>
  )
}

