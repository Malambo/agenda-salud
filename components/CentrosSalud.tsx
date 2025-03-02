import Link             from "next/link"
import api              from "@/lib/api"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
CarouselPrevious}       from "./ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger}   from "./ui/accordion"
import {crearSlug}      from "@/lib/utils"


const zonasSanitarias = await api.listaZonasSanitarias()


export default async function CentrosSalud() {    
    return (
        <div className='border-t border-emerald-500'>
            <Carousel
            className="w-[1024px]"
            opts={{align: "center", loop: false}}
            orientation="horizontal">
                <CarouselContent className="-ml-1">
                    {zonasSanitarias.zonas.map(zona => (
                    <CarouselItem key={zona.nombreZona} className="pl-1 basis-1/3">
                        
                        <Accordion type="single" collapsible>
                            <AccordionItem key={zona.nombreZona} value={zona.nombreZona}>
                                <div className="flex justify-center">
                                    <AccordionTrigger className='uppercase font-extralight text-zinc-500'>{zona.nombreZona}</AccordionTrigger>
                                </div>

                                <AccordionContent className='flex p-2 gap-x-4 text-sm items-baseline'>
                                    <Carousel
                                    className="w-full"
                                    opts={{align: "center", loop: false}}
                                    orientation="horizontal">
                                        {/* <div className='flex gap-2 w-96 bg-red-300'> */}
                                        <div className='w-[1024px] flex gap-2 bg-red-300 flex-nowrap'>
                                            {zona.centrosSalud.map(centro => (
                                            <CarouselContent
                                            key={centro.id}
                                            className="-ml-1 flex gap-2 flex-nowrap justify-between">
                                                <CarouselItem className="flex pl-1 text-emerald-800/80 text-sm justify-between">
                                                    <Link
                                                    className="whitespace-nowrap"
                                                    href={`/centro-salud/${crearSlug(zona.nombreZona)}/${crearSlug(centro.nombre)}`}>
                                                        {centro.nombre}
                                                    </Link>
                                                </CarouselItem>
                                            </CarouselContent>
                                            ))}
                                        </div>
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
