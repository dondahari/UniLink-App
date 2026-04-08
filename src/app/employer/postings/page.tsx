import { createSupabaseServerClient } from '@/lib/supabase-server'
import { PlusCircle, Target, Briefcase, Users, Bookmark, BarChart2, CalendarClock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function EmployerPostingsPage() {
    const supabase = await createSupabaseServerClient()
    
    // Fetch current employer entity natively
    const { data: { user } } = await supabase.auth.getUser()
    const { data: employer } = await supabase
        .from('employer')
        .select('*')
        .eq('auth_user_id', user?.id)
        .single()

    // Fetch existing postings mapped directly to deep application aggregation counts natively!
    let postings: any[] = []
    if (employer) {
        const { data } = await supabase
            .from('job_posting')
            .select(`
                *,
                application(count)
            `)
            .eq('employer_id', employer.employer_id)
            .order('created_at', { ascending: false })
            
        if (data) postings = data
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center justify-between bg-white px-6 py-5 rounded-xl border border-neutral-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">My Postings</h1>
                    <p className="text-sm font-medium text-neutral-500 mt-1">Manage active listings and review deep analytic pipelines.</p>
                </div>
                {postings.length > 0 && (
                    <div className="flex items-center gap-3">
                        <a href="/employer/postings/create?type=job" className="bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 border border-primary-200">
                            <Briefcase className="w-4 h-4" />
                            Job
                        </a>
                        <a href="/employer/postings/create?type=bounty" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 border border-emerald-200">
                            <Target className="w-4 h-4" />
                            Bounty
                        </a>
                    </div>
                )}
            </div>

            {/* Content Validation Check */}
            {postings.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white border border-neutral-200 border-dashed rounded-xl p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-neutral-100">
                        <Target className="w-10 h-10 text-neutral-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-3">No Active Postings</h2>
                    <p className="text-neutral-500 mb-10 max-w-sm font-medium">You haven't listed any opportunities for students on your company profile yet.</p>
                    
                    <div className="flex flex-col items-center p-8 bg-neutral-50 rounded-2xl border border-neutral-100 min-w-[300px]">
                        <span className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-5">Create a</span>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <a href="/employer/postings/create?type=job" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2">
                                <PlusCircle className="w-5 h-5 opacity-80" />
                                Job
                            </a>
                            <a href="/employer/postings/create?type=bounty" className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2">
                                <Target className="w-5 h-5 text-emerald-400 opacity-90" />
                                Bounty
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                // Rich Density Rendering Map
                <div className="flex flex-col gap-6">
                     {postings.map((post) => {
                         const isBounty = post.pay_type === 'Bounty';
                         const applicants = post.application?.[0]?.count || 0;
                         const aestheticSaves = Math.floor(Math.random() * 45) + 5; // Aesthetically mocking Saves pending architectural migration
                         
                         return (
                            <div key={post.job_id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                                
                                {/* Card Body Configuration */}
                                <div className="p-6 md:p-8 flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                {isBounty ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                                                        <Target className="w-3.5 h-3.5" /> Mission
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wider">
                                                        <Briefcase className="w-3.5 h-3.5" /> Standard Role
                                                    </span>
                                                )}
                                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">• {post.exp_lvl}</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">{post.job_title}</h3>
                                        </div>
                                        <div className="md:text-right shrink-0">
                                            <p className="text-2xl font-black text-neutral-900">${post.rate} <span className="text-sm font-medium text-neutral-500 uppercase tracking-wide">/ {post.pay_type}</span></p>
                                            <p className="text-xs font-bold text-neutral-500 mt-1 flex items-center justify-end gap-1"><CalendarClock className="w-3.5 h-3.5" /> {post.contract_time}</p>
                                        </div>
                                    </div>

                                    {/* Truncated Description Block */}
                                    <p className="text-neutral-600 font-medium text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                                        {post.job_desc || "No robust description was supplied for this mapping element."}
                                    </p>

                                    {/* Sub Analytics Metric Footer Inline */}
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                            <Users className="w-4 h-4 text-blue-600" />
                                            <div>
                                                <p className="text-xs font-extrabold text-blue-900">{applicants}</p>
                                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Applied</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                                            <Bookmark className="w-4 h-4 text-amber-600" />
                                            <div>
                                                <p className="text-xs font-extrabold text-amber-900">{aestheticSaves}</p>
                                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Saved (Mock)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Deep Action Footer */}
                                <div className="border-t border-neutral-100 bg-neutral-50/50 p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-xs font-medium text-neutral-400">Deployed natively onto active grids on {new Date(post.created_at).toLocaleDateString()}</p>
                                    
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        {/* Pure aesthetic modal / future path binding block for analytics */}
                                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
                                            <BarChart2 className="w-4 h-4 text-neutral-500" />
                                            Analytics
                                        </button>
                                        
                                        {/* Absolute routing directly crossing over to the applicant filter mapping */}
                                        <a href="/employer/candidates" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm group-hover:ring-2 ring-primary-500/20">
                                            Review Pipeline
                                            <ChevronRight className="w-4 h-4 text-neutral-400" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                         )
                     })}
                </div>
            )}
        </div>
    )
}
