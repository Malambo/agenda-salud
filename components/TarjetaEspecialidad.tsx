import Image from 'next/image'
import Link from 'next/link'
import {crearSlug} from '@/lib/utils'


interface TarjetaEspecialidadProps {
    especialidad: string
    cantProfesionales: number
    descripcion: Promise<string>
}


export default async function TarjetaEspecialidad({especialidad, cantProfesionales, descripcion}: TarjetaEspecialidadProps) {

    const descripcionEspecialidad = await descripcion

    if (cantProfesionales <= 0) return null

    return (
        <Link
        href="#"
        aria-label={`Ir a la especialidad ${especialidad}`}>
            <div
            className="
            relative group
            flex-1 p-8 rounded shadow-sm
            bg-[#e8faf0]
            border border-emerald-200
            hover:border-emerald-600
            hover:bg-gradient-to-br hover:from-emerald-50 hover:via-emerald-50 hover:to-emerald-100
            hover:shadow-lg
            cursor-pointer transition duration-500 ease-in-out">

                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div
                    className="
                    flex items-center justify-center shrink-0
                    size-10 sm:size-16
                    rounded-full border-2
                    bg-emerald-100 border-emerald-200/80
                    group-hover:scale-110 group-hover:shadow group-hover:animate-out
                    transition duration-700">
                        <Image
                        src={`/especialidades/${crearSlug(especialidad)}.svg`}
                        alt={`especialidad ${especialidad}`}
                        height={60}
                        width={60}
                        className="size-8 sm:size-10" />
                    </div>

                    <div className="flex flex-col ">
                        <div className='group/tooltip relative inline-block'>
                            <h2 className="text-xl font-bold text-orange-500">{especialidad}</h2>

                            {/* Tooltip */}
                            <div className="
                            absolute hidden sm:block z-10 left-1/2 
                            w-max px-3 pt-1 bottom-full
                            transform -translate-x-1/2 -translate-y-4
                            rounded border-b-8 border-orange-500
                            bg-zinc-700/80 text-white
                            text-sm text-pretty text-center
                            shadow-lg
                            opacity-0 group-hover/tooltip:opacity-100
                            delay-1000 transition-opacity duration-300">

                                {descripcionEspecialidad}
                                
                                {/* Triángulo */}
                                <div className="relative left-1/2 top-5 size-0
                                border-l-[10px] border-l-transparent
                                border-t-[15px] border-t-orange-500
                                border-r-[10px] border-r-transparent" />
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">{cantProfesionales} profesionales</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
