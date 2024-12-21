import Image from "next/image"
import{AccordionTrigger} from "@/components/ui/accordion"
import Link from "next/link"


interface MiAccordionProps {
    url: string
    urlImagen: string
    nombre: string
}


export default function MiAccordionTrigger({url, urlImagen, nombre}: MiAccordionProps) {

    return (
        <Link href={url}>
            <AccordionTrigger className='flex items-center px-2 text-start '>
                <div className='flex gap-4 items-baseline'>
                        <Image
                        src={urlImagen}
                        alt={`imagen de ${nombre}`}
                        width={24}
                        height={24}/>
                    <p className="font-bold text-emerald-900 text-lg text-start">{nombre}</p>
                </div>
            </AccordionTrigger>
        </Link>
    )
}
