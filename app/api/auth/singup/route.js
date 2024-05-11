import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {

    try {
        const data = await request.json();
        console.log(data)

        const userFound = await prisma.users.findFirst({
            where: {
                email: data.email,
            },
        });

        console.log(userFound)
        if (userFound) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await prisma.users.create({
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: hashedPassword,
            },
        });

        const {password: _, ...user} = newUser;

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
