"use client"

import {
    useState,
    useEffect,
    useCallback,
    useRef}             from "react"
import {usePathname}    from "next/navigation"
import Image            from "next/image"
import Link             from "next/link"
import {
    motion,
    AnimatePresence}    from "framer-motion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious}   from "./ui/carousel"
import {crearSlug}      from "@/lib/utils"
import
    api,
    {
    type ZonasSanitarias,
    type CentroSalud,
    type BloqueTurnos} from "@/lib/api"


export default function CentrosSalud() {
    const pathname = usePathname().split('/')
    const [zonaPath] = pathname.slice(-2)

    const [datos, setDatos] = useState<ZonasSanitarias | null>(null)
    const [zonaActiva, setZonaActiva] = useState('Zona norte')
    const [centroActivo, setCentroActivo] = useState<CentroSalud | null>(null)
    const [especialidadesCentro, setEspecialidadesCentro] = useState<string[]>([])
    const [turnos, setTurnos] = useState<BloqueTurnos[]>([])
    const [cargando, setCargando] = useState(true)

    const centrosCarouselRef = useRef<HTMLDivElement>(null)
    const zonasCarouselRef = useRef<HTMLDivElement>(null)

    // Función para cargar centro de salud
    const cargarCentroCompleto = useCallback(async (centro: CentroSalud, nombreZona: string) => {
        try {
            const centroDetallado = await api.traeCentroPorUrl(crearSlug(centro.nombre))
            const especialidades = centroDetallado?.id ?
                await api.traeEspecialidadesPorCentro(centroDetallado.id) 
                : []
            setCentroActivo(centroDetallado)
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

    // Cargar zonas al inicio
    useEffect(() => {
        const cargarZonas = async () => {
            try {
                setCargando(true)
                const zonasSanitarias = await api.listaZonasSanitarias()
                setDatos(zonasSanitarias)
                
                if (zonasSanitarias.zonas.length > 0) {
                    const zonaCorrespondiente = zonaPath ?
                    zonasSanitarias.zonas.find(z => crearSlug(z.nombreZona) === zonaPath)
                    : zonasSanitarias.zonas[0]
                    
                    if (zonaCorrespondiente) {
                        setZonaActiva(zonaCorrespondiente.nombreZona)
                    } else {
                        setZonaActiva(zonasSanitarias.zonas[0].nombreZona)
                    }
                }
            }
            catch (error) {console.error("Error al cargar las zonas sanitarias:", error)}
            finally {setCargando(false)}
        }
        cargarZonas()
    }, [zonaPath])

    // Cargar turnos cuando cambia el centro activo
    useEffect(() => {
        if (centroActivo?.id) {
            api.traeBloquesTurnosPorCentro(centroActivo.id)
                .then(setTurnos)
                .catch(err => console.error("Error al cargar turnos:", err))
        }
    }, [centroActivo])

  // Función para desplazar a elementos activos
    const scrollToActiveItem = useCallback(({ref, selector}: {ref: React.RefObject<HTMLDivElement>, selector: string}) => {
        setTimeout(() => {
            const element = ref.current?.querySelector(selector) as HTMLElement
            element?.scrollIntoView({
                behavior: 'instant',
                block: 'nearest',
                inline: 'nearest'
            })
        }, 100)
    }, [])

    // Aplicar scroll a elementos activos
    useEffect(() => {
        if (centroActivo && !cargando) {
            scrollToActiveItem({ref: centrosCarouselRef, selector: `[data-centro-id="${centroActivo.id}"]`})
        }
        if (zonaActiva && !cargando) {
            scrollToActiveItem({ref: zonasCarouselRef, selector: `[data-zona-nombre="${zonaActiva}"]`})
        }
    }, [centroActivo, zonaActiva, cargando, scrollToActiveItem])

    const handleCentroChange = async (centro: CentroSalud, nombreZona: string) => {
        setCargando(true)
        await cargarCentroCompleto(centro, nombreZona)
        setCargando(false)
    }

    if (cargando) return <div className="text-center py-8">Cargando datos...</div>

    const zonaSeleccionada = zonaActiva ?
        datos?.zonas.find(z => z.nombreZona === zonaActiva) 
        : datos?.zonas[0]
    
    const handleZona = (nombreZona: string) => {
        setZonaActiva(nombreZona)
        setCentroActivo(null)
    }
    
    return (
        <div className="w-full mx-auto border-t border-emerald-500 flex flex-col items-center">
            {/* Carousel de zonas */}
            <Carousel 
            className="w-full border-b border-emerald-500" 
            opts={{align: "center", loop: false}} 
            orientation="horizontal">
                <CarouselContent className="-ml-1" ref={zonasCarouselRef}>
                    {datos?.zonas.map(zona => (
                    <CarouselItem key={zona.nombreZona} className="pl-1 basis-1/2 sm:basis-1/4">
                        <button
                        type="button"
                        onClick={() => handleZona(zona.nombreZona)}
                        className={`uppercase font-light text-center w-full py-2 transition-colors duration-300 ${
                            zonaActiva === zona.nombreZona
                                ? "bg-emerald-600 text-white font-normal"
                                : "bg-transparent text-zinc-600 hover:text-emerald-800"
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

            {/* Carousel de centros de salud */}
            {zonaSeleccionada && (
            <div className="w-full border-b border-emerald-500">
                <AnimatePresence mode="wait">
                    <motion.div
                    key={zonaActiva || 'default'}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}>
                        <Carousel className="w-full">
                            <CarouselContent ref={centrosCarouselRef}>
                                {zonaSeleccionada.centrosSalud.map(centro => (
                                <CarouselItem
                                    key={centro.id}
                                    className={`shrink-0 basis-1/2 sm:basis-1/3 flex justify-center transition ${
                                    centroActivo?.id === centro.id ?
                                        'scale-105 py-2 font-medium bg-emerald-200/50' 
                                        : 'hover:scale-105 hover:animate-out transition duration-700 py-2'
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

            {/* Detalles del centro */}
            {centroActivo && (
            <AnimatePresence mode="wait">
                <motion.div
                key={zonaActiva || 'default'}
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 1, scale: 1}}
                transition={{duration: 0.3}}>
                    <div className="
                    w-full
                    p-8 border border-t-0
                    border-emerald-500 bg-emerald-200/50 shadow
                    bg-gradient-to-b from-emerald-200/20 via-emerald-100 to-emerald-100
                    flex gap-36 items-start justify-between">
                        <div className='w-1/3 flex flex-col gap-8'>
                            <div className='flex gap-12 items-start'>
                                <Image
                                src={centroActivo.urlIcon}
                                alt="img centro de salud"
                                width={80}
                                height={80} />
                                <div>
                                    <p className='text-zinc-500 text-xs uppercase'>{centroActivo.ciudad}</p>
                                    <h2 className="text-xl font-bold text-amber-600">
                                        <span className='capitalize text-pretty'>{centroActivo.tipo}</span> {centroActivo.nombre}
                                    </h2>
                                    <div className='mt-4 flex items-center gap-2'>
                                        <Image
                                        src={'/ubicacion.svg'}
                                        alt="img teléfono"
                                        width={28}
                                        height={28} />
                                        <p className="text-zinc-500">{centroActivo.direccion}</p>
                                    </div>
                                    <div className='mt-2 flex items-center gap-2'>
                                        <Image
                                        src={'/manotelefono.svg'}
                                        alt="img teléfono"
                                        width={36}
                                        height={36} />
                                        <ul className="text-zinc-500 text-sm mt-2">
                                        {centroActivo.telefonos.map(telefono => (
                                            <li key={telefono}>{telefono}</li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className='w-2/3'>
                            <div className='mb-8 flex flex-wrap gap-2'>
                                {especialidadesCentro.length > 0 ? (
                                especialidadesCentro.map(especialidad => (
                                    <div
                                    key={especialidad}
                                    className='
                                    px-6 py-2 flex gap-2 items-center
                                    bg-emerald-100 border rounded-full border-emerald-400'>
                                        <Image
                                        src={`/especialidades/${crearSlug(especialidad)}.svg`}
                                        alt={`especialidad ${especialidad}`}
                                        height={18}
                                        width={18} />
                                        <p className="text-xs text-zinc-600">{especialidad}</p>
                                    </div>
                                ))
                                )
                                : (<p className="text-sm text-zinc-500">No hay especialidades definidas</p>)
                                }
                            </div>

                            {turnos.find(turno => turno.idCentroSalud === centroActivo.id) && (
                            <ul className='mt-0 px-6 py-4 flex gap-4 flex-wrap shadow-md bg-emerald-50 border border-emerald-200'>
                                <p className="font-medium mb-2 text-emerald-600">Turnos</p>
                                {turnos.map(turno => (
                                <li key={turno.id} className='grow border-l pl-2 border-emerald-600'>
                                    <p className='font-bold'>{turno.id}</p>
                                    {turno.diasSemana?.map(dia => (<span key={dia}>{dia} </span>))}
                                    <p>Especialidad: {turno.idEspecialidad}</p>
                                    <p>Profesional: {turno.idProfesional}</p>
                                    <ul>
                                        <li>{turno.fechaInicio} {turno.fechaFin}</li>
                                        <li>{turno.activo ? 'activo' : 'no disponible'}</li>
                                        <li>{turno.fecha}</li>
                                        <li>{turno.horaInicio} - {turno.horaFin}</li>
                                        <li>Duración: {turno.duracionTurno} minutos</li>
                                        <li>{turno.tipoRecurrencia}</li>
                                        <li>{turno.notas}</li>
                                    </ul>
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            )}
        </div>
    )
}