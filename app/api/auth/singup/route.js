import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {

    try {
        const data = await request.json();
        console.log(data)

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await prisma.users.create({
            data: {
                name: data.name,
                lastname:data.lastname,
                email: data.email,
                password: hashedPassword,
            },
        });

        const { password: _, ...user } = newUser;

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
