import type {Metadata} from "next"
import {Poppins} from 'next/font/google'
import "./globals.css"


const poppins = Poppins({subsets: ['latin'], weight: ['100', '200', '400', '700', '900']})

export const metadata: Metadata = {
  title: "Agenda Salud",
  description: "Horarios y turnos médicos del sistema municipal de Salud del partido de La Costa",
}

export const dynamic = 'force-dynamic'


export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="es">
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    )
}
