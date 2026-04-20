import { Button } from "@/components/ui/button"
import {
    BookOpen,
    Heart,
    Zap,
    Users,
    Globe,
    ShieldCheck,
    ChevronRight,
    GraduationCap,
    Building2,
    ArrowRight,
    Star,
    Crosshair,
    Target,
} from "lucide-react"

const VALUES = [
    {
        icon: GraduationCap,
        color: "bg-blue-50 text-blue-600 border-blue-100",
        title: "Students First",
        desc: "Every feature is designed around what students actually need — not what looks good in a pitch deck. We obsess over the job-seeker experience.",
    },
    {
        icon: ShieldCheck,
        color: "bg-teal-50 text-teal-600 border-teal-100",
        title: "Verified Trust",
        desc: "Employers are vetted. Student profiles are verified with .edu emails. No fake listings, no ghost applications — just real connections.",
    },
    {
        icon: Zap,
        color: "bg-orange-50 text-orange-600 border-orange-100",
        title: "Speed Matters",
        desc: "The recruiting window for students is narrow. We built UniLink to move fast — match, apply, and hear back in days, not months.",
    },
    {
        icon: Globe,
        color: "bg-violet-50 text-violet-600 border-violet-100",
        title: "Inclusive Access",
        desc: "Career opportunities shouldn't be gatekept by who you know. UniLink levels the playing field for students at every type of campus.",
    },
]

const TEAM = [
    { initials: "LD", name: "Liav Dahari", role: "Lead Full Stack Engineer", school: "Florida Atlantic University" },
    { initials: "SG", name: "Sergio Gonzalez Rodriguez", role: "Full Stack Engineer", school: "Florida Atlantic University" },
    { initials: "MG", name: "Mykyta Garkusha", role: "Full Stack Engineer", school: "Florida Atlantic University" },
    { initials: "GM", name: "Guilmar Morales", role: "Full Stack Engineer", school: "Florida Atlantic University" },
    { initials: "CF", name: "Caio Fernandes", role: "Full Stack Engineer", school: "Florida Atlantic University" },
]



