'use client'

import { useEffect, useState } from 'react';
import { DeleteInvoice, UpdateInvoice } from '@/app/ui/bookings/buttons';
import {formatCurrency, formatDateToLocal, getCamperClass} from '@/app/lib/utils';
import {Reserva} from '@/app/lib/definitions'

interface Props {
    query: string;
}

export default function TablaReservas({ query }: Props) {
    const [reservas, setReservas] = useState<Reserva[]>([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await fetch('/api/bookings');
                if (response.ok) {
                    const data = await response.json();
                    setReservas(data);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="min-w-full text-gray-900">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium">
                                Cliente
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Camper ID
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Importe
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Estado Reserva
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Plataforma
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Entrada
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Salida
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Acciones
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {reservas.map((reserva) => (
                            <tr key={reserva.id} className="border-b">
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <p>{reserva.nombreCliente}</p>
                                </td>
                                <td className="px-3 py-3">{getCamperClass(reserva.camperId)}</td>
                                <td className="px-3 py-3">{formatCurrency(reserva.importe)}</td>
                                <td className="px-3 py-3">{reserva.estadoReserva}</td>
                                <td className="px-3 py-3">{reserva.plataforma}</td>
                                <td className="px-3 py-3">{formatDateToLocal(reserva.fechaEntrada)}</td>
                                <td className="px-3 py-3">{formatDateToLocal(reserva.fechaSalida)}</td>
                                <td className="py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-2">
                                        <UpdateInvoice id={reserva.id.toString()}/>
                                        <DeleteInvoice id={reserva.id.toString()}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
