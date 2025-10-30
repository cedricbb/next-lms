import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@/lib/db";
import {env} from "./env";
import {resend} from "@/lib/resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
        },
        google: {
            clientId: env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        }
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                await resend.emails.send({
                    from: 'CedricLMS <onboarding@resend.dev>',
                    to: [email],
                    subject: 'CedricLMS - Verify your email',
                    html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
                });
            },
        })
    ],
});