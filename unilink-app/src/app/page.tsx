import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Building2, Briefcase } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 rounded-lg p-1.5">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">UniLink</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
            <a href="/students" className="hover:text-primary-600 transition-colors">For Students</a>
            <a href="/employers" className="hover:text-primary-600 transition-colors">For Employers</a>
            <a href="/jobs" className="hover:text-primary-600 transition-colors">Jobs</a>
            <a href="/about" className="hover:text-primary-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">Log in</a>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-100),_transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-primary-50),_transparent_40%)]" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
              Connecting Campus Talent with Top Employers
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 mb-8 leading-[1.1]">
              Launch your career before leaving <span className="text-black">campus.</span>
            </h1>

            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              UniLink matches ambitious students with partner employers for internships, part-time roles, and post-grad careers. Built for real connections.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/students">
                <Button size="lg" className="h-12 px-8 text-base bg-primary-600 text-white hover:bg-neutral-900 hover:shadow-lg transition-all duration-300">
                  I'm a Student
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="/employers">
                <Button size="lg" className="h-12 px-8 text-base bg-neutral-800 text-white transition-all duration-300">
                  I'm an Employer
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="bg-primary-50 text-primary-600 p-4 rounded-full mb-6 relative">
                  <div className="absolute inset-0 bg-primary-100 animate-ping rounded-full opacity-20"></div>
                  <BookOpen className="w-8 h-8 relative z-10" />
                </div>
                <h3 className="text-xl font-bold mb-3">Campus Integrated</h3>
                <p className="text-neutral-600">Connect directly using your .edu email. We sync your major, skillset, and graduation path.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="bg-orange-50 text-accent-orange p-4 rounded-full mb-6">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Roles</h3>
                <p className="text-neutral-600">Access exclusive local and remote roles targeted specifically to students and new grads.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="bg-teal-50 text-accent-teal p-4 rounded-full mb-6">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Employer Match</h3>
                <p className="text-neutral-600">Employers actively seek students with specific skills. Get hired based on your actual capabilities.</p>
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
