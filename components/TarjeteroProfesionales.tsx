import api from "@/lib/api"
import TarjetaProfesional from "./TarjetaProfesional"

const profesionales = await api.listaProfesionalesABC() // define profesionales


export default async function TarjeteroProfesionales() {

    return (
        <div className='grid grid-cols-3 gap-8 mb-12'>
            {profesionales.map(profesional => (
            <TarjetaProfesional key={profesional.id} idProfesional={profesional.id} />
            ))}
        </div>
    )
}
