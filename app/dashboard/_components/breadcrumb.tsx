"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(path => path)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`
          const isLast = index === paths.length - 1
          const title = path.charAt(0).toUpperCase() + path.slice(1)

          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage>{title}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

