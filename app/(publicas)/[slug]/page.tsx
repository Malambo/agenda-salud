import api from "@/lib/api"
import TituloPagina from "@/components/ui/TituloPagina"

export default async function CategoriaPage({params}: {params: Promise<{slug: string}>}) {
    
    const {slug} = await params
    
    const {urlIcono, titulo, descripcion} = await api.traeCategoria('/' + slug)
    
    return (
        <div className='flex flex-col gap-24 items-center'>
            <TituloPagina urlIcono={urlIcono} titulo={titulo} />
            <p className='w-1/2 text-pretty text-lg'>
                {descripcion}
            </p>
        </div>
    )
}
