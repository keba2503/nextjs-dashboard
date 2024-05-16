'use client'

import React, {useEffect, useState} from 'react';
import {Plataforma} from "@/app/lib/definitions";

interface Props {
    formData: {
        plataforma: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PlataformaSelect: React.FC<Props> = ({ formData, handleChange }) => {
    const [plataformas, setPlataformas] = useState<Plataforma[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const plataformasRes = await fetch('/api/platforms');

                if (plataformasRes.ok) {
                    const plataformasData = await plataformasRes.json();
                    setPlataformas(plataformasData);
                } else {
                    console.error('Error al obtener los datos de las plataformas:', plataformasRes.statusText);
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
    );
}

export default PlataformaSelect;