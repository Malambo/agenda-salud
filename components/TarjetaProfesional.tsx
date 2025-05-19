
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger}       from "@/components/ui/accordion"
import MiAccordionTrigger   from "@/components/ui/MiAccordionTrigger"
import api from '@/lib/api'


interface TarjetaProfesionalProps {
    idProfesional: string
}


export default async function TarjetaProfesional({idProfesional}: TarjetaProfesionalProps) {

    const profesionales = await api.listaProfesionales()
    const nombreEspecialidades = profesional.especialidades.map(especialidad => {api.traeEspecialidad(especialidad)})
    console.log (nombreEspecialidades)

    return (
        <Accordion type="single" collapsible>
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
                                {profesional.especialidades.map(idProf=>(
                                    <AccordionContent key={idProf} className='text-sm px-4'>
                                        {especialidades.find(especialidad=>especialidad.id === idProf)?.nombre}
                                    </AccordionContent>
                                ))}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
