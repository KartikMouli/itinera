import { LoginForm } from "@/components/login-form/login-form"
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0">
          <Image
            src="/images/rajasthan.png"
            alt="India Travel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30" />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <GalleryVerticalEnd className="size-6" />
          <span className="ml-2">Itinera</span>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &quot;This platform has transformed how we manage our travel itineraries.&quot;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
