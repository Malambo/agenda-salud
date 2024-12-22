import Link                 from "next/link"
import Image                from "next/image"
import {User, Search}       from "lucide-react"
import api                  from "@/lib/api"
import {mapearRelacionados} from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger}       from "@/components/ui/accordion"
import {Input}              from "@/components/ui/input"
import {Button}             from "@/components/ui/button"
import MiAccordionTrigger   from "@/components/ui/MiAccordionTrigger"
import IsoLogo              from '@/public/IsoLogo.svg'


const zonasSanitarias = await api.listaZonasSanitarias()
const zonas = zonasSanitarias.zonas
const profesionales = await api.listaProfesionales()
// Ordena por apellido.
// Si el formato no es exactamente "Dr. Nombre Apellido" va a fallar:
const profesionalesABC = profesionales.sort((a, b) => a.nombre.split(' ')[2].localeCompare(b.nombre.split(' ')[2]))
const especialidades = await api.listaEspecialidades()
const especialidadesConProfesionales = mapearRelacionados(
    especialidades,     // fuente de los nombres
    profesionales,      // pide con ids los nombres a especialidades
    'especialidades',   // campo que tiene los id (en profesionales)(?)
    'id',               // vínculo (en especialidades)(?)
    'nombre'            // otro campo que debe estar (desde especiialidades)
)


export default function BarraLateral() {
    const profesionalesMap = new Map(profesionales.map(p => [p.id, p.nombre]))
    return (
    <div className="w-96 min-h-screen p-2 bg-gradient-to-r from-emerald-200 to-emerald-300 border-r border-emerald-600">

        <Link
        href={'/inicio'}
        className='mt-2 py-2 flex items-center justify-center gap-2 text-3xl text-emerald-900 text-pretty font-montserrat font-thin'>
            <Image
            src={IsoLogo}
            alt='Logo AgendaSalud'
            width={40}
            height={40} />
            Agenda Salud
        </Link>
        
        <div className="my-8 p-1 rounded-md border border-emerald-900 bg-zinc-50">
            <div className="flex w-full max-w-sm items-center space-x-2 p-2">
                <Input type="text" placeholder="Buscar" />
                <Button type="submit"><Search />Buscar</Button>
            </div>
        </div>

        <Accordion type="single" collapsible className='p-2 rounded-md'>
            <Accordion type="single" collapsible>
                <AccordionItem value={'1'}>

                    <MiAccordionTrigger url={'/centro-salud'} urlIcono={'/CentrosSalud.svg'} titulo={'Centros de salud'} />

                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-zinc-800 rounded-md text-zinc-50 p-4'>
                            {zonas.map((zona) => (
                            <AccordionItem key={zona.nombreZona} value={zona.nombreZona}>
                                <div className='flex'>
                                    <AccordionTrigger className='font-bold'>{zona.nombreZona}</AccordionTrigger>
                                </div>
                                {zona.centrosMedicos.map(centro => (
                                <AccordionContent key={centro.id} className='flex p-2 gap-x-4 text-sm items-baseline'>
                                    <Image
                                    src={centro.urlIcon}
                                    alt="img centro de salud"
                                    width={24}
                                    height={24}/>
                                    {centro.nombre}
                                </AccordionContent>
                                ))}
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value={'2'}>

                    <MiAccordionTrigger url={'/especialidades'} urlIcono={'/Especialidades.svg'} titulo={'Especialidades'} />

                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-zinc-800 rounded-md text-white p-4'>
                            {especialidadesConProfesionales.map(async (especialidad) => (
                            <AccordionItem key={especialidad.id} value={especialidad.id}>
                            <div className='flex gap-2 items-center'>
                                <AccordionTrigger className='font-bold'>{especialidad.nombre}</AccordionTrigger>
                            </div>
                            {especialidad.relacionados.map(idProf => {
                                const profesionalNombre = profesionalesMap.get(idProf);
                                return (
                                    <AccordionContent key={idProf} className='flex gap-2 text-sm px-2'>
                                        <User className="size-4"/> {profesionalNombre && profesionalNombre.split('. ')[1]}
                                    </AccordionContent>
                                );
                            })}
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value={'3'}>

                    <MiAccordionTrigger url={'/profesionales'} urlIcono={'/Profesionales.svg'} titulo={'Profesionales'} />

                    <AccordionContent>
                        <Accordion type="single" collapsible className='bg-zinc-800 rounded-md text-white p-4'>
                            {profesionalesABC.map((profesional) => (
                            <AccordionItem key={profesional.id} value={profesional.id}>
                            <div className='flex gap-2 items-center'>
                                <User className='size-4' />
                                <AccordionTrigger className='font-bold'>{profesional.nombre}</AccordionTrigger>
                            </div>
                            {profesional.especialidades.map(idProf => (
                                <AccordionContent key={idProf} className='text-sm px-4'>
                                    {especialidades.filter(especialidad => especialidad.id === idProf)[0].nombre}
                                </AccordionContent>
                            ))}
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </Accordion>
    </div>
    )
}

