import {crearSlug} from "../utils"

export interface CentroSalud {
    id:             string
    urlIcon:        string
    nombre:         string
    tipo:           'hospital' | 'CAPS' | 'unidad sanitaria'
    direccion:      string
    ciudad:         string
    telefonos:      string[]
    [key: string]:  string | string[]
}

export interface ZonaSanitaria {
    id?:            string
    nombreZona:     string
    centrosSalud:   CentroSalud[]
}

export interface ZonasSanitarias {
    zonas:          ZonaSanitaria[]
}

export interface Profesional {
    id:             string
    nombre:         string
    matricula:      string
    especialidades: string[]
    centrosSalud:   string[]
    [key: string]:  string | string[]
}

export interface Especialidad {
    id:             string
    nombre:         string
    [key: string]:  string
}

export interface Categorias {
    url:            string
    urlIcono:       string
    titulo:         string
    descripcion:    string
    [key: string]:  string | string[]
}

export interface BloqueTurnos {
    id: string
    idProfesional: string
    idCentroSalud: string
    idEspecialidad: string
    
    // Información de recurrencia
    tipoRecurrencia: 'simple' | 'semanal' | 'mensual' | 'personalizado'
    
    // Para recurrencia simple (una sola fecha)
    fecha?: string // formato "YYYY-MM-DD", solo para tipoRecurrencia "simple"
    
    // Para recurrencia semanal
    diasSemana?: ('lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo')[] 
    
    // Para recurrencia mensual
    semanaDelMes?: (1 | 2 | 3 | 4 | 5 | -1)[] // -1 representa "último"
    diasDelMes?: number[] // días específicos del mes (1-31)
    
    // Para recurrencia personalizada
    reglaCron?: string // Expresión cron para patrones complejos
    
    // Fechas de validez
    fechaInicio: string // Fecha desde la que comienza la recurrencia
    fechaFin: string | null // Fecha hasta la que aplica la recurrencia (opcional)
    
    // Información del horario
    horaInicio: string // formato "HH:MM"
    horaFin: string // formato "HH:MM"
    duracionTurno: number // en minutos
    
    // Control de disponibilidad
    maximoTurnos: number // calculado o especificado
    intervaloEntreConsultas: number // minutos entre el fin de un turno y el inicio del siguiente
    
    // Información adicional
    notas: string | null
    activo: boolean // para deshabilitar temporalmente
}

