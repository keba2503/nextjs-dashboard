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

export async function PUT(request, {params}) {
    try {
        const data = await request.json();
        const id = parseInt(params.id);

        const connection = await connectToDatabase();
        const updateData = {};

        for (const key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                if (key === 'fechaEntrada' || key === 'fechaSalida') {
                    updateData[key] = new Date(data[key]).toISOString().slice(0, 19).replace('T', ' ');
                } else {
                    updateData[key] = data[key];
                }
            }
        }

        let setClause = '';
        const updateValues = [];

        for (const key in updateData) {
            setClause += `${key} = ?, `;
            updateValues.push(updateData[key]);
        }

        setClause = setClause.slice(0, -2);

        const sqlQuery = `UPDATE Booking
                          SET ${setClause}
                          WHERE id = ?`;

        updateValues.push(id);
        await connection.execute(sqlQuery, updateValues);
        await connection.end();

        return NextResponse.json({message: 'Booking updated successfully'});
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

        const connection = await connectToDatabase();
        await connection.execute('DELETE FROM Booking WHERE id = ?', [id]);
        await connection.end();

        return NextResponse.json({message: 'Booking deleted successfully'});
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

export async function GET(request, { params }) {
    try {
        const connection = await connectToDatabase();
        const id = parseInt(params.id);
        const [bookingRows] = await connection.execute('SELECT * FROM Booking WHERE id = ?', [id]);

        if (bookingRows.length === 0) {
            await connection.end();
            return NextResponse.json(
                {
                    message: 'Reserva no encontrada',
                },
                {
                    status: 404,
                }
            );
        }

        const booking = bookingRows[0];

        const [camperRows] = await connection.execute('SELECT * FROM Camper WHERE id = ?', [booking.camperId]);
        if (camperRows.length === 0) {
            await connection.end();
            return NextResponse.json(
                {
                    message: 'Camper no encontrado',
                },
                {
                    status: 404,
                }
            );
        }
        const camper = camperRows[0];

        const [platformRows] = await connection.execute('SELECT * FROM plataforma WHERE id = ?', [booking.plataforma]);
        if (platformRows.length === 0) {
            await connection.end();
            return NextResponse.json(
                {
                    message: 'Plataforma no encontrada',
                },
                {
                    status: 404,
                }
            );
        }
        const plataforma = platformRows[0];

        const [estadoRows] = await connection.execute('SELECT * FROM estado WHERE id = ?', [booking.estadoReserva]);
        if (estadoRows.length === 0) {
            await connection.end();
            return NextResponse.json(
                {
                    message: 'Estado de reserva no encontrado',
                },
                {
                    status: 404,
                }
            );
        }
        const estadoReserva = estadoRows[0];

        await connection.end();

        const response = {
            ...booking,
            camperLabel: camper.nombre,
            plataformaLabel: plataforma.nombre,
            estadoReservaLabel: estadoReserva.nombre
        };

        return NextResponse.json(response);
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