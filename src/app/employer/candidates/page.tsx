import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Users } from 'lucide-react'

export default async function EmployerCandidatesPage() {
    const supabase = await createSupabaseServerClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: employer } = await supabase
        .from('employer')
        .select('*')
        .eq('auth_user_id', user.id)
        .single()

    // Fetch applications mapped to jobs that belong to this employer
    let candidates: any[] = []
    if (employer) {
        // Query logic mapping natively
        const { data: jobs } = await supabase.from('job_posting').select('job_id, job_title').eq('employer_id', employer.employer_id)
        if (jobs && jobs.length > 0) {
            const jobIds = jobs.map((j: any) => j.job_id)
            const { data: apps } = await supabase
                .from('application')
                .select('*, job_posting(job_title), student(person_id)')
                .in('job_id', jobIds)
            if (apps) candidates = apps
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between bg-white px-6 py-5 rounded-xl border border-neutral-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Candidate Pipeline</h1>
                    <p className="text-sm font-medium text-neutral-500 mt-1">Review student applications across all your active listings.</p>
                </div>
            </div>

            {candidates.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white border border-neutral-200 border-dashed rounded-xl p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-neutral-100">
                        <Users className="w-10 h-10 text-neutral-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-3">No Candidates Yet</h2>
                    <p className="text-neutral-500 mb-6 max-w-md font-medium">None of your listings have received applications from students. Check your postings to ensure they are active.</p>
                    <a href="/employer/postings" className="bg-white border border-neutral-200 hover:border-primary-300 hover:text-primary-600 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors text-neutral-700">
                        View Active Postings
                    </a>
                </div>
            ) : (
                <div className="grid gap-4">
                     {/* Candidate Map Rendering Array */}
                     {candidates.map(app => (
                        <div key={app.app_id} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-neutral-900 text-lg">Application for: {app.job_posting?.job_title}</h3>
                                <p className="text-sm font-medium text-neutral-500 mt-1">Status: {app.status} • Applied: {app.app_date}</p>
                            </div>
                        </div>
                     ))}
                </div>
            )}
        </div>
    )
}
