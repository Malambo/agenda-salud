interface CentroMedico {
    id: string
    urlIcon: string
    nombre: string
    tipo: 'hospital' | 'caps' | 'unidad sanitaria'
    direccion: string
    telefonos: string[]
    ciudad?: string
}

interface ZonaSanitaria {
    nombreZona: string
    centrosMedicos: CentroMedico[]
}

interface ZonasSanitarias {
    zonas: ZonaSanitaria[]
}

export interface Profesional {
    id: string
    nombre: string
    especialidades: string[]
    [key: string]: string | string[]
}

export interface Especialidad {
    id: string
    nombre: string
    [key: string]: string
}

const zonasSanitarias: ZonasSanitarias = {
    zonas: [
        {
        "nombreZona": "Zona norte",
        "centrosMedicos": [
            {
            "id": "1",
            "urlIcon": "/Hospital.svg",
            "nombre": "Hospital San Clemente",
            "tipo": "hospital",
            "direccion": "Avenida San Martín 505",
            "ciudad": "San Clemente",
            "telefonos": ["02252421132", "02252422303"]
            },
            {
            "id": "2",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Juan XXIII",
            "tipo": "caps",
            "direccion": "Calle 10 y Avenida I",
            "telefonos": ["02252422525"]
            },
            {
            "id": "3",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio San Martín",
            "tipo": "caps",
            "direccion": "Calle 10 e/ 37 y 38",
            "telefonos": ["022521558"]
            },
            {
            "id": "4",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "El Tala",
            "tipo": "caps",
            "direccion": "Avenida Talas del Tuyú y Avenida XV",
            "telefonos": ["0224615506248"]
            } 
        ]
        },
        
        {
        "nombreZona": "Zona centro",
        "centrosMedicos": [
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
            "nombre": "Hospital Santa Teresita",
            "tipo": "hospital",
            "direccion": "Avenida 41 y calle 16",
            "telefonos": ["02246420381", "02246420119", "02246420368", "02246534000", "02246534001"]
            },
            {
            "id": "6",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio Parque Golf",
            "tipo": "caps",
            "direccion": "Calle 124 y calle 103",
            "telefonos": ["02246422815"]
            },
            {
            "id": "7",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio Las Quintas",
            "tipo": "caps",
            "direccion": "Calle 16 e/ 41 y 42",
            "telefonos": ["02246421989"]
            }
        ]
        },
    
        {
        "nombreZona": "Zona sur",
        "centrosMedicos": [
            {
            "id": "8",
            "urlIcon": "/Hospital.svg",
            "nombre": "Hospital Mar de Ajó",
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
            "tipo": "caps",
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
            "direccion": "Avenida Talas del Tuyú y Avenida XV",
            "telefonos": ["0224615506248"]
            },
            {
            "id": "12",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "San Bernardo",
            "tipo": "caps",
            "ciudad": "San Bernardo",
            "direccion": "Falkner y Jujuy",
            "telefonos": ["0224615506248"]
            }
        ]
        },
        
        {
        "nombreZona": "Zona altos médanos",
        "centrosMedicos": [
            {
            "id": "13",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Costa Esmeralda",
            "tipo": "caps",
            "direccion": "Costa Esmeralda Road",
            "telefonos": ["02254421132", "02254422303"]
            }
        ]
        }
    ]
}


