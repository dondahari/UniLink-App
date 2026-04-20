import { BookOpen, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/favicons/unilink logo no words.png" alt="UniLink Logo" className="w-8 h-8" />
                        <span className="text-2xl font-bold tracking-tight text-neutral-900">UniLink</span>
                    </a>
                </div>

                <Card className="border-neutral-200 shadow-md text-center">
                    <CardHeader className="space-y-3 pb-4">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-primary-50 p-4">
                                <Mail className="h-8 w-8 text-primary-600" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                        <CardDescription className="text-neutral-500 text-sm leading-relaxed">
                            We&apos;ve sent you a confirmation link. Click it to activate your account and then sign in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-6">
                        <p className="text-xs text-neutral-400">
                            Didn&apos;t receive it? Check your spam folder or{" "}
                            <a href="/register" className="text-primary-600 hover:text-primary-500 font-medium">
                                try registering again
                            </a>
                            .
                        </p>
                        <a
                            href="/login"
                            className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors"
                        >
                            Back to sign in →
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
