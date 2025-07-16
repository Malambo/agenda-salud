import TarjeteroGeneral from "@/components/TarjeteroGeneral"
import Image from "next/image"


export default function InicioPage() {

    return (
        <>
        <div className='grid grid-cols-1 sm:grid-cols-5 items-center justify-center gap-x-20'>
            <div className='sm:col-span-2 flex flex-col items-center'>
                <Image
                src='/Logo.svg'
                alt='img Logo'
                width={720}
                height={720 * 0.4} />

                <p className='text-zinc-600 text-xl/8 text-balance font-light subpixel-antialiased mt-12 sm:mt-32 mb-12'>Explorá la agenda online para ver la disponibilidad de profesionales. Investigá las especialidades de cada centro de salud y si ya sos usuario, <span className='font-normal text-zinc-700'>reservá turno ahora</span>.</p>

                <div className='flex flex-col gap-y-6 lg:flex-row lg:gap-x-12 lg:flex-1'>
                    <button
                    type='button'
                    className='
                    group
                    w-screen sm:w-[300px] py-4 rounded bg-emerald-700
                    text-xl text-zinc-50
                    hover:bg-gradient-to-br hover:from-emerald-500 hover:via-emerald-800 hover:to-emerald-950
                    hover:shadow-xl 
                    transition duration-300 ease-in-out'>
                        <p className='group-hover:scale-105 transition duration-300'>Reservá turno</p>
                    </button>

                    <button
                    type='button'
                    className='
                    group
                    w-screen sm:w-[300px] py-4 rounded
                    text-xl
                    border border-emerald-600
                    hover:border-emerald-900
                    hover:bg-gradient-to-br hover:from-white hover:via-emerald-100 hover:to-emerald-200
                    hover:shadow-lg
                    transition duration-300 ease-in-out'>
                        <p className='group-hover:scale-105 transition duration-300'>Explorá la agenda</p>
                    </button>
                </div>
            </div>

            <Image
            className='sm:col-span-3 order-first sm:order-last mb-12 sm:mb-0'
            src='/Hero3.png'
            alt='img Hero'
            width={850}
            height={850 * 0.4} />
        </div>

        <TarjeteroGeneral />
        </>
    )
}
