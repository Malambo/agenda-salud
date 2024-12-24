import { crearSlug } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


interface TarjetaEspecialidadProps {
    especialidad: string
    cantProfesionales: number
    descripcion: Promise<string>
}


export default function TarjetaEspecialidad({especialidad, cantProfesionales, descripcion}: TarjetaEspecialidadProps) {

    return (
        <Link href="#">
            <div
            className="
            flex-1 p-8 rounded-md
            border border-emerald-600
            hover:border-emerald-800
            hover:bg-gradient-to-br hover:from-zinc-50 hover:via-zinc-50 hover:to-zinc-200
            cursor-pointer transition duration-500 ease-in-out">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="flex items-center justify-center size-12 sm:size-16 rounded-full bg-emerald-100 shrink-0">
                        <Image
                        src={`/especialidades/${crearSlug(especialidad)}.svg`}
                        alt={`especialidad ${especialidad}`}
                        height={60}
                        width={60}
                        className="size-10"
                        />
                    </div>

                    <div className="flex flex-col ">
                        <div className='relative group inline-block'>
                            <h2 className="text-xl font-bold text-orange-500">{especialidad}</h2>
                            <p className="text-zinc-400 text-sm">{cantProfesionales} profesionales</p>
                            {/* Tooltip */}
                            <div className="
                            absolute left-1/2
                            w-64 px-5 py-2 mb-2 bottom-full
                            transform -translate-x-1/2
                            rounded-md border-l-8 border-orange-400
                            bg-zinc-700/90 text-white
                            text-sm text-pretty
                            shadow-lg
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-500">
                                {descripcion}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center text-zinc-200 mt-4'>
                    <ChevronDown />
                </div>
            </div>
            
        </Link>

    )
}
