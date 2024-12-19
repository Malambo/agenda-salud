import BarraLateral from "@/components/BarraLateral"
import type { Metadata } from "next"
import "./globals.css"


export const metadata: Metadata = {
  title: "Agenda Salud",
  description: "Horarios y turnos médicos de centros de salud",
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    
    return (
        <html lang="es">
            <body>
                <main className='flex mx-auto'>
                    <BarraLateral />
                    {children}
                </main>
            </body>
        </html>

    )
}
