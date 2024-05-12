'use client'

import Form from '@/app/ui/bookings/edit-form';
import Breadcrumbs from '@/app/ui/bookings/breadcrumbs';
import { notFound } from 'next/navigation';
import {useEffect, useState} from "react";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [reserva, setReserva] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/bookings/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la reserva');
                }
                const data = await response.json();
                setReserva(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!reserva) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Reservas', href: '/dashboard/bookings' },
                    {
                        label: 'Edita Reserva',
                        href: `/dashboard/bookings/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form reserva={reserva} />
        </main>
    );
}
