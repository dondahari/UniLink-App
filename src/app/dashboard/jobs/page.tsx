type RecommendedJob = {
    job_id: string
    job_title: string
    company_name: string
    location: string
    pay_rate: string
    experience_level: string
}

async function getRecommendedJobs(): Promise<RecommendedJob[]> {
    return [
        {
            job_id: 'job-01',
            job_title: 'Product Designer',
            company_name: 'Campus Creatives',
            location: 'Remote',
            pay_rate: '$45 / hr',
            experience_level: 'Mid-level',
        },
        {
            job_id: 'job-02',
            job_title: 'Front-End Engineer',
            company_name: 'NextGen Labs',
            location: 'Hybrid · Austin, TX',
            pay_rate: '$80k - $95k',
            experience_level: 'Entry-level',
        },
        {
            job_id: 'job-03',
            job_title: 'Data Analyst Intern',
            company_name: 'Insight Campus',
            location: 'On-site · Boston, MA',
            pay_rate: '$22 / hr',
            experience_level: 'Internship',
        },
    ]
}

export default async function RecommendedJobsPage() {
    const recommendedJobs = await getRecommendedJobs()

    return (
        <div className="max-w-4xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Recommended Jobs</h1>
                <p className="text-sm text-neutral-500 mt-1">
                    Job listings tailored to your skills and preferences.
                </p>
            </div>

            <div className="space-y-4">
                {recommendedJobs.map((job) => (
                    <div key={job.job_id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold text-neutral-900 truncate">{job.job_title}</h2>
                                <p className="text-sm text-neutral-500 truncate">{job.company_name}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-600">
                                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1">{job.location}</span>
                                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1">{job.pay_rate}</span>
                                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1">{job.experience_level}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
