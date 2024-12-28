import api from "@/lib/api"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./ui/accordion"
import Link from "next/link"
import {crearSlug} from "@/lib/utils"



const zonasSanitarias = await api.listaZonasSanitarias()


export default async function CentrosSalud() {

    
    console.log("🚀 ~ CentrosSalud ~ zonasSanitarias:", zonasSanitarias)

    
    return (
        <div className='border-t border-emerald-500'>
            <Carousel
            className="w-full"
            opts={{align: "center", loop: false}}>
                <CarouselContent className="-ml-1">
                    {zonasSanitarias.zonas.map(zona => (
                    <CarouselItem key={zona.nombreZona} className="pl-1 basis-1/3 w-64">
                        <Accordion type="single" collapsible >
                            <AccordionItem key={zona.nombreZona} value={zona.nombreZona}>
                                <AccordionTrigger className='uppercase font-extralight text-zinc-400'>{zona.nombreZona}</AccordionTrigger>
                                
                                <AccordionContent className='flex p-2 gap-x-4 text-sm items-baseline text-zinc-500'>
                                    <Carousel
                                    className="w-full"
                                    opts={{align: "center",loop: false}}>
                                        {zona.centrosMedicos.map(centro => (
                                        <CarouselContent 
                                        key={centro.id}
                                        className="-ml-1">
                                            <CarouselItem className="pl-1 text-emerald-800/60 text-sm">
                                                <Link
                                                href={`/centro-salud/${crearSlug(centro.nombre)}`}>
                                                    {centro.nombre}
                                                </Link>
                                            </CarouselItem>
                                        </CarouselContent>
                                        ))}
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