export default function AboutPage() {
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
                        <a href="/employers" className="hover:text-primary-600 transition-colors">For Employers</a>
                        <a href="/#browse-jobs" className="hover:text-primary-600 transition-colors">Jobs</a>
                        <a href="/about" className="text-primary-600 font-semibold transition-colors">About</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">Log in</a>
                        <a href="/register">
                            <Button>Get Started</Button>
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1">

                {/* Hero */}
                <section className="relative py-24 pb-36 overflow-hidden bg-neutral-950 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.35),_transparent_45%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.2),_transparent_45%)]" />

                    <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl pt-8">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-neutral-300 mb-8">
                            <Heart className="w-3.5 h-3.5 mr-2 text-rose-400" />
                            Built by students, for students
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                            Bridging campus talent<br />
                            <span className="text-indigo-400">
                                with real opportunity.
                            </span>
                        </h1>

                        <p className="text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                            UniLink was born from a simple frustration — talented students struggling to find jobs while employers struggled to find fresh talent. We built the bridge that was missing.
                        </p>
                    </div>
                </section>


                {/* Mission */}
                <section className="py-28 bg-white">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600 mb-6">
                                    <Star className="w-3.5 h-3.5 mr-2" />
                                    Our Mission
                                </div>
                                <h2 className="text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-6">
                                    Make early-career hiring human again.
                                </h2>
                                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                                    The traditional job search is broken for students. Generic job boards surface thousands of roles that require experience students don't have yet. Meanwhile, employers pour budgets into university recruiting events that only reach a fraction of the talent pool.
                                </p>
                                <p className="text-neutral-600 text-lg leading-relaxed">
                                    UniLink cuts through the noise. We connect verified students directly with employers who are actively looking to hire campus talent — no middlemen, no black-hole applications, no wasted effort on either side.
                                </p>
                            </div>

                            {/* Visual card */}
                            <div className="relative">
                                <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-lg p-8 transform -rotate-1 hover:rotate-0 transition-all duration-500">
                                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100">
                                        <img src="/favicons/unilink logo no words.png" alt="UniLink Logo" className="w-8 h-8" />
                                        <div>
                                            <p className="font-bold text-neutral-900">UniLink</p>
                                            <p className="text-xs text-neutral-400">Est. 2026 · Boca Raton, FL</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-4">
                                        {[
                                            { icon: Zap, text: "Fast-track applications with real employers" },
                                            { icon: ShieldCheck, text: "Exclusive to vetted students & employers" },
                                            { icon: Globe, text: "Leveling the field for early-career roles" },
                                        ].map(({ icon: Icon, text }) => (
                                            <li key={text} className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-neutral-500" />
                                                </div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-24 bg-neutral-50 border-t border-neutral-100">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">What we stand for</h2>
                            <p className="text-neutral-500 text-lg">The principles that guide every decision we make.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {VALUES.map(({ icon: Icon, color, title, desc }) => (
                                <div key={title} className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What we offer */}
                <section className="py-24 bg-white border-t border-neutral-100">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">What we offer Students</h2>
                            <p className="text-neutral-500 text-lg">How we're redefining the early-career hustle, leaving traditional job boards behind.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                                    <Crosshair className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Campus Gigs</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Don't have the time for a full-time role? Pick up short-term <strong>Gigs</strong> straight from employers. Earn cash, build your portfolio, and gain real-world experience on your own time.
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Student-Centric Network</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Platforms like LinkedIn cater to seniors with decades of experience. UniLink is built exclusively for you. We skip the noise and connect you with employers who want to hire emerging talent.
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Verified Ecosystem</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    No scam postings or MLM schemes like you often find on massive job boards. Every student is verified with a .edu email, and every employer is vetted.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What we offer Employers */}
                <section className="py-24 bg-neutral-50 border-t border-neutral-100">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">What we offer Employers</h2>
                            <p className="text-neutral-500 text-lg">Stop paying for overpriced campus recruiting trips. Connect with top university talent digitally year-round.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Direct Campus Access</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Why wait for a career fair? UniLink gives you a direct pipeline to verified students actively looking for internships, gigs, and entry-level roles.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Skill-First Sourcing</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Filter candidates by specific majors, completed courses, and technical skills. You get highly targeted matches so you don't waste time on unqualified applicants.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-neutral-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Post Gigs &amp; Bounties</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    Need a short-term project done fast? Post campus gigs to offload work while testing potential candidates in the real world before committing to a full-time hire.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-24 bg-white border-t border-neutral-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 mb-4">
                                <Users className="w-3.5 h-3.5 mr-2" />
                                The Team
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">People behind UniLink</h2>
                            <p className="text-neutral-500 text-lg">Former students who lived the problem and built the solution.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {TEAM.map((member) => (
                                <div key={member.name} className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 text-center hover:bg-white hover:shadow-md transition-all duration-300">
                                    <h4 className="font-bold text-neutral-900 text-base mb-0.5">{member.name}</h4>
                                    <p className="text-sm font-semibold text-primary-600 mb-1">{member.role}</p>
                                    <p className="text-xs text-neutral-400">{member.school}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.25),_transparent_60%)]" />
                    <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
                            Ready to find your role?
                        </h2>
                        <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                            Join thousands of students already using UniLink to land internships and entry-level positions at great companies.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/register">
                                <Button size="lg" className="h-12 px-8 text-base font-semibold">
                                    Create Free Account
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </a>
                            <a href="/#browse-jobs">
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-black/20 text-black bg-transparent hover:bg-white/10 transition-colors">
                                    Browse Jobs
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </a>
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
                    <div className="flex gap-4 text-sm text-neutral-500">
                        <a href="#" className="hover:text-neutral-900">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-900">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
