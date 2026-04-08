import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function EmployerDashboard() {
    const supabase = await createSupabaseServerClient()
    
    // Fetch current employer entity natively
    const { data: { user } } = await supabase.auth.getUser()
    const { data: employer } = await supabase
        .from('employer')
        .select('*')
        .eq('auth_user_id', user?.id)
        .single()

    // Count real active postings for this employer
    let activePostingsCount = 0
    if (employer) {
        const { count } = await supabase
            .from('job_posting')
            .select('*', { count: 'exact', head: true })
            .eq('employer_id', employer.employer_id)
        if (count !== null) activePostingsCount = count
    }

    // Fetch metric aggregations (Partially Live / Partially Mocked for initial buildout)
    const metrics = [
        { label: "Active Postings", value: activePostingsCount || 0, trend: activePostingsCount > 0 ? "Live DB metric" : "No active data", positive: true },
        { label: "Pending Candidates", value: 0, trend: "No active data", positive: true },
        { label: "Bounties Distributed", value: '$0', trend: "No active data", positive: true },
        { label: "Profile Views", value: 0, trend: "No active data", positive: true }
    ]

    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-7xl mx-auto">
            {/* Header Module */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-100 to-transparent opacity-50 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                        Welcome Back, {employer?.co_name || user?.user_metadata?.full_name?.split(' ')[0]}
                    </h1>
                    <p className="text-neutral-500 mt-1 font-medium">Here is your {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} company overview.</p>
                </div>
                <div className="relative z-10 shrink-0">
                    <a href="/employer/postings/create?type=job" className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm w-full md:w-auto text-center">
                        + Create New Listing
                    </a>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                        <p className="text-sm font-semibold text-neutral-500">{metric.label}</p>
                        <h3 className="text-3xl font-black text-neutral-900 mt-2">{metric.value}</h3>
                        <p className={`text-xs font-bold mt-3 inline-flex items-center px-2 py-1 rounded-md ${metric.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {metric.trend}
                        </p>
                    </div>
                ))}
            </div>

            {/* Sandbox Module: Recent Activity */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex-1 p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-6">Recent Applicant Activity</h2>
                <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
                    <p className="text-neutral-400 font-medium">No candidates have applied to your active listings yet.</p>
                </div>
            </div>
        </div>
    )
}
