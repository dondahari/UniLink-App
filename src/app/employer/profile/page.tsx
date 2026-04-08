import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { ClientProfileForm } from './client-profile-form'

export default async function EmployerProfilePage() {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: employer } = await supabase
        .from('employer')
        .select('*')
        .eq('auth_user_id', user.id)
        .single()

    if (!employer) {
        return <div className="p-8 text-red-500 font-bold">Error: No Employer record found.</div>
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-5xl mx-auto">
            {/* Header Block constraints */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-neutral-900">Company Profile</h1>
                <p className="text-sm font-medium text-neutral-500 mt-1">Manage your public-facing employer details and corporate branding.</p>
            </div>

            {/* Native Client Architecture handling explicit Avatar uploads */}
            <ClientProfileForm employer={employer} />
        </div>
    )
}
