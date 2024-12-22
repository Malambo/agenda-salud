import Image from "next/image"
import TarjetaGeneral from "@/components/TarjetaGeneral"
import api from "@/lib/api"


const Tarjetas = await api.listaCategorias()


export default function InicioPage() {

    return (
        <>
        <Image
        src='/Logo.svg'
        alt='img Logo'
        width={850}
        height={850 * 0.4} />

        <div className='flex gap-x-14 mt-48'>
            <button
            className='
            w-[400px] py-4 rounded-md
            text-xl
            border border-emerald-600
            hover:border-emerald-900
            hover:bg-gradient-to-br hover:from-zinc-50 hover:to-zinc-100 
            transition transition-duration-500'>
                Consultar agenda
            </button>
            <button
            className='
            w-[400px] py-4 rounded-md bg-emerald-800
            text-xl text-zinc-50
            hover:bg-emerald-800/90
            transition transition-duration-500'>
                Pedir turno
            </button>
        </div>

        <div className='mx-auto mt-36 grid grid-cols-3 gap-12'>
            {Tarjetas.map(tarjeta => (
            <TarjetaGeneral
            key={tarjeta.url}
            url={tarjeta.url}
            urlIcono={tarjeta.urlIcono}
            titulo={tarjeta.titulo}
            descripcion={tarjeta.descripcion}/>
            ))}
        </div>
        </>
    )
}
