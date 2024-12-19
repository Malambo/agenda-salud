import Image from "next/image"

export default function TarjetaGeneral() {

    return (
        <div className='p-8 rounded-md border-2 border-emerald-600'>
            <div className='flex gap-10'>
                <Image
                className='text-emerald-300'
                src='/CentrosSalud.svg'
                alt='img Tarjeta'
                height={60}
                width={60}/>
                <div className='flex flex-col'>
                    <h2 className='text-3xl text-orange-500'>Centros de salud</h2>
                    <p className='text-pretty mt-6'>El sistema sanitario municipal tiene espacios modernos y acordes a la demanda actual de salud de los vecinos del partido de La Costa.</p>
                </div>
            </div>
        </div>
    )
}
