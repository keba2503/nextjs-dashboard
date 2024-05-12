import {NextResponse} from "next/server";
import mysql from "mysql2/promise";
import {config} from "dotenv";

config();

async function connectToDatabase() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

export async function GET() {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query("SELECT * FROM Booking");
        await connection.end();
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching users", error);
        return NextResponse.error(
            "Internal Server Error", 500
        );
    }
}

