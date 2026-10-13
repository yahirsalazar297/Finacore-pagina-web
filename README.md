# FINCORE — Sitio Web Corporativo

Sitio web institucional y corporativo de **FINCORE — Accounting & Finance Academy**.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Producción

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── data/               # Contenidos institucionales (editar aquí)
│   ├── brand.ts        # Nombre, logo, eslogan, URL de la academia
│   ├── company.ts      # Historia, misión, visión, valores, pilares
│   ├── academicAreas.ts # Las 12 áreas académicas y sus categorías
│   ├── tools.ts        # Herramientas profesionales (laboratorio, calculadoras, inversión)
│   ├── navigation.ts   # Menú de navegación
│   └── plans.ts        # Planes de suscripción (pendientes de confirmar)
├── components/
│   ├── layout/         # Header, Footer, Layout
│   ├── ui/             # Button, Badge, SectionHeader
│   └── sections/       # Hero, Pillars, AcademicAreasPreview, ToolsPreview, AISection, HomeCTA
└── pages/              # Home, About, Academy, Tools, AIPage, Impact, Plans, Contact, NotFound
```

## Cómo actualizar contenido

### Cambiar texto corporativo (misión, visión, valores)
Edita `src/data/company.ts`.

### Cambiar el eslogan o URL de la academia
Edita `src/data/brand.ts`.

### Agregar o modificar áreas académicas
Edita `src/data/academicAreas.ts`.

### Actualizar herramientas
Edita `src/data/tools.ts`.

### Agregar precios o planes
Edita `src/data/plans.ts` — cambia `pending: true` a `false` y añade `price` y `features`.

### Cambiar el menú de navegación
Edita `src/data/navigation.ts`.

## Logotipo

El logotipo original de FINCORE se encuentra en `public/logo-fincore.png`.  
**No modificar este archivo bajo ninguna circunstancia.**  
El archivo `logo-fincore.png` en la raíz del proyecto es la copia de respaldo original.

## Páginas

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/nosotros` | Nosotros |
| `/academia` | Academia |
| `/herramientas` | Herramientas |
| `/inteligencia-artificial` | Inteligencia Artificial |
| `/impacto` | Impacto Social |
| `/planes` | Planes |
| `/contacto` | Contacto |

## Plataforma educativa existente

El sitio corporativo enlaza a la plataforma educativa en:  
`https://alejandrocavazos.github.io/Fincore/#/courses`

Este sitio corporativo es **independiente** de esa plataforma y no modifica ninguno de sus archivos.

## Tecnologías

- React 18
- TypeScript
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Lucide React

## Funcionalidades pendientes de confirmación

- Precios y condiciones de los planes Free, Student y Pro
- Datos de contacto corporativo (correo, redes sociales)
- Dominio o subdominio definitivo para el sitio corporativo
- Integración del formulario de contacto con backend o servicio de correo
- Verificación de calculadoras financieras disponibles en la plataforma

## Recomendaciones para el lanzamiento

1. Confirmar y actualizar los datos de contacto en `/contacto`
2. Definir precios en `src/data/plans.ts`
3. Integrar el formulario de contacto con un servicio de correo (Resend, SendGrid, etc.)
4. Configurar dominio propio (ej. `fincore.mx` o `corporate.fincore.mx`)
5. Agregar Google Analytics u otra herramienta de analítica
6. Revisar y ajustar los meta tags de Open Graph con la URL final
7. Actualizar `sitemap.xml` con la URL base definitiva
