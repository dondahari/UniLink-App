import { TinderJobDeck } from "./tinder-job-deck"
import { createSupabaseServerClient } from "@/lib/supabase-server"

type RecommendedJob = {
    job_id: string
    job_title: string
    company_name: string
    location: string
    pay_rate: string
    experience_level: string
    score?: number // Made internal for debugging logic if needed
}

async function getRecommendedJobs(): Promise<RecommendedJob[]> {
    const supabase = await createSupabaseServerClient()

    // 1. Fetch current Student attributes
    const { data: { user } } = await supabase.auth.getUser()
    
    let studentMajor = ""
    let studentSkills = ""

    if (user) {
        // Find their person_id, then their student record! (Or just query student directly, RLS protects it)
        const { data: studentRecord } = await supabase
            .from('student')
            .select('major, skills')
            .maybeSingle()
        
        if (studentRecord) {
            studentMajor = (studentRecord.major || "").toLowerCase()
            studentSkills = (studentRecord.skills || "").toLowerCase()
        }
    }

    // 2. Fetch all jobs with category
    const { data: rawJobs, error } = await supabase
        .from('job_posting')
        .select(`
            job_id,
            job_title,
            rate,
            exp_lvl,
            employer (
                co_name,
                location
            ),
            category (
                cat_name
            )
        `)

    if (error || !rawJobs) {
        console.error('Error fetching jobs:', error)
        return []
    }

    // 3. Score algorithm
    const scoredJobs = (rawJobs as any[]).map((job) => {
        let score = 0
        const titleTarget = job.job_title.toLowerCase()
        const catTarget = (job.category?.cat_name || "").toLowerCase()

        // Give points if the job title roughly matches their major
        if (studentMajor && titleTarget.includes(studentMajor.split(' ')[0])) {
            score += 50
        }
        if (studentMajor && catTarget.includes(studentMajor.split(' ')[0])) {
            score += 30
        }

        // Give points for keyword overlaps in skills
        const splitSkills = studentSkills.split(',').map(s => s.trim()).filter(Boolean)
        splitSkills.forEach(skill => {
            if (titleTarget.includes(skill)) score += 20
        })

        return {
            job_id: job.job_id,
            job_title: job.job_title,
            company_name: job.employer?.co_name || 'Unknown Company',
            location: job.employer?.location || 'Remote',
            pay_rate: job.rate ? `$${job.rate} / hr` : 'Competitive',
            experience_level: job.exp_lvl || 'Not Specified',
            score
        }
    })

    // 4. Sort strictly by score, then limit to Top 10
    scoredJobs.sort((a, b) => b.score - a.score)
    
    return scoredJobs.slice(0, 10)
}

export default async function RecommendedJobsPage() {
    const recommendedJobs = await getRecommendedJobs()

    return (
        <div className="max-w-5xl mx-auto space-y-8 w-full pb-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 drop-shadow-sm">Match with Jobs</h1>
                <p className="text-neutral-500 mt-2 text-lg max-w-2xl mx-auto leading-relaxed">
                    We've scanned the network to find {recommendedJobs.length} opportunities that align with your unique skills and academic major.
                </p>
            </div>

            <TinderJobDeck initialJobs={recommendedJobs} />
        </div>
    )
}
