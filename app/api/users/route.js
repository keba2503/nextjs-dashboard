import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
export async function GET() {
    try {
        const users = await prisma.users.findMany();
        return NextResponse.json(users)
    } catch (error) {
        console.error("Error fetching users", Error);
        return NextResponse.error
        (
            "Internal Server Error"
            , 500);
    }
}
