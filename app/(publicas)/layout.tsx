import BarraLateral from "@/components/BarraLateral"

export default function LayoutCategorias({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <main className='flex overflow-hidden overflow-y-auto no-scrollbar'> 
            <aside className="min-h-screen hidden sm:block">
                <BarraLateral />
            </aside>
            
            <section className="container mx-auto mt-32 px-8 sm:px-24">
                {children}
            </section>
        </main>
    )
}