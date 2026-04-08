export default function EmployerSettingsPage() {
    return (
        <div className="w-full h-full flex flex-col gap-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-neutral-900">Workspace Settings</h1>
                <p className="text-sm font-medium text-neutral-500 mt-1">Manage team permissions, billing logic, and system notifications.</p>
            </div>

            {/* Standard Settings Structure mapped completely empty natively */}
            <div className="bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden divide-y divide-neutral-100">
                <div className="p-6 md:p-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-neutral-900">Team Permissions</h3>
                        <p className="text-sm text-neutral-500 mt-1">Invite colleagues to help manage active job listings.</p>
                    </div>
                    <button className="bg-neutral-100 text-neutral-500 px-4 py-2 rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
                        Coming Soon
                    </button>
                </div>
                
                <div className="p-6 md:p-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-neutral-900">Email Notifications</h3>
                        <p className="text-sm text-neutral-500 mt-1">Control how candidates ping your linked addresses.</p>
                    </div>
                    <button className="bg-neutral-100 text-neutral-500 px-4 py-2 rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
                        Coming Soon
                    </button>
                </div>

                <div className="p-6 md:p-8 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
                        <p className="text-sm text-neutral-500 mt-1">Permanently suspend this employer account and all active jobs.</p>
                    </div>
                    <button className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                        Deactivate Workspace
                    </button>
                </div>
            </div>
        </div>
    )
}
