'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, RotateCcw, SlidersHorizontal, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type JobPosting = {
    job_id: string
    job_title: string
    company_name: string
    location: string
    pay_rate: string
    experience_level: string
    contract_time: string
    pay_type: string
    job_desc: string
}

export function InteractiveJobBoard({ initialJobs }: { initialJobs: JobPosting[] }) {
    // UI State
    const [isFilterOpen, setIsFilterOpen] = useState(true)
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)

    // Automatically vanish the detail pane if the user scrolls the main page
    useEffect(() => {
        if (!selectedJob) return;

        const handleScroll = () => {
            setSelectedJob(null);
        };

        // Listen for scroll on the main window
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedJob])

    // Filter States
    const [query, setQuery] = useState('')
    const [employer, setEmployer] = useState('')
    const [location, setLocation] = useState('')
    const [minSalary, setMinSalary] = useState(0)
    
    // NEW: Slider mode to cleanly divide bounds without user interface breaking
    const [salaryMode, setSalaryMode] = useState<'Hourly' | 'Yearly'>('Hourly')

    // Filter out bounties natively first and establish the workable payload
    const standardJobs = useMemo(() => initialJobs.filter(j => j.pay_type !== 'Bounty'), [initialJobs])

    // Extract dynamic unique lists natively
    const uniqueEmployers = useMemo(() => Array.from(new Set(standardJobs.map(j => j.company_name))).sort(), [standardJobs])
    const uniqueLocations = useMemo(() => Array.from(new Set(standardJobs.map(j => j.location))).sort(), [standardJobs])
    
    // Dynamically lock slider boundaries strictly depending on active Pay Type Toggle
    const maxSalaryBound = useMemo(() => {
        let max = 0
        standardJobs.filter(j => j.pay_type === salaryMode).forEach(j => {
            const num = parseFloat(j.pay_rate.replace(/[^0-9.]/g, ''))
            if (!isNaN(num) && num > max) max = num
        })
        return max > 0 ? Math.ceil(max) : 100
    }, [standardJobs, salaryMode])

    // Unified interactive filter
    const filteredJobs = useMemo(() => {
        return standardJobs.filter((job) => {
            // 1. Text Query (Title or Company)
            if (query.trim()) {
                const q = query.toLowerCase()
                if (!job.job_title.toLowerCase().includes(q) && !job.company_name.toLowerCase().includes(q)) {
                    return false
                }
            }

            // 2. Exact Employer Match
            if (employer && job.company_name !== employer) return false

            // 3. Exact Location Match
            if (location && job.location !== location) return false

            // 4. Force jobs natively matching the active Salary Mode so the slider works
            if (job.pay_type !== salaryMode && minSalary > 0) return false

            // 5. Minimum Salary Sub-Filter
            if (minSalary > 0 && job.pay_type === salaryMode) {
                const num = parseFloat(job.pay_rate.replace(/[^0-9.]/g, ''))
                if (isNaN(num) || num < minSalary) return false
            }

            return true
        })
    }, [standardJobs, query, employer, location, minSalary, salaryMode])

    const resetFilters = () => {
        setQuery('')
        setEmployer('')
        setLocation('')
        setMinSalary(0)
    }

    const hasActiveFilters = Boolean(query || employer || location || minSalary > 0)

    // Helper for formatting pay strictly depending on DB logic
    const formatPay = (rateRaw: string, type: string) => {
        const num = parseFloat(rateRaw.replace(/[^0-9.]/g, ''))
        if (isNaN(num)) return 'Competitive'
        
        if (type === 'Yearly') return `$${num.toLocaleString('en-US')}/yr`
        return `$${num}/hr`
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start w-full relative justify-between">
            
            {/* Main Listings Column (Locked Width) */}
            <div className={`w-full max-w-[850px] shrink-0 order-2 md:order-1 transition-all duration-300 ease-in-out`}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-900">
                        Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
                    </h2>
                    
                    <Button 
                        variant={isFilterOpen ? "default" : "outline"}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`h-10 px-4 transition-colors ${isFilterOpen ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'text-neutral-700 bg-white border-neutral-200 hover:bg-neutral-50'}`}
                    >
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-neutral-300 shadow-sm">
                        <p className="text-neutral-500 font-medium">No standard jobs matched your filter combination.</p>
                        {hasActiveFilters && (
                            <Button variant="link" onClick={resetFilters} className="mt-2 text-primary-600">
                                Clear all filters
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJobs.map((job) => (
                            <div 
                                key={job.job_id} 
                                onClick={() => setSelectedJob(job)}
                                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col h-full hover:shadow-md hover:border-primary-300 hover:ring-2 ring-primary-500/10 cursor-pointer transition-all relative"
                            >
                                
                                <div className="mb-4 flex-1">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <h2 className="text-lg font-bold text-neutral-900 leading-tight line-clamp-2">{job.job_title}</h2>
                                        <div className="bg-neutral-100 text-neutral-600 border border-neutral-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded whitespace-nowrap shrink-0 mt-0.5">
                                            {job.contract_time}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary-700 truncate">{job.company_name}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-neutral-600 mt-auto pt-4 border-t border-neutral-100">
                                    <span className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-neutral-700">{job.location}</span>
                                    <span className="rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                                        {formatPay(job.pay_rate, job.pay_type)}
                                    </span>
                                    <span className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 whitespace-nowrap">{job.experience_level}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right-Hand Collapsible Sidebar / Detail Pane */}
            <aside 
                className={`order-1 md:order-2 flex-shrink-0 transition-all duration-300 ease-in-out ${
                    (isFilterOpen || selectedJob) ? 'w-full md:w-[450px] opacity-100 translate-x-0' : 'w-0 opacity-0 overflow-hidden translate-x-12 h-0 md:h-auto'
                }`}
            >
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain">
                    {selectedJob ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-end">
                                <button 
                                    onClick={() => setSelectedJob(null)}
                                    className="text-neutral-400 hover:text-neutral-700 p-1 bg-neutral-50 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="pt-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary-600 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">{selectedJob.contract_time}</span>
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em]">• {selectedJob.experience_level}</span>
                                </div>
                                <h2 className="text-2xl font-black text-neutral-900 tracking-tight leading-tight mb-2">{selectedJob.job_title}</h2>
                                <p className="text-sm font-bold text-neutral-500 mb-6">{selectedJob.company_name} <span className="text-neutral-300 mx-1">|</span> {selectedJob.location}</p>
                                
                                <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-4 rounded-xl mb-8 shadow-sm">
                                    <div className="text-2xl font-black text-emerald-700">{formatPay(selectedJob.pay_rate, selectedJob.pay_type)}</div>
                                    <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-tight">Est.<br/>Comp</div>
                                </div>
                                
                                <div className="space-y-4">
                                    <h3 className="text-base font-black text-neutral-900 border-b border-neutral-100 pb-2 uppercase tracking-wider">Mission Details</h3>
                                    <p className="text-neutral-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">{selectedJob.job_desc}</p>
                                </div>

                                <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-col gap-3">
                                    <Button className="w-full h-12 font-bold bg-primary-600 hover:bg-primary-700 shadow-sm transition-colors text-white text-base">
                                        Apply Now
                                    </Button>
                                    <p className="text-[10px] text-center text-neutral-400 font-bold uppercase tracking-widest">Application tracking active</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-neutral-900 text-lg">Filters</h3>
                                <button 
                                    className="md:hidden text-neutral-400 hover:text-neutral-700"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700">Keywords</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                                        <Input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search titles..."
                                            className="pl-9 h-11 w-full bg-white border-neutral-300 shadow-sm rounded-lg focus-visible:ring-primary-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700">Company</label>
                                    <div className="relative">
                                        <select
                                            value={employer}
                                            onChange={(e) => setEmployer(e.target.value)}
                                            className="appearance-none h-11 w-full bg-white border border-neutral-300 shadow-sm rounded-lg pl-3 pr-10 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm text-neutral-900"
                                        >
                                            <option value="">All Companies</option>
                                            {uniqueEmployers.map(emp => (
                                                <option key={emp} value={emp}>{emp}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700">Location</label>
                                    <div className="relative">
                                        <select
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="appearance-none h-11 w-full bg-white border border-neutral-300 shadow-sm rounded-lg pl-3 pr-10 focus:ring-2 focus:ring-primary-500 focus:outline-none text-sm text-neutral-900"
                                        >
                                            <option value="">Any Location</option>
                                            {uniqueLocations.map(loc => (
                                                <option key={loc} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
                                        <button 
                                            onClick={() => { setSalaryMode('Hourly'); setMinSalary(0) }}
                                            className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${salaryMode === 'Hourly' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                                        >
                                            Hourly Rate
                                        </button>
                                        <button 
                                            onClick={() => { setSalaryMode('Yearly'); setMinSalary(0) }}
                                            className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${salaryMode === 'Yearly' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                                        >
                                            Yearly Salary
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                        <label className="text-sm font-medium text-neutral-700">Minimum Pay</label>
                                        <span className="text-sm font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md border border-primary-100">
                                            {minSalary > 0 
                                                ? `$${salaryMode === 'Yearly' ? minSalary.toLocaleString('en-US') : minSalary}/${salaryMode === 'Yearly' ? 'yr' : 'hr'}` 
                                                : 'Any Pay'}
                                        </span>
                                    </div>
                                    
                                    <input 
                                        type="range" 
                                        min={0} 
                                        max={maxSalaryBound} 
                                        step={salaryMode === 'Yearly' ? 1000 : 1}
                                        value={minSalary}
                                        onChange={(e) => setMinSalary(parseInt(e.target.value))}
                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                    />
                                    
                                    <div className="flex justify-between text-xs font-medium text-neutral-400">
                                        <span>$0</span>
                                        <span>${salaryMode === 'Yearly' ? maxSalaryBound.toLocaleString('en-US') : maxSalaryBound}+</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-neutral-100">
                                    <Button 
                                        variant="outline"
                                        onClick={resetFilters}
                                        disabled={!hasActiveFilters}
                                        className="w-full h-11 text-neutral-600 font-medium bg-white border-neutral-300 shadow-sm hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2 text-neutral-400" />
                                        Reset Selected Filters
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </div>
    )
}
