export default function ApplicationsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Applications</h1>
                <p className="text-sm text-neutral-500 mt-1">
                    Track and manage your submitted job applications.
                </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center text-neutral-500">
                You haven't submitted any applications yet.
            </div>
        </div>
    )
}
