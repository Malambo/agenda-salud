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
            className='
            w-[408px] py-4 rounded-md
            text-xl
            border border-emerald-600
            hover:border-emerald-900
            hover:bg-gradient-to-br hover:from-zinc-50 hover:via-zinc-50 hover:to-zinc-200
            transition duration-500 ease-in-out'>
                Consultar agenda médica
            </button>
            <button
            className='
            w-[408px] py-4 rounded-md bg-emerald-800
            text-xl text-zinc-50
            hover:bg-gradient-to-br hover:from-emerald-700 hover:via-emerald-900 hover:to-emerald-950
            transition duration-500 ease-in-out'>
                Reservar turno
            </button>
        </div>

        <TarjeteroGeneral />
        </>
    )
}
