import { createSupabaseServerClient } from "@/lib/supabase-server"
import { InteractiveJobBoard } from "./interactive-job-board"

type JobPosting = {
    job_id: string
    job_title: string
    company_name: string
    location: string
    pay_rate: string
    experience_level: string
    contract_time: string
    pay_type: string
    job_desc: string
}

// Fetch all jobs directly without any parameters!
async function getAllJobs(): Promise<JobPosting[]> {
    const supabase = await createSupabaseServerClient()

    const { data: rawJobs, error } = await supabase
        .from('job_posting')
        .select(`
            job_id,
            job_title,
            rate,
            exp_lvl,
            contract_time,
            pay_type,
            job_desc,
            employer (
                co_name,
                location
            )
        `)
        .order('posted', { ascending: false })

    if (error || !rawJobs) {
        console.error('Error fetching all jobs:', error)
        return []
    }

    return (rawJobs as any[]).map((job) => ({
        job_id: job.job_id,
        job_title: job.job_title,
        company_name: job.employer?.co_name || 'Unknown Company',
        location: job.employer?.location || 'Remote',
        pay_rate: job.rate ? job.rate.toString() : 'Competitive',
        experience_level: job.exp_lvl || 'Not Specified',
        contract_time: job.contract_time || 'Permanent',
        pay_type: job.pay_type || 'Hourly',
        job_desc: job.job_desc || 'No specific description provided for this listing.'
    }))
}

export default async function AllJobsPage() {
    // 1. Fetch exactly once on the server.
    const jobsList = await getAllJobs()

    return (
        <div className="max-w-[1400px] mx-auto space-y-4 w-full px-4 sm:px-6 lg:px-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">All Jobs</h1>
                <p className="text-sm text-neutral-500 mt-1 mb-8">
                    Explore all available job listings across all industries.
                </p>
            </div>

            {/* 2. Pass the entire payload into the Client Board allowing 0ms reaction times */}
            <InteractiveJobBoard initialJobs={jobsList} />
        </div>
    )
}

