interface CentroSalud {
    id:             string
    urlIcon:        string
    nombre:         string
    tipo:           'hospital' | 'caps' | 'unidad sanitaria'
    direccion:      string
    ciudad:         string
    telefonos:      string[]
}

interface ZonaSanitaria {
    id?:            string
    nombreZona:     string
    centrosSalud: CentroSalud[]
}

interface ZonasSanitarias {
    zonas:          ZonaSanitaria[]
}

export interface Profesional {
    id:             string
    nombre:         string
    especialidades: string[]
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

const zonasSanitarias: ZonasSanitarias = {
    zonas: [
        {
        "nombreZona": "Zona norte",
        "centrosSalud": [
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
            "ciudad": "San Clemente",
            "direccion": "Calle 10 y Avenida I",
            "telefonos": ["02252422525"]
            },
            {
            "id": "3",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio San Martín",
            "tipo": "caps",
            "ciudad": "San Clemente",
            "direccion": "Calle 10 e/ 37 y 38",
            "telefonos": ["022521558"]
            },
            {
            "id": "4",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "El Tala",
            "tipo": "caps",
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
            "nombre": "Hospital Santa Teresita",
            "tipo": "hospital",
            "ciudad": "Santa Teresita",
            "direccion": "Avenida 41 y calle 16",
            "telefonos": ["02246420381", "02246420119", "02246420368", "02246534000", "02246534001"]
            },
            {
            "id": "6",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio Parque Golf",
            "tipo": "caps",
            "ciudad": "Santa Teresita",
            "direccion": "Calle 124 y calle 103",
            "telefonos": ["02246422815"]
            },
            {
            "id": "7",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Barrio Las Quintas",
            "tipo": "caps",
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
        "centrosSalud": [
            {
            "id": "13",
            "urlIcon": "/CentroMedico.svg",
            "nombre": "Costa Esmeralda",
            "tipo": "caps",
            "ciudad": "Costa Esmeralda",
            "direccion": "Costa Esmeralda Road",
            "telefonos": ["02254421132", "02254422303"]
            }
        ]
        }
    ]
}


const Profesionales: Profesional[] = [
  { id: '1', nombre: 'Dra. Ana López', especialidades: ['1'], centrosSalud: ['1'] },
  { id: '2', nombre: 'Dr. Juan Pérez', especialidades: ['1', '2'], centrosSalud: ['2', '3'] },
  { id: '3', nombre: 'Dra. María Gómez', especialidades: ['3'], centrosSalud: ['4'] },
  { id: '4', nombre: 'Dr. Carlos Fernández', especialidades: ['1'], centrosSalud: ['5', '6'] },
  { id: '5', nombre: 'Dra. Laura Martínez', especialidades: ['2'], centrosSalud: ['7'] },
  { id: '6', nombre: 'Dr. Jorge Ramírez', especialidades: ['3'], centrosSalud: ['8', '9'] },
  { id: '7', nombre: 'Dra. Elena Sánchez', especialidades: ['1', '2'], centrosSalud: ['10'] },
  { id: '8', nombre: 'Dr. Pedro Gutiérrez', especialidades: ['4'], centrosSalud: ['11', '12'] },
  { id: '9', nombre: 'Dra. Claudia Castro', especialidades: ['5', '21', '22'], centrosSalud: ['13'] },
  { id: '10', nombre: 'Dr. Ricardo Morales', especialidades: ['2', '6'], centrosSalud: ['14'] },
  { id: '11', nombre: 'Dra. Teresa Vega', especialidades: ['3'], centrosSalud: ['1', '2'] },
  { id: '12', nombre: 'Dr. Andrés Herrera', especialidades: ['7'], centrosSalud: ['3'] },
  { id: '13', nombre: 'Dra. Silvia Ortiz', especialidades: ['8'], centrosSalud: ['4', '5'] },
  { id: '14', nombre: 'Dr. Fernando García', especialidades: ['9'], centrosSalud: ['6'] },
  { id: '15', nombre: 'Dra. Lorena Ruiz', especialidades: ['10'], centrosSalud: ['7', '8'] },
  { id: '16', nombre: 'Dr. Pablo Navarro', especialidades: ['4', '11'], centrosSalud: ['9'] },
  { id: '17', nombre: 'Dra. Diana Márquez', especialidades: ['12'], centrosSalud: ['10', '11'] },
  { id: '18', nombre: 'Dr. Víctor Ramos', especialidades: ['13'], centrosSalud: ['12'] },
  { id: '19', nombre: 'Dra. Gabriela Peña', especialidades: ['5', '14'], centrosSalud: ['13', '14'] },
  { id: '20', nombre: 'Dr. Manuel Díaz', especialidades: ['15'], centrosSalud: ['1'] },
  { id: '21', nombre: 'Dra. Isabel Torres', especialidades: ['6'], centrosSalud: ['2', '3'] },
  { id: '22', nombre: 'Dr. Javier Mendoza', especialidades: ['16'], centrosSalud: ['4'] },
  { id: '23', nombre: 'Dra. Cristina Flores', especialidades: ['7'], centrosSalud: ['5', '6'] },
  { id: '24', nombre: 'Dr. Eduardo Álvarez', especialidades: ['17'], centrosSalud: ['7'] },
  { id: '25', nombre: 'Dra. Beatriz Rojas', especialidades: ['8'], centrosSalud: ['8', '9'] },
  { id: '26', nombre: 'Dr. Antonio Soto', especialidades: ['18'], centrosSalud: ['10'] },
  { id: '27', nombre: 'Dra. Patricia León', especialidades: ['9', '21', '22'], centrosSalud: ['11', '12'] },
  { id: '28', nombre: 'Dr. Ernesto Vargas', especialidades: ['19'], centrosSalud: ['13'] },
  { id: '29', nombre: 'Dra. Susana Domínguez', especialidades: ['10'], centrosSalud: ['14'] },
  { id: '30', nombre: 'Dr. Jaime Cano', especialidades: ['20'], centrosSalud: ['1', '2'] },
  { id: '31', nombre: 'Dra. Carolina Aguilar', especialidades: ['1'], centrosSalud: ['3'] },
  { id: '32', nombre: 'Dr. Rafael Paredes', especialidades: ['2'], centrosSalud: ['5'] },
  { id: '33', nombre: 'Dra. Sofía Lozano', especialidades: ['3'], centrosSalud: ['6'] },
  { id: '34', nombre: 'Dr. Sergio Méndez', especialidades: ['4'], centrosSalud: ['7', '8'] },
  { id: '35', nombre: 'Dra. Inés Campos', especialidades: ['5', '21', '22'], centrosSalud: ['9'] },
  { id: '36', nombre: 'Dr. Óscar Gil', especialidades: ['6'], centrosSalud: ['10', '11'] },
  { id: '37', nombre: 'Dra. Alicia Guzmán', especialidades: ['7'], centrosSalud: ['12'] },
  { id: '38', nombre: 'Dr. Luis Romero', especialidades: ['8'], centrosSalud: ['13', '14'] },
  { id: '39', nombre: 'Dra. Marisa Cortés', especialidades: ['9'], centrosSalud: ['1'] },
  { id: '40', nombre: 'Dr. Ángel Herrera', especialidades: ['10'], centrosSalud: ['2', '3'] },
  { id: '41', nombre: 'Dra. Irene Salinas', especialidades: ['11'], centrosSalud: ['4'] },
  { id: '42', nombre: 'Dr. César Nieto', especialidades: ['12'], centrosSalud: ['5', '6'] },
  { id: '43', nombre: 'Dra. Natalia Estévez', especialidades: ['13'], centrosSalud: ['7'] },
  { id: '44', nombre: 'Dr. Álvaro Peña', especialidades: ['14'], centrosSalud: ['8', '9'] },
  { id: '45', nombre: 'Dra. Carmen Beltrán', especialidades: ['15', '22'], centrosSalud: ['10'] },
  { id: '46', nombre: 'Dr. Daniel Fuentes', especialidades: ['16'], centrosSalud: ['11', '12'] },
  { id: '47', nombre: 'Dra. Verónica Maldonado', especialidades: ['17'], centrosSalud: ['13'] },
  { id: '48', nombre: 'Dr. Hugo Ponce', especialidades: ['18'], centrosSalud: ['14'] },
  { id: '49', nombre: 'Dra. Paola Cruz', especialidades: ['19'], centrosSalud: ['1', '2'] },
  { id: '50', nombre: 'Dr. Francisco Ortega', especialidades: ['20'], centrosSalud: ['3'] },
  { id: '51', nombre: 'Dra. Julia Velázquez', especialidades: ['1'], centrosSalud: ['4', '5'] },
  { id: '52', nombre: 'Dr. Martín Serrano', especialidades: ['2'], centrosSalud: ['6'] },
  { id: '53', nombre: 'Dra. Andrea Villalobos', especialidades: ['3'], centrosSalud: ['7', '8'] },
  { id: '54', nombre: 'Dr. Adrián Torres', especialidades: ['4'], centrosSalud: ['9'] },
  { id: '55', nombre: 'Dra. Pilar Delgado', especialidades: ['5', '21'], centrosSalud: ['10', '11'] },
  { id: '56', nombre: 'Dr. Germán Tapia', especialidades: ['6'], centrosSalud: ['12'] },
  { id: '57', nombre: 'Dra. Mónica Barrios', especialidades: ['7'], centrosSalud: ['13', '14'] },
  { id: '58', nombre: 'Dr. Luis Aragón', especialidades: ['8'], centrosSalud: ['1'] },
  { id: '59', nombre: 'Dra. Clara Espinoza', especialidades: ['9'], centrosSalud: ['2', '3'] },
  { id: '60', nombre: 'Dr. Miguel Montoya', especialidades: ['10'], centrosSalud: ['4'] }
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

const categorias: Categorias[] = [
    {
        url: '/centro-salud',
        urlIcono: '/CentrosSalud.svg',
        titulo: 'Centros de salud',
        descripcion: 'En La Costa tenés a disposición una amplia red de Salud. Encontrá el centro de atención más cercano y accedé al tratamiento que necesitás.'
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

    // Obtener un centro médico específico por su ID
    traeCentro: async (id: string): Promise<CentroSalud> => {
        // Usar flatMap para aplanar los centros médicos de todas las zonas
        const centrosMedicos = zonasSanitarias.zonas.flatMap(zona => zona.centrosSalud)
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
    },

    // Obtener todas las categorías
    listaCategorias: async (): Promise<Categorias[]> => {
        return categorias
    },

    // Obtener una categoría específica por su URL
    traeCategoria: async (url: Categorias['url']): Promise<Categorias> => {
        const categoria = categorias.find((categoria) => categoria.url === url)
        if (!categoria) {
            throw new Error(`No se encontró la categoría con URL ${url}`)
       }
        return categoria
    }
}

export default api
