"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Chromium, GithubIcon, Loader, Loader2, Send} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState, useTransition} from "react";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function LoginForm () {

    const router = useRouter()
    const [githubPending, startGithubTransition] = useTransition()
    const [googlePending, startGoogleTransition] = useTransition()
    const [emailPending, startEmailTransition] = useTransition()
    const [email, setEmail] = useState('')

    async function signInWithGithub() {
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Connecté avec Github, vous allez être redirigé...")
                    },
                    onError: () => {
                        toast.error("Erreur interne du serveur.")
                    },
                },
            })
        })
    }

    async function signInWithGoogle() {
        startGoogleTransition(async () => {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Connecté avec Github, vous allez être redirigé...")
                    },
                    onError: () => {
                        toast.error("Erreur interne du serveur.")
                    },
                },
            })
        })
    }

    function signInWithEmail() {
        startEmailTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("E-mail de vérification envoyé, veuillez vérifier votre boîte mail.")
                        router.push(`/verify-request?email=${email}`)
                    },
                    onError: () => {
                        toast.error("Erreur lors de l'envoi de l'e-mail.")
                    },
                },
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome back !</CardTitle>
                <CardDescription>Connectez-vous avec vos réseaux sociaux ou votre compte email</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button onClick={signInWithGithub} disabled={githubPending} className="w-full" variant="outline">
                    {githubPending ? (
                        <>
                            <Loader className="size-4 animate-spin"/>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4" />Connectez-vous avec Github
                        </>
                    )}
                </Button>
                <Button onClick={signInWithGoogle} disabled={googlePending} className="w-full" variant="outline">
                    {googlePending ? (
                        <>
                            <Loader className="size-4 animate-spin"/>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <Chromium className="size-4" />Connectez-vous avec Google
                        </>
                    )}
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">Où continuez avec</span>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <Button onClick={signInWithEmail} disabled={emailPending}>
                        {emailPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin"/>
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <Send  className="size-4"/>
                                <span>Continuez avec votre email</span>
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

