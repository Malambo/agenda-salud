import api from "./api"

export default async function Home() {
    const zonasSanitarias = await api.listaZonasSanitarias()
    const profesionales = await api.listaProfesionales()

    const centroSalud = async (id: string) => {
        const centros = await api.traeCentro(id)
        return centros.tipo
    }

    const especialidad = async (id: string) => {
        const especialidad = await api.traeEspecialidad(id)
        return especialidad.nombre
    }

    return (
        <div className='m-24'>
            <ul className='flex flex-wrap gap-10'>
                {zonasSanitarias.zonas.map(zona => (
                <li
                key={Date.now() * Math.random()}
                className='p-8 font-bold text-xl bg-green-300 rounded-md shadow'>
                    {zona.nombreZona}
                    <ul className='font-normal mt-6'>
                        {zona.centrosMedicos.map(centro => (
                        <div key={centro.id}>
                            <li  className='mb-3'>
                                {centro.nombre}: <span className='text-sm text-slate-600'>{centroSalud(centro.id)}</span>
                                {centro.telefonos.map(telefono => <p key={telefono} className='text-sm'>{telefono}</p>)}
                            </li>
                        </div>
                        ))}
                    </ul>
                </li>
                ))}
            </ul>

            <ul className='mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4'>
                {profesionales.map(profesional => (
                <li key={profesional.id}>
                    <p className='font-bold'>{profesional.nombre}:</p> {profesional.especialidades.map((e) =>
                        <p key={Date.now() * Math.random()} className='text-sm'>{especialidad(e)} </p>)}
                </li> 
                ))}
            </ul>
        </div>
    )
}
