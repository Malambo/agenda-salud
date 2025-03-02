"use client"

import {
    useState,
    useEffect}              from "react"
import Image                from "next/image"
import Link                 from "next/link"
import {
    motion,
    AnimatePresence}        from "framer-motion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious}       from "./ui/carousel"
import {crearSlug}          from "@/lib/utils"
import
    api,
    {type ZonasSanitarias}  from "@/lib/api"


export default function CentrosSalud() {

  
    const [datos, setDatos] = useState<ZonasSanitarias | null>(null)
    const [zonaActiva, setZonaActiva] = useState<string | null>(null)

  // Cargar datos usando async/await dentro de useEffect
    useEffect(() => {
        async function fetchData() {
            try {
            const response = await api.listaZonasSanitarias()
            setDatos(response)
            } catch (error) {
            console.error("Error al cargar las zonas sanitarias:", error)
            }
        }
        fetchData()
    }, [])

    if (!datos) {
        return <div className="text-center py-8">Cargando datos...</div>
    }

    const zonasSanitarias = datos
    const zonaSeleccionada = zonasSanitarias.zonas.find(z => z.nombreZona === zonaActiva)
    // Evitar división por cero: si no hay zona seleccionada, dejamos 1
    const numCentros = zonaSeleccionada?.centrosSalud.length || 1

    return (
        <div className="border-t border-emerald-500 flex flex-col items-center relative">
            {/* Slider padre: Zonas Sanitarias */}
            <Carousel className="w-[1024px] border-b border-emerald-500" opts={{align: "center", loop: false}} orientation="horizontal">
                <CarouselContent className="-ml-1">
                    {zonasSanitarias.zonas.map(zona => (
                    <CarouselItem key={zona.nombreZona} className="pl-1 basis-1/3">
                        <button
                        type="button"
                        onClick={() => setZonaActiva(zona.nombreZona)}
                        className={`uppercase font-extralight text-center w-full py-2 transition-colors duration-300 ${
                        zonaActiva === zona.nombreZona
                            ? "bg-emerald-600 text-white"
                            : "bg-transparent text-zinc-500 hover:text-emerald-600"
                        }`}>
                        {zona.nombreZona}
                        </button>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            {/* Slider hijo: Centros de Salud, con transición suave */}
            <div className={`w-[1024px] ${zonaSeleccionada?.centrosSalud && zonaSeleccionada.centrosSalud.length > 0 ? 'border-b border-emerald-500 pb-2' : ''}`}>
                <AnimatePresence mode="wait">
                {zonaActiva && zonaSeleccionada && (
                    <motion.div
                    key={zonaActiva}
                    initial={{opacity: 0, y:5}}
                    animate={{opacity: 1, y:5}}
                    exit={{opacity: 0, y:5}}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                    className="overflow-hidden" >

                        <Carousel className="w-full" opts={{align: "start", loop: false}} orientation="horizontal">
                            <CarouselContent className="flex gap-2 flex-nowrap p-2">
                                {zonaSeleccionada.centrosSalud.map(centro => (
                                <CarouselItem
                                key={centro.id}
                                style={{flexBasis: `${100 / numCentros}%`}}
                                className="shrink-0 w-fit hover:text-emerald-600 transition duration-300">
                                    <Link
                                    className="flex gap-2 whitespace-nowrap"
                                    href={`/centro-salud/${crearSlug(zonaSeleccionada.nombreZona)}/${crearSlug(centro.nombre)}`}>
                                        <Image
                                        src={centro.urlIcon as string}
                                        alt="img centro de salud"
                                        width={18}
                                        height={18} />
                                        {centro.nombre}
                                    </Link>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    )
}
