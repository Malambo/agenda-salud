import BarraLateral from "@/components/BarraLateral"

export default function LayoutCategorias({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <div className='flex min-h-screen'> 
            <aside className="w-80 fixed top-0 bottom-0 overflow-y-auto no-scrollbar invisible sm:visible">
                <BarraLateral />
            </aside>
            
            <div className="flex-1 ml-80">
                <div className='sticky top-0 z-10 py-4 px-8 bg-emerald-50/90 border-b border-zinc-400 flex justify-end'>
                    <p>navegación</p>
                </div>
                <section className="my-32 px-8 sm:px-24">
                    {children}
                </section>
            </div>
        </div>
    )
}

