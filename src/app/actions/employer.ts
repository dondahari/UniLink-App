'use server'

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from 'next/cache'

export async function updateEmployerProfile(formData: FormData) {
    const supabase = await createSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized mapping.")

    const employer_id = formData.get('employer_id') as string
    
    // Explicit security boundary to prevent employer ID spoofing natively
    const { data: currentEmployer } = await supabase.from('employer').select('auth_user_id').eq('employer_id', employer_id).single()
    if (currentEmployer?.auth_user_id !== user.id) {
        throw new Error("Invalid permissions mapping context.")
    }

    const co_name = formData.get('co_name') as string
    const industry = formData.get('industry') as string
    const location = formData.get('location') as string
    const website = formData.get('website') as string
    const logo_url = formData.get('logo_url') as string

    const payload: any = {
        co_name,
        industry,
        location,
        website
    }

    // Only patch avatar if directly manipulated by form controls conditionally
    if (logo_url) {
        payload.logo_url = logo_url
    }

    const { error } = await supabase
        .from('employer')
        .update(payload)
        .eq('employer_id', employer_id)

    if (error) {
        console.error("Profile update error:", error)
        throw new Error("Failed to natively update employer entity constraints.")
    }

    revalidatePath('/employer/profile')
    return { success: true }
}
