import type {Metadata} from "next"
import "./globals.css"


export const metadata: Metadata = {
  title: "Agenda Salud",
  description: "Horarios y turnos médicos del sistema municipal de Salud del partido de La Costa",
}

export const dynamic = 'force-dynamic'


export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="es">
            <body>
                <main className='flex-1 overflow-hidden overflow-y-auto no-scrollbar'>
                    {children}
                </main>
            </body>
        </html>
    )
}
