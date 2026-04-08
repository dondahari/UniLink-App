'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Heart, Briefcase, MapPin, DollarSign, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { saveJobAction } from '@/app/actions/jobs'

type RecommendedJob = {
    job_id: string
    job_title: string
    company_name: string
    location: string
    pay_rate: string
    experience_level: string
    score?: number
}

export function TinderJobDeck({ initialJobs }: { initialJobs: RecommendedJob[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [likedJobs, setLikedJobs] = useState<string[]>([])

    // Drag state
    const [dragX, setDragX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    
    // Animate smoothly back to 0 if released early
    const [isAnimating, setIsAnimating] = useState(false)

    // Handlers
    const handleDislike = () => {
        setIsAnimating(true)
        setDragX(-500) // swipe out left
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1)
            setDragX(0)
            setIsAnimating(false)
        }, 200)
    }

    const handleLike = () => {
        setIsAnimating(true)
        setDragX(500) // swipe out right
        setTimeout(() => {
            const targetJob = initialJobs[currentIndex]
            if (targetJob) {
                // background process to fire the cloud db write instantly 
                saveJobAction(targetJob.job_id)
                setLikedJobs(prev => [...prev, targetJob.job_id])
            }
            setCurrentIndex(prev => prev + 1)
            setDragX(0)
            setIsAnimating(false)
        }, 200)
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(true)
        setIsAnimating(false)
        setStartX(e.clientX)
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return
        setDragX(e.clientX - startX)
    }

    const handlePointerUp = () => {
        if (!isDragging) return
        setIsDragging(false)
        
        // Threshold to trigger swipe action
        if (dragX > 120) {
            handleLike()
        } else if (dragX < -120) {
            handleDislike()
        } else {
            // Snap back
            setIsAnimating(true)
            setDragX(0)
            setTimeout(() => setIsAnimating(false), 200)
        }
    }

    useEffect(() => {
        const handleGlobalUp = () => {
            if (isDragging) handlePointerUp()
        }
        window.addEventListener('pointerup', handleGlobalUp)
        return () => window.removeEventListener('pointerup', handleGlobalUp)
    }, [isDragging, dragX])

    // Safety checks
    if (initialJobs.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300 shadow-sm max-w-xl mx-auto">
                <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-neutral-400" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">No Recommendations Yet</h3>
                <p className="text-neutral-500 font-medium max-w-md mx-auto mt-2">Update your profile with more specific skills and a major to jumpstart the UniLink engine.</p>
            </div>
        )
    }

    // End of Deck
    if (currentIndex >= initialJobs.length) {
        return (
            <div className="text-center py-20 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm max-w-xl mx-auto relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10">
                    <Heart className="w-40 h-40 fill-emerald-600" />
                </div>
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative z-10">
                    <Heart className="w-8 h-8 text-emerald-600 fill-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-emerald-900 relative z-10">You're all caught up!</h3>
                <p className="text-emerald-700 font-medium max-w-sm mx-auto mt-2 relative z-10">
                    You've reviewed all {initialJobs.length} top recommendations today. You saved {likedJobs.length} opportunities.
                </p>
                <Button variant="outline" className="mt-8 bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold relative z-10" onClick={() => { setCurrentIndex(0); setLikedJobs([]) }}>
                    Review Deck Again
                </Button>
            </div>
        )
    }

    const activeJob = initialJobs[currentIndex]

    // Visual indicators during swipe
    const rotation = dragX * 0.05
    const likeOpacity = dragX > 20 ? Math.min(dragX / 100, 1) : 0
    const nopeOpacity = dragX < -20 ? Math.min(Math.abs(dragX) / 100, 1) : 0

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto h-[70vh] min-h-[550px] relative">
            
            {/* INSTRUCTIONS */}
            <p className="text-neutral-400 font-medium text-sm mb-4">Swipe right to Save, swipe left to Pass</p>

            {/* CARD STACK CONTAINER */}
            <div className="relative w-full h-[450px] flex justify-center items-center">
                
                {/* ACTIVE CARD */}
                <div 
                    className={`absolute inset-0 bg-white rounded-3xl shadow-2xl border border-neutral-200 flex flex-col cursor-grab active:cursor-grabbing touch-none z-10 ${isAnimating ? 'transition-transform duration-200 ease-out' : ''}`}
                    style={{
                        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
                        transformOrigin: 'bottom center'
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    {/* Swipe Overlay STAMPS */}
                    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl">
                        <div 
                            className="absolute top-10 left-10 border-4 border-emerald-500 text-emerald-500 text-4xl font-black tracking-widest uppercase px-4 py-2 rounded-xl rotate-[-15deg]"
                            style={{ opacity: likeOpacity }}
                        >
                            SAVE
                        </div>
                        <div 
                            className="absolute top-10 right-10 border-4 border-rose-500 text-rose-500 text-4xl font-black tracking-widest uppercase px-4 py-2 rounded-xl rotate-[15deg]"
                            style={{ opacity: nopeOpacity }}
                        >
                            PASS
                        </div>
                    </div>

                    <div className="h-6 w-full bg-gradient-to-r from-primary-600 to-indigo-600 rounded-t-3xl pointer-events-none"></div>
                    
                    <div className="flex-1 p-8 flex flex-col relative pointer-events-none">
                        {activeJob.score && activeJob.score > 0 ? (
                            <div className="inline-flex self-start border border-indigo-100 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                                Match Score: {activeJob.score}
                            </div>
                        ) : null}

                        <h2 className="text-2xl font-black text-neutral-900 tracking-tight leading-tight mb-3">
                            {activeJob.job_title}
                        </h2>
                        
                        <div className="flex items-center gap-2 text-primary-700 mb-8 font-semibold">
                            <Building className="w-5 h-5 flex-shrink-0" />
                            <span>{activeJob.company_name}</span>
                        </div>

                        <div className="flex flex-col gap-4 mt-auto">
                            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                                <DollarSign className="w-5 h-5 text-emerald-600" />
                                <span className="font-bold text-neutral-900">{activeJob.pay_rate}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                                <MapPin className="w-5 h-5 text-rose-500" />
                                <span className="font-bold text-neutral-900">{activeJob.location}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                                <Briefcase className="w-5 h-5 text-indigo-500" />
                                <span className="font-bold text-neutral-900">{activeJob.experience_level}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACKGROUND CARD (Next Job Hint) */}
                {currentIndex + 1 < initialJobs.length && (
                    <div className="absolute inset-0 bg-neutral-100 rounded-3xl shadow-sm border border-neutral-200 flex flex-col z-0 opacity-50 scale-95 origin-bottom pointer-events-none">
                        <div className="h-6 w-full bg-neutral-200 rounded-t-3xl"></div>
                        <div className="flex-1 p-8 flex flex-col justify-center items-center">
                            <div className="w-3/4 h-8 bg-neutral-200 rounded-md mb-4"></div>
                            <div className="w-1/2 h-4 bg-neutral-200 rounded-md"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM CONTROLS (Tinder Style) */}
            <div className="flex items-center justify-center gap-8 mt-10">
                <button 
                    onClick={handleDislike}
                    className="w-16 h-16 bg-white border-2 border-rose-100 rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:scale-110 hover:bg-rose-50 hover:border-rose-200 transition-all duration-200"
                >
                    <X className="w-8 h-8 stroke-[3]" />
                </button>
                <button 
                    onClick={handleLike}
                    className="w-16 h-16 bg-white border-2 border-emerald-100 rounded-full shadow-lg flex items-center justify-center text-emerald-500 hover:scale-110 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-200"
                >
                    <Heart className="w-8 h-8 fill-emerald-500" />
                </button>
            </div>

        </div>
    )
}
