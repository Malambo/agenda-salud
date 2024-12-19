import Image from "next/image"
import{AccordionTrigger} from "@/components/ui/accordion"


interface MiAccordionProps {
    urlImagen: string
    nombre: string
}


export default function MiAccordionTrigger({urlImagen, nombre}: MiAccordionProps) {

    return (
        <AccordionTrigger className='flex items-center p-2 bg-emerald-900 text-start shadow-lg'>
            <div className='flex gap-4'>
                <Image
                src={urlImagen}
                alt={`imagen de ${nombre}`}
                width={24}
                height={24}/>
                <p className="font-bold text-white text-lg text-start">{nombre}</p>
            </div>
        </AccordionTrigger>
    )
}
