import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    trustedOrigins: ["https://itinera.vercel.app"],
    plugins: [ 
        username() 
    ] 

});