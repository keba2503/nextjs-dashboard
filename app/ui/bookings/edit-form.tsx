'use client';

import {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Reserva} from '@/app/lib/definitions';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {formatCurrency} from "@/app/lib/utils";
import PlatformSelect from "@/app/ui/bookings/platform";
import StatusSelect from "@/app/ui/bookings/status";
import CamperSelect from "@/app/ui/bookings/camper";
import ModalSuccess from "@/app/ui/bookings/modal";

export default function EditBookingForm({reserva}: { reserva: Reserva }) {
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [fechaEntrada, setFechaEntrada] = useState<Date | null>(new Date(reserva.fechaEntrada));
    const [fechaSalida, setFechaSalida] = useState<Date | null>(new Date(reserva.fechaSalida));

    const [formData, setFormData] = useState({
        camperId: reserva.camperId,
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
            const importeNumero = parseInt(String(formData.importe));
            const importeExtrasNumero = parseInt(String(formData.importeExtras));
            const totalConExtras = importeNumero + importeExtrasNumero;

            const response = await fetch(`/api/bookings/${reserva.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    pagototalConextras: totalConExtras
                }),
            });
            if (response.ok) {
                setSaveSuccess(true);
                console.log("La reserva se actualizó correctamente.");
            } else {
                const errorData = await response.json();
                console.error("Hubo un error al actualizar la reserva:", errorData.message);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const handleModalOk = () => {
        setSaveSuccess(false);
        window.location.href = "/dashboard/bookings";
    };

    useEffect(() => {
        // @ts-ignore
        setFormData(prevState => ({
            ...prevState,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida
        }));
    }, [fechaEntrada, fechaSalida]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                        Nombre del cliente
                    </label>
                    <input
                        type="text"
                        id="nombreCliente"
                        name="nombreCliente"
                        value={formData.nombreCliente}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <PlatformSelect formData={formData} handleChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                        Días de reserva
                    </label>
                    <input
                        type="text"
                        id="dias"
                        name="dias"
                        value={formData.dias}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <CamperSelect formData={formData} handleChange={handleChange}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaEntrada" className="mb-2 block text-sm font-medium">
                        Fecha de Entrada
                    </label>
                    <DatePicker
                        selected={fechaEntrada}
                        onChange={date => setFechaEntrada(date)}
                        dateFormat="dd/MM/yyyy"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
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
                    <label className="mb-2 block text-sm font-medium">
                        Fecha de Salida
                    </label>
                    <DatePicker
                        selected={fechaSalida}
                        onChange={date => setFechaSalida(date)}
                        dateFormat="dd/MM/yyyy"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
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
                    <label className="mb-2 block text-sm font-medium">
                        Importe Extra
                    </label>
                    <input
                        type="number"
                        id="importeExtras"
                        name="importeExtras"
                        value={formData.importeExtras}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <StatusSelect formData={formData} handleChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                        Total (con extras)
                    </label>
                    <span
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-lg font-bold text-green-600">
                        {formatCurrency(formData.pagoTotalConExtras)}
                    </span>
                </div>
            </div>
            {saveSuccess && <ModalSuccess onClose={handleModalOk} />}
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/bookings/"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancelar
                </Link>
                <Button type="submit">Edita Reservas</Button>
            </div>
        </form>
    );
}
