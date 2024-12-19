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
                className='border-2 border-emerald-900 w-[400px] py-4 rounded-md text-xl hover:bg-emerald-50 hover:border-emerald-950 transition'>
                    Consultar agenda
                </button>
                <button
                className='bg-emerald-900 w-[400px] py-4 rounded-md text-xl text-white hover:bg-emerald-950 transition'>
                    Pedir turno
                </button>
            </div>

            <div className='my-24 flex gap-12 bottom-2'>
                <TarjetaGeneral />
                <TarjetaGeneral />
                <TarjetaGeneral />
            </div>

        </div>
        
        </>
    )
}
