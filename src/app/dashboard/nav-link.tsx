'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLinkProps {
    href: string
    children: React.ReactNode
    icon?: React.ReactNode
    isCollapsed?: boolean
}

export function NavLink({ href, children, icon, isCollapsed = false }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href || (pathname.startsWith(href) && href !== '/dashboard')

    const activeClass = "bg-neutral-100 text-neutral-900"
    const inactiveClass = "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"

    return (
        <Link href={href} className={`group relative flex items-center px-3 py-2 text-sm font-medium rounded-md min-w-max ${isCollapsed ? 'justify-center' : ''} ${isActive ? activeClass : inactiveClass}`}>
            {icon && <span className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`}>{icon}</span>}
            {!isCollapsed && <span>{children}</span>}

            {/* Collapsed Hover Tooltip */}
            {isCollapsed && (
                <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md border border-neutral-700">
                    {children}
                </div>
            )}
        </Link>
    )
}
