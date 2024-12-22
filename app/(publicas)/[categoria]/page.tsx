import TituloPagina from "@/components/ui/TituloPagina";

export default function CategoriaPage({searchParams}: {searchParams: {urlIcono: string; titulo: string}}) {

    return (
        <div>
            <TituloPagina urlIcono={searchParams.urlIcono} titulo={searchParams.titulo} />
        </div>
    )
}
