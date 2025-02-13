import TarjeteroGeneral from "@/components/TarjeteroGeneral"
import Image from "next/image"


export default function InicioPage() {

    return (
        <>
        <Image
        src='/Logo.svg'
        alt='img Logo'
        width={850}
        height={850 * 0.4} />

        <div className='flex flex-col gap-y-6 lg:flex-row lg:gap-x-12 mt-48'>
        <button
            type='button'
            className='
            group
            w-[408px] py-4 rounded bg-emerald-700
            text-xl text-zinc-50
            hover:bg-gradient-to-br hover:from-emerald-500 hover:via-emerald-800 hover:to-emerald-950
            hover:shadow-xl 
            transition duration-500 ease-in-out'>
                <p className='group-hover:scale-105 transition duration-500 ease-in-out'>Reservar turno</p>
            </button>
            <button
            type='button'
            className='
            group
            w-[408px] py-4 rounded
            text-xl
            border border-emerald-600
            hover:border-emerald-900
            hover:bg-gradient-to-br hover:from-white hover:via-emerald-100 hover:to-emerald-200
            hover:shadow-lg
            transition duration-500 ease-in-out'>
                 <p className='group-hover:scale-105 transition duration-500 ease-in-out'>Consultar agenda médica</p>

            </button>
        </div>

        <TarjeteroGeneral />
        </>
    )
}
