import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Creamos una nueva instancia de Headers basada en los headers de la solicitud
    const requestHeaders = new Headers(request.headers)
    
    // Añadimos nuestro header personalizado con la ruta actual
    requestHeaders.set('x-pathname', request.nextUrl.pathname)
    
    // Continuamos con la solicitud, pero incluimos nuestros headers modificados
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
}

// Esta configuración asegura que el middleware se ejecute para todas las rutas
export const config = {
    matcher: '/:path*',
}