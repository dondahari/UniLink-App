import { createSupabaseServerClient } from "@/lib/supabase-server"

interface ApplicationRow {
  app_id: string
  app_date: string
  status: string
  job_posting: {
    job_title: string
    employer: { co_name: string } | null
  } | null
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days <= 0) return "Today"
  if (days === 1) return "1d ago"
  return `${days}d ago`
}

export default async function ApplicationsPage() {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: person } = await supabase
    .from("person")
    .select("person_id")
    .eq("auth_user_id", user.id)
    .single()

  if (!person) {
    return <div className="max-w-4xl mx-auto">No person profile found for this account.</div>
  }

  const { data: student } = await supabase
    .from("student")
    .select("student_id")
    .eq("person_id", person.person_id)
    .single()

  if (!student) {
    return <div className="max-w-4xl mx-auto">This account is not a student account.</div>
  }

  const { data: rawApps } = await supabase
    .from("application")
    .select(`
      app_id,
      app_date,
      status,
      job_posting (
        job_title,
        employer ( co_name )
      )
    `)
    .eq("student_id", student.student_id)
    .order("app_date", { ascending: false })

  const applications: ApplicationRow[] = (rawApps as any[] ?? []).map((app) => ({
    ...app,
    job_posting: Array.isArray(app.job_posting)
      ? {
          ...app.job_posting[0],
          employer: Array.isArray(app.job_posting[0]?.employer)
            ? app.job_posting[0].employer[0]
            : app.job_posting[0]?.employer
        }
      : app.job_posting
  }))

  const statusColor: Record<string, string> = {
    Pending: "text-yellow-700 bg-yellow-50 border-yellow-200",
    Review: "text-blue-700 bg-blue-50 border-blue-200",
    Interview: "text-purple-700 bg-purple-50 border-purple-200",
    Offer: "text-green-700 bg-green-50 border-green-200",
    Rejected: "text-red-700 bg-red-50 border-red-200",
    Withdrawn: "text-neutral-700 bg-neutral-50 border-neutral-200",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Applications</h1>
        <p className="text-sm text-neutral-500 mt-1">Track and manage your submitted job applications.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center text-neutral-500">
          You haven&apos;t submitted any applications yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 divide-y divide-neutral-100">
          {applications.map((app) => (
            <div key={app.app_id} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-900">{app.job_posting?.job_title ?? "Unknown Position"}</p>
                <p className="text-sm text-neutral-500">{app.job_posting?.employer?.co_name ?? "Unknown Company"}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor[app.status] ?? "text-neutral-700 bg-neutral-50 border-neutral-200"}`}>
                  {app.status}
                </span>
                <span className="text-xs text-neutral-400">{timeAgo(app.app_date)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
