'use client';

import {useEffect, useState} from 'react';
import {Camper, Estado, Plataforma, Reserva} from '@/app/lib/definitions';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {formatCurrency} from "@/app/lib/utils";

export default function EditBookingForm({reserva}: { reserva: Reserva }) {
    const [campers, setCampers] = useState<Camper[]>([]);
    const [estados, setEstados] = useState<Estado[]>([]);
    const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
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
                        pagototalConextras : totalConExtras
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
        const fetchData = async () => {
            try {
                const [campersRes, estadosRes, plataformasRes] = await Promise.all([
                    fetch('/api/campers'),
                    fetch('/api/status'),
                    fetch('/api/platforms')
                ]);

                if (campersRes.ok && estadosRes.ok && plataformasRes.ok) {
                    const campersData = await campersRes.json();
                    const estadosData = await estadosRes.json();
                    const plataformasData = await plataformasRes.json();
                    setCampers(campersData);
                    setEstados(estadosData);
                    setPlataformas(plataformasData);
                } else {
                    console.error('Error al obtener los datos:', campersRes.statusText, estadosRes.statusText, plataformasRes.statusText);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchData();
    }, []);

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
                    <label className="mb-2 block text-sm font-medium">
                        Plataforma
                    </label>
                    <select
                        id="plataforma"
                        name="plataforma"
                        value={formData.plataforma}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <option value="">Selecciona una plataforma</option>
                        {plataformas.map(plataforma => (
                            <option key={plataforma.id} value={plataforma.id}>
                                {plataforma.nombre}
                            </option>
                        ))}
                    </select>
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
                    <label className="mb-2 block text-sm font-medium">
                        Camper
                    </label>
                    <select
                        id="camperId"
                        name="camperId"
                        value={formData.camperId}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <option value="">Selecciona un Camper</option>
                        {campers.map(camper => (
                            <option key={camper.id} value={camper.id}>
                                {camper.nombre}
                            </option>
                        ))}
                    </select>
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
                    <label className="mb-2 block text-sm font-medium">
                        Estado de la Reserva
                    </label>
                    <select
                        id="estadoReserva"
                        name="estadoReserva"
                        value={formData.estadoReserva}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <option value="">Selecciona un Estado</option>
                        {estados.map(estado => (
                            <option key={estado.id} value={estado.id}>
                                {estado.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                        Total (con extras)
                    </label>
                    <span className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-lg font-bold text-green-600">
                        {formatCurrency(formData.pagoTotalConExtras)}
                    </span>
                </div>
            </div>
            {saveSuccess && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">¡Éxito!</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">La reserva se actualizó correctamente.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleModalOk} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/bookings/"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edita Reservas</Button>
            </div>
        </form>
    );
}
