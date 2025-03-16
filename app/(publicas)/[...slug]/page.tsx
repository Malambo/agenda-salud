import api from '@/lib/api'
import TitularPagina from '@/components/ui/TitularPagina'
import TarjeteroEspecialidades from '@/components/TarjeteroEspecialidades'
import CentrosSalud from '@/components/CentrosSalud'


export default async function CategoriaPage({params}: {params: Promise<{slug: string[]}>}) {

    const slug = (await params).slug
    const {urlIcono, titulo, descripcion} = await api.traeCategoria(`/${slug[0]}`)

    return (
        <>
        <div className='container mx-auto flex flex-col gap-24 items-center'>
            <TitularPagina urlIcono={urlIcono} titulo={titulo} descripcion={descripcion} />
        
            <div className='container sm:mt-24'>
                {slug[0] === 'centro-salud' && (<CentrosSalud />)}
                {slug[0] === 'especialidades' && <TarjeteroEspecialidades />}
                {slug[0] === 'profesionales' && (
                <div>
                    <p className='font-bold text-orange-500 uppercase'>
                        {slug[0]}
                    </p>
                </div>
                )}
            </div>
        </div>
        </>
    )
}
