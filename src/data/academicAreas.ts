export type AcademicCategory = {
  name: string
  color: string
  areas: AcademicArea[]
}

export type AcademicArea = {
  id: number
  name: string
  description: string
  category: string
}

export const academicCategories: AcademicCategory[] = [
  {
    name: 'Contaduría y Fiscalidad',
    color: 'blue',
    areas: [
      {
        id: 1,
        name: 'Contabilidad Financiera',
        description:
          'Fundamentos y aplicaciones de la contabilidad: registro de operaciones, estados financieros, normas de información y análisis de resultados.',
        category: 'Contaduría y Fiscalidad',
      },
      {
        id: 2,
        name: 'Costos y Contabilidad Administrativa',
        description:
          'Sistemas de costos, presupuestos, análisis de rentabilidad y herramientas para la toma de decisiones gerenciales.',
        category: 'Contaduría y Fiscalidad',
      },
      {
        id: 3,
        name: 'Fiscalidad y Tributación',
        description:
          'Marco tributario mexicano, obligaciones fiscales, cumplimiento de impuestos y estrategias de planeación fiscal responsable.',
        category: 'Contaduría y Fiscalidad',
      },
      {
        id: 4,
        name: 'Auditoría, Control Interno y Riesgos',
        description:
          'Principios de auditoría, diseño de controles internos, identificación y gestión de riesgos organizacionales.',
        category: 'Contaduría y Fiscalidad',
      },
    ],
  },
  {
    name: 'Finanzas e Inversiones',
    color: 'green',
    areas: [
      {
        id: 5,
        name: 'Finanzas Corporativas',
        description:
          'Valuación de empresas, estructura de capital, decisiones de inversión, financiamiento y gestión del valor para los accionistas.',
        category: 'Finanzas e Inversiones',
      },
      {
        id: 6,
        name: 'Finanzas Personales y Educación Financiera',
        description:
          'Presupuesto personal, ahorro, crédito, seguros, planificación patrimonial y fundamentos de la inteligencia financiera cotidiana.',
        category: 'Finanzas e Inversiones',
      },
      {
        id: 7,
        name: 'Inversiones y Mercados Financieros',
        description:
          'Instrumentos de inversión, mercado de valores, análisis fundamental y técnico, portafolios y criterios para la toma de decisiones.',
        category: 'Finanzas e Inversiones',
      },
      {
        id: 8,
        name: 'Finanzas Cuantitativas y Gestión de Riesgos',
        description:
          'Modelado matemático y estadístico aplicado a las finanzas, derivados, medición de riesgos y estrategias de cobertura.',
        category: 'Finanzas e Inversiones',
      },
    ],
  },
  {
    name: 'Economía y Negocios',
    color: 'blue',
    areas: [
      {
        id: 9,
        name: 'Economía y Entorno Empresarial',
        description:
          'Principios macroeconómicos y microeconómicos, análisis del entorno de negocios y su impacto en las decisiones financieras.',
        category: 'Economía y Negocios',
      },
      {
        id: 10,
        name: 'Derecho Empresarial y Regulación',
        description:
          'Marco legal de las empresas en México, contratos, regulación financiera y cumplimiento normativo en el entorno de negocios.',
        category: 'Economía y Negocios',
      },
      {
        id: 11,
        name: 'Emprendimiento, Administración y Estrategia',
        description:
          'Creación y gestión de empresas, planeación estratégica, modelos de negocio, liderazgo y administración de recursos.',
        category: 'Economía y Negocios',
      },
    ],
  },
  {
    name: 'Tecnología y Análisis de Datos',
    color: 'green',
    areas: [
      {
        id: 12,
        name: 'Análisis de Datos, Tecnología e IA',
        description:
          'Herramientas digitales, programación aplicada a finanzas, análisis de datos e inteligencia artificial al servicio del sector financiero.',
        category: 'Tecnología y Análisis de Datos',
      },
    ],
  },
]

export const allAreas: AcademicArea[] = academicCategories.flatMap((c) => c.areas)
