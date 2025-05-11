import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { put } from '@vercel/blob';



export async function GET(req: Request) {
    try {
        // Get URL and search params
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Get user profile with user data
        const userProfile = await prisma.userProfile.findFirst({
            where: { userId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        username: true,
                        displayUsername: true
                    }
                }
            }
        });

        if (!userProfile) {
            // Create new profile if doesn't exist
            const newProfile = await prisma.userProfile.create({
                data: {
                    id: crypto.randomUUID(),
                    userId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                            username: true,
                            displayUsername: true
                        }
                    }
                }
            });
            return NextResponse.json({ userProfile: newProfile });
        }

        return NextResponse.json({ userProfile });

    } catch (error) {
        console.error('Profile API Error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const userId = formData.get("userId") as string;
        const file = formData.get("file") as File | null;
        const updateData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            fullName: formData.get("fullName") as string,
            bio: formData.get("bio") as string,
            location: formData.get("location") as string,
            website: formData.get("website") as string,
        };

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        let imageUrl: string | undefined;

        // If there's a new image, upload it (will overwrite if exists)
        //TODO: check for existing image and delete it manually (overwite not working)
        if (file) {
            const blob = await put(`users/profile-images/${userId}`, file, {
                access: 'public',
                addRandomSuffix: true
            });
            imageUrl = blob.url;
        }

        // Update user data
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: updateData.fullName,
                username: updateData.username,
                email: updateData.email,
                ...(imageUrl && { image: imageUrl }) // Only update image if we have a new one
            }
        });

        // Update or create user profile
        const updatedProfile = await prisma.userProfile.upsert({
            where: { userId },
            create: {
                id: crypto.randomUUID(),
                userId,
                bio: updateData.bio,
                location: updateData.location,
                website: updateData.website,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            update: {
                bio: updateData.bio,
                location: updateData.location,
                website: updateData.website,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({
            userProfile: {
                ...updatedProfile,
                user: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    username: updatedUser.username,
                    image: updatedUser.image
                }
            }
        });

    } catch (error) {
        console.error('Profile Update Error:', error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
