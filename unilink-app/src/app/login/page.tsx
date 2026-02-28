import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
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
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription className="text-neutral-500">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none text-neutral-700">Email</label>
                            <Input id="email" type="email" placeholder="name@edu.mail.com" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none text-neutral-700">Password</label>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                                    Forgot password?
                                </a>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button className="w-full" size="lg">Sign In</Button>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center text-neutral-500">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                                Sign up
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
