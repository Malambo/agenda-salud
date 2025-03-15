import TarjetaGeneral from "@/components/TarjetaGeneral"
import api from "@/lib/api"


const Tarjetas = await api.listaCategorias()
export default function TarjeteroGeneral() {

    return (
        
        <div className='mt-24 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12 justify-between'>
            {Tarjetas.map(tarjeta => (
            <TarjetaGeneral
            key={tarjeta.url}
            url={tarjeta.url}
            urlIcono={tarjeta.urlIcono}
            titulo={tarjeta.titulo}
            descripcion={tarjeta.descripcion}/>
            ))}
        </div>
    )
}
