import api from '@/lib/api';
import TituloPagina from '@/components/ui/TituloPagina';
import TarjeteroEspecialidades from '@/components/TarjeteroEspecialidades';
import CentrosSalud from '@/components/CentrosSalud';


export default async function CategoriaPage({params}: {params: Promise<{slug: string}>}) {

    const slug = (await params).slug[0]
    const {urlIcono, titulo, descripcion} = await api.traeCategoria('/' + slug)

    return (
        <>
        <div className='flex flex-col gap-24 items-center'>
            <TituloPagina urlIcono={urlIcono} titulo={titulo} />
            <p className='w-2/3 text-pretty text-lg'>{descripcion}</p>
        </div>

        <div className='mt-44'>
            {slug === 'centro-salud' && (<CentrosSalud />)}

            {slug === 'especialidades' && <TarjeteroEspecialidades />}
            
            {slug === 'profesionales' && (
            <p className='font-bold text-orange-500'>
                {slug.toLocaleUpperCase()}
            </p>
            )}
        </div>
        </>
    )
}
