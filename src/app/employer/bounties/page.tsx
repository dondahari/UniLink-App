import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Target, PlusCircle } from 'lucide-react'

export default async function EmployerBountiesPage() {
    const supabase = await createSupabaseServerClient()
    
    // Fetch current employer entity natively
    const { data: { user } } = await supabase.auth.getUser()
    const { data: employer } = await supabase
        .from('employer')
        .select('*')
        .eq('auth_user_id', user?.id)
        .single()

    // Enforce pay_type = Bounty filter mapping
    let postings: any[] = []
    if (employer) {
        const { data } = await supabase
            .from('job_posting')
            .select('*')
            .eq('employer_id', employer.employer_id)
            .eq('pay_type', 'Bounty')
        if (data) postings = data
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between bg-white px-6 py-5 rounded-xl border border-neutral-200 shadow-sm border-l-4 border-l-emerald-500">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Bounties Overview</h1>
                    <p className="text-sm font-medium text-neutral-500 mt-1">Review active gig tasks targeting dynamic student workflows.</p>
                </div>
                <a href="/employer/postings/create?type=bounty" className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    Deploy Bounty
                </a>
            </div>

            {/* Content Validation Check */}
            {postings.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-white border border-neutral-200 border-dashed rounded-xl p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100">
                        <Target className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-3">No Active Missions</h2>
                    <p className="text-neutral-500 mb-10 max-w-sm font-medium">Bounties are one-off gigs perfect for delegating small UI updates, graphic design needs, or social media boosts.</p>
                    <a href="/employer/postings/create?type=bounty" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                        <PlusCircle className="w-5 h-5 opacity-80" />
                        Init Mission Protocol
                    </a>
                </div>
            ) : (
                <div className="grid gap-4">
                     {postings.map(post => (
                         <div key={post.job_id} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 rounded-lg">
                                    <Target className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-lg">{post.job_title}</h3>
                                    <p className="text-sm font-bold text-emerald-600 mt-1">Reward: ${post.rate}</p>
                                </div>
                            </div>
                         </div>
                     ))}
                </div>
            )}
        </div>
    )
}
