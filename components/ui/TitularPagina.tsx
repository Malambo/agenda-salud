import Image from 'next/image'


interface TitularPaginaProps {
    urlIcono: string
    titulo: string
    descripcion: string
}


export default function TitularPagina({urlIcono, titulo, descripcion}: TitularPaginaProps) {

    return (
        <div className='flex flex-col items-center space-y-12'>
            <div className='flex gap-8 items-center'>
                <Image
                    src={urlIcono}
                    alt='img icono'
                    width={60}
                    height={60} />
                <h1 className='text-5xl font-bold text-orange-500'>{titulo}</h1>
            </div>

            <p className='w-2/3 text-balance text-lg text-center'>{descripcion}</p>
        </div>
    )
}
