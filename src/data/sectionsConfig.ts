// Datos de las secciones del portafolio
// Todo el scroll se arma con estos numeros y no ponerlos sueltos en otros archivos

// Numero de secciones
export const SECTION_COUNT = 5

// Ids de las secciones en orden de scroll
export const SECTION_IDS = ['home', 'projects', 'about', 'contact', 'play'] as const

export type SectionId = typeof SECTION_IDS[number]

// Pages del ScrollControls
// Tiene que ser igual al numero de secciones
// Si no queda scroll de sobra al final y la ultima seccion nunca se ve completa
export const SCROLL_PAGES = SECTION_COUNT

// Clase de alto que usan las 5 secciones
export const SECTION_HEIGHT_CLASS = 'h-screen'

// Offset donde cada seccion queda bien encuadrada
export const SECTION_OFFSETS: number[] = Array.from(
  { length: SECTION_COUNT },
  (_, i) => (SCROLL_PAGES > 1 ? i / (SCROLL_PAGES - 1) : 0)
)

// Ancho en offset que usa la animacion de cada seccion
// El offset va de 0 a 1 y hay 5 animaciones entonces cada una agarra una quinta parte
// Asi las 5 ramas son reales y ninguna se queda sin rango
export const SECTION_ANIM_SPAN = 1 / SECTION_COUNT

// Scroll en px donde la seccion index queda encuadrada
// El threshold es el scrollHeight menos el clientHeight del elemento de scroll
export function getSectionScrollTop(index: number, scrollThreshold: number): number {
  if (SCROLL_PAGES <= 1) return 0
  const clamped = Math.min(Math.max(index, 0), SECTION_COUNT - 1)
  return SECTION_OFFSETS[clamped] * scrollThreshold
}

// Los 5 limites de scroll en px
export function getSectionScrollTops(scrollThreshold: number): number[] {
  return SECTION_OFFSETS.slice(0, SECTION_COUNT).map((_, i) => getSectionScrollTop(i, scrollThreshold))
}

// Devuelve el id de la secion donde esta el scroll
export function getSectionIdFromOffset(offset: number): SectionId {
  return SECTION_IDS[getSectionIndexFromOffset(offset)]
}

// Devuelve el indice de la seccion donde esta el scroll
// Cada seccion tiene su propia franja de igual ancho
export function getSectionIndexFromOffset(offset: number): number {
  // El epsilon evita que 0.6 entre en la rama anterior
  const raw = Math.floor(offset / SECTION_ANIM_SPAN + 1e-9)
  return Math.min(Math.max(raw, 0), SECTION_COUNT - 1)
}

// Avance de 0 a 1 dentro de la seccion donde esta el scroll
export function getSectionProgress(offset: number): number {
  const index = getSectionIndexFromOffset(offset)
  const progress = (offset - index * SECTION_ANIM_SPAN) / SECTION_ANIM_SPAN
  return Math.min(1, Math.max(0, progress))
}

// Normaliza el scroll de un elemento al mismo offset que usa drei
export function toNormalizedOffset(el: HTMLElement): number {
  const threshold = el.scrollHeight - el.clientHeight
  if (threshold <= 0) return 0
  return el.scrollTop / threshold
}
