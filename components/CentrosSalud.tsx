"use client"

import {
    useState,
    useEffect,
    useCallback,
    useRef} from "react"
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
import api, {type ZonasSanitarias, type CentroSalud} from "@/lib/api"


export default function CentrosSalud() {
    const pathname = usePathname().split('/')
    const [zonaPath] = (pathname ?? []).slice(-2)

    const [datos, setDatos] = useState<ZonasSanitarias | null>(null)
    const [zonaActiva, setZonaActiva] = useState<string | null>('Zona norte')
    const [centroActivo, setCentroActivo] = useState<CentroSalud | null>(null)
    const [especialidadesCentro, setEspecialidadesCentro] = useState<string[]>([])
    const [cargando, setCargando] = useState(true)
    
    const centrosCarouselRef = useRef<HTMLDivElement>(null)
    const zonasCarouselRef = useRef<HTMLDivElement>(null)
    
    const cargarCentroCompleto = useCallback(async (centro: CentroSalud, nombreZona: string) => {
        try {
            const centroDetallado = await api.traeCentroPorUrl(crearSlug(centro.nombre))
            const especialidades = centroDetallado?.id 
                ? await api.traeEspecialidadesPorCentro(centroDetallado.id) 
                : []
            setCentroActivo(centroDetallado || centro)
            setZonaActiva(nombreZona)
            setEspecialidadesCentro(especialidades)
            return true
        } catch (error) {
            console.error("Error al cargar los detalles del centro:", error)
            setCentroActivo(centro)
            setZonaActiva(nombreZona)
            setEspecialidadesCentro([])
            return false
        }
    }, [])

    useEffect(() => {
        const cargarZonasSanitarias = async () => {
            try {
                setCargando(true)
                const zonasSanitarias = await api.listaZonasSanitarias()
                setDatos(zonasSanitarias)
                if (zonasSanitarias.zonas.length === 0) {
                    setCargando(false)
                    return
                }
                const zonaCorrespondiente = zonaPath 
                    ? zonasSanitarias.zonas.find(z => crearSlug(z.nombreZona) === zonaPath)
                    : zonasSanitarias.zonas[0]
                if (!zonaCorrespondiente) {
                    setZonaActiva(zonasSanitarias.zonas[0].nombreZona)
                    setCargando(false)
                    return
                }
            } catch (error) {
                console.error("Error al cargar las zonas sanitarias:", error)
            } finally {
                setCargando(false)
            }
        }
        cargarZonasSanitarias()
    }, [zonaPath])

    const scrollToActiveItem = useCallback(({ref, selector}: {ref: React.RefObject<HTMLDivElement>, selector: string}) => {
        if (!ref.current) return
        const activeItem = ref.current.querySelector(selector) as HTMLElement
        if (activeItem) {
            const itemRect = activeItem.getBoundingClientRect()
            const containerRect = ref.current.getBoundingClientRect()
            if (itemRect.right > containerRect.right || itemRect.left < containerRect.left) {
                setTimeout(() => {
                    activeItem.scrollIntoView({
                        behavior: 'instant',
                        block: 'nearest',
                        inline: 'nearest'
                    })
                }, 100)
            }
        }
    }, [])

    useEffect(() => {
        if (centroActivo && !cargando) {
            scrollToActiveItem({ref: centrosCarouselRef, selector: `[data-centro-id="${centroActivo.id}"]`})
        }
    }, [centroActivo, cargando, scrollToActiveItem])

    useEffect(() => {
        if (zonaActiva && !cargando) {
            scrollToActiveItem({ref: zonasCarouselRef, selector: `[data-zona-nombre="${zonaActiva}"]`})
        }
    }, [zonaActiva, cargando, scrollToActiveItem])

    const handleCentroChange = async (centro: CentroSalud, nombreZona: string) => {
        setCargando(true)
        await cargarCentroCompleto(centro, nombreZona)
        setCargando(false)
    }

    if (cargando) {
        return <div className="text-center py-8">Cargando datos...</div>
    }

    const zonaSeleccionada = zonaActiva 
        ? datos?.zonas.find(z => z.nombreZona === zonaActiva) 
        : datos?.zonas[0]

    return (
        <div className="border-t border-emerald-500 flex flex-col items-center relative">
            <Carousel 
            className="w-[1024px] border-b border-emerald-500" 
            opts={{align: "center", loop: false }} 
            orientation="horizontal">
                <CarouselContent className="-ml-1" ref={zonasCarouselRef}>
                    {datos?.zonas.map(zona => (
                        <CarouselItem key={zona.nombreZona} className="pl-1 basis-1/3">
                            <button
                            type="button"
                            onClick={() => setZonaActiva(zona.nombreZona)}
                            className={`uppercase font-extralight text-center w-full py-2 transition-colors duration-300 ${
                                zonaActiva === zona.nombreZona
                                    ? "bg-emerald-600 text-white"
                                    : "bg-transparent text-zinc-500 hover:text-emerald-600"
                            }`}
                            data-zona-nombre={zona.nombreZona}>
                                {zona.nombreZona}
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            {zonaSeleccionada && (
                <div className="w-[1024px] border-b border-emerald-500">
                    <AnimatePresence mode="wait">
                        <motion.div
                        key={zonaActiva || 'default'}
                        initial={{opacity: 0 }}
                        animate={{opacity: 1 }}
                        exit={{opacity: 0 }}
                        transition={{duration: 0.3 }}>
                            <Carousel className="w-full">
                                <CarouselContent className="p-2" ref={centrosCarouselRef}>
                                    {zonaSeleccionada.centrosSalud.map(centro => (
                                        <CarouselItem
                                        key={centro.id}
                                        className={`shrink-0 basis-1/3 flex justify-center transition ${
                                            centroActivo?.id === centro.id 
                                                ? 'scale-110 text-emerald-600 font-bold' 
                                                : 'hover:scale-110 hover:animate-out transition duration-700'
                                        }`}
                                        data-centro-id={centro.id}>
                                            <Link
                                            href={`/centro-salud/${crearSlug(zonaSeleccionada.nombreZona)}/${crearSlug(centro.nombre)}`}
                                            className="flex gap-2 whitespace-nowrap p-2"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleCentroChange(centro, zonaSeleccionada.nombreZona)
                                            }}>
                                                <Image
                                                src={centro.urlIcon}
                                                alt={centro.nombre}
                                                width={18}
                                                height={18} />
                                                <p className="truncate capitalize">
                                                    {centro.tipo} {centro.nombre}
                                                </p>
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

            {centroActivo && (
                <div className="
                w-[1024px]
                mt-24 p-8 border
                border-emerald-300 bg-emerald-100 shadow-md
                flex gap-24 items-start justify-evenly">
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
                                {centroActivo.telefonos.map(telefono => (
                                    <li key={telefono}>{telefono}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className='flex-1 my-auto px-6 py-4 shadow-md rounded bg-emerald-50 border border-emerald-600'>
                        <h3 className="font-medium mb-2">Especialidades disponibles</h3>
                        {especialidadesCentro.length > 0 ? (
                            especialidadesCentro.map(especialidad => (
                                <p key={especialidad} className="text-sm text-zinc-600">{especialidad}</p>
                            ))
                        ) : (
                            <p className="text-sm text-zinc-500">No hay especialidades definidas</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}