const zonasSanitarias: ZonasSanitarias = {
    zonas: [
        {
        "nombreZona": "Zona norte",
        "centrosSalud": [
            {
            "id": "1",
            "urlIcon": "/Hospital.svg",
            "nombre": "General de Agudos",
            "tipo": "hospital",
            "direccion": "Avenida San Martín 505",
            "ciudad": "San Clemente",
            "telefonos": ["02252421132", "02252422303"]
            },
            {
            "id": "2",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Juan XXIII",
            "tipo": "CAPS",
            "ciudad": "San Clemente",
            "direccion": "Calle 10 y Avenida I",
            "telefonos": ["02252422525"]
            },
            {
            "id": "3",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio San Martín",
            "tipo": "CAPS",
            "ciudad": "San Clemente",
            "direccion": "Calle 10 e/ 37 y 38",
            "telefonos": ["022521558"]
            },
            {
            "id": "4",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "El Tala",
            "tipo": "CAPS",
            "ciudad": "San Clemente",
            "direccion": "Avenida Talas del Tuyú y Avenida XV",
            "telefonos": ["0224615506248"]
            } 
        ]
        },
        
        {
        "nombreZona": "Zona centro",
        "centrosSalud": [
            {
            "id": "14",
            "urlIcon": "/UnidadSanitaria.svg",
            "nombre": "Las Toninas",
            "tipo": "unidad sanitaria",
            "ciudad": "Las Toninas",
            "direccion": "Calle 36 e/ 7 y 9",
            "telefonos": ["02246431807"]
            },
            {
            "id": "5",
            "urlIcon": "/Hospital.svg",
            "nombre": "Sub Zonal de Santa Teresita",
            "tipo": "hospital",
            "ciudad": "Santa Teresita",
            "direccion": "Avenida 41 y calle 16",
            "telefonos": ["02246420381", "02246420119", "02246420368", "02246534000", "02246534001"]
            },
            {
            "id": "6",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio Parque Golf",
            "tipo": "CAPS",
            "ciudad": "Santa Teresita",
            "direccion": "Calle 124 y calle 103",
            "telefonos": ["02246422815"]
            },
            {
            "id": "7",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio Las Quintas",
            "tipo": "CAPS",
            "ciudad": "Santa Teresita",
            "direccion": "Calle 16 e/ 41 y 42",
            "telefonos": ["02246421989"]
            }
        ]
        },
    
        {
        "nombreZona": "Zona sur",
        "centrosSalud": [
            {
            "id": "8",
            "urlIcon": "/Hospital.svg",
            "nombre": "Doctor Carlos Macías",
            "tipo": "hospital",
            "ciudad": "Mar de Ajó",
            "direccion": "Avenida Libertador 1780",
            "telefonos": ["02257420159", "02257422307"]
            },
            {
            "id": "9",
            "urlIcon": "/Hospital.svg",
            "nombre": "Centro de Diagnóstico",
            "tipo": "hospital",
            "ciudad":"Mar de Ajó",
            "direccion": "La Marejada y Los Andes",
            "telefonos": ["02257424627", "02257424073"]
            },
            {
            "id": "10",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Aguas Verdes",
            "tipo": "CAPS",
            "ciudad": "Aguas Verdes",
            "direccion": "Destructor San Juan 535",
            "telefonos": ["02257462613"]
            },
            {
            "id": "11",
            "urlIcon": "/UnidadSanitaria.svg",
            "nombre": "Lucila del Mar",
            "tipo": "unidad sanitaria",
            "ciudad": "Lucila del Mar",
            "direccion": "Mendoza 5130",
            "telefonos": ["02257462305", "02257635679"]
            },
            {
            "id": "12",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "San Bernardo",
            "tipo": "CAPS",
            "ciudad": "San Bernardo",
            "direccion": "Falkner y Jujuy",
            "telefonos": ["0224615506248"]
            }
        ]
        },
        
        {
        "nombreZona": "Zona altos médanos",
        "centrosSalud": [
            {
            "id": "13",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Costa Esmeralda",
            "tipo": "CAPS",
            "ciudad": "Costa Esmeralda",
            "direccion": "Costa Esmeralda Road",
            "telefonos": ["02254421132", "02254422303"]
            }
        ]
        }
    ]
}


