'use client'

import { useState, useMemo } from 'react'
import { Search, RotateCcw, Crosshair, TerminalSquare, X, DollarSign, Target, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

export function BountyBoard({ initialJobs }: { initialJobs: JobPosting[] }) {
    // UI State
    const [isFilterOpen, setIsFilterOpen] = useState(true)
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null)

    // Filter States
    const [query, setQuery] = useState('')
    const [employer, setEmployer] = useState('')
    const [minBounty, setMinBounty] = useState(0)

    // Extract dynamic unique lists natively
    const uniqueEmployers = useMemo(() => Array.from(new Set(initialJobs.map(j => j.company_name))).sort(), [initialJobs])
    
    // Max bounty target dynamically scouted
    const maxBountyBound = useMemo(() => {
        let max = 0
        initialJobs.forEach(j => {
            const num = parseFloat(j.pay_rate.replace(/[^0-9.]/g, ''))
            if (!isNaN(num) && num > max) max = num
        })
        return max > 0 ? Math.ceil(max) : 100
    }, [initialJobs])

    // Unified interactive filter
    const filteredJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            if (query.trim()) {
                const q = query.toLowerCase()
                if (!job.job_title.toLowerCase().includes(q) && !job.company_name.toLowerCase().includes(q)) {
                    return false
                }
            }

            if (employer && job.company_name !== employer) return false

            if (minBounty > 0) {
                const num = parseFloat(job.pay_rate.replace(/[^0-9.]/g, ''))
                if (isNaN(num) || num < minBounty) return false
            }

            return true
        })
    }, [initialJobs, query, employer, minBounty])

    const resetFilters = () => {
        setQuery('')
        setEmployer('')
        setMinBounty(0)
    }

    const hasActiveFilters = Boolean(query || employer || minBounty > 0)

    const toggleExpand = (jobId: string) => {
        setExpandedJobId(prev => prev === jobId ? null : jobId);
    }

    return (
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-8 items-start w-full relative justify-between">
            
            {/* MAIN DATA FEED (CARDS) - Expanded to meet Filters */}
            <div className={`flex-1 w-full order-2 xl:order-1 transition-all duration-300 ease-in-out`}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-sm font-mono tracking-widest text-emerald-400 uppercase">
                        [ {filteredJobs.length} TARGETS ACQUIRED ]
                    </h2>
                    
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`h-10 px-4 transition-all border font-mono uppercase text-xs tracking-widest flex items-center shadow-sm ${isFilterOpen ? 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:bg-emerald-900'}`}
                    >
                        <TerminalSquare className="w-4 h-4 mr-2" />
                        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="text-center py-24 bg-neutral-900/50 rounded-xl border border-dashed border-red-900/50 shadow-sm backdrop-blur-sm">
                        <Target className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
                        <p className="text-red-400 font-mono tracking-widest uppercase">No Active Targets Found.</p>
                        {hasActiveFilters && (
                            <button onClick={resetFilters} className="mt-4 text-xs font-mono tracking-widest uppercase text-emerald-500 hover:text-emerald-400 underline underline-offset-4">
                                Re-calibrate Scanners
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJobs.map((job) => {
                            const isExpanded = expandedJobId === job.job_id;
                            const payout = parseFloat(job.pay_rate.replace(/[^0-9.]/g, '')).toLocaleString('en-US');
                            
                            return (
                                <motion.div 
                                    layout
                                    transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                                    key={job.job_id} 
                                    onClick={() => toggleExpand(job.job_id)}
                                    className={`group relative bg-[#131316] rounded-xl border overflow-hidden flex flex-col transition-all duration-300 pointer-events-auto ${
                                        isExpanded 
                                            ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)] h-fit' 
                                            : 'border-neutral-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:-translate-y-1 cursor-pointer h-full'
                                    }`}
                                >
                                    
                                    {/* Glassmorphic Cyber Header */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none"></div>

                                    {/* High Priority Badge */}
                                    <div className="absolute top-0 right-0 border-l border-b border-neutral-800 bg-neutral-900/80 px-3 py-1.5 rounded-bl-xl backdrop-blur-md z-10 flex items-center gap-1.5 group-hover:border-emerald-500/30 group-hover:bg-emerald-950/80 transition-colors">
                                        <Crosshair className="w-3 h-3 text-emerald-500" />
                                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400">{job.contract_time}</span>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col relative z-20">
                                        <div className="mb-6 pr-12">
                                            <p className="text-[10px] font-mono text-neutral-500 mb-2 tracking-widest uppercase flex items-center gap-2">
                                                <span className="w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_4px_rgba(168,85,247,1)]"></span>
                                                {job.company_name}
                                            </p>
                                            <h2 className="text-xl font-bold text-white leading-tight mb-1">{job.job_title}</h2>
                                        </div>

                                        {/* Jackpot Slot Machine Display */}
                                        <div className="mt-auto bg-neutral-900/80 border border-neutral-800 rounded-lg p-4 flex items-center justify-between group-hover:border-emerald-500/40 transition-colors relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] group-hover:animate-[shimmer_1.5s_ease-out]"></div>
                                            
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase mb-1">Target Bounty</span>
                                                <div className="flex items-center text-emerald-400 font-black text-2xl tracking-tighter">
                                                    <DollarSign className="w-5 h-5 -mr-1" />
                                                    {payout}
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase mb-1 drop-shadow-sm">Location Extracted</span>
                                                <span className="text-xs font-bold text-neutral-300 uppercase truncate max-w-[120px]">{job.location}</span>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded ? (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-6 space-y-6">
                                                        <div className="space-y-3">
                                                            <h3 className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                                                <span className="w-8 h-[1px] bg-neutral-800"></span>
                                                                Mission Specs
                                                            </h3>
                                                            <p className="text-neutral-400 text-xs leading-relaxed font-mono whitespace-pre-wrap border-l-2 border-emerald-900/30 pl-4 py-1">
                                                                {job.job_desc}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col items-center gap-4 py-4">
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); alert('MISSION PROTOCOL INITIATED') }}
                                                                className="w-full max-w-xs relative overflow-hidden group/btn bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-[0.3em] text-[11px] py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95"
                                                            >
                                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                                    <Zap className="w-4 h-4 fill-black" />
                                                                    Accept Mission
                                                                </span>
                                                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                                                            </button>
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); toggleExpand(job.job_id) }}
                                                                className="text-[10px] font-mono text-neutral-600 hover:text-neutral-400 uppercase tracking-widest transition-colors flex items-center gap-1"
                                                            >
                                                                <ChevronUp className="w-3 h-3" />
                                                                Collapse Terminal
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <div className="mt-4 flex items-center justify-center gap-2 text-neutral-600 font-mono text-[9px] uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                                                    <ChevronDown className="w-3 h-3" />
                                                    Decrypt Mission Details
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* RIGHT-HAND SCAN TERMINAL (FILTERS ONLY) */}
            <aside 
                className={`order-1 xl:order-2 flex-shrink-0 transition-all duration-300 ease-in-out ${
                    isFilterOpen ? 'w-full xl:w-[350px] opacity-100 translate-x-0' : 'w-0 opacity-0 overflow-hidden translate-x-12 h-0 xl:h-auto'
                }`}
            >
                <div className="bg-[#131316] p-6 rounded-xl border border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.05)] sticky top-6 relative overflow-hidden">
                    
                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100%_4px]"></div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="font-mono text-emerald-400 tracking-widest uppercase text-sm font-bold flex items-center gap-2">
                            <span className="w-2 h-6 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] rounded-sm"></span>
                            Filters
                        </h3>
                        <button 
                            className="xl:hidden text-neutral-500 hover:text-emerald-400 transition-colors"
                            onClick={() => setIsFilterOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="space-y-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-xs font-mono tracking-widest uppercase text-neutral-500">Keywords</label>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 group-focus-within:text-emerald-400 w-4 h-4 transition-colors" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="SEARCH TITLES..."
                                    className="pl-10 h-12 w-full bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-700 font-mono text-sm tracking-wide rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-mono tracking-widest uppercase text-neutral-500">Company</label>
                            <div className="relative">
                                <select
                                    value={employer}
                                    onChange={(e) => setEmployer(e.target.value)}
                                    className="appearance-none h-12 w-full bg-neutral-950 border border-neutral-800 text-white font-mono text-sm uppercase rounded-lg pl-3 pr-10 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all shadow-inner"
                                >
                                    <option value="">ALL COMPANIES</option>
                                    {uniqueEmployers.map(emp => (
                                        <option key={emp} value={emp}>{emp}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-emerald-600">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 pt-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-mono tracking-widest uppercase text-neutral-500">Minimum Pay</label>
                                <span className="text-sm font-black text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-900/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                    {minBounty > 0 ? `$${minBounty.toLocaleString('en-US')}` : 'ANY PAY'}
                                </span>
                            </div>
                            
                            <div className="px-1">
                                <input 
                                    type="range" 
                                    min={0} 
                                    max={maxBountyBound} 
                                    step={50}
                                    value={minBounty}
                                    onChange={(e) => setMinBounty(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                                />
                            </div>
                            
                            <div className="flex justify-between text-[10px] font-mono tracking-widest text-neutral-600 px-1">
                                <span>$0</span>
                                <span>${maxBountyBound.toLocaleString('en-US')} MAX</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-neutral-800/50">
                            <button 
                                onClick={resetFilters}
                                disabled={!hasActiveFilters}
                                className="w-full h-12 flex items-center justify-center font-mono text-xs uppercase tracking-widest bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-red-400 hover:border-red-900/50 hover:bg-neutral-950 transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RotateCcw className="w-3.5 h-3.5 mr-2" />
                                Reset Selected Filters
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
            
        </div>
    )
}
