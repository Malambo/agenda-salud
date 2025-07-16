import Link from 'next/link'
import Image from 'next/image'
import api  from '@/lib/api'


export default async function TarjetaProfesional({idProfesional}: {idProfesional: string}) {

    const profesional = await api.traeProfesional(idProfesional)
    const especialidades = await api.listaEspecialidades()
    const centros = await api.listaCentros()

    const especialidadesProfesional = profesional.especialidades.map(idEspecialidad => {
        const especialidad = especialidades.find(e => e.id === idEspecialidad)
        return especialidad ? especialidad.nombre : 'especialidad no encontrada'
    })

    const centrosProfesional = profesional.centrosSalud.map(idCentro => {
        const centro = centros.find(c => c.id === idCentro)
        return centro ? centro : undefined
    })

    return (
        <Link
        href="#"
        aria-label={`Ir a la especialidad ${profesional.nombre}`}>
            <div
            className="
            relative group
            p-8 rounded shadow-sm
            bg-white
            border border-emerald-200
            hover:border-emerald-600
            hover:bg-gradient-to-br hover:from-white hover:via-emerald-50 hover:to-emerald-100/75
            hover:shadow-lg
            cursor-pointer transition duration-300 ease-in-out">

                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div
                    className="
                    flex items-center justify-center shrink-0
                    size-14 sm:size-20
                    rounded-full border-2
                    bg-emerald-100 border-emerald-200/80
                    group-hover:scale-110 group-hover:shadow
                    transition duration-300
                    overflow-hidden">
                        <Image
                        src={'/profesional.png'}
                        alt={`Avatar de ${profesional.nombre}`}
                        width={128}   // ← Tamaño mayor al contenedor
                        height={128}  // ← Para asegurar que llene el círculo
                        className="size-full object-cover object-top" />
                    </div>
                    
                    <div className="flex flex-col">
                        <div className='group/tooltip relative inline-block'>
                            <h2 className="font-bold text-lg text-orange-500">{profesional.nombre}</h2>
                        </div>
                        <div className='group/tooltip relative inline-block'>
                            <h2 className="text-zinc-500 text-sm">Matrícula: {profesional.matricula}</h2>
                        </div>
                    </div>
                </div>
                <div className='mt-8 flex justify-between border-t border-zinc-200 pt-4 text-sm'>
                    <div>
                        {centrosProfesional.map(centro => (
                        <div key={centro?.id} className='flex-1'>
                            <p><span className='capitalize'>{centro?.tipo}</span> {centro?.nombre}</p>
                        </div>
                        ))}
                    </div>
                    <div>
                        {especialidadesProfesional.map(especialidad => (
                        <div key={especialidad}>
                            <h2>{especialidad}</h2>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}
