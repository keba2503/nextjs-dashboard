'use client'

import React, {useEffect, useState} from 'react';
import {Estado} from "@/app/lib/definitions";

interface Props {
    formData: {
        estadoReserva: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusSelect: React.FC<Props> = ({ formData, handleChange }) => {
    const [status, setStatus] = useState<Estado[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusRes = await fetch('/api/status');

                if (statusRes.ok) {
                    const statusData = await statusRes.json();
                    setStatus(statusData);
                } else {
                    console.error('Error al obtener los datos de los estados:', statusRes.statusText);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
                Estados
            </label>
            <select
                id="estadoReserva"
                name="estadoReserva"
                value={formData.estadoReserva}
                onChange={handleChange}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
            >
                <option value="">Selecciona el estado de la reserva</option>
                {status.map(state => (
                    <option key={state.id} value={state.id}>
                        {state.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default StatusSelect;