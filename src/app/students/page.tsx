import { Button } from "@/components/ui/button"
import { BookOpen, Search, FileText, CheckCircle2, ChevronRight, Zap } from "lucide-react"

export default function StudentsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 rounded-lg p-1.5">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">UniLink</span>
                    </a>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
                        <a href="/students" className="text-primary-600 font-semibold transition-colors">For Students</a>
                        <a href="/employers" className="hover:text-primary-600 transition-colors">For Employers</a>
                        <a href="/#browse-jobs" className="hover:text-primary-600 transition-colors">Jobs</a>
                        <a href="/about" className="hover:text-primary-600 transition-colors">About</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">Log in</a>
                        <a href="/register">
                            <Button>Join for Free</Button>
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Student Hero */}
                <section className="relative py-20 pb-32 overflow-hidden bg-neutral-950 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_40%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.2),_transparent_40%)]" />

                    <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl pt-10">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Your degree gets you the interview.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">UniLink gets you the job.</span>
                        </h1>

                        <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Skip the generic job boards. Connect directly with employers specifically looking to hire students and recent grads from your university.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/register">
                                <Button size="lg" className="h-14 px-8 text-base rounded-full font-semibold">
                                    Create Student Profile
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-24 bg-white relative -mt-10 rounded-t-[3rem] shadow-sm z-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">How UniLink works for you</h2>
                            <p className="text-neutral-600 font-medium text-lg">A unified platform to manage your transition from campus to career.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-blue-200 group-hover:shadow-xl">
                                    <FileText className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">1. Build your Profile</h3>
                                <p className="text-neutral-600 leading-relaxed text-lg">Input your major, upload your resume, and tag your technical skills.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-orange-100 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-orange-200 group-hover:shadow-xl">
                                    <Search className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">2. Discover Roles</h3>
                                <p className="text-neutral-600 leading-relaxed text-lg">Get algorithmic matches for internships and entry-level roles based on your verified skills.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-teal-100 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-teal-200 group-hover:shadow-xl">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">3. Fast-track Apply</h3>
                                <p className="text-neutral-600 leading-relaxed text-lg">Apply with one click. Employers see your verified student status, prioritizing your application.</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Feature Highlights deep dive */}
                <section className="py-24 bg-neutral-50/50 border-t border-neutral-100 overflow-hidden relative">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 mb-6">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Skill-based matching
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 leading-tight">Stop throwing resumes into the void.</h2>
                                <ul className="space-y-6">
                                    <li className="flex">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-xl font-bold text-neutral-900 mb-1">Tailored for New Talent</h4>
                                            <p className="text-neutral-600">Employers on UniLink specifically want to hire students. You aren't competing with seniors with 10 years of experience.</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-xl font-bold text-neutral-900 mb-1">Feedback Included</h4>
                                            <p className="text-neutral-600">Track application statuses securely in your dashboard. Get evaluated by managers post-interview to build an internal rep score.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-teal-50 transform rotate-3 rounded-3xl" />
                                <div className="bg-white border border-neutral-200 shadow-xl rounded-2xl p-8 relative transform -rotate-2 hover:rotate-0 transition-all duration-500">
                                    <div className="flex items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
                                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-xl font-bold text-neutral-500">
                                            JS
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold">Jane Smith</h4>
                                            <p className="text-sm text-neutral-500">Florida Atlantic University • CS '26</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Top Match</div>
                                            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-neutral-900">Data Analyst Intern</p>
                                                    <p className="text-sm text-neutral-500">TechCorp • Boca Raton, FL</p>
                                                </div>
                                                <div className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-sm">98% Match</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-neutral-200 py-12">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary-600" />
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