const Profesionales: Profesional[] = [
    {id:  '1', nombre: 'Dra. Ana López', matricula: 'MN 123456', especialidades: ['1'], centrosSalud: ['1']},
    {id:  '2', nombre: 'Dr. Juan Pérez', matricula: 'MP 654321', especialidades: ['1', '2'], centrosSalud: ['2', '3']},
    {id:  '3', nombre: 'Dra. María Gómez', matricula: 'MN 112233', especialidades: ['3'], centrosSalud: ['4']},
    {id:  '4', nombre: 'Dr. Carlos Fernández', matricula: 'MP 445566', especialidades: ['1'], centrosSalud: ['5', '6']},
    {id:  '5', nombre: 'Dra. Laura Martínez', matricula: 'MN 778899', especialidades: ['2'], centrosSalud: ['7']},
    {id:  '6', nombre: 'Dr. Jorge Ramírez', matricula: 'MP 998877', especialidades: ['3'], centrosSalud: ['8', '9']},
    {id:  '7', nombre: 'Dra. Elena Sánchez', matricula: 'MN 334455', especialidades: ['1', '2'], centrosSalud: ['10']},
    {id:  '8', nombre: 'Dr. Pedro Gutiérrez', matricula: 'MP 223344', especialidades: ['4'], centrosSalud: ['11', '12']},
    {id:  '9', nombre: 'Dra. Claudia Castro', matricula: 'MN 556677', especialidades: ['5', '21', '22'], centrosSalud: ['13']},
    {id: '10', nombre: 'Dr. Ricardo Morales', matricula: 'MP 667788', especialidades: ['2', '6'], centrosSalud: ['14']},
    {id: '11', nombre: 'Dra. Teresa Vega', matricula: 'MN 889900', especialidades: ['3'], centrosSalud: ['1', '2']},
    {id: '12', nombre: 'Dr. Andrés Herrera', matricula: 'MP 101112', especialidades: ['7'], centrosSalud: ['3']},
    {id: '13', nombre: 'Dra. Silvia Ortiz', matricula: 'MN 121314', especialidades: ['8'], centrosSalud: ['4', '5']},
    {id: '14', nombre: 'Dr. Fernando García', matricula: 'MP 151617', especialidades: ['9'], centrosSalud: ['6']},
    {id: '15', nombre: 'Dra. Lorena Ruiz', matricula: 'MN 181920', especialidades: ['10'], centrosSalud: ['7', '8']},
    {id: '16', nombre: 'Dr. Pablo Navarro', matricula: 'MP 212223', especialidades: ['4', '11'], centrosSalud: ['9']},
    {id: '17', nombre: 'Dra. Diana Márquez', matricula: 'MN 242526', especialidades: ['12'], centrosSalud: ['10', '11']},
    {id: '18', nombre: 'Dr. Víctor Ramos', matricula: 'MP 272829', especialidades: ['13'], centrosSalud: ['12']},
    {id: '19', nombre: 'Dra. Gabriela Peña', matricula: 'MN 303132', especialidades: ['5', '14'], centrosSalud: ['13', '14']},
    {id: '20', nombre: 'Dr. Manuel Díaz', matricula: 'MP 333435', especialidades: ['15'], centrosSalud: ['1']},
    {id: '21', nombre: 'Dra. Isabel Torres', matricula: 'MN 363738', especialidades: ['6'], centrosSalud: ['2', '3']},
    {id: '22', nombre: 'Dr. Javier Mendoza', matricula: 'MP 394041', especialidades: ['16'], centrosSalud: ['4']},
    {id: '23', nombre: 'Dra. Cristina Flores', matricula: 'MN 424344', especialidades: ['7'], centrosSalud: ['5', '6']},
    {id: '24', nombre: 'Dr. Eduardo Álvarez', matricula: 'MP 454647', especialidades: ['17'], centrosSalud: ['7']},
    {id: '25', nombre: 'Dra. Beatriz Rojas', matricula: 'MN 484950', especialidades: ['8'], centrosSalud: ['8', '9']},
    {id: '26', nombre: 'Dr. Antonio Soto', matricula: 'MP 515253', especialidades: ['18'], centrosSalud: ['10']},
    {id: '27', nombre: 'Dra. Patricia León', matricula: 'MN 545556', especialidades: ['9', '21', '22'], centrosSalud: ['11', '12']},
    {id: '28', nombre: 'Dr. Ernesto Vargas', matricula: 'MP 575859', especialidades: ['19'], centrosSalud: ['13']},
    {id: '29', nombre: 'Dra. Susana Domínguez', matricula: 'MN 606162', especialidades: ['10'], centrosSalud: ['14']},
    {id: '30', nombre: 'Dr. Jaime Cano', matricula: 'MP 636465', especialidades: ['20'], centrosSalud: ['1', '2']},
    {id: '31', nombre: 'Dra. Carolina Aguilar', matricula: 'MN 666768', especialidades: ['1'], centrosSalud: ['3']},
    {id: '32', nombre: 'Dr. Rafael Paredes', matricula: 'MP 697071', especialidades: ['2'], centrosSalud: ['5']},
    {id: '33', nombre: 'Dra. Sofía Lozano', matricula: 'MN 727374', especialidades: ['3'], centrosSalud: ['6']},
    {id: '34', nombre: 'Dr. Sergio Méndez', matricula: 'MP 757677', especialidades: ['4'], centrosSalud: ['7', '8']},
    {id: '35', nombre: 'Dra. Inés Campos', matricula: 'MN 787980', especialidades: ['5', '21', '22'], centrosSalud: ['9']},
    {id: '36', nombre: 'Dr. Óscar Gil', matricula: 'MP 818283', especialidades: ['6'], centrosSalud: ['10', '11']},
    {id: '37', nombre: 'Dra. Alicia Guzmán', matricula: 'MN 848586', especialidades: ['7'], centrosSalud: ['12']},
    {id: '38', nombre: 'Dr. Luis Romero', matricula: 'MP 878889', especialidades: ['8'], centrosSalud: ['13', '14']},
    {id: '39', nombre: 'Dra. Marisa Cortés', matricula: 'MN 909192', especialidades: ['9'], centrosSalud: ['1']},
    {id: '40', nombre: 'Dr. Ángel Herrera', matricula: 'MP 939495', especialidades: ['10'], centrosSalud: ['2', '3']},
    {id: '41', nombre: 'Dra. Irene Salinas', matricula: 'MN 969798', especialidades: ['11'], centrosSalud: ['4']},
    {id: '42', nombre: 'Dr. César Nieto', matricula: 'MP 991001', especialidades: ['12'], centrosSalud: ['5', '6']},
    {id: '43', nombre: 'Dra. Natalia Estévez', matricula: 'MN 102103', especialidades: ['13'], centrosSalud: ['7']},
    {id: '44', nombre: 'Dr. Álvaro Peña', matricula: 'MP 104105', especialidades: ['14'], centrosSalud: ['8', '9']},
    {id: '45', nombre: 'Dra. Carmen Beltrán', matricula: 'MN 106107', especialidades: ['15', '22'], centrosSalud: ['10']},
    {id: '46', nombre: 'Dr. Daniel Fuentes', matricula: 'MP 108109', especialidades: ['16'], centrosSalud: ['11', '12']},
    {id: '47', nombre: 'Dra. Verónica Maldonado', matricula: 'MN 110111', especialidades: ['17'], centrosSalud: ['13']},
    {id: '48', nombre: 'Dr. Hugo Ponce', matricula: 'MP 112113', especialidades: ['18'], centrosSalud: ['14']},
    {id: '49', nombre: 'Dra. Paola Cruz', matricula: 'MN 114115', especialidades: ['19'], centrosSalud: ['1', '2']},
    {id: '50', nombre: 'Dr. Francisco Ortega', matricula: 'MP 116117', especialidades: ['20'], centrosSalud: ['3']},
    {id: '51', nombre: 'Dra. Julia Velázquez', matricula: 'MN 118119', especialidades: ['1'], centrosSalud: ['4', '5']},
    {id: '52', nombre: 'Dr. Martín Serrano', matricula: 'MP 120121', especialidades: ['2'], centrosSalud: ['6']},
    {id: '53', nombre: 'Dra. Andrea Villalobos', matricula: 'MN 122123', especialidades: ['3'], centrosSalud: ['7', '8']},
    {id: '54', nombre: 'Dr. Adrián Torres', matricula: 'MP 124125', especialidades: ['4'], centrosSalud: ['9']},
    {id: '55', nombre: 'Dra. Pilar Delgado', matricula: 'MN 126127', especialidades: ['5', '21', '22'], centrosSalud: ['10', '11']},
    {id: '56', nombre: 'Dr. Germán Tapia', matricula: 'MP 128129', especialidades: ['6'], centrosSalud: ['12']},
    {id: '57', nombre: 'Dra. Mónica Barrios', matricula: 'MN 130131', especialidades: ['7'], centrosSalud: ['13', '14']},
    {id: '58', nombre: 'Dr. Luis Aragón', matricula: 'MP 132133', especialidades: ['8'], centrosSalud: ['1']},
    {id: '59', nombre: 'Dra. Clara Espinoza', matricula: 'MN 134135', especialidades: ['9'], centrosSalud: ['2', '3']},
    {id: '60', nombre: 'Dr. Miguel Montoya', matricula: 'MP 136137', especialidades: ['10'], centrosSalud: ['4']}
]

