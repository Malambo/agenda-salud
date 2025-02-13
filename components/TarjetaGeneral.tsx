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
            group
            p-8 rounded shadow
            bg-[#e8faf0]
            border border-emerald-600
            hover:border-emerald-800
            hover:bg-gradient-to-br hover:from-emerald-50 hover:via-emerald-50 hover:to-emerald-100
            hover:shadow-lg
            cursor-pointer transition duration-500 ease-in-out">
                <div className='flex flex-col gap-6 sm:flex-row sm:gap-12'>
                    <div
                    className="
                    flex items-center justify-center shrink-0
                    size-16 sm:size-20
                    rounded-full border-2
                    bg-emerald-100 border-emerald-200/80
                    group-hover:scale-110 group-hover:shadow group-hover:animate-out
                    transition duration-700">
                        <Image
                        src={urlIcono}
                        alt='img Tarjeta'
                        height={60}
                        width={60}
                        className='
                        size-8 sm:size-12
                        group-hover:scale-110 group-hover:animate-out
                        transition duration-700'/>
                    </div>

                    <div className='flex flex-col'>
                        <h2 className='text-xl font-bold text-orange-500'>{titulo}</h2>
                        <p className='text-pretty mt-6 text-zinc-500'>{descripcion}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
