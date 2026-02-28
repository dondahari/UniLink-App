import { BookOpen, LogOut, Settings, User } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-neutral-50 flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-neutral-200 flex-shrink-0 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-neutral-200">
                    <a href="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 rounded-md p-1">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-neutral-900">UniLink</span>
                    </a>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1">
                    <nav className="space-y-1">
                        <a href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-neutral-100 text-neutral-900">
                            Overview
                        </a>
                        <a href="/dashboard/applications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
                            Applications
                        </a>
                        <a href="/dashboard/jobs" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
                            Recommended Jobs
                        </a>
                    </nav>
                </div>

                <div className="p-4 border-t border-neutral-200 space-y-1">
                    <a href="/dashboard/profile" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
                        <User className="w-4 h-4 mr-3" />
                        Profile
                    </a>
                    <a href="/dashboard/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                    </a>
                    <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 text-left">
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
