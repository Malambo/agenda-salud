import api from "@/lib/api"
import TituloPagina from "@/components/ui/TituloPagina"
import TarjeteroEspecialidades from "@/components/TarjeteroEspecialidades"

export default async function CategoriaPage({params}: {params: Promise<{slug: string}>}) {

   
    const {slug} = await params
    const {urlIcono, titulo, descripcion} = await api.traeCategoria('/' + slug)
    
    return (
        <>
        <div className='flex flex-col gap-24 items-center'>
            <TituloPagina urlIcono={urlIcono} titulo={titulo} />
            <p className='w-1/2 text-pretty text-lg'>
                {descripcion}
            </p>
        </div>

        <div>
            {slug[0] === 'centro-salud' && <TarjeteroEspecialidades />}
            {slug[0] === 'especialidades' && <TarjeteroEspecialidades />}
            {slug[0] === 'profesionales' && <TarjeteroEspecialidades />}
        </div>

        </>
    )
}
