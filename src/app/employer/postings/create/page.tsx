import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { createJobListing } from '@/app/actions/jobs'
import { ArrowLeft, Briefcase, Target } from 'lucide-react'

export default async function CreateListingPage({ searchParams }: { searchParams: Promise<{ type: string }> }) {
    const params = await searchParams
    const type = params.type || 'job'
    
    const supabase = await createSupabaseServerClient()
    
    // Fetch unique employer metrics securely mapping to the auth session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: employer } = await supabase
        .from('employer')
        .select('*')
        .eq('auth_user_id', user.id)
        .single()

    if (!employer) {
        // Fallback constraint if trigger failed to spawn employer record yet
        return <div className="p-8 text-red-500 font-bold">Error: No Employer record found for this session.</div>
    }

    // Fetch active categories to populate dropdown selectors natively
    const { data: categories } = await supabase.from('category').select('*').order('cat_name')

    return (
        <div className="w-full h-full flex flex-col max-w-3xl mx-auto pb-12">
            
            {/* Header Block constraints */}
            <div className="mb-8">
                <a href="/employer/postings" className="inline-flex items-center text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Postings
                </a>
                
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${type === 'bounty' ? 'bg-emerald-100' : 'bg-primary-100'}`}>
                        {type === 'bounty' ? <Target className="w-6 h-6 text-emerald-600" /> : <Briefcase className="w-6 h-6 text-primary-600" />}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Create a {type === 'bounty' ? 'Bounty / Gig' : 'Job Listing'}</h1>
                        <p className="text-sm font-medium text-neutral-500 mt-0.5">Fill out the form below to list your opportunity to the student database.</p>
                    </div>
                </div>
            </div>

            {/* Native Form Construction mapped directly to jobs.ts server actions */}
            <form action={createJobListing} className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm space-y-6">
                
                <input type="hidden" name="employer_id" value={employer.employer_id} />
                <input type="hidden" name="type" value={type} />
                
                {/* 1. Title Block */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-900">{type === 'bounty' ? 'Mission Title' : 'Job Title'}</label>
                    <input 
                        type="text" 
                        name="job_title" 
                        required 
                        placeholder={type === 'bounty' ? "e.g., Redesign Shopify Logo" : "e.g., Junior Product Designer"}
                        className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 2. Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-900">Industry / Category</label>
                        <select name="cat_id" required className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500 bg-white">
                            <option value="">Select Category...</option>
                            {categories?.map((c: any) => (
                                <option key={c.cat_id} value={c.cat_id}>{c.cat_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 3. Base Rate & Pay Type Binding */}
                    {type === 'bounty' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-900">Flat Payout ($)</label>
                            <input 
                                type="number" 
                                name="rate" 
                                step="0.01" 
                                min="1" 
                                required 
                                placeholder="500.00"
                                className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" 
                            />
                            {/* Hidden binds forcing safe Bounty definitions onto the generic job table */}
                            <input type="hidden" name="pay_type" value="Bounty" />
                            <input type="hidden" name="exp_lvl" value="Bounty / Gig" />
                            <input type="hidden" name="contract_time" value="Flexible" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-900">Compensation ($)</label>
                                <input 
                                    type="number" 
                                    name="rate" 
                                    step="0.01" 
                                    min="1" 
                                    required 
                                    placeholder="20.00"
                                    className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-900">Pay Type</label>
                                <select name="pay_type" required className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500 bg-white">
                                    <option value="Hourly">Hourly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Standard Job Variables */}
                {type === 'job' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-900">Experience Level</label>
                            <select name="exp_lvl" required className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500 bg-white">
                                <option value="Entry-level">Entry-level</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-900">Contract Length</label>
                            <select name="contract_time" required className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500 bg-white">
                                <option value="3 Months">3 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="12 Months">12 Months</option>
                                <option value="Permanent">Permanent</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Detailed Description String Box */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-900">{type === 'bounty' ? 'Mission Parameters / Description' : 'Job Description'}</label>
                    <textarea 
                        name="job_desc" 
                        required 
                        rows={6}
                        placeholder={type === 'bounty' ? "Describe exactly what you need built, deadlines, and parameters..." : "Describe daily responsibilities, stack, and culture..."}
                        className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500 resize-y" 
                    ></textarea>
                </div>

                {/* Submission Execution */}
                <div className="pt-4 border-t border-neutral-100 flex justify-end">
                    <button type="submit" className={`px-8 py-3 rounded-lg text-sm font-bold text-white shadow-sm transition-colors ${type === 'bounty' ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-primary-600 hover:bg-primary-700'}`}>
                        {type === 'bounty' ? 'Deploy Mission' : 'Post Job Listing'}
                    </button>
                </div>

            </form>
        </div>
    )
}
