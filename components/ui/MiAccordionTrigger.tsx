import Image from "next/image"
import{AccordionTrigger} from "@/components/ui/accordion"
import Link from "next/link"


interface MiAccordionProps {
    url: string
    urlIcono?: string
    titulo: string
}


export default function MiAccordionTrigger({url, urlIcono, titulo}: MiAccordionProps) {

    return (
        <Link href={url}>
            <AccordionTrigger className='flex items-center px-2 text-start '>
                <div className='flex gap-4 items-center'>
                    {urlIcono &&
                    <Image
                    src={urlIcono}
                    alt={`imagen de ${titulo}`}
                    width={24}
                    height={24}/>
                    }
                    <p className="text-emerald-900 text-start">{titulo}</p>
                </div>
            </AccordionTrigger>
        </Link>
    )
}
