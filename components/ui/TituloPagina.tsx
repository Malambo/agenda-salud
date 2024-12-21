import Image from 'next/image'


interface TituloPaginaProps {
    urlIcono: string;
    titulo: string;
    descripcion: string;
}


export default function TituloPagina({urlIcono, titulo}: TituloPaginaProps) {

    return (
        <div className='flex gap-8 items-center'>
            <Image
                src={urlIcono}
                alt='img icono'
                width={60}
                height={60} />
            
            <h1 className='text-5xl font-bold text-orange-500'>{titulo}</h1>
        </div>
    )
}
