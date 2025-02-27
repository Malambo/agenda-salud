import type {Metadata} from "next"
import "./globals.css"
import BarraLateral from "@/components/BarraLateral"


export const metadata: Metadata = {
  title: "Agenda Salud",
  description: "Horarios y turnos médicos de centros de salud",
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    
    return (
        <html lang="es">
            <body>
                <main className='flex h-screen overflow-hidden'>
                    <aside className="h-full overflow-y-auto no-scrollbar hidden sm:block">
                        <BarraLateral />
                    </aside>

                    <section className="flex-1 overflow-y-auto no-scrollbar">
                        {children}
                    </section>

                </main>
            </body>
        </html>

    )
}
