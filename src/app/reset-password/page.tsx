'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, AlertCircle } from "lucide-react"
import { updatePassword } from "@/app/actions/auth"

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('error')
      : null
  )

  const [confirmError, setConfirmError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget
    const pw = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value
    if (pw !== confirm) {
      e.preventDefault()
      setConfirmError('Passwords do not match.')
    }
  }

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
            <CardTitle className="text-2xl font-bold">Choose a new password</CardTitle>
            <CardDescription className="text-neutral-500">
              Must be at least 8 characters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{decodeURIComponent(error)}</span>
              </div>
            )}
            {confirmError && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{confirmError}</span>
              </div>
            )}
            <form action={updatePassword} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-700">New password</label>
                <Input id="password" name="password" type="password" minLength={8} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm" className="text-sm font-medium text-neutral-700">Confirm password</label>
                <Input id="confirm" name="confirm" type="password" minLength={8} required />
              </div>
              <Button type="submit" className="w-full" size="lg">Update password</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}