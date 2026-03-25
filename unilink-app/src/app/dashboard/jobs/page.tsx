export default function RecommendedJobsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Recommended Jobs</h1>
                <p className="text-sm text-neutral-500 mt-1">
                    Job listings tailored to your skills and preferences.
                </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center text-neutral-500">
                No recommended jobs available yet. Complete your profile to get better recommendations!
            </div>
        </div>
    )
}
