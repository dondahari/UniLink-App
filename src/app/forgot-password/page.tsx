import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, AlertCircle, Mail } from "lucide-react"
import { requestPasswordReset } from "@/app/actions/auth"

interface Props {
  searchParams: Promise<{ error?: string; sent?: string }>
}

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const { error, sent } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2">
            <img src="/favicons/unilink logo no words.png" alt="UniLink Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-neutral-900">UniLink</span>
          </a>
        </div>

        <Card className="border-neutral-200 shadow-md">
          {sent ? (
            // Success state
            <CardContent className="pt-8 pb-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary-50 p-4">
                  <Mail className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold">Check your email</h2>
              <p className="text-sm text-neutral-500">
                If that address is in our system, you'll receive a reset link shortly.
              </p>
              <a href="/login" className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-500">
                Back to sign in →
              </a>
            </CardContent>
          ) : (
            // Form state
            <>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                <CardDescription className="text-neutral-500">
                  Enter your email and we'll send you a reset link.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{decodeURIComponent(error)}</span>
                  </div>
                )}
                <form action={requestPasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</label>
                    <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                  </div>
                  <Button type="submit" className="w-full" size="lg">Send reset link</Button>
                </form>
                <div className="text-center">
                  <a href="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Back to sign in
                  </a>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}