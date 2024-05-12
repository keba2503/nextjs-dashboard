'use client';

import {useState} from 'react';
import {Reserva} from '@/app/lib/definitions';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {formatDateToLocal, getCamperClass} from "@/app/lib/utils";

export default function EditBookingForm({reserva}: { reserva: Reserva }) {
    const [formData, setFormData] = useState({
        fechaEntrada: reserva.fechaEntrada,
        horaEntrada: reserva.horaEntrada,
        fechaSalida: reserva.fechaSalida,
        horaSalida: reserva.horaSalida,
        importe: reserva.importe,
        estadoReserva: reserva.estadoReserva,
        nombreCliente: reserva.nombreCliente,
        plataforma: reserva.plataforma,
        dias: reserva.dias,
        descripcion: reserva.descripcion,
        importeExtras: reserva.importeExtras,
        pagadoExtras: reserva.pagadoExtras,
        pagoTotalConExtras: reserva.pagoTotalConExtras,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/bookings/${reserva.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("La reserva se actualizó correctamente.");
            } else {
                const errorData = await response.json();
                console.error("Hubo un error al actualizar la reserva:", errorData.message);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="fechaEntrada" className="mb-2 block text-sm font-medium">
                        Nombre del cliente
                    </label>
                    <input
                        type="text"
                        id="fechaEntrada"
                        name="fechaEntrada"
                        value={reserva.nombreCliente}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fechaEntrada" className="mb-2 block text-sm font-medium">
                        Plataforma
                    </label>
                    <input
                        type="text"
                        id="fechaEntrada"
                        name="fechaEntrada"
                        value={reserva.plataforma}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fechaEntrada" className="mb-2 block text-sm font-medium">
                        Días de reserva
                    </label>
                    <input
                        type="text"
                        id="fechaEntrada"
                        name="fechaEntrada"
                        value={reserva.dias}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fechaEntrada" className="mb-2 block text-sm font-medium">
                        Camper
                    </label>
                    <input
                        type="text"
                        id="fechaEntrada"
                        name="fechaEntrada"
                        value={getCamperClass(reserva.camperId)}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaEntrada" className="mb-2 block text-sm font-medium">
                        Fecha de Entrada
                    </label>
                    <input
                        type="text"
                        id="fechaEntrada"
                        name="fechaEntrada"
                        value={formatDateToLocal(reserva.fechaEntrada)}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="horaEntrada" className="mb-2 block text-sm font-medium">
                        Hora de Entrada
                    </label>
                    <input
                        type="text"
                        id="horaEntrada"
                        name="horaEntrada"
                        value={formData.horaEntrada}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaSalida" className="mb-2 block text-sm font-medium">
                        Fecha de Salida
                    </label>
                    <input
                        type="text"
                        id="fechaSalida"
                        name="fechaSalida"
                        value={formatDateToLocal(reserva.fechaSalida)}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="horaSalida" className="mb-2 block text-sm font-medium">
                        Hora de Salida
                    </label>
                    <input
                        type="text"
                        id="horaSalida"
                        name="horaSalida"
                        value={formData.horaSalida}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="importe" className="mb-2 block text-sm font-medium">
                        Importe
                    </label>
                    <input
                        type="number"
                        id="importe"
                        name="importe"
                        value={formData.importe}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="importe" className="mb-2 block text-sm font-medium">
                        Importe Extra
                    </label>
                    <input
                        type="number"
                        id="importe"
                        name="importe"
                        value={formData.importeExtras}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="estadoReserva" className="mb-2 block text-sm font-medium">
                        Estado de la Reserva
                    </label>
                    <input
                        id="estadoReserva"
                        type="text"
                        name="estadoReserva"
                        value={formData.estadoReserva}
                        onChange={handleChange}
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                    </input>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/bookings"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edita Reservas</Button>
            </div>
        </form>
    );
}