const Profesionales: Profesional[] = [
    {id: '1', nombre: 'Dra. Ana López', especialidades: ['1']},
    {id: '2', nombre: 'Dr. Juan Pérez', especialidades: ['1', '2']},
    {id: '3', nombre: 'Dra. María Gómez', especialidades: ['3']},
    {id: '4', nombre: 'Dr. Carlos Fernández', especialidades: ['1']},
    {id: '5', nombre: 'Dra. Laura Martínez', especialidades: ['2']},
    {id: '6', nombre: 'Dr. Jorge Ramírez', especialidades: ['3']},
    {id: '7', nombre: 'Dra. Elena Sánchez', especialidades: ['1', '2']},
    {id: '8', nombre: 'Dr. Pedro Gutiérrez', especialidades: ['4']},
    {id: '9', nombre: 'Dra. Claudia Castro', especialidades: ['5']},
    {id: '10', nombre: 'Dr. Ricardo Morales', especialidades: ['2', '6']},
    {id: '11', nombre: 'Dra. Teresa Vega', especialidades: ['3']},
    {id: '12', nombre: 'Dr. Andrés Herrera', especialidades: ['7']},
    {id: '13', nombre: 'Dra. Silvia Ortiz', especialidades: ['8']},
    {id: '14', nombre: 'Dr. Fernando García', especialidades: ['9']},
    {id: '15', nombre: 'Dra. Lorena Ruiz', especialidades: ['10']},
    {id: '16', nombre: 'Dr. Pablo Navarro', especialidades: ['4', '11']},
    {id: '17', nombre: 'Dra. Diana Márquez', especialidades: ['12']},
    {id: '18', nombre: 'Dr. Víctor Ramos', especialidades: ['13']},
    {id: '19', nombre: 'Dra. Gabriela Peña', especialidades: ['5', '14']},
    {id: '20', nombre: 'Dr. Manuel Díaz', especialidades: ['15']},
    {id: '21', nombre: 'Dra. Isabel Torres', especialidades: ['6']},
    {id: '22', nombre: 'Dr. Javier Mendoza', especialidades: ['16']},
    {id: '23', nombre: 'Dra. Cristina Flores', especialidades: ['7']},
    {id: '24', nombre: 'Dr. Eduardo Álvarez', especialidades: ['17']},
    {id: '25', nombre: 'Dra. Beatriz Rojas', especialidades: ['8']},
    {id: '26', nombre: 'Dr. Antonio Soto', especialidades: ['18']},
    {id: '27', nombre: 'Dra. Patricia León', especialidades: ['9']},
    {id: '28', nombre: 'Dr. Ernesto Vargas', especialidades: ['19']},
    {id: '29', nombre: 'Dra. Susana Domínguez', especialidades: ['10']},
    {id: '30', nombre: 'Dr. Jaime Cano', especialidades: ['20']},
    {id: '31', nombre: 'Dra. Carolina Aguilar', especialidades: ['1']},
    {id: '32', nombre: 'Dr. Rafael Paredes', especialidades: ['2']},
    {id: '33', nombre: 'Dra. Sofía Lozano', especialidades: ['3']},
    {id: '34', nombre: 'Dr. Sergio Méndez', especialidades: ['4']},
    {id: '35', nombre: 'Dra. Inés Campos', especialidades: ['5']},
    {id: '36', nombre: 'Dr. Óscar Gil', especialidades: ['6']},
    {id: '37', nombre: 'Dra. Alicia Guzmán', especialidades: ['7']},
    {id: '38', nombre: 'Dr. Luis Romero', especialidades: ['8']},
    {id: '39', nombre: 'Dra. Marisa Cortés', especialidades: ['9']},
    {id: '40', nombre: 'Dr. Ángel Herrera', especialidades: ['10']},
    {id: '41', nombre: 'Dra. Irene Salinas', especialidades: ['11']},
    {id: '42', nombre: 'Dr. César Nieto', especialidades: ['12']},
    {id: '43', nombre: 'Dra. Natalia Estévez', especialidades: ['13']},
    {id: '44', nombre: 'Dr. Álvaro Peña', especialidades: ['14']},
    {id: '45', nombre: 'Dra. Carmen Beltrán', especialidades: ['15']},
    {id: '46', nombre: 'Dr. Daniel Fuentes', especialidades: ['16']},
    {id: '47', nombre: 'Dra. Verónica Maldonado', especialidades: ['17']},
    {id: '48', nombre: 'Dr. Hugo Ponce', especialidades: ['18']},
    {id: '49', nombre: 'Dra. Paola Cruz', especialidades: ['19']},
    {id: '50', nombre: 'Dr. Francisco Ortega', especialidades: ['20']},
    {id: '51', nombre: 'Dra. Julia Velázquez', especialidades: ['1']},
    {id: '52', nombre: 'Dr. Martín Serrano', especialidades: ['2']},
    {id: '53', nombre: 'Dra. Andrea Villalobos', especialidades: ['3']},
    {id: '54', nombre: 'Dr. Adrián Torres', especialidades: ['4']},
    {id: '55', nombre: 'Dra. Pilar Delgado', especialidades: ['5']},
    {id: '56', nombre: 'Dr. Germán Tapia', especialidades: ['6']},
    {id: '57', nombre: 'Dra. Mónica Barrios', especialidades: ['7']},
    {id: '58', nombre: 'Dr. Luis Aragón', especialidades: ['8']},
    {id: '59', nombre: 'Dra. Clara Espinoza', especialidades: ['9']},
    {id: '60', nombre: 'Dr. Miguel Montoya', especialidades: ['10']}
]

const especialidades: Especialidad[] = [
    {id: '1', nombre: 'Cardiología'},
    {id: '2', nombre: 'Cirugía General'},
    {id: '3', nombre: 'Dermatología'},
    {id: '4', nombre: 'Endocrinología'},
    {id: '5', nombre: 'Gastroenterología'},
    {id: '6', nombre: 'Geriatría'},
    {id: '7', nombre: 'Hematología'},
    {id: '8', nombre: 'Infectología'},
    {id: '9', nombre: 'Medicina General'},
    {id: '10', nombre: 'Nefrología'},
    {id: '11', nombre: 'Neurología'},
    {id: '12', nombre: 'Neumología'},
    {id: '13', nombre: 'Oftalmología'},
    {id: '14', nombre: 'Oncología'},
    {id: '15', nombre: 'Otorrinolaringología'},
    {id: '16', nombre: 'Pediatría'},
    {id: '17', nombre: 'Psiquiatría'},
    {id: '18', nombre: 'Reumatología'},
    {id: '19', nombre: 'Traumatología'},
    {id: '20', nombre: 'Urología'}
]

const api = {
    // Obtener todas las zonas sanitarias
    listaZonasSanitarias: async (): Promise<ZonasSanitarias> => {
        return zonasSanitarias // Devuelve el objeto ZonasSanitarias
    },

    // Obtener un centro médico específico por su ID
    traeCentro: async (id: string): Promise<CentroMedico> => {
        // Usar flatMap para aplanar los centros médicos de todas las zonas
        const centrosMedicos = zonasSanitarias.zonas.flatMap(zona => zona.centrosMedicos)
        // Buscar el centro médico por ID
        const centro = centrosMedicos.find(centro => centro.id === id)
        if (!centro) {
            throw new Error(`No se encontró el centro con id ${id}`) // Lanzar error si no se encuentra
        }
        return centro // Devuelve el centro médico encontrado
    },

    // Obtener todos los médicos
    listaProfesionales: async (): Promise<Profesional[]> => {
        return Profesionales
    },

    // Obtener un médico específico por su ID
    traeProfesional: async (id: Profesional['id']): Promise<Profesional> => {
        const medico = Profesionales.find((medico) => medico.id === id)
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
        const especialidad = especialidades.find((especialidad) => especialidad.id === id)
        if (!especialidad) {
            throw new Error(`No se encontró la especialidad con id ${id}`)
       }
        return especialidad
    }
}

export default api
