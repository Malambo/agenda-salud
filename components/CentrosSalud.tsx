import api from "@/lib/api"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./ui/accordion"
import Link from "next/link"
import {crearSlug} from "@/lib/utils"
import BarraDeslizante from "./ui/BarraDeslizante"


const zonasSanitarias = await api.listaZonasSanitarias()
const centrosMedicos = zonasSanitarias.zonas.map(zona => zona.centrosSalud.map(centro => centro.nombre))


export default async function CentrosSalud() {
    
    return (
        <div className='border-t border-emerald-500'>
            <Carousel
            className="w-full"
            opts={{align: "center", loop: false}}
            orientation="horizontal">
                <CarouselContent className="-ml-1">
                    {zonasSanitarias.zonas.map(zona => (
                    <CarouselItem key={zona.nombreZona} className="pl-1 basis-1/3 w-64">
                        <Accordion type="single" collapsible >
                            <AccordionItem key={zona.nombreZona} value={zona.nombreZona}>
                                <div className="flex justify-center">
                                    <AccordionTrigger className='uppercase font-extralight text-zinc-500'>{zona.nombreZona}</AccordionTrigger>
                                </div>
                                <AccordionContent className='flex p-2 gap-x-4 text-sm items-baseline'>
                                    <Carousel
                                    className="w-full"
                                    opts={{align: "center", loop: false}}>
                                        {zona.centrosSalud.map(centro => (
                                        <CarouselContent 
                                        key={centro.id}
                                        className="-ml-1">
                                            <CarouselItem className="pl-1 text-emerald-800/80 text-sm">
                                                <Link
                                                href={`/centro-salud/${crearSlug(zona.nombreZona)}/${crearSlug(centro.nombre)}`}>
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
            

            <div className='mt-36'>
                <BarraDeslizante matriz={centrosMedicos[2]} />
            </div>
            
        </div>
    )
}
