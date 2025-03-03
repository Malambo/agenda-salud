import type {Metadata} from "next"
import "./globals.css"
import BarraLateral from "@/components/BarraLateral"
import {headers} from 'next/headers'


export const metadata: Metadata = {
  title: "Agenda Salud",
  description: "Horarios y turnos médicos de centros de salud",
}

export const dynamic = 'force-dynamic'


export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const headerList = await headers()
    const currentPath = headerList.get('x-pathname')
    console.log("🚀 ~ RootLayout ~ currentPath:", currentPath)

    return (
        <html lang="es">
            <body>
                <main className='flex h-screen overflow-hidden'>
                    {currentPath !== '/inicio' && 
                        <aside className="h-full overflow-y-auto no-scrollbar hidden sm:block">
                            <BarraLateral />
                        </aside>
                    }

                    <section className="flex-1 overflow-y-auto no-scrollbar">
                        {children}
                    </section>
                </main>
            </body>
        </html>
    )
}
