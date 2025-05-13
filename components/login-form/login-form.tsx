"use client"

import { GalleryVerticalEnd, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { authClient } from "@/lib/auth-client"
import type { BetterAuthError } from "better-auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState } from "react"
import { FaGoogle } from "react-icons/fa"


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isSocialLoginLoading, setIsSocialLoginLoading] = useState(false)
  const [provider, setProvider] = useState<"google">("google")
  const router = useRouter()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (data: LoginFormData) => {

    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => {
        setIsLoginLoading(true)
      },
      onResponse: () => {
        setIsLoginLoading(false)
      },
      onError: (ctx: { error: BetterAuthError }) => {
        toast.error(ctx.error.message)
        setIsLoginLoading(false)
      },
      onSuccess: () => {
        router.push("/dashboard")
      }
    }
    );

  }

  const handleSocialLogin = async (provider: "google") => {
    setProvider(provider)
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/dashboard",
    },
      {
        onRequest: () => {
          setIsSocialLoginLoading(true)
        },
        onResponse: () => {
          setIsSocialLoginLoading(false)
        },
        onError: (ctx: { error: BetterAuthError }) => {
          toast.error(ctx.error.message)
          setIsSocialLoginLoading(false)
        },
        onSuccess: () => {
          router.push("/dashboard")
        }
      }
    )
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
            <h1 className="text-xl font-bold">Welcome to Itinera</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline underline-offset-4">
                Sign up
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
            <Button type="submit" className="w-full" disabled={isLoginLoading || isSocialLoginLoading}>
              {isLoginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 grid-cols-1">
            <Button variant="outline" type="button" className="w-full flex items-center justify-center gap-2" onClick={() => handleSocialLogin("google")} disabled={isSocialLoginLoading || isLoginLoading}>
              {isSocialLoginLoading && provider === "google" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                  Logging in...
                </>
              ) : (
                <>
                  <FaGoogle className="h-4 w-4 shrink-0" />
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
