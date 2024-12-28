import Image from 'next/image'
import Link from 'next/link'
// import {ChevronDown} from 'lucide-react'
// import {Button} from './ui/button'
import {crearSlug} from '@/lib/utils'


interface TarjetaEspecialidadProps {
    especialidad: string
    cantProfesionales: number
    descripcion: Promise<string>
}


// const Profesional = () => {
//     return (
//         <Image src="/Profesionales.svg" alt="Profesional" width={18} height={18} />
//     )
// }

// const CentrosSalud = () => {
//     return (
//         <Image src="/CentrosSalud.svg" alt="Centro" width={18} height={18} />
//     )
// }


export default async function TarjetaEspecialidad({especialidad, cantProfesionales, descripcion}: TarjetaEspecialidadProps) {

    const descripcionResuelta = await descripcion

    return (
        <Link href="#" aria-label={`Ir a la especialidad ${especialidad}`}>
            <div
            className="
            flex-1 p-8 rounded-md shadow
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
                        className="size-8 sm:size-10" />
                    </div>

                    <div className="flex flex-col ">
                        <div className='relative group inline-block'>
                            <h2 className="text-xl font-bold text-orange-500">{especialidad}</h2>
                            
                            {/* Tooltip */}
                            <div className="
                            absolute left-1/2 hidden sm:block
                            w-64 px-5 py-2 mb-2 bottom-full
                            transform -translate-x-1/2
                            rounded-md border-l-8 border-orange-500
                            bg-zinc-700/90 text-white
                            text-sm text-pretty
                            shadow-lg
                            opacity-0 group-hover:opacity-100
                            delay-300 transition-opacity duration-500">
                                {descripcionResuelta}
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">{cantProfesionales} profesionales</p>
                    </div>

                </div>

                {/* <p className='mt-4 text-sm text-zinc-500'>{descripcion}</p>
                <div className='mt-4 flex justify-start gap-2'>
                    <Button variant={'ghost'} size={'sm'} className='hover:shadow transition'><Profesional /></Button>
                    <Button variant={'ghost'} size={'sm'} className='hover:shadow transition'><CentrosSalud /></Button>
                </div> */}
                {/* <div className='flex justify-center text-zinc-200 mt-4'>
                    <ChevronDown />
                </div> */}

            </div>
        </Link>
    )
}
