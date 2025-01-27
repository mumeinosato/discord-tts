import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function add_dictionary(server: string, word: string, reading: string): Promise<void> {
    try {
        const existingEntry = await prisma.dictionary.findUnique({
            where: {
                server_word: {
                    server,
                    word
                }
            }
        });

        if (!existingEntry) {
            await prisma.dictionary.create({
                data: {
                    server,
                    word,
                    reading
                }
            });
        }

    } catch (error) {
        console.error("Error adding dictionary entry:", error);
        throw new Error("Failed to add dictionary entry");
    }
}

export async function remove_dictionary(server: string, word: string): Promise<void> {
    try {
        await prisma.dictionary.delete({
            where: {
                server_word: {
                    server,
                    word
                }
            }
        });
    } catch (error) {
        console.error("Error removing dictionary entry:", error);
        throw new Error("Failed to remove dictionary entry");
    }
}

export async function get_reading(server: string, word: string): Promise<string> {
    try {
        const dictionaryEntries = await prisma.dictionary.findMany({
            where: {
                server: server
            }
        });
        
        let modifiedSentence = word;

        for (const entry of dictionaryEntries) {
            const regex = new RegExp(entry.word, "g");
            modifiedSentence = modifiedSentence.replace(regex, entry.reading);
        }

        return modifiedSentence;

    } catch (error) {
        console.error("Error getting reading:", error);
        throw new Error("Failed to get reading");
    }
}