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
            <AccordionTrigger className='flex items-center px-2 bg-emerald-900 text-start shadow-lg'>
                <div className='flex gap-4 items-center'>
                    <div className='bg-zinc-100 rounded-full p-2'>
                        <Image
                        src={urlImagen}
                        alt={`imagen de ${nombre}`}
                        width={24}
                        height={24}/>
                    </div>
                    <p className="font-bold text-zinc-50 text-lg text-start">{nombre}</p>
                </div>
            </AccordionTrigger>
        </Link>
    )
}
