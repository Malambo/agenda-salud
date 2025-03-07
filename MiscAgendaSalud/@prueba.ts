export interface ZonasSanitarias {
  zonas: Zona[];
}

export interface Zona {
  nombreZona: string;
  centrosMedicos: CentroMedico[];
}

export interface CentroMedico {
  id: string;
  urlIcon: string;
  nombre: string;
  tipo: string;
  direccion: string;
  ciudad: string;
  telefonos: string[];
}