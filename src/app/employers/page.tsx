import { Button } from "@/components/ui/button"
import { BookOpen, Search, UserCheck, ShieldCheck, ChevronRight, TrendingUp, Building2, Target, Zap } from "lucide-react"

export default function EmployersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/favicons/unilink logo no words.png" alt="UniLink Logo" className="w-8 h-8" />
                        <span className="text-xl font-bold tracking-tight">UniLink</span>
                    </a>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
                        <a href="/students" className="hover:text-primary-600 transition-colors">For Students</a>
                        <a href="/employers" className="text-primary-600 font-semibold transition-colors">For Employers</a>
                        <a href="/#browse-jobs" className="hover:text-primary-600 transition-colors">Jobs</a>
                        <a href="/about" className="hover:text-primary-600 transition-colors">About</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">Log in</a>
                        <a href="/register">
                            <Button>Post a Job</Button>
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Employer Hero */}
                <section className="relative py-20 pb-32 overflow-hidden bg-white border-b border-neutral-200 text-neutral-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-100),_transparent_40%)]" />

                    <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl pt-10">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Hire tomorrow's leaders, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">today.</span>
                        </h1>

                        <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Cut through the noise. Source verified students from top university programs directly to your talent pipeline before your competitors do.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/register">
                                <Button size="lg" className="h-14 px-8 text-base shadow-lg bg-primary-600 hover:bg-primary-700">
                                    Create Employer Account
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Value Prop Section */}
                <section className="py-24 bg-neutral-50 relative">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

                            {/* Feature 1 */}
                            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Direct Campus Access</h3>
                                <p className="text-neutral-600 leading-relaxed text-sm">
                                    Why wait for a career fair? UniLink gives you a direct pipeline to verified students actively looking for internships, gigs, and entry-level roles.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Skill-First Sourcing</h3>
                                <p className="text-neutral-600 leading-relaxed text-sm">
                                    Filter candidates by specific majors, completed courses, and technical skills. You get highly targeted matches so you don't waste time on unqualified applicants.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Post Gigs &amp; Bounties</h3>
                                <p className="text-neutral-600 leading-relaxed text-sm">
                                    Need a short-term project done fast? Post campus gigs to offload work while testing potential candidates in the real world before committing to a full-time hire.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>


            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-neutral-200 py-12">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/favicons/unilink logo no words.png" alt="UniLink Logo" className="w-6 h-6 object-contain" />
                        <span className="text-lg font-bold text-neutral-900">UniLink App</span>
                    </div>
                    <p className="text-sm text-neutral-500">© 2026 UniLink App. All rights reserved.</p>
                    <div className="flex gap-4 text-sm text-neutral-500 text-sm">
                        <a href="#" className="hover:text-neutral-900">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-900">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
