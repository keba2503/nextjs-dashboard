'use client'

import React, {useEffect, useState} from 'react';
import {Camper} from "@/app/lib/definitions";

interface Props {
    formData: {
        camperId: number;
    };
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CamperSelect: React.FC<Props> = ({ formData, handleChange }) => {
    const [campers, setCampers] = useState<Camper[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const campersRes = await fetch('/api/campers');

                if (campersRes.ok) {
                    const campersData = await campersRes.json();
                    setCampers(campersData);
                } else {
                    console.error('Error al obtener los datos de las campers:', campersRes.statusText);
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
                Camper
            </label>
            <select
                id="camperId"
                name="camperId"
                value={formData.camperId}
                onChange={handleChange}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
            >
                <option value="">Selecciona una camper</option>
                {campers.map(camper => (
                    <option key={camper.id} value={camper.id}>
                        {camper.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CamperSelect;