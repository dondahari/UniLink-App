import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building2, CheckCircle2 } from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase-server"

interface Application {
    app_id: string
    app_date: string
    status: string
    job_posting: {
        job_title: string
        employer: {
            co_name: string
        } | null
    } | null
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return '1d ago'
    return `${days}d ago`
}

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null // Middleware handles the redirect; this is a safety net

    // Fetch the person + student record for the current user
    const { data: person } = await supabase
        .from('person')
        .select('person_id, full_name')
        .eq('auth_user_id', user.id)
        .single()

    const firstName = person?.full_name?.split(' ')[0] ?? 'there'

    // Student-specific data (null for employer accounts)
    let activeApplications = 0
    let interviewCount = 0
    let recentApps: Application[] = []

    if (person) {
        const { data: student } = await supabase
            .from('student')
            .select('student_id')
            .eq('person_id', person.person_id)
            .single()

        if (student) {
            const [activeResult, interviewResult, recentResult] = await Promise.all([
                // Active applications (everything except Rejected / Withdrawn)
                supabase
                    .from('application')
                    .select('*', { count: 'exact', head: true })
                    .eq('student_id', student.student_id)
                    .not('status', 'in', '("Rejected","Withdrawn")'),

                // Applications in the Interview stage
                supabase
                    .from('application')
                    .select('*', { count: 'exact', head: true })
                    .eq('student_id', student.student_id)
                    .eq('status', 'Interview'),

                // Five most recent applications with job + employer info
                supabase
                    .from('application')
                    .select(`
                        app_id,
                        app_date,
                        status,
                        job_posting (
                            job_title,
                            employer ( co_name )
                        )
                    `)
                    .eq('student_id', student.student_id)
                    .order('app_date', { ascending: false })
                    .limit(5),
            ])

            activeApplications = activeResult.count ?? 0
            interviewCount     = interviewResult.count ?? 0
            
            // Map the nested arrays from Supabase to single objects for the Application interface
            recentApps = (recentResult.data as any[] ?? []).map(app => ({
                ...app,
                job_posting: Array.isArray(app.job_posting) ? {
                    ...app.job_posting[0],
                    employer: Array.isArray(app.job_posting[0]?.employer) 
                        ? app.job_posting[0].employer[0] 
                        : app.job_posting[0]?.employer
                } : app.job_posting
            })) as Application[]
        }
    }

    const statusColor: Record<string, string> = {
        Pending:   'text-yellow-600 bg-yellow-50 border-yellow-200',
        Review:    'text-blue-600 bg-blue-50 border-blue-200',
        Interview: 'text-purple-600 bg-purple-50 border-purple-200',
        Offer:     'text-green-600 bg-green-50 border-green-200',
        Rejected:  'text-red-600 bg-red-50 border-red-200',
        Withdrawn: 'text-neutral-600 bg-neutral-50 border-neutral-200',
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
                    <p className="text-neutral-500 mt-1">Welcome back, {firstName}. Here&apos;s what&apos;s happening today.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-600">Active Applications</CardTitle>
                        <Briefcase className="h-4 w-4 text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeApplications}</div>
                        <p className="text-xs text-neutral-500 mt-1">
                            {activeApplications === 0
                                ? 'No active applications yet'
                                : `${activeApplications} application${activeApplications !== 1 ? 's' : ''} in progress`}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-600">Interviews</CardTitle>
                        <Building2 className="h-4 w-4 text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{interviewCount}</div>
                        <p className="text-xs text-neutral-500 mt-1">
                            {interviewCount === 0
                                ? 'No interviews scheduled'
                                : `${interviewCount} interview${interviewCount !== 1 ? 's' : ''} scheduled`}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-600">Total Applications</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{recentApps.length > 0 ? activeApplications + interviewCount : 0}</div>
                        <p className="text-xs text-neutral-500 mt-1">
                            Across all job postings
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Recent Applications</h2>
                <Card className="border-neutral-200">
                    <div className="p-0">
                        {recentApps.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Briefcase className="h-10 w-10 text-neutral-300 mb-3" />
                                <p className="text-sm font-medium text-neutral-600">No applications yet</p>
                                <p className="text-sm text-neutral-400 mt-1">
                                    Browse job listings and apply to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-neutral-100">
                                {recentApps.map((app) => (
                                    <div key={app.app_id} className="flex items-center justify-between p-4 bg-white hover:bg-neutral-50 transition-colors">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-neutral-900 truncate">
                                                {app.job_posting?.job_title ?? 'Unknown Position'}
                                            </p>
                                            <p className="text-sm text-neutral-500 truncate">
                                                {app.job_posting?.employer?.co_name ?? 'Unknown Company'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor[app.status] ?? 'text-neutral-600 bg-neutral-50 border-neutral-200'}`}>
                                                {app.status}
                                            </span>
                                            <span className="text-xs text-neutral-400">{timeAgo(app.app_date)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
