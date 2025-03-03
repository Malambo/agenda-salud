import TarjeteroGeneral from "@/components/TarjeteroGeneral"
import Image from "next/image"


export default function InicioPage() {

    return (
        <>
        <div className='flex items-center justify-center gap-x-24'>
            <div className='flex flex-col items-center'>
                <Image
                src='/Logo.svg'
                alt='img Logo'
                width={720}
                height={720 * 0.4} />

                <p className='text-zinc-500 subpixel-antialiased mt-32 mb-12'><span className='font-bold'>Accedé fácilmente a los turnos médicos del sistema de Salud municipal.</span> Explorá la agenda online para ver la disponibilidad de especialistas en los centros de salud municipales. Si ya sos usuario, reservá turno ahora.</p>

                <div className='flex flex-col gap-y-6 lg:flex-row lg:gap-x-12 lg:flex-1'>
                    <button
                    type='button'
                    className='
                    group
                    w-[300px] py-4 rounded bg-emerald-700
                    text-xl text-zinc-50
                    hover:bg-gradient-to-br hover:from-emerald-500 hover:via-emerald-800 hover:to-emerald-950
                    hover:shadow-xl 
                    transition duration-500 ease-in-out'>
                        <p className='group-hover:scale-105 group-hover:animate-out transition duration-500'>Reservá turno</p>
                    </button>

                    <button
                    type='button'
                    className='
                    group
                    w-[300px] py-4 rounded
                    text-xl
                    border border-emerald-600
                    hover:border-emerald-900
                    hover:bg-gradient-to-br hover:from-white hover:via-emerald-100 hover:to-emerald-200
                    hover:shadow-lg
                    transition duration-500 ease-in-out'>
                        <p className='group-hover:scale-105 group-hover:animate-out transition duration-500'>Explorá la agenda</p>
                    </button>
                </div>
            </div>

            <Image
            src='/Hero3.png'
            alt='img Hero'
            width={850}
            height={850 * 0.4} />
        </div>

        <TarjeteroGeneral />
        </>
    )
}
