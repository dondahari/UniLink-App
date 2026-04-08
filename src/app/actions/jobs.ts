'use server'

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveJobAction(jobId: string) {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Unauthorized" }

    // Resolve exactly which student profile this user belongs to
    const { data: student } = await supabase
        .from('student')
        .select('student_id')
        .maybeSingle()

    if (!student) return { error: "Student profile pipeline required" }

    // Prevent duplicates if the user swipes right on a job they already saved or applied to
    const { data: existing } = await supabase
        .from('application')
        .select('app_id')
        .eq('student_id', student.student_id)
        .eq('job_id', jobId)
        .maybeSingle()
        
    if (existing) {
        return { success: true, message: "Job mechanically tracked already" }
    }

    // Insert as explicit generic 'Saved' status
    const { error } = await supabase
        .from('application')
        .insert({
            student_id: student.student_id,
            job_id: jobId,
            status: 'Saved'
        })

    if (error) {
        console.error("Action Hook Data Error:", error)
        return { error: "Failed to pipe job" }
    }

    return { success: true }
}

export async function createJobListing(formData: FormData) {
    const supabase = await createSupabaseServerClient()

    // Read payload variables
    const employer_id = formData.get('employer_id') as string
    const cat_id = formData.get('cat_id') as string
    const job_title = formData.get('job_title') as string
    const rate = parseFloat(formData.get('rate') as string)
    const pay_type = formData.get('pay_type') as string
    const exp_lvl = formData.get('exp_lvl') as string
    const contract_time = formData.get('contract_time') as string
    const job_desc = formData.get('job_desc') as string

    // Validate security bounds natively
    if (!employer_id || !cat_id || !job_title || !job_desc || isNaN(rate)) {
        throw new Error("Missing required fields or invalid numeric inputs.")
    }

    // Execute standard insertion mapping
    const { error } = await supabase
        .from('job_posting')
        .insert({
            employer_id,
            cat_id,
            job_title,
            rate,
            pay_type,
            exp_lvl,
            contract_time,
            job_desc
        })

    if (error) {
        console.error("Job Creation Error:", error)
        throw new Error("Failed to insert new job listing natively.")
    }

    revalidatePath('/employer/postings')
    redirect('/employer/postings')
}
