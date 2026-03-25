"use client"

import { useState, useEffect } from "react"
import { Check, UserCircle2, ChevronRight, ChevronLeft } from "lucide-react"

type QuizAnswer = string | null

const BASE_QUESTION = {
    id: "vibe",
    question: "What's your 'vibe' on campus?",
    options: [
        { label: "The Creative (Design, Art, Media)", path: "A" },
        { label: "The Builder (Coding, Apps, Engineering)", path: "B" },
        { label: "The Strategist (Marketing, Startups, Business)", path: "C" },
        { label: "The Researcher (Data, Science, Writing)", path: "D" },
    ]
}

const PATHS = {
    A: [
        { id: "a1", question: "Which creative field do you specialize in?", options: ["Brand & Visuals", "Digital Interface", "Content & Motion", "Physical & 3D"] },
        { id: "a2", question: "What is your primary 'Output'?", options: ["Static Assets", "Interactive Prototypes", "Video/Multimedia", "3D Renders"] },
        { id: "a3", question: "What's your 'Design Personality'?", options: ["Minimalist & Clean", "Bold & Experimental", "User-Centric & Functional", "Narrative & Story-driven"] },
        { id: "a4", question: "Which stage of a project do you love most?", options: ["The Blank Canvas/Ideation", "The Gritty Execution", "The Final Polish/Export"] },
    ],
    B: [
        { id: "b1", question: "What part of the stack do you live in?", options: ["Front-End", "Back-End", "Full-Stack", "Systems & Hardware"] },
        { id: "b2", question: "What's your primary focus right now?", options: ["Mobile/Web Apps", "Data & AI", "Game Dev", "Cybersecurity"] },
        { id: "b3", question: "How do you approach a new problem?", options: ["Code first/Trial & Error", "Architect first/Flowcharts", "Research first/Documentation"] },
        { id: "b4", question: "What's your favorite 'win' while building?", options: ["Squashing a bug", "Seeing a UI come to life", "Getting the hardware to 'click'"] },
    ],
    C: [
        { id: "c1", question: "Where do you provide the most value?", options: ["Product Growth", "Operations", "Analysis", "Sales/Outreach"] },
        { id: "c2", question: "What is your primary 'Deliverable'?", options: ["Marketing/Social Plan", "Pitch Deck/Business Model", "Data Report", "Project Roadmap"] },
        { id: "c3", question: "What drives your decision-making?", options: ["Market Trends & Data", "Gut Instinct & Vision", "User Feedback", "Resource Efficiency"] },
        { id: "c4", question: "What kind of 'Growth' excites you?", options: ["Viral Social Reach", "Revenue & Sales", "Team Scaling", "Product-Market Fit"] },
    ],
    D: [
        { id: "d1", question: "What is your primary field of inquiry?", options: ["Social Sciences", "STEM/Lab Research", "Humanities/Writing", "Data Science"] },
        { id: "d2", question: "How do you prefer to present findings?", options: ["In-depth Whitepapers", "Visual Data Dashboards", "Academic Posters", "Long-form Essays"] },
        { id: "d3", question: "What's your preferred 'Source'?", options: ["Large Datasets", "Human Interviews/Case Studies", "Historical Archives", "Peer-Reviewed Literature"] },
        { id: "d4", question: "What is the goal of your research?", options: ["Solving a specific problem", "Pure knowledge/Theory", "Challenging the status quo", "Fact-checking"] },
    ]
}

const CONVERGENCE = [
    { id: "conv1", question: "What's your 'Work Mode' preference?", options: ["Deep Work/Solo", "Collaborative/Team-based", "Hybrid"] },
    { id: "conv2", question: "How much time can you commit to a project?", options: ["Full Sprint/10+ hrs", "Casual Pace/3-5 hrs", "One-Offs/Quick Gigs"] },
    { id: "conv3", question: "What is your 'Superpower' in a group?", options: ["The Problem Solver", "The Aesthetic Eye", "The Communicator", "The Organizer"] },
    { id: "conv4", question: "What is your main goal for UniLink?", options: ["Build a Portfolio", "Find a Team", "Get Hired/Internships"] },
]

