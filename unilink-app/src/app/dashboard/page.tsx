import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building2, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
                    <p className="text-neutral-500 mt-1">Welcome back, Jane. Here's what's happening today.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-600">Active Applications</CardTitle>
                        <Briefcase className="h-4 w-4 text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center">
                            <span className="text-green-600 flex items-center mr-1">
                                ↑ 2
                            </span>
                            from last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-600">Interviews</CardTitle>
                        <Building2 className="h-4 w-4 text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center">
                            Next interview in 2 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-600">Profile Matches</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-neutral-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center">
                            <span className="text-green-600 flex items-center mr-1">
                                ↑ 8
                            </span>
                            new jobs fit your skills
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-neutral-900 border-b border-neutral-200 pb-2">Recent Activity</h2>
                <Card className="border-neutral-200">
                    <div className="p-0">
                        <div className="divide-y divide-neutral-100">
                            <div className="flex items-center justify-between p-4 bg-white hover:bg-neutral-50 transition-colors">
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">Application Status Update</p>
                                    <p className="text-sm text-neutral-500">TechCorp moved your application to Interview phase.</p>
                                </div>
                                <div className="text-xs text-neutral-400">2h ago</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white hover:bg-neutral-50 transition-colors">
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">New Match Found</p>
                                    <p className="text-sm text-neutral-500">Boca Burgers posted a new role matching your profile.</p>
                                </div>
                                <div className="text-xs text-neutral-400">1d ago</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white hover:bg-neutral-50 transition-colors opacity-70">
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">Application Submitted</p>
                                    <p className="text-sm text-neutral-500">You applied for Library Assistant at FAU Library.</p>
                                </div>
                                <div className="text-xs text-neutral-400">3d ago</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
