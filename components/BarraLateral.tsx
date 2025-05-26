'use client'

import {
    useEffect,
    useState}               from 'react'
import {usePathname}        from 'next/navigation'
import Link                 from "next/link"
import Image                from "next/image"
import {User, Search}       from "lucide-react"
import api                  from "@/lib/api"
import {
    crearSlug,
    mapearRelacionados}     from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger}       from "@/components/ui/accordion"
import MiAccordionTrigger   from "@/components/ui/MiAccordionTrigger"
import {Input}              from "@/components/ui/input"
import {Button}             from "@/components/ui/button"
import IsoLogo              from '@/public/IsoLogo.svg'
import type {
    ZonasSanitarias,
    Profesional,
    Especialidad}           from '@/lib/api'


export default function BarraLateral(){

    const pathname = usePathname()
    const paginaActiva = pathname.split('/')[1] ?? ''

    const [zonasSanitarias, setZonasSanitarias] = useState<ZonasSanitarias>({zonas: []})
    const [profesionales, setProfesionales] = useState<Profesional[]>([])
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([])

    useEffect(()=>{
        async function fetchData(){
            try{
                const [zonasSanitariasData, profesionalesData, especialidadesData] = await Promise.all([
                    api.listaZonasSanitarias(),
                    api.listaProfesionalesABC(),
                    api.listaEspecialidades()
                ])
                setZonasSanitarias(zonasSanitariasData)
                setProfesionales(profesionalesData)
                setEspecialidades(especialidadesData)
            }catch(error){
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    },[])

    const zonas = zonasSanitarias.zonas
    const centrosSalud = zonas.flatMap(zona=>zona.centrosSalud)
    const profesionalesMap = new Map(profesionales.map(p=>[p.id, p.nombre]))
    const especialidadesConProfesionales = mapearRelacionados(
        especialidades,
        profesionales,
        "especialidades",
        "id",
        "nombre"
    )
    especialidadesConProfesionales.sort((a,b) => a.nombre.localeCompare(b.nombre))
    const centrosConProfesionales = mapearRelacionados(
        centrosSalud,
        profesionales,
        'centrosSalud',
        'id',
        'nombre'
    )

    return(
        <div className='relative w-80 min-h-screen px-2 bg-gradient-to-r from-emerald-50 to-emerald-100 border-r border-emerald-300'>
            <div className='z-10 sticky top-0 py-4 bg-gradient-to-r from-emerald-50 to-emerald-100'>
                <Link href={'/'} className='mt-2 py-2 flex items-center justify-center gap-2 text-3xl text-emerald-900 text-pretty font-montserrat font-thin'>
                    <Image src={IsoLogo} alt='Logo AgendaSalud' width={40} height={40}/>
                    Agenda Salud
                </Link>
                <div className="my-8 p-1 rounded border border-emerald-600 bg-zinc-50">
                    <div className="flex w-full max-w-sm items-center space-x-2 p-1">
                        <Input type="text" placeholder="Buscar"/>
                        <Button className='py-4 rounded bg-emerald-800 text-zinc-50 hover:bg-gradient-to-br hover:from-emerald-700 hover:via-emerald-900 hover:to-emerald-950 transition transition-duration-500 ease-in-out' type="submit">
                            <Search/> Buscar
                        </Button>
                    </div>
                </div>
            </div>

            <Accordion type="single" collapsible>
                <AccordionItem value={'1'}>
                    <div className={`sticky top-52 ${paginaActiva === 'centro-salud' ? 'bg-emerald-100' : 'bg-gradient-to-r from-emerald-50 to-emerald-100'}`}>
                        <MiAccordionTrigger url={'/centro-salud'} urlIcono={'/CentrosSalud.svg'} titulo={'Centros de salud'}/>
                    </div>
                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-[#e8faf0] rounded text-zinc-700 p-4'>
                            {zonas.map(zona=>(
                            <AccordionItem key={zona.nombreZona} value={zona.nombreZona}>
                                <div className='flex'>
                                    <AccordionTrigger>{zona.nombreZona}</AccordionTrigger>
                                </div>

                                {zona.centrosSalud.map(centro=>(
                                <AccordionContent key={centro.id} className='flex p-2 gap-x-2 text-sm items-center'>
                                    <Image src={centro.urlIcon} alt="img centro de salud" width={24} height={24}/>
                                    <p><span className='capitalize'>{centro.tipo}</span> {centro.nombre}</p>
                                </AccordionContent>
                                ))}
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={'2'}>
                    <div className={`sticky top-52 ${paginaActiva === 'especialidades' ? 'bg-emerald-100' : 'bg-gradient-to-r from-emerald-50 to-emerald-100'}`}>
                        <MiAccordionTrigger url={'/especialidades'} urlIcono={'/Especialidades.svg'} titulo={'Especialidades'}/>
                    </div>
                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-[#e8faf0] rounded text-zinc-800 p-4'>
                            {especialidadesConProfesionales.map(especialidad=>(
                                <AccordionItem key={especialidad.id} value={especialidad.id}>
                                    <div className='flex gap-2 items-center'>
                                        <AccordionTrigger className='flex gap-4 items-center text-emerald-700'>
                                            <Image
                                            src={`/especialidades/${crearSlug(especialidad.nombre)}.svg`}
                                            alt={`especialidad ${especialidad.nombre}`}
                                            height={12}
                                            width={12}
                                            className="size-5 sm:size-6" />
                                            {especialidad.nombre}
                                        </AccordionTrigger>
                                    </div>
                                    {especialidad.relacionados.map(idProf=>{
                                        const profesionalNombre = profesionalesMap.get(idProf)
                                        return(
                                            <AccordionContent key={idProf} className='flex gap-2 px-2 text-sm text-zinc-700'>
                                                <User className="size-4"/> {profesionalNombre?.split('. ')[1]}
                                            </AccordionContent>
                                        )
                                    })}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={'5'}>
                    <div className={`sticky top-52 ${paginaActiva === 'profesionales' ? 'bg-emerald-100' : 'bg-gradient-to-r from-emerald-50 to-emerald-100'}`}>
                        <MiAccordionTrigger url={'/profesionales'} urlIcono={'/Profesionales.svg'} titulo={'Profesionales por centro'}/>
                    </div>
                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-[#e8faf0] rounded text-zinc-800 p-4'>
                            {centrosConProfesionales.map(centro=>(
                                <AccordionItem key={centro.id} value={centro.id}>
                                    <div className='flex gap-4 items-center'>
                                        <AccordionTrigger className='flex gap-2 items-center'>
                                            <Image src={centro.urlIcon as string} alt="img centro de salud" width={18} height={18}/>
                                            {centro.nombre}
                                        </AccordionTrigger>
                                    </div>
                                    {centro.relacionados.map(idProf=>{
                                    const profesionalNombre = profesionalesMap.get(idProf)
                                    return(
                                        <AccordionContent key={idProf} className='flex gap-2 px-2 text-sm text-zinc-700'>
                                            <User className="size-4"/> {profesionalNombre?.split('. ')[1]}
                                        </AccordionContent>
                                    )
                                    })}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value={'3'}>
                    <div className='sticky top-52 bg-gradient-to-r from-emerald-50 to-emerald-100'>
                        <MiAccordionTrigger url={'/profesionales'} urlIcono={'/Profesionales.svg'} titulo={'Todos los profesionales'}/>
                    </div>
                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-[#e8faf0] rounded text-zinc-800 p-4'>
                            {profesionales.map(profesional=>(
                            <AccordionItem key={profesional.id} value={profesional.id}>
                                <div className='flex gap-2 items-center'>
                                    <User className='size-4'/>
                                    <AccordionTrigger className='font-medium'>{profesional.nombre}</AccordionTrigger>
                                </div>
                                {profesional.especialidades.map(idEspProf=>(
                                <AccordionContent key={idEspProf} className='text-sm px-4'>
                                    {especialidades.find(especialidad => especialidad.id === idEspProf)?.nombre}
                                </AccordionContent>
                                ))}
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}