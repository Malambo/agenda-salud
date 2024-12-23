import api from "@/lib/api"
import TarjetaEspecialidad from "./TarjetaEspecialidad"
import { mapearRelacionados } from "@/lib/utils"

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

    return (
        <div className='mt-36 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
            {especialidadesConProfesionales.map(especialidad => (
            <div key={especialidad.id}>
                <TarjetaEspecialidad
                especialidad={especialidad.nombre}
                cantProfesionales={especialidad.relacionados.length} />
            </div>
            ))}
        </div>
    )
}
