import {fetchAllbookings, fetchAllUsers} from "@/app/lib/data";
import {formatCurrency, formatDateToLocal} from "@/app/lib/utils";
import {DeleteInvoice, UpdateInvoice} from "@/app/ui/bookings/buttons";


interface Props {
    query: string;
}
export default async function TablaReservas({ query }: Props) {

    // @ts-ignore
    const latestBooking : Booking[] = await fetchAllbookings();

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
                        {latestBooking.map((reserva) => (
                            <tr key={reserva.id} className="border-b">
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <p>{reserva.nombreCliente}</p>
                                </td>
                                <td className="px-3 py-3">{reserva.camperLabel}</td>
                                <td className="px-3 py-3">{formatCurrency(reserva.importe)}</td>
                                <td className="px-3 py-3">{reserva.estadoReservaLabel}</td>
                                <td className="px-3 py-3">{reserva.plataformaLabel}</td>
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
