
import {
    Accordion,
    AccordionContent,
    AccordionItem}       from "@/components/ui/accordion"
import MiAccordionTrigger   from "@/components/ui/MiAccordionTrigger"
import api from '@/lib/api'


interface TarjetaProfesionalProps {
    idProfesional: string
}


export default async function TarjetaProfesional({idProfesional}: TarjetaProfesionalProps) {

    const profesional = await api.traeProfesional(idProfesional)
    const especialidades = await api.listaEspecialidades()
    const centros = await api.listaCentros()

    const especialidadesProfesional = profesional.especialidades.map(idEspecialidad => {
        const especialidad = especialidades.find(e=>e.id===idEspecialidad)
        return especialidad ? especialidad.nombre : ''
    })

    const centrosProfesional = profesional.centrosSalud.map((idCentro: string) => {
        const centro = centros.find(c=>c.id===idCentro)
        return centro ? centro.nombre : ''
    })


    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={'0'}>
                <div className='sticky top-52 bg-gradient-to-r from-emerald-50 to-emerald-100'>
                    <MiAccordionTrigger url={'/profesionales'} urlIcono={'/Profesionales.svg'} titulo={profesional.nombre}/>
                </div>
                <AccordionContent>
                    <div className='flex gap-8 justify-start'>
                        <div className='flex flex-col justify-start font-bold'>
                            {especialidadesProfesional.map((especialidadProfesional, index) => (
                            <div key={index} className='flex justify-start'>
                                <p className='text-sm text-left'>{especialidadProfesional}</p>
                            </div>
                            ))}
                        </div>

                        <div className='flex flex-col justify-start'>
                            {centrosProfesional.map((centrosProfesional, index) => (
                            <div key={index} className='flex justify-start'>
                                <p className='text-sm text-left'>{centrosProfesional}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
