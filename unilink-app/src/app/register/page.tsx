"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { BookOpen, AlertCircle } from "lucide-react"
import { register } from "@/app/actions/auth"

export default function RegisterPage() {
    const [role, setRole] = useState<'student' | 'employer'>('student')
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <a href="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 rounded-lg p-1.5">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-neutral-900">UniLink</span>
                    </a>
                </div>

                <Card className="border-neutral-200 shadow-md">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                        <CardDescription className="text-neutral-500">
                            Join the platform connecting students and employers
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>{decodeURIComponent(error)}</span>
                            </div>
                        )}
                        <form action={register} className="space-y-4">
                            {/* Hidden input carries the selected role to the server action */}
                            <input type="hidden" name="role" value={role} />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium leading-none text-neutral-700">First name</label>
                                    <Input id="firstName" name="firstName" placeholder="Jane" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium leading-none text-neutral-700">Last name</label>
                                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none text-neutral-700">Email</label>
                                <Input id="email" name="email" type="email" placeholder="name@edu.mail.com" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none text-neutral-700">Password</label>
                                <Input id="password" name="password" type="password" required />
                            </div>

                            <div className="pt-2">
                                <label className="text-sm font-medium leading-none text-neutral-700 mb-2 block">I am a...</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setRole('student')}
                                        className={`w-full justify-start px-4 transition-all duration-200 ${role === 'student'
                                                ? 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-800'
                                                : 'text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                                            }`}
                                    >
                                        <span className={`mr-2 h-2 w-2 rounded-full ${role === 'student' ? 'bg-primary-600' : 'bg-neutral-300'}`}></span> Student
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setRole('employer')}
                                        className={`w-full justify-start px-4 transition-all duration-200 ${role === 'employer'
                                                ? 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-800'
                                                : 'text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                                            }`}
                                    >
                                        <span className={`mr-2 h-2 w-2 rounded-full ${role === 'employer' ? 'bg-primary-600' : 'bg-neutral-300'}`}></span> Employer
                                    </Button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-6" size="lg">
                                Create {role === 'student' ? 'Student' : 'Employer'} Account
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center text-neutral-500">
                            Already have an account?{" "}
                            <a href="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                                Sign in
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