const POPULAR_FRAMEWORKS = [
    ".NET", "AWS", "Angular", "C#", "C++", "Django", "Docker", "Express", 
    "Firebase", "Flutter", "Go", "GraphQL", "Java", "Kotlin", "Laravel", 
    "MongoDB", "Next.js", "Node.js", "PHP", "PostgreSQL", "Python", 
    "React", "React Native", "Ruby on Rails", "Rust", "SQL", "Spring Boot", 
    "Supabase", "Svelte", "Swift", "Tailwind CSS", "TypeScript", "Unity", 
    "Unreal Engine", "Vue"
]

export default function ProfileClient() {
    const [isFirstTimer, setIsFirstTimer] = useState(true)
    const [step, setStep] = useState(0) // 0 to 8
    
    const [path, setPath] = useState<"A"|"B"|"C"|"D" | null>(null)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [newFramework, setNewFramework] = useState("")
    const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false)
    const [resumeUrl, setResumeUrl] = useState<string | null>(null)

    // Load from local storage
    useEffect(() => {
        const savedAnswers = localStorage.getItem("unilink_profile_answers")
        const savedFinished = localStorage.getItem("unilink_profile_finished")
        if (savedAnswers) {
            try {
                const parsed = JSON.parse(savedAnswers)
                setAnswers(parsed)
                if (parsed.vibe) {
                    const opt = BASE_QUESTION.options.find(o => o.label === parsed.vibe)
                    if (opt) setPath(opt.path as any)
                }
            } catch (e) {}
        }
        if (savedFinished === "true") {
            setIsFirstTimer(false)
        }
        
        const savedResume = localStorage.getItem("unilink_resume")
        if (savedResume) {
            setResumeUrl(savedResume)
        }
        
        setIsLoaded(true)
    }, [])

    const currentQuestions = () => {
        const qList = [BASE_QUESTION.question]
        if (path) {
            PATHS[path].forEach(q => qList.push(q.question))
            CONVERGENCE.forEach(q => qList.push(q.question))
        }
        return qList
    }

    const currentQuestionData = () => {
        if (step === 0) return BASE_QUESTION
        if (step >= 1 && step <= 4) {
            return path ? PATHS[path][step - 1] : null
        }
        if (step >= 5 && step <= 8) {
            return CONVERGENCE[step - 5]
        }
        return null
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        const qData = currentQuestionData()
        if (!qData) return

        // In case they just click next without changing select, the default isn't saved in state.
        // We'll set the answer to the first option if it's missing.
        const qId = qData.id
        const currentAns = answers[qId]
        
        let newAnswers = { ...answers }
        if (!currentAns) {
            if (step === 0) {
                newAnswers[qId] = BASE_QUESTION.options[0].label
                setPath("A") // default path if not explicitly selected
            } else {
                newAnswers[qId] = (qData.options as string[])[0]
            }
            setAnswers(newAnswers)
        }

        if (step < 8) {
            setStep(step + 1)
        } else {
            localStorage.setItem("unilink_profile_answers", JSON.stringify(newAnswers))
            localStorage.setItem("unilink_profile_finished", "true")
            setIsFirstTimer(false)
        }
    }

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const result = event.target?.result as string
            setResumeUrl(result)
            try {
                localStorage.setItem("unilink_resume", result)
            } catch (err) {
                console.warn("Resume file too large for localStorage, viewable for current session only")
            }
        }
        reader.readAsDataURL(file)
    }

    const handleBack = () => {
        if (step > 0) setStep(step - 1)
    }

    const handleChange = (val: string) => {
        const qData = currentQuestionData()
        if (!qData) return
        
        const newAns = { ...answers, [qData.id]: val }
        setAnswers(newAns)

        if (step === 0) {
            const selectedOpt = BASE_QUESTION.options.find(o => o.label === val)
            if (selectedOpt) setPath(selectedOpt.path as any)
        }
    }

    const qData = currentQuestionData()

    if (!isLoaded) {
        return <div className="p-8 text-center text-neutral-500">Loading profile...</div>
    }

    if (isFirstTimer && qData) {
        // Find current value or default
        let currentVal = answers[qData.id] || ""
        if (!currentVal) {
            if (step === 0) currentVal = BASE_QUESTION.options[0].label
            else currentVal = (qData.options as string[])[0]
        }

        return (
            <div className="max-w-2xl mx-auto space-y-8 mt-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Profile Quiz</h1>
                    <p className="text-sm text-neutral-500 mt-2">
                        Step {step + 1} of 9
                    </p>
                    <div className="flex justify-center gap-1.5 mt-4">
                        {Array.from({length: 9}).map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-primary-600' : 'bg-neutral-200'}`}
                            />
                        ))}
                    </div>
                </div>
                
                <form onSubmit={handleNext} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 sm:p-12">
                    <div className="space-y-6 min-h-[160px] flex flex-col justify-center">
                        <div key={step /* forces re-animation */} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <label className="block text-xl font-medium text-neutral-900 mb-6 text-center">
                                {qData.question}
                            </label>
                            
                            <select 
                                value={currentVal}
                                onChange={e => handleChange(e.target.value)}
                                className="w-full px-4 py-4 border rounded-xl border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-base shadow-sm"
                            >
                                {step === 0 
                                    ? BASE_QUESTION.options.map(o => (
                                        <option key={o.label} value={o.label}>{o.label}</option>
                                    ))
                                    : (qData.options as string[]).map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))
                                }
                            </select>

                            {qData.id === "b1" && (
                                <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Which languages or frameworks do you use? (Optional)
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. React, Node.js, Python"
                                        value={answers["b1_frameworks"] || ""}
                                        onChange={e => {
                                            const newAns = { ...answers, "b1_frameworks": e.target.value }
                                            setAnswers(newAns)
                                        }}
                                        className="w-full px-4 py-3 border rounded-xl border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-base shadow-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-100">
                        <button 
                            type="button"
                            onClick={handleBack}
                            className={`inline-flex items-center px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900 transition-colors ${step === 0 ? 'invisible' : ''}`}
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" /> Back
                        </button>
                        <button 
                            type="submit"
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none transition-colors"
                        >
                            {step === 8 ? 'Complete Profile' : 'Next'} <ChevronRight className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    const addFramework = () => {
        addSpecificFramework(newFramework)
        setShowFrameworkDropdown(false)
    }

    const addSpecificFramework = (fw: string) => {
        if (!fw.trim()) return
        const currentMfw = answers["b1_frameworks"] || ""
        if (currentMfw.split(',').map(f => f.trim().toLowerCase()).includes(fw.trim().toLowerCase())) {
            setNewFramework("")
            return // already added
        }
        const updated = currentMfw ? `${currentMfw}, ${fw.trim()}` : fw.trim()
        const newAnswers = { ...answers, "b1_frameworks": updated }
        setAnswers(newAnswers)
        localStorage.setItem("unilink_profile_answers", JSON.stringify(newAnswers))
        setNewFramework("")
    }

    const removeFramework = (fwToRemove: string) => {
        const currentMfw = answers["b1_frameworks"] || ""
        const updated = currentMfw.split(',').map(f => f.trim()).filter(f => f && f !== fwToRemove).join(', ')
        const newAnswers = { ...answers, "b1_frameworks": updated }
        setAnswers(newAnswers)
        localStorage.setItem("unilink_profile_answers", JSON.stringify(newAnswers))
    }

    const filteredFrameworks = POPULAR_FRAMEWORKS.filter(fw => 
        fw.toLowerCase().includes(newFramework.toLowerCase()) && 
        !(answers["b1_frameworks"] || "").split(',').map(f => f.trim().toLowerCase()).includes(fw.toLowerCase())
    )

    const vibe = answers["vibe"] || BASE_QUESTION.options[0].label
    const goal = answers["conv4"] || CONVERGENCE[3].options[0]
    const superpower = answers["conv3"] || CONVERGENCE[2].options[0]
    
    // Pick the first path answer to show as primary detail
    let primaryDetail = ""
    let primaryDetailLabel = ""
    
    let frameworks = ""
    if (path === "A") {
        primaryDetailLabel = "Specialty"
        primaryDetail = answers["a1"] || PATHS.A[0].options[0]
    } else if (path === "B") {
        primaryDetailLabel = "Stack"
        primaryDetail = answers["b1"] || PATHS.B[0].options[0]
        frameworks = answers["b1_frameworks"] || ""
    } else if (path === "C") {
        primaryDetailLabel = "Value Add"
        primaryDetail = answers["c1"] || PATHS.C[0].options[0]
    } else if (path === "D") {
        primaryDetailLabel = "Focus"
        primaryDetail = answers["d1"] || PATHS.D[0].options[0]
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 w-full mt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Your Profile</h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        View and customize how employers see you.
                    </p>
                </div>
                <button 
                    onClick={() => {
                        setStep(0)
                        setAnswers({})
                        setPath(null)
                        localStorage.removeItem("unilink_profile_finished")
                        localStorage.removeItem("unilink_profile_answers")
                        setIsFirstTimer(true)
                    }}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-md transition-colors"
                >
                    Retake Quiz
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
                <div className="p-8 flex flex-col items-center border-b border-neutral-100 sm:flex-row sm:items-start sm:justify-start gap-6">
                    <UserCircle2 className="w-24 h-24 text-neutral-300 flex-shrink-0" />
                    <div className="flex-1 text-center sm:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 mb-2">
                            {vibe}
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900">Goal: {goal}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100 bg-neutral-50/50 rounded-b-xl">
                    <div className="p-8">
                        <h3 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider">{primaryDetailLabel}</h3>
                        <div className="flex items-center text-neutral-700 gap-2 bg-white p-3 rounded-lg border border-neutral-200 shadow-sm">
                            <Check className="w-5 h-5 text-primary-500 flex-shrink-0" />
                            <span className="font-medium">{primaryDetail}</span>
                        </div>
                        {path === "B" && (
                            <div className="mt-4 flex flex-wrap gap-2 items-center">
                                {frameworks.split(',').map(f => f.trim()).filter(Boolean).map((fw, i) => (
                                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                                        {fw.trim()}
                                        <button 
                                            onClick={() => removeFramework(fw.trim())}
                                            className="ml-1.5 text-primary-400 hover:text-primary-900 focus:outline-none flex items-center justify-center font-bold"
                                            title="Remove framework"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                                <div className="relative flex items-center ml-1">
                                    <input 
                                        type="text"
                                        value={newFramework}
                                        onChange={e => {
                                            setNewFramework(e.target.value)
                                            setShowFrameworkDropdown(true)
                                        }}
                                        onFocus={() => setShowFrameworkDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowFrameworkDropdown(false), 200)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                if (filteredFrameworks.length > 0) {
                                                    addSpecificFramework(filteredFrameworks[0])
                                                } else {
                                                    addFramework()
                                                }
                                                setShowFrameworkDropdown(false)
                                            }
                                        }}
                                        placeholder="Type to search..."
                                        className="text-xs px-2 py-1.5 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-36"
                                    />
                                    {showFrameworkDropdown && newFramework.trim() && (
                                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto overflow-x-hidden p-1">
                                            {filteredFrameworks.length > 0 ? (
                                                filteredFrameworks.map(fw => (
                                                    <button
                                                        key={fw}
                                                        type="button"
                                                        onClick={() => addSpecificFramework(fw)}
                                                        className="block w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-50 rounded-sm text-neutral-700 whitespace-nowrap overflow-hidden text-ellipsis"
                                                    >
                                                        {fw}
                                                    </button>
                                                ))
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={addFramework}
                                                    className="block w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-50 rounded-sm text-neutral-700 italic"
                                                >
                                                    Add "{newFramework}"
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-8">
                        <h3 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider">Commitment</h3>
                        <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-white text-neutral-700 border border-neutral-200 shadow-sm">
                            {answers["conv2"] || CONVERGENCE[1].options[0]}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-neutral-900">Resume</h3>
                    {resumeUrl && (
                        <button 
                            onClick={() => {
                                setResumeUrl(null)
                                localStorage.removeItem("unilink_resume")
                            }}
                            className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                        >
                            Delete
                        </button>
                    )}
                </div>
                <div className="p-8 bg-neutral-50/30">
                    {resumeUrl ? (
                        <div className="w-full flex justify-center">
                            <iframe 
                                src={resumeUrl} 
                                className="w-full h-[600px] border border-neutral-200 shadow-sm rounded-lg bg-neutral-100"
                                title="User Resume"
                            />
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-neutral-200 bg-white rounded-xl p-12 text-center shadow-sm">
                            <div className="max-w-md mx-auto">
                                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Upload your resume</h4>
                                <p className="text-sm text-neutral-500 mb-8">
                                    Stand out to employers. We support PDF format up to 5MB. Employers will be able to view or download it directly from your profile.
                                </p>
                                <label className="cursor-pointer inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 transition-all shadow-sm">
                                    <input type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
                                    Browse Files
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
