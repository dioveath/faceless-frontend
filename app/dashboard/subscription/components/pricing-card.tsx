"use client"

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice } from "@/utils/helpers"
import { getErrorRedirect } from "@/utils/redirect-toaster-helpers"
import { ProductWithPrices, Price } from '@/hooks/subscription/use-subscription'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { checkoutWithStripe, createStripePortal } from '@/utils/stripe/server'
import { getStripe } from '@/utils/stripe/client'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface PricingCardProps {
  product: ProductWithPrices
  features: string[]
  isPopular: boolean
  index: number
  isYearly: boolean
  active?: boolean
}

export function PricingCard({ product, features, isPopular, index, isYearly, active }: PricingCardProps) {
  const monthlyPrice = product.prices.find(p => p.interval === 'month')
  const yearlyPrice = product.prices.find(p => p.interval === 'year')
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice
  const yearlyDiscount = monthlyPrice?.unit_amount && yearlyPrice?.unit_amount ?
    ((monthlyPrice.unit_amount * 12 - yearlyPrice.unit_amount) / (monthlyPrice.unit_amount * 12) * 100).toFixed(0) : '0'

  const router = useRouter()
  const currentPath = usePathname()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleStripeCheckout = async () => {
    setIsCheckingOut(true)
    const price = currentPrice as Price

    const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath)

    if (errorRedirect) {
      setIsCheckingOut(false)
      return router.push(errorRedirect)
    }

    if (!sessionId) {
      setIsCheckingOut(false)
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred',
          'Please try again later or contact support.'
        )
      )
    }

    const stripe = await getStripe()
    stripe?.redirectToCheckout({ sessionId })

    setIsCheckingOut(false)
  }


  const handleStripePortal = async () => {
    setIsCheckingOut(true)
    const url = await createStripePortal(currentPath)

    setIsCheckingOut(false)
    router.push(url)
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
    >
      <Card className={`flex flex-col h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 ${isPopular ? 'ring-2 ring-purple-500' : ''}`}>
        {isPopular && (
          <div className="absolute top-0 right-0 -mt-3 -mr-3">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Sparkles className="w-4 h-4 mr-1" /> Most Popular
              </span>
            </motion.div>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl dark:text-white">{product.name}</CardTitle>
          <CardDescription className="dark:text-gray-300">{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
              {formatPrice(currentPrice?.unit_amount || 0)}
            </span>
            <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
              /{isYearly ? 'year' : 'month'}
            </span>
          </div>
          {isYearly && yearlyPrice && monthlyPrice && (
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {monthlyPrice?.unit_amount ? formatPrice(monthlyPrice.unit_amount * 12) : ''}
              </span>
              <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                Save {yearlyDiscount}%
              </span>
            </div>
          )}
          <ul className="mt-6 space-y-4">
            {features.map((feature) => (
              <motion.li
                key={feature}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto">
            <Button
              onClick={active ? handleStripePortal : handleStripeCheckout}
              className={`w-full text-lg py-3 ${isPopular
                ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                } text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-800`}
            >
              {isCheckingOut && <LoadingSpinner size={24} className="mx-auto" />}
              {!isCheckingOut && (active ? "Manage" : (product.name === 'Free Plan' ? 'Get Started' : 'Subscribe Now'))}
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function PricingCardSkeleton() {
  return (
    <Card className="flex flex-col h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
      <CardFooter className="mt-auto">
        <Skeleton className="h-12 w-full" />
      </CardFooter>
    </Card>
  )
}