const ENTRADA_DESCRIPCION = 'Diagnóstico y tratamiento de las enfermedades '
const especialidades: Especialidad[] = [
    {id:  '1', nombre: 'Cardiología', descripcion: `${ENTRADA_DESCRIPCION}del corazón y del aparato circulatorio.`},
    {id:  '2', nombre: 'Cirugía General', descripcion: `${ENTRADA_DESCRIPCION}que requieren procedimientos quirúrgicos.`},
    {id:  '3', nombre: 'Dermatología', descripcion: `${ENTRADA_DESCRIPCION}de la piel.`},
    {id:  '4', nombre: 'Endocrinología', descripcion: `${ENTRADA_DESCRIPCION}de las glándulas endocrinas.`},   
    {id:  '5', nombre: 'Gastroenterología', descripcion: `${ENTRADA_DESCRIPCION}del aparato digestivo.`},
    {id:  '6', nombre: 'Geriatría', descripcion: `${ENTRADA_DESCRIPCION}de las personas mayores.`},
    {id:  '7', nombre: 'Hematología', descripcion: `${ENTRADA_DESCRIPCION}de la sangre.`},
    {id:  '8', nombre: 'Infectología', descripcion: `${ENTRADA_DESCRIPCION}infecciosas.`},
    {id:  '9', nombre: 'Medicina General', descripcion: `${ENTRADA_DESCRIPCION}comunes.`},
    {id: '10', nombre: 'Nefrología', descripcion: `${ENTRADA_DESCRIPCION}de los riñones.`},
    {id: '11', nombre: 'Neurología', descripcion: `${ENTRADA_DESCRIPCION}del sistema nervioso.`},
    {id: '12', nombre: 'Neumonología', descripcion: `${ENTRADA_DESCRIPCION}del aparato respiratorio.`},
    {id: '22', nombre: 'Obstetricia', descripcion: 'Tratamiento del embarazo, el parto y cuidados después del nacimiento.'},
    {id: '13', nombre: 'Oftalmología', descripcion: `${ENTRADA_DESCRIPCION}de los ojos.`},
    {id: '14', nombre: 'Oncología', descripcion: `${ENTRADA_DESCRIPCION}del cáncer.`},
    {id: '15', nombre: 'Otorrinolaringología', descripcion: `${ENTRADA_DESCRIPCION}del oído, nariz y garganta.`},
    {id: '16', nombre: 'Pediatría', descripcion: `${ENTRADA_DESCRIPCION}de los niños.`},
    {id: '17', nombre: 'Psiquiatría', descripcion: `${ENTRADA_DESCRIPCION}mentales.`},
    {id: '18', nombre: 'Reumatología', descripcion: `${ENTRADA_DESCRIPCION}de las articulaciones.`},
    {id: '19', nombre: 'Traumatología', descripcion: `${ENTRADA_DESCRIPCION}de los huesos.`},
    {id: '20', nombre: 'Urología', descripcion: `${ENTRADA_DESCRIPCION}del aparato urinario.`},
    {id: '21', nombre: 'Ginecología', descripcion: `${ENTRADA_DESCRIPCION}del sistema reproductor femenino.`}
]

