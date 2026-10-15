/**
 * Dominios institucionales permitidos para el precio de estudiante de FINCORE.
 *
 * Para agregar un nuevo dominio, añade la entrada al arreglo y haz deploy.
 * En producción este archivo debería cargarse desde la base de datos para
 * que se pueda editar sin un nuevo deploy.
 */
export const ALLOWED_SCHOOL_DOMAINS: string[] = [
  // Universidades públicas federales
  'unam.mx',
  'ipn.mx',
  'uam.mx',

  // Institutos Tecnológicos (TecNM)
  'itesm.mx',        // Tec de Monterrey
  'tecnm.mx',        // TecNM general
  'itcelaya.edu.mx',
  'itlp.edu.mx',
  'itlalaguna.edu.mx',
  'itmexicali.edu.mx',

  // Universidades públicas estatales
  'uanl.mx',
  'udg.mx',
  'buap.mx',
  'uabc.mx',
  'uas.edu.mx',
  'uaem.mx',
  'uaemex.mx',
  'ujed.mx',
  'uaeh.edu.mx',
  'uaq.mx',
  'ugto.mx',
  'umsnh.edu.mx',
  'uqroo.mx',
  'utsjr.edu.mx',

  // Universidades privadas reconocidas
  'up.edu.mx',
  'ibero.mx',
  'anahuac.mx',
  'uia.mx',
  'ulsa.mx',
  'udla.mx',
  'udi.edu.mx',
  'univa.mx',

  // ENBA, UACM y otros
  'uacm.edu.mx',
  'enba.sep.gob.mx',

  // Escuelas de contaduría y finanzas
  'imcp.org.mx',
  'anfeca.org.mx',
]

/**
 * Verifica si un dominio de correo está en la lista de dominios permitidos.
 * La comparación es case-insensitive.
 */
export function isAllowedSchoolDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false
  return ALLOWED_SCHOOL_DOMAINS.some(d => d.toLowerCase() === domain)
}
