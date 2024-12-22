import api from "@/lib/api"
import TituloPagina from "@/components/ui/TituloPagina"

export default async function CategoriaPage({params}: {params: {categoria: string}}) {
    console.log("🚀 ~ CategoriaPage ~ params:", params.categoria)

    const {urlIcono, titulo, descripcion} = await api.traeCategoria('/'+params.categoria)
    

    return (
        <div className='flex flex-col gap-24'>
            <TituloPagina urlIcono={urlIcono} titulo={titulo} />
            <p>{descripcion}</p>
        </div>
    )
}
