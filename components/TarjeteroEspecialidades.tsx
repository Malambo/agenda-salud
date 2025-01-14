import api from "@/lib/api"
import TarjetaEspecialidad from "./TarjetaEspecialidad"
import {mapearRelacionados} from "@/lib/utils"

const especialidades = await api.listaEspecialidades()
const profesionales = await api.listaProfesionales() // define profesionales
const especialidadesConProfesionales = mapearRelacionados(
    especialidades,     // fuente de los nombres
    profesionales,      // pide con ids los nombres a especialidades
    'especialidades',   // campo que tiene los id (en profesionales)(?)
    'id',               // vínculo (en especialidades)(?)
    'nombre'            // otro campo que debe estar (desde especialidades)
)


export default async function TarjeteroEspecialidades() {

    const traeDescripcion = async (id: string) => {
        const {descripcion} = await api.traeEspecialidad(id)
        return descripcion
    }

    return (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3'>
            {especialidadesConProfesionales.map(especialidad => (
            <div key={especialidad.id}>
                <TarjetaEspecialidad
                especialidad={especialidad.nombre}
                cantProfesionales={especialidad.relacionados.length ?? 0}
                descripcion={traeDescripcion(especialidad.id)} />
            </div>
            ))}
        </div>
    )
}
