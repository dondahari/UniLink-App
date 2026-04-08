import { createSupabaseServerClient } from "@/lib/supabase-server"
import { Sidebar } from "./sidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Fetch the person record to display the user's name
    const { data: person } = user
        ? await supabase
            .from('person')
            .select('full_name')
            .eq('auth_user_id', user.id)
            .single()
        : { data: null }

    const displayName = person?.full_name ?? user?.email ?? 'User'
    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <div className="flex min-h-screen bg-neutral-50 flex-col md:flex-row">
            
            <Sidebar 
                initials={initials} 
                displayName={displayName} 
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
