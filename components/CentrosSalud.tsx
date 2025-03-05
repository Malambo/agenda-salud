"use client"

import {
    useState,
    useEffect} from "react"
import {usePathname} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
    motion,
    AnimatePresence} from "framer-motion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious} from "./ui/carousel"
import {crearSlug} from "@/lib/utils"
import
    api,
    {type ZonasSanitarias,
    type CentroSalud} from "@/lib/api"

export default function CentrosSalud({slug}: {slug: string[]}) {

    const pathname = usePathname().split('/')
    const [zonaPath, centroPath] = (pathname ?? []).slice(-2)

    const [datos, setDatos] = useState<ZonasSanitarias | null>(null)
    const [zonaActiva, setZonaActiva] = useState<string | null>('Zona norte')
    const [centroActivo, setCentroActivo] = useState<CentroSalud | null>(null)
    const [especialidadesCentro, setEspecialidadesCentro] = useState<string[] | null>([])


    // Cargar datos usando async/await dentro de useEffect
    useEffect(() => {
        async function fetchData() {
            try {
            const zonasSanitarias = await api.listaZonasSanitarias()
            setDatos(zonasSanitarias)
            } catch (error) {
            console.error("Error al cargar las zonas sanitarias:", error)
            }
        }
        fetchData()
    }, [])

    // Cargar centro de salud por slug
    useEffect(() => {
        async function fetchData() {
            try {
                if (!slug.at(-1)) return
                const centro = await api.traeCentroPorUrl(slug.at(-1) as string)
                setCentroActivo(centro)
                if (centroActivo?.id) {
                    const especialiades = await api.traeEspecialidadesPorCentro(centroActivo.id)
                    setEspecialidadesCentro(especialiades)
                }
            } catch (error) {
            console.error("Error al cargar el centro de salud:", error)
            }
        }
        fetchData()
    }, [centroActivo, slug])

    if (!datos) {
        return <div className="text-center py-8">Cargando datos...</div>
    }

    const zonasSanitarias = datos
    const zonaSeleccionada = zonasSanitarias.zonas.find(z => z.nombreZona === zonaActiva)

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
            {zonaSeleccionada && (
            <div className="w-[1024px] border-b border-emerald-500">
                <AnimatePresence mode="wait">
                    <motion.div
                    key={zonaActiva}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                        <Carousel className="w-full">
                            <CarouselContent className="p-2">
                                {zonaSeleccionada.centrosSalud.map(centro => (
                                <CarouselItem
                                key={centro.id}
                                // style={{ flexBasis: `${100 / numCentros}%` }}
                                className="shrink-0 flex justify-center hover:scale-105 transition basis-1/3">
                                    <Link
                                    href={`/centro-salud/${crearSlug(zonaSeleccionada.nombreZona)}/${crearSlug(centro.nombre)}`}
                                    className="flex gap-2 whitespace-nowrap"
                                    onClick={() => setCentroActivo(centro)}>
                                        <Image
                                        src={centro.urlIcon}
                                        alt={centro.nombre}
                                        width={18}
                                        height={18} />
                                        <p className="truncate capitalize">{centro.tipo} {centro.nombre}</p>
                                    </Link>
                                </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious />
                            <CarouselNext />

                        </Carousel>
                    </motion.div>
                </AnimatePresence>
            </div>
            )}

            {/* Detalles del centro de salud */}
            {centroActivo && (
            <div className="w-[1024px] mt-24 p-8 flex gap-24 items-start justify-evenly border border-emerald-300 bg-emerald-100 shadow-md">
                <div className='flex gap-12 items-start'>
                    <Image
                    src={centroActivo.urlIcon}
                    alt="img centro de salud"
                    width={80}
                    height={80} />

                    <div>
                        <p className='text-zinc-500 text-xs uppercase'>{centroActivo.ciudad}</p>
                        <h2 className="text-xl font-bold text-orange-500">
                            <span className='capitalize'>{centroActivo.tipo}</span> {centroActivo.nombre}
                        </h2>
                        <p className="text-zinc-500">{centroActivo.direccion}</p>
                        <ul className="text-zinc-500 text-sm mt-2">
                            {centroActivo.telefonos.map(telefono => (<li key={telefono}>{telefono}</li>))}
                        </ul>
                    </div>
                </div>

                <div className='flex-1 my-auto px-6 py-4 shadow-md rounded bg-emerald-50 border border-emerald-600'>
                    Zona: {zonaPath}, Centro: {centroPath},
                    {especialidadesCentro?.map(especialidad => (
                    <p key={especialidad}>{especialidad}</p>
                    ))}
                </div>
            </div>
        )}
        </div>
    )
}