import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const voice_list = [3,8,47,67]

async function checkUser(id: number): Promise<void> {
    const user = await prisma.user.findUnique({
        where: {
            user: id
        }
    })

    if (!user) {
        const voice = voice_list[Math.floor(Math.random() * voice_list.length)]

        await prisma.user.create({
            data: {
                user: id,
                voice: voice
            }
        })
    }
}

export async function getUser(id: number): Promise<any> {
    await checkUser(id)

    const user = await prisma.user.findUnique({
        where: {
            user: id
        },
        select: {
            name: true,
            voice: true
        }
    })
    
    return user
}

export async function setName(id: number, name: string): Promise<void> {
    await checkUser(id)

    await prisma.user.update({
        where: {
            user: id
        },
        data: {
            name: name
        }
    })
}