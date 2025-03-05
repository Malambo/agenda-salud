import api from '@/lib/api'
import TituloPagina from '@/components/ui/TituloPagina'
import TarjeteroEspecialidades from '@/components/TarjeteroEspecialidades'
import CentrosSalud from '@/components/CentrosSalud'


export default async function CategoriaPage({params}: {params: Promise<{slug: string[]}>}) {

    const slug = (await params).slug
    const {urlIcono, titulo, descripcion} = await api.traeCategoria(`/${slug[0]}`)

    return (
        <>
        <div className='flex flex-col gap-24 items-center'>
            <TituloPagina urlIcono={urlIcono} titulo={titulo} />
            <p className='w-2/3 text-pretty text-lg'>{descripcion}</p>
        </div>

        <div className='mt-44'>
            {slug[0] === 'centro-salud' && (<CentrosSalud slug={slug} />)}
            {slug[0] === 'especialidades' && <TarjeteroEspecialidades />}
            {slug[0] === 'profesionales' && (
            <div>
                <p className='font-bold text-orange-500 uppercase'>
                    {slug[0]}
                </p>
            </div>
            )}
        </div>
        </>
    )
}
