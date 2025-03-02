import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface ItemConIds<T extends string> {
    id: T
    [key: string]: string | string[]    // Permite que el objeto tenga otras propiedades.
}

interface Relacion<T extends string> {
  id: T
  nombre: string                        // Campo adicional para el nombre u otra propiedad relevante.
  relacionados: string[]                // Lista de IDs relacionados.
  [key: string]: string | string[]
}

export function mapearRelacionados<
  T extends string,                     // Tipo para las claves de relación (ej. 'id' de especialidades).
  K extends string                      // Tipo para las claves de la relación inversa (ej. 'especialidades').
>(
  listaBase: ItemConIds<T>[],           // Lista base a la que se agregarán los relacionados (ej. especialidades).
  listaRelacionada: ItemConIds<K>[],    // Lista que contiene las relaciones (ej. profesionales).
  claveRelacion: K,                     // Clave del array que relaciona los elementos (ej. 'especialidades').
  claveIdBase: T,                       // Clave que representa el identificador de los elementos base (ej. 'id' de especialidades).
  nombreCampo: string                   // Campo adicional que se desea incluir (ej. 'especialidad').
): Relacion<T>[] {
  return listaBase.map(itemBase => {
    const relacionados = listaRelacionada
      .filter(itemRelacionado => {
        const relacion = itemRelacionado[claveRelacion]
        return Array.isArray(relacion) && relacion.includes(itemBase[claveIdBase] as string)
      })
      .map(itemRelacionado => itemRelacionado.id)   // Agregar solo el ID de los relacionados.

    const result: Relacion<T> = {
      id: itemBase.id,
      nombre: itemBase[nombreCampo] as string,      // Añade el campo adicional especificado.
      relacionados,
    }

    if (itemBase.urlIcon) {
      result.urlIcon = itemBase.urlIcon as string    // Añade la URL de la imagen si existe.
    }

    return result;
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