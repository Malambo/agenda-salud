import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


export default function TarjetaEspecialidad({especialidad, cantProfesionales}: {especialidad: string, cantProfesionales: number}) {

    return (
        <Link href="#">
            <div
            className="
            flex-1 p-8 rounded-md
            border border-emerald-600
            hover:border-emerald-800
            hover:bg-gradient-to-br hover:from-zinc-50 hover:via-zinc-50 hover:to-zinc-200
            cursor-pointer transition transition-duration-500">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="flex items-center justify-center size-12 sm:size-16 rounded-full bg-zinc-200 shrink-0">
                        <Image
                        src="/Especialidades.svg"
                        alt="img Tarjeta"
                        height={32}
                        width={32}
                        className="size-8"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-orange-500">{especialidad}</h2>
                        <p className="text-zinc-400 text-sm">{cantProfesionales} profesionales</p>
                    </div>
                </div>
                <div className='flex justify-center text-zinc-200 mt-4'>
                    <ChevronDown />
                </div>
            </div>
            
        </Link>

    )
}
