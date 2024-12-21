import TarjetaGeneral from "@/components/TarjetaGeneral";
import Image from "next/image";

export default function InicioPage() {

    return (
        <>
        <div className='container mx-auto p-12 mt-12 flex flex-col items-center content-center'>
            <Image
            src='/Logo.svg'
            alt='img Logo'
            width={850}
            height={0} />

            <div className='flex gap-x-14 mt-48'>
                <button
                className='
                w-[400px] py-4 rounded-md
                text-xl
                border border-emerald-600
                hover:border-emerald-900
                hover:bg-gradient-to-br hover:from-zinc-50 hover:to-zinc-100 
                transition transition-duration-500'>
                    Consultar agenda
                </button>
                <button
                className='
                w-[400px] py-4 rounded-md bg-emerald-800
                text-xl text-zinc-50
                hover:bg-emerald-800/90
                transition transition-duration-500'>
                    Pedir turno
                </button>
            </div>

            <div className='mx-auto mt-36 grid grid-cols-3 gap-12'>
                <TarjetaGeneral
                urlIcono='/CentrosSalud.svg'
                titulo='Centros de salud'
                descripcion='El sistema sanitario municipal tiene espacios modernos y acordes a la demanda actual de salud de los vecinos del partido de La Costa.'/>
                <TarjetaGeneral
                urlIcono='/Especialidades.svg'
                titulo='Especialidades'
                descripcion='La Costa pone a disposición de los vecinos y las vecinas más de 300 especialidades médicas para atender el aumento en la demanda de servicios.'/>
                <TarjetaGeneral
                urlIcono='/Profesionales.svg'
                titulo='Profesionales'
                descripcion='El sistema sanitario municipal tiene espacios modernos y acordes a la demanda actual de salud de los vecinos del partido de La Costa.'/>
            </div>

        </div>
        
        </>
    )
}
