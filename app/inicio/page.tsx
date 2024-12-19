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

            <div className='flex gap-x-14 mt-24'>
                <button
                className='border-2 border-emerald-900 w-[400px] py-4 rounded-md text-xl hover:bg-emerald-50 hover:border-emerald-950 transition'>
                    Consultar agenda
                </button>
                <button
                className='bg-emerald-900 w-[400px] py-4 rounded-md text-xl text-white hover:bg-emerald-950 transition'>
                    Pedir turno
                </button>
            </div>

            <div className='mx-auto mt-48 grid grid-cols-3 gap-12'>
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
