import Image from "next/image"


interface TarjetaProps {
    urlIcono: string
    titulo:string
    descripcion:string
}


export default function TarjetaGeneral({urlIcono, titulo, descripcion}: TarjetaProps) {

    return (
        <div className='p-8 rounded-md border-2 border-emerald-600 hover:border-orange-800 hover:bg-zinc-300 transition cursor-pointer'>
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
    )
}
