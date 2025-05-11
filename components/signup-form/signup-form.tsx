"use client"

import { GalleryVerticalEnd, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { BetterAuthError } from "better-auth"

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isSignupLoading, setIsSignupLoading] = useState(false)
  const [isSocialSignupLoading, setIsSocialSignupLoading] = useState(false)

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (data: SignupFormData) => {
    try {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.email,
      }, {
        onRequest: () => {
          setIsSignupLoading(true)
        },
        onResponse: () => {
          setIsSignupLoading(false)
        },
        onError: (ctx: { error: BetterAuthError }) => {
          toast.error(ctx.error.message)
          setIsSignupLoading(false)
        },
        onSuccess: () => {
          router.push("/dashboard")
        }
      }
      );
    } catch (err) {
      toast.error("An unexpected error occurred")
      setIsSignupLoading(false)
    }
  }

  const handleSocialSignup = async (provider: "google" | "facebook") => {
    try {

      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/dashboard"
      }, {
        onRequest: () => {
          setIsSocialSignupLoading(true)
        },
        onResponse: () => {
          setIsSocialSignupLoading(false)
        },
        onError: (ctx: { error: BetterAuthError }) => {
          toast.error(ctx.error.message)
          setIsSocialSignupLoading(false)
        }
      }
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An unexpected error occurred")
      }
      setIsSocialSignupLoading(false)
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Itinera</span>
            </Link>
            <h1 className="text-xl font-bold">Create an Account</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSignupLoading || isSocialSignupLoading}>
              {isSignupLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-1">
            <Button variant="outline" type="button" className="w-full" onClick={() => handleSocialSignup("facebook")} disabled={isSocialSignupLoading || isSignupLoading}>
            {isSocialSignupLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                <>
                  <FaFacebookF className="h-4 w-4" />
                  Continue with Facebook
                </>
              )}
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={() => handleSocialSignup("google")} disabled={isSocialSignupLoading || isSignupLoading}>
              {isSocialSignupLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                <>
                  <FaGoogle className="h-4 w-4" />
                  Continue with Google
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
        and <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
} 