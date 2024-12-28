import Image from "next/image"
import Link from "next/link"


interface TarjetaProps {
    url: string
    urlIcono: string
    titulo:string
    descripcion:string
}


export default function TarjetaGeneral({url, urlIcono, titulo, descripcion}: TarjetaProps) {

    return (
        <Link href={url}>
            <div
            className="
            p-8 rounded-md shadow
            border border-emerald-600
            hover:border-emerald-800
            hover:bg-gradient-to-br hover:from-zinc-50 hover:via-zinc-50 hover:to-zinc-200
            cursor-pointer transition duration-500 ease-in-out">
                <div className='flex flex-col gap-6 sm:flex-row sm:gap-12'>
                    <div className='flex items-center justify-center size-12 sm:size-16 rounded-full shrink-0'>
                        <Image
                        src={urlIcono}
                        alt='img Tarjeta'
                        height={60}
                        width={60}
                        className='size-12'/>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-3xl font-bold text-orange-500'>{titulo}</h2>
                        <p className='text-pretty mt-6'>{descripcion}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
