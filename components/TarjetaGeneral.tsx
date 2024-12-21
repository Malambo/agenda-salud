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
            <div className='
            p-8 rounded-md
            border border-emerald-600
            hover:border-emerald-900
            hover:bg-gradient-to-br hover:from-zinc-50 hover:to-zinc-100
            cursor-pointer transition transition-duration-500'>
                <div className='flex gap-10'>
                    <div className='size-44'>
                        <Image
                        src={urlIcono}
                        alt='img Tarjeta'
                        height={60}
                        width={60}/>
                    </div>
                    <div className='flex flex-col flex-grow'>
                        <h2 className='text-3xl text-orange-500'>{titulo}</h2>
                        <p className='text-pretty mt-6'>{descripcion}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
