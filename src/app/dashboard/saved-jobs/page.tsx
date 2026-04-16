import { createSupabaseServerClient } from "@/lib/supabase-server"
import { Briefcase, Building, DollarSign, MapPin, ExternalLink } from "lucide-react"

interface SavedJob {
    save_id: string;
    job_id: string;
    job_title: string;
    company_name: string;
    location: string;
    pay_rate: string;
    experience_level: string;
}

async function getSavedJobs(): Promise<SavedJob[]> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return []

    const { data: student } = await supabase
        .from('student')
        .select('student_id')
        .maybeSingle()

    if (!student) return []

    // Fetch exclusively applications marked as 'Saved'
    const { data: savedJobs, error } = await supabase
        .from('application')
        .select(`
            app_id,
            job_posting (
                job_id,
                job_title,
                rate,
                exp_lvl,
                employer (
                    co_name,
                    location
                )
            )
        `)
        .eq('student_id', student.student_id)
        .eq('status', 'Saved')
        .order('app_date', { ascending: false })

    if (error || !savedJobs) return []

    return savedJobs.map((app: any) => ({
        save_id: app.app_id,
        job_id: app.job_posting.job_id,
        job_title: app.job_posting.job_title,
        company_name: app.job_posting.employer?.co_name || 'Unknown Company',
        location: app.job_posting.employer?.location || 'Remote',
        pay_rate: app.job_posting.rate ? `$${app.job_posting.rate} / hr` : 'Competitive',
        experience_level: app.job_posting.exp_lvl || 'Not Specified'
    }))
}

export default async function SavedJobsPage() {
    const savedJobs = await getSavedJobs()

    return (
        <div className="flex flex-col gap-8 pb-10 max-w-6xl mx-auto w-full">
            <header className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 drop-shadow-sm flex items-center gap-3">
                    <HeartIcon className="w-8 h-8 text-emerald-500 fill-emerald-50" />
                    Saved Jobs
                </h1>
                <p className="text-neutral-500 mt-2 text-lg max-w-2xl leading-relaxed">
                    Review the {savedJobs.length} opportunities you tracked while matching.
                </p>
            </header>

            {savedJobs.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-neutral-300 shadow-sm max-w-2xl mx-auto w-full">
                    <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">No Saved Jobs</h3>
                    <p className="text-neutral-500 font-medium max-w-md mx-auto mt-2">
                        Head over to the Recommended Jobs deck to start matching with positions tailored to your profile.
                    </p>
                    <a href="/dashboard/jobs" className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition">
                        Find Matches
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedJobs.map((job: SavedJob) => (
                        <div key={job.save_id} className="bg-white rounded-xl shadow-sm border border-neutral-200 border-t-4 border-t-emerald-500 p-6 flex flex-col h-full hover:shadow-md hover:border-neutral-300 hover:border-t-emerald-600 transition-all relative group">
                            
                            <div className="mb-4 pr-6 flex-1">
                                <h2 className="text-xl font-black text-neutral-900 leading-tight mb-2 line-clamp-2">{job.job_title}</h2>
                                <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm">
                                    <Building className="w-4 h-4" />
                                    <span className="truncate">{job.company_name}</span>
                                </div>
                            </div>

                            <a href={`/dashboard/all-jobs`} className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-100">
                                <ExternalLink className="w-4 h-4" />
                            </a>

                            <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-neutral-100">
                                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg">
                                    <DollarSign className="w-4 h-4 text-emerald-600" />
                                    <span>{job.pay_rate}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-neutral-600">
                                    <div className="flex items-center justify-center gap-1.5 bg-neutral-50 px-2 py-2 rounded-lg">
                                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                                        <span className="truncate">{job.location}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 bg-neutral-50 px-2 py-2 rounded-lg">
                                        <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                                        <span className="truncate">{job.experience_level}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2.5 bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider text-xs rounded-lg border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}
