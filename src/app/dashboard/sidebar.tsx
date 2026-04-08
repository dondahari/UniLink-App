'use client'

import { useState } from 'react'
import { Navigation, BookOpen, LogOut, Settings, User, LayoutDashboard, FileText, List, Sparkles, Heart, Crosshair, ChevronLeft, ChevronRight } from "lucide-react"
import { logout } from "@/app/actions/auth"
import { NavLink } from "./nav-link"

interface SidebarProps {
    initials: string
    displayName: string
    email: string | undefined
}

export function Sidebar({ initials, displayName, email }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <aside 
            className={`bg-white border-r border-neutral-200 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out relative z-50 ${isCollapsed ? 'w-20' : 'w-full md:w-64'}`}
        >
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex absolute -right-3 top-20 bg-white border border-neutral-200 shadow-sm w-6 h-6 rounded-full items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary-300 transition-colors z-[60]"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <div className="h-16 flex items-center px-6 border-b border-neutral-200 overflow-hidden">
                <a href="/dashboard" className="flex items-center gap-2 min-w-max">
                    <div className="bg-primary-600 rounded-md p-1 flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && <span className="text-xl font-bold tracking-tight text-neutral-900 ml-1">UniLink</span>}
                </a>
            </div>

            {/* User avatar + name */}
            <div className={`flex items-center px-4 py-4 border-b border-neutral-100 overflow-hidden ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-semibold flex-shrink-0">
                    {initials}
                </div>
                {!isCollapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-900">{displayName}</p>
                        <p className="truncate text-xs text-neutral-500">{email}</p>
                    </div>
                )}
            </div>

            <div className={`flex-1 py-6 px-4 space-y-1 ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden'}`}>
                <nav className="space-y-1">
                    <NavLink href="/dashboard" isCollapsed={isCollapsed} icon={<LayoutDashboard className="w-4 h-4" />}>Overview</NavLink>
                    <NavLink href="/dashboard/applications" isCollapsed={isCollapsed} icon={<FileText className="w-4 h-4" />}>Applications</NavLink>
                    <NavLink href="/dashboard/all-jobs" isCollapsed={isCollapsed} icon={<List className="w-4 h-4" />}>All Jobs</NavLink>
                    <NavLink href="/dashboard/jobs" isCollapsed={isCollapsed} icon={<Sparkles className="w-4 h-4" />}>Recommended Jobs</NavLink>
                    <NavLink href="/dashboard/saved-jobs" isCollapsed={isCollapsed} icon={<Heart className="w-4 h-4" />}>Saved Jobs</NavLink>
                    <NavLink href="/dashboard/bounties" isCollapsed={isCollapsed} icon={<Crosshair className="w-4 h-4 text-emerald-500" />}>Bounties & Gigs</NavLink>
                </nav>
            </div>

            <div className={`p-4 border-t border-neutral-200 space-y-1 ${isCollapsed ? 'overflow-visible' : 'overflow-hidden'}`}>
                <a href="/dashboard/profile" className={`group relative flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 min-w-max ${isCollapsed ? 'justify-center' : ''}`}>
                    <User className={`w-4 h-4 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                    {!isCollapsed && <span>Profile</span>}
                    {isCollapsed && <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md border border-neutral-700">Profile</div>}
                </a>
                <a href="/dashboard/settings" className={`group relative flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 min-w-max ${isCollapsed ? 'justify-center' : ''}`}>
                    <Settings className={`w-4 h-4 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                    {!isCollapsed && <span>Settings</span>}
                    {isCollapsed && <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md border border-neutral-700">Settings</div>}
                </a>
                <form action={logout}>
                    <button
                        type="submit"
                        className={`group relative w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 text-left min-w-max ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut className={`w-4 h-4 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                        {!isCollapsed && <span>Logout</span>}
                        {isCollapsed && <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-md border border-neutral-700">Logout</div>}
                    </button>
                </form>
            </div>
        </aside>
    )
}
