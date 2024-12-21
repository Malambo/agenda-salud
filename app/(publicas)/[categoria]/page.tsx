import TituloPagina from "@/components/ui/TituloPagina";

export default function CategoriaPage({params}: {params: {categoria: string}}) {

    return (
        <div>
            <TituloPagina urlIcono="/CentrosSalud.svg" titulo={params.categoria} descripcion="El sistema sanitario municipal tiene espacios modernos y acordes a la demanda actual de salud de los vecinos del partido de La Costa." />
        </div>
    )
}
