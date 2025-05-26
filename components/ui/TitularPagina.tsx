import Image from 'next/image'


interface TitularPaginaProps {
    urlIcono: string
    titulo: string
    descripcion: string
}


export default function TitularPagina({urlIcono, titulo, descripcion}: TitularPaginaProps) {

    return (
        <div className='flex flex-col items-center'>
            <div className='flex gap-8 items-center'>
                <Image
                src={urlIcono}
                alt='img icono'
                width={60}
                height={60} />
                <h1 className='text-3xl sm:text-5xl font-extrabold text-orange-500'>{titulo}</h1>
            </div>

            <p className='w-2/3 mt-8 sm:mt-12 text-balance text-lg text-center'>{descripcion}</p>
        </div>
    )
}
