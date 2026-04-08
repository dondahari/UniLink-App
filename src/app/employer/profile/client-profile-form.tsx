'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { updateEmployerProfile } from '@/app/actions/employer'
import { Camera, Building2, Save, Loader2 } from 'lucide-react'
import Image from 'next/image'

export function ClientProfileForm({ employer }: { employer: any }) {
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [logoUrl, setLogoUrl] = useState<string | null>(employer.logo_url || null)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setIsUploading(true)
            const fileExt = file.name.split('.').pop()
            const fileName = `${employer.employer_id}-${Date.now()}.${fileExt}`

            // Direct mapping logic into native storage bucket
            const { data, error } = await supabase.storage
                .from('employer-logos')
                .upload(fileName, file, { cacheControl: '3600', upsert: true })

            if (error) throw error

            // Fetch public URL formatting natively
            const { data: { publicUrl } } = supabase.storage
                .from('employer-logos')
                .getPublicUrl(fileName)

            setLogoUrl(publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Upload failed. Did you run the SQL migration to create the bucket?')
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsSaving(true)
            const formData = new FormData(e.currentTarget)
            if (logoUrl) formData.set('logo_url', logoUrl) // Bridge dynamic client state into form constraints

            await updateEmployerProfile(formData)
            alert('Successfully updated company profile!')
        } catch (error) {
            console.error(error)
            alert('Failed to update native profile.')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-10">
            <input type="hidden" name="employer_id" value={employer.employer_id} />

            {/* Left: Native Native Image Uploader Module */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative group w-40 h-40 rounded-2xl bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300 overflow-hidden cursor-pointer hover:border-primary-400 transition-colors">
                    {logoUrl ? (
                        <Image src={logoUrl} alt="Company Logo" fill className="object-cover" />
                    ) : (
                        <Building2 className="w-12 h-12 text-neutral-300 group-hover:text-primary-400 transition-colors" />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Camera className="w-8 h-8 text-white drop-shadow-md" />
                    </div>

                    {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                        </div>
                    )}

                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading || isSaving}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-neutral-900">Company Logo</p>
                    <p className="text-xs font-medium text-neutral-500 mt-0.5">JPEG or PNG. Max 2MB.</p>
                </div>
            </div>

            {/* Right: Structural Edit Grid */}
            <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-900">Company Name</label>
                        <input type="text" name="co_name" defaultValue={employer.co_name} required className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-900">Industry Sector</label>
                        <input type="text" name="industry" defaultValue={employer.industry || ''} placeholder="e.g. Technology" className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-900">Headquarters / Location</label>
                        <input type="text" name="location" defaultValue={employer.location || ''} placeholder="e.g. Remote" className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-900">Corporate Website</label>
                        <input type="url" name="website" defaultValue={employer.website || ''} placeholder="https://example.com" className="w-full h-11 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-500" />
                    </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 flex justify-end">
                    <button type="submit" disabled={isSaving || isUploading} className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-8 py-3 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Profile
                    </button>
                </div>
            </div>
        </form>
    )
}
