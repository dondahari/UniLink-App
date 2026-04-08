import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { EmployerSidebar } from './employer-sidebar'

export default async function EmployerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    // Role-Based Access Control Guard
    const role = user.user_metadata?.role
    if (role !== 'employer') {
        redirect('/dashboard') // Kick students out of employer portal
    }

    const fullName = user.user_metadata?.full_name || user.email || 'Employer'
    const initials = fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="flex min-h-screen bg-neutral-50 flex-col md:flex-row">
            <EmployerSidebar 
                initials={initials} 
                displayName={fullName} 
                email={user?.email!} 
            />
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
