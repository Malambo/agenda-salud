import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


interface ItemConIds<T extends string> {
    id: T
    [key: string]: string | string[]        // Permite que el objeto tenga otras propiedades.
}

interface Relacion<T extends string> {
    id: T
    nombre: string                          // Campo adicional para el nombre u otra propiedad relevante.
    relacionados: string[]                  // Lista de IDs relacionados.
    [key: string]: string | string[]
}

/**mapearRelacionados
 * se utiliza para relacionar dos listas de objetos basándose
 * en ciertos campos clave. Esta función es genérica y utiliza
 * los tipos T y K para representar las claves de relación.
 */
export function mapearRelacionados<T extends string, K extends string>(
    // Lista de objetos que contiene los elementos base.
    // Cada objeto debe tener un campo id y puede tener otros campos adicionales.
    listaBase: ItemConIds<T>[],
    // Lista de objetos que contiene los elementos relacionados.
    // Cada objeto debe tener un campo id y puede tener otros campos adicionales.
    listaRelacionada: ItemConIds<K>[],
    // Nombre del campo en los objetos de listaRelacionada que contiene los IDs de los elementos de listaBase.
    claveRelacion: K,
    // Nombre del campo en los objetos de listaBase que representa el identificador único.
    claveIdBase: T,
    // Nombre del campo adicional en los objetos de listaBase que se desea incluir en el resultado.
    nombreCampo: string
): Relacion<T>[] {

    /**Proceso de Mapeo
     * La función utiliza el método map para iterar sobre cada elemento de listaBase.
     */
    return listaBase.map(itemBase => {
        /**Para cada elemento de listaBase se filtran los elementos de listaRelacionada
        * para encontrar aquellos que tienen una relación con el elemento actual de listaBase.
        * Esto se hace comprobando si el campo claveRelacion del elemento relacionado incluye
        * el claveIdBase del elemento base.
        */
        const relacionados = listaRelacionada
            .filter(itemRelacionado => Array.isArray(
                itemRelacionado[claveRelacion]) &&
                itemRelacionado[claveRelacion].includes(itemBase[claveIdBase] as string))
            .map(itemRelacionado => itemRelacionado.id)

        /**Construcción del resultado
         * Para cada elemento de listaBase, se crea un nuevo objeto que incluye:
         * id: El ID del elemento base.
         * nombre: El valor del campo adicional especificado (nombreCampo).
         * relacionados: Una lista de IDs de los elementos relacionados.
         * urlIcon (opcional): Si el elemento base tiene un campo urlIcon, se incluye en el resultado.
         */
        const resultado: Relacion<T> = {
            id: itemBase.id,
            nombre: itemBase[nombreCampo] as string,
            relacionados,
            ...(itemBase.urlIcon && {urlIcon: itemBase.urlIcon as string})
        }

        /**Retorno
         * La función devuelve una nueva lista de objetos que contienen el ID,
         * el nombre, los IDs de los elementos relacionados y opcionalmente el urlIcon.
         * Este enfoque permite crear una estructura de datos que facilita la visualización
         * y manipulación de la relación entre dos listas de objetos.
         */
        return resultado
    })
}

// Slug permite barra "/"
export function crearSlug(texto: string): string {
    // Normalizar el texto para eliminar acentos y caracteres especiales
    const slug = texto
        .normalize('NFD')                   // Descomponer caracteres Unicode
        // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
        .replace(/[\u0300-\u036f]/g, '')    // Eliminar marcas diacríticas
        .replace(/[^\w\s-]/g, '')           // Eliminar caracteres no alfanuméricos excepto guiones y espacios
        .trim()                             // Eliminar espacios en blanco al inicio y al final
        .replace(/\s+/g, '-')               // Reemplazar espacios por guiones
        .toLowerCase();                     // Convertir a minúsculas
    return slug
}