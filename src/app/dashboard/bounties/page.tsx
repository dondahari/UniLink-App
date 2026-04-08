import { createSupabaseServerClient } from "@/lib/supabase-server"
import { BountyBoard } from "./bounty-board"
import { Crosshair } from "lucide-react"

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

async function getBounties(): Promise<JobPosting[]> {
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
            employer!inner (
                co_name,
                location
            )
        `)
        .eq('pay_type', 'Bounty')
        .order('posted', { ascending: false })

    if (error || !rawJobs) {
        console.error('Error fetching bounties:', error)
        return []
    }

    return (rawJobs as any[]).map((job) => ({
        job_id: job.job_id,
        job_title: job.job_title,
        company_name: job.employer?.co_name || 'UNKNOWN ENTITY',
        location: job.employer?.location || 'REMOTE / CLASSIFIED',
        pay_rate: job.rate ? job.rate.toString() : '0',
        experience_level: job.exp_lvl || 'ALL OPERATIVES',
        contract_time: job.contract_time || 'IMMEDIATE',
        pay_type: job.pay_type || 'BOUNTY',
        job_desc: job.job_desc || 'NO MISSION PARAMETERS PROVIDED. PROCEED WITH CAUTION.'
    }))
}

export default async function BountiesPage() {
    const initialBounties = await getBounties()

    return (
        <div className="flex flex-col gap-8 min-h-[100vh] -m-6 md:-m-8 p-6 md:p-8 bg-[#0a0a0c] text-neutral-100 overflow-x-hidden relative">
            
            {/* Immersive Casino/Neon Background Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[150px] mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900 rounded-full blur-[150px] mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <header className="mb-2 relative z-10 border-b border-neutral-800 pb-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="relative inline-flex items-center justify-center p-2 bg-emerald-950 border border-emerald-500 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Crosshair className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] uppercase">
                        Active Bounties
                    </h1>
                </div>
                <p className="text-emerald-400 mt-2 text-sm max-w-2xl font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></span>
                    Secure network established. Terminal ready.
                </p>
            </header>

            <div className="relative z-10">
                <BountyBoard initialJobs={initialBounties} />
            </div>
        </div>
    )
}
