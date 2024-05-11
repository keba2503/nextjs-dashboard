'use client'

import React from 'react';
import {useForm} from 'react-hook-form';

export default function Page() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = handleSubmit(async data => {
       const res = await fetch('/api/auth/singup/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
             'Content-Type' : 'application/json'
            }
        })
        const resJSON = await res.json();
       console.log(resJSON)
    });

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <form onSubmit={onSubmit} className="space-y-3">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Registro</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("name", {
                                                required: true,
                                            })}
                                            name="name"
                                            id="name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && (
                                            <span className="text-red-500 text-xs">
                                                El campo es requerido
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register("lastname", {
                                                required: true,
                                            })}
                                            name="lastname"
                                            id="lastname"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.name && (
                                            <span className="text-red-500 text-xs">
                                                El campo es requerido
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            {...register("email",
                                                {
                                                    required: true,
                                                })}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.email && (
                                            <span className="text-red-500 text-xs">
                                                El campo es requerido
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            {...register("password", {required: true})}
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.password && (
                                            <span className="text-red-500 text-xs">
                                                El campo es requerido
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
