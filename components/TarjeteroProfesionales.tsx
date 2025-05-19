import api from "@/lib/api"
import TarjetaProfesional from "./TarjetaProfesional"

const profesionales = await api.listaProfesionales() // define profesionales


export default async function TarjeteroProfesionales() {

    return (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3'>
            {profesionales.map(profesional => (
            <div key={profesional.id}>
                <TarjetaProfesional
                idProfesional={profesional.id} />
            </div>
            ))}
        </div>
    )
}