// Nueva colección para bloques de turnos
const bloquesTurnos: BloqueTurnos[] = [
    {
      id: "BT001",
      idProfesional: "1", // Dra. Ana López
      idCentroSalud: "1", // General de Agudos
      idEspecialidad: "1", // Cardiología
      tipoRecurrencia: "semanal",
      diasSemana: ["lunes", "miércoles"],
      fechaInicio: "2025-04-01",
      fechaFin: null,
      horaInicio: "09:00",
      horaFin: "12:00",
      duracionTurno: 20,
      maximoTurnos: 15,
      intervaloEntreConsultas: 5,
      notas: null,
      activo: true
    },
    {
      id: "BT002",
      idProfesional: "2", // Dr. Juan Pérez
      idCentroSalud: "1", // Otro centro
      idEspecialidad: "1", // Cardiología
      tipoRecurrencia: "mensual",
      semanaDelMes: [1],
      diasSemana: ["viernes"],
      fechaInicio: "2025-04-01",
      fechaFin: null,
      horaInicio: "14:00",
      horaFin: "18:00",
      duracionTurno: 30,
      maximoTurnos: 8,
      intervaloEntreConsultas: 5,
      notas: "Primeros viernes de cada mes",
      activo: true
    },
    {
      id: "BT003",
      idProfesional: "2", // Dr. Juan Pérez
      idCentroSalud: "2", // Otro centro
      idEspecialidad: "1", // Cardiología
      tipoRecurrencia: "mensual",
      semanaDelMes: [1],
      diasSemana: ["lunes", "viernes"],
      fechaInicio: "2025-04-01",
      fechaFin: null,
      horaInicio: "14:00",
      horaFin: "18:00",
      duracionTurno: 30,
      maximoTurnos: 8,
      intervaloEntreConsultas: 5,
      notas: "Primeros viernes de cada mes",
      activo: true
    },
    {
      id: "BT004",
      idProfesional: "2", // Dr. Juan Pérez
      idCentroSalud: "5", // Otro centro
      idEspecialidad: "1", // Cardiología
      tipoRecurrencia: "mensual",
      semanaDelMes: [1],
      diasSemana: ["lunes", "miércoles", "viernes"],
      fechaInicio: "2025-04-01",
      fechaFin: null,
      horaInicio: "14:00",
      horaFin: "18:00",
      duracionTurno: 30,
      maximoTurnos: 8,
      intervaloEntreConsultas: 5,
      notas: "Primeros viernes de cada mes",
      activo: true
    },
    // Más  de turnos...
  ]
  
  // En el futuro, cuando implementes la reserva de turnos:
