import { SignupForm } from "@/components/signup-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <GalleryVerticalEnd className="size-6" />
          <span className="ml-2">Itinera</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Join thousands of travelers who trust Itinera for their journey planning."
            </p>
            <footer className="text-sm">Travel Community</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <SignupForm />
        </div>
      </div>
    </div>
  )
} 