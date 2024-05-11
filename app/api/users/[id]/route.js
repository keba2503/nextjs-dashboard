import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, {params}) {
    try {
        const data = await request.json();
        console.log(data);

        const id = parseInt(params.id);
        const {name, lastname, email, password} = data;

        const updateData = {};

        if (name !== undefined && name !== null) {
            updateData.name = name;
        }
        if (lastname !== undefined && lastname !== null) {
            updateData.lastname = lastname;
        }
        if (email !== undefined && email !== null) {
            updateData.email = email;
        }
        if (password !== undefined && password !== null && password !== '') {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updateUser = await prisma.users.update({
            where: {id},
            data: updateData,
        });

        return NextResponse.json(updateUser);
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

export async function DELETE(request, {params}) {
    try {
        const id = parseInt(params.id);
        const deletedUser = await prisma.users.delete({
            where: {id}
        });
        return NextResponse.json(deletedUser);
    } catch (error) {
        console.error("Error deleting user", error);
        return NextResponse.error
        (
            "Internal server Error", 500
        )
    }
}