//   const turnos: Turno[] = [
//     // Esta colección se poblaría cuando habilites la reserva de turnos
//   ]

const categorias: Categorias[] = [
    {
        url: '/centro-salud',
        urlIcono: '/CentrosSalud.svg',
        titulo: 'Centros de salud',
        descripcion: 'En La Costa tenés centros de atención médica en todos lados. Encontrá el que te quede más cerca y accedé al tratamiento que necesitás.'
    },
    {
        url: '/especialidades',
        urlIcono: '/Especialidades.svg',
        titulo: 'Especialidades',
        descripcion: 'La Costa ofrece una amplia variedad de especialidades médicas. Encontrá tu especialista en el centro de salud que más te convenga.'
    },
    {
        url: '/profesionales',
        urlIcono: '/Profesionales.svg',
        titulo: 'Profesionales',
        descripcion: 'Conocé a quienes cuidan tu salud en la red de atención sanitaria de La Costa. Encontrá el apoyo profesional que necesitás para tu consulta.'
    }
]


const api = {
    // Obtener todas las zonas sanitarias
    listaZonasSanitarias: async (): Promise<ZonasSanitarias> => {
        return zonasSanitarias // Devuelve el objeto ZonasSanitarias
    },

    listaCentros: async (): Promise<CentroSalud[]> => {
        return zonasSanitarias.zonas.flatMap(zona => zona.centrosSalud) // Devuelve todos los centros de salud
    },    

    // Obtener un centro médico específico por su ID
    traeCentroPorId: async (id: string): Promise<CentroSalud> => {
        // Usar flatMap para aplanar los centros médicos de todas las zonas
        const centrosSalud = zonasSanitarias.zonas.flatMap(zona => zona.centrosSalud)
        // Buscar el centro médico por ID
        const centro = centrosSalud.find(centro => centro.id === id)
        if (!centro) {
            throw new Error(`No se encontró el centro con id ${id}`)
        }
        return centro // Devuelve el centro médico encontrado
    },

    // Obtener centro médico por su URL
    traeCentroPorUrl: async (url: string): Promise<CentroSalud> => {
        const centrosMedicos = zonasSanitarias.zonas.flatMap(zona => zona.centrosSalud)
        const centro = centrosMedicos.find(centro => crearSlug(centro.nombre) === url)
        if (!centro) {
            throw new Error(`No se encontró el centro con URL ${url}`)
        }
        return centro   // Devuelve un centro médico dado el slug
    },

    // Obtener todos los médicos
    listaProfesionales: async (): Promise<Profesional[]> => {
        return Profesionales
    },
    // Profesionales en orden alfabético
    listaProfesionalesABC: async (): Promise<Profesional[]> => {
        Profesionales.sort((a,b)=>
        a.nombre.split(" ")[2].localeCompare(b.nombre.split(" ")[2])
    )
        return Profesionales
    },

    // Obtener un médico específico por su ID
    traeProfesional: async (id: Profesional['id']): Promise<Profesional> => {
        const medico = Profesionales.find(medico => medico.id === id)
        if (!medico) {
            throw new Error(`No se encontró el médico con id ${id}`)
        }
        return medico
    },

    // Obtener todas las especialidades
    listaEspecialidades: async (): Promise<Especialidad[]> => {
        return especialidades
    },

    // Obtener una especialidad específica por su ID
    traeEspecialidad: async (id: Especialidad['id']): Promise<Especialidad> => {
        const especialidad = especialidades.find(especialidad => especialidad.id === id)
        if (!especialidad) {
            throw new Error(`No se encontró la especialidad con id ${id}`)
       }
        return especialidad
    },

    traeEspecialidadesPorCentro: async (id: string): Promise<string[]> => {
        try {
            // 1. Validar que el centro de salud exista (opcional, pero buena práctica)
            await api.traeCentroPorId(id) // Si no existe, `traeCentroPorId` lanzará un error capturable

            // 2. Encontrar profesionales que trabajan en este centro de salud
            const profesionalesEnCentro = Profesionales.filter(profesional => profesional.centrosSalud.includes(id))

            // 3. Obtener IDs de especialidades de estos profesionales
            const especialidadesIdsDeProfesionales = profesionalesEnCentro.flatMap(profesional => profesional.especialidades)

            // 4. Obtener objetos de especialidades completos usando los IDs
            const especialidadesDelCentro = especialidades.filter(especialidad => especialidadesIdsDeProfesionales.includes(especialidad.id))

            // 5. Extraer solo los nombres de las especialidades y eliminar duplicados
            const nombresEspecialidades = [...new Set(especialidadesDelCentro.map(especialidad => especialidad.nombre))]

            return nombresEspecialidades

        } catch (error) {
            console.error("Error al obtener especialidades del centro:", error)
            throw new Error(`Error al obtener especialidades del centro con id ${id}: ${error}`) // Relanzamos el error para que el componente/función que llame a esta función pueda manejarlo
        }
    },

    // Obtener los nombres de todas las especialidades de cada profesional
    traeEspecialidadesPorProfesional: async (id: string): Promise<string[]> => {
        const profesional = await api.traeProfesional(id)
        return profesional.especialidades
    },

    // Obtener todas las categorías
    listaCategorias: async (): Promise<Categorias[]> => {
        return categorias
    },

    // Obtener una categoría específica por su URL
    traeCategoria: async (url: Categorias['url']): Promise<Categorias> => {
        const categoria = categorias.find(categoria => categoria.url === url)
        if (!categoria) {
            throw new Error(`No se encontró la categoría con URL ${url}`)
        }
        return categoria
    },

    // Nuevas funciones para los bloques de turnos    
    // Obtener todos los bloques de turnos
    listaBloquesTurnos: async (): Promise<BloqueTurnos[]> => {
        return bloquesTurnos
    },
    
    // Obtener bloques de turnos por profesional
    traeBloquesTurnosPorProfesional: async (idProfesional: string): Promise<BloqueTurnos[]> => {
        return bloquesTurnos.filter(bloque => bloque.idProfesional === idProfesional)
    },
    
    // Obtener bloques de turnos por centro de salud
    traeBloquesTurnosPorCentro: async (idCentroSalud: string): Promise<BloqueTurnos[]> => {
        return bloquesTurnos.filter(bloque => bloque.idCentroSalud === idCentroSalud)
    },
    
    // Obtener bloques de turnos por especialidad
    traeBloquesTurnosPorEspecialidad: async (idEspecialidad: string): Promise<BloqueTurnos[]> => {
        return bloquesTurnos.filter(bloque => bloque.idEspecialidad === idEspecialidad)
    },
    
    // Obtener profesionales disponibles en una fecha específica
    // traeProfesionalesDisponiblesEnFecha: async (fecha: string): Promise<Profesional[]> => {
    //     // Implementar la lógica de verificación de disponibilidad
    //     const fechaObj = new Date(fecha)
    //     const profesionalesDisponibles: Profesional[] = []
    //     const profesionalesIds = new Set<string>()
        
    //     for (const bloque of bloquesTurnos) {
    //         if (!bloque.activo) continue
            
    //         // Verificar disponibilidad del bloque en la fecha
    //         const disponible = verificarDisponibilidadBloque(bloque, fechaObj)
            
    //         if (disponible && !profesionalesIds.has(bloque.idProfesional)) {
    //             profesionalesIds.add(bloque.idProfesional)
    //             const profesional = await api.traeProfesional(bloque.idProfesional)
    //             profesionalesDisponibles.push(profesional)
    //         }
    //     }

    //     return profesionalesDisponibles
    // },
        
    // Función auxiliar para verificar disponibilidad
    // verificarDisponibilidadProfesional: async (idProfesional: string, fecha: string): Promise<{
    //     disponible: boolean
    //     horarios: {
    //         inicio: string
    //         fin: string
    //         centro: string
    //         especialidad: string
    //     }[]
    // }> => {
    //     // Implementar la lógica de verificación similar a la del componente React
    //     // Aquí se debe implementar la lógica y devolver el resultado
    //     return {disponible: false, horarios: []}
    // }
}
      
export default api
