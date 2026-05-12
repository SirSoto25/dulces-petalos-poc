# Dulces Pétalos

Catálogo de productos + carrito de compras para la floristería Dulces Pétalos. Prueba técnica para Jakala.

> **Última auditoría**: 2026-05-12 — análisis multi-agente aplicado post-entrega. 11 issues detectados y corregidos (2 críticos).

## Stack

| Capa         | Elección                                    |
| ------------ | ------------------------------------------- |
| Framework    | React 19.2 + Vite + TypeScript strict       |
| Routing      | React Router v7                             |
| Server state | TanStack Query v5                           |
| Client state | Zustand v5 + persist middleware             |
| Validación   | zod                                         |
| Estilado     | Tailwind CSS v4 + design tokens en CSS vars |
| Tests        | Vitest + React Testing Library + MSW        |
| CI           | Husky + lint-staged + ESLint + Prettier     |

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run test     # suite completa
npm run check    # typecheck + lint + tests
```

## Scripts

| Script           | Qué hace                                      |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Servidor de desarrollo con proxy a la API     |
| `npm run build`  | Build de producción                           |
| `npm run test`   | Tests unitarios + integración                 |
| `npm run check`  | TypeScript + ESLint + tests (gate pre-commit) |
| `npm run lint`   | ESLint con jsx-a11y y react-compiler          |
| `npm run format` | Prettier sobre src/                           |

## Arquitectura

```
features/products/     # Catálogo: api + hooks + model + components + pages
features/cart/         # Carrito: model + store + hooks + components + pages
shared/ui/             # Primitivas: Button, Card, Skeleton, ErrorState...
shared/lib/            # Utilidades: httpClient, formatPrice
shared/hooks/          # Hooks genéricos: useDebouncedValue
```

Cada feature es autónoma. Las dependencias entre features son unidireccionales: `cart` conoce `products` (para añadir items), pero `products` no conoce `cart`.

## Decisiones clave

1. **Feature-sliced ligero**: 2 features ahora, base para escalar a N sin tocar código existente.
2. **TanStack Query como única capa de server-state**: Sin loaders de React Router para evitar duplicar cache.
3. **Zustand + persist para client-state**: ~1KB, middleware `persist` resuelve localStorage + hydration + cross-tab.
4. **Cart guarda snapshot** (name, price, imgUrl): sobrevive a cambios en el catálogo. Reconciliación con API en `/cart` detecta items desaparecidos.
5. **zod en hidratación**: Datos corruptos en localStorage → reset limpio, no crash.
6. **React 19 Compiler**: Cero memoización manual defensiva. El compiler la gestiona.
7. **Proxy de Vite para CORS**: Desarrollo local sin problemas de CORS contra `dulces-petalos.jakala.es`.
8. **"Finalizar compra" deshabilitado con honestidad**: No se inventa checkout falso. El botón indica "Próximamente".

## Cómo escalar

- **Añadir auth**: Nuevo feature `features/auth/` con hook `useAuth`. Proteger rutas con `<RequireAuth>`.
- **Checkout real**: Crear `features/checkout/` con formulario + integración Stripe. Mover el botón de CartSummary a una página dedicada.
- **SSR**: Migrar a Next.js App Router. TanStack Query + Zustand funcionan igual. Mover `pages/` a `app/`.
- **Más features**: `features/wishlist/`, `features/reviews/` — mismos patrones.

## Cómo se guió a la IA

Resumen ejecutivo (el log detallado está en `AI-LOG.md`, fuera del repo):

- **Planificación colaborativa**: El usuario aprobó stack y arquitectura ANTES de tocar código. Se usó un cuestionario estructurado para fijar decisiones técnicas con impacto arquitectónico.
- **Commits incrementales**: Cada feature se desarrolló en commits pequeños y verdes. No se acumuló código sin tests.
- **TDD vertical**: Tests antes o junto al código. MSW para mockear la API. 48 tests cubren happy path, empty, error, edge cases.
- **Validación continua**: `npm run check` (typecheck + lint + tests) se ejecutó entre cada fase.
- **Auditoría multi-agente post-entrega**: Dos agentes `general` analizaron el codebase completo en paralelo y detectaron 11 issues (2 críticos). Todos corregidos. Ver sección siguiente.

## Auditoría post-entrega (2026-05-12)

Análisis multi-agente aplicado sobre el codebase completo. 11 problemas detectados y corregidos:

| Severidad    | Problema                                                                                                          | Fix aplicado                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **CRITICAL** | `persistedCartSchema` incluía `version` que Zustand nunca pasa a `merge()` → carrito no rehidrataba en producción | Schema corregido a `{ items: [...] }` sin version; test fixture corregido           |
| **CRITICAL** | `AbortSignal` no propagado → peticiones fetch continuaban en red tras navegar                                     | `getProducts/getProduct` aceptan `{ signal }`; hooks pasan signal de TanStack Query |
| **HIGH**     | `react-query-devtools` en `dependencies` → iba al bundle de producción                                            | Movido a `devDependencies` + guard `import.meta.env.DEV`                            |
| **MEDIUM**   | Proxy Vite muerto: `VITE_API_BASE_URL` absoluta bypassa el proxy                                                  | `.env.development` con `/api` relativa; `.env` con URL absoluta para producción     |
| **MEDIUM**   | `CartSummary` llamaba a `useCart()` teniendo ya `subtotal` como prop → doble subscripción al store                | `onClear` como prop; `useCart()` eliminado de `CartSummary`                         |
| **MEDIUM**   | Tests de `formatPrice` frágiles por diferencias de ICU entre entornos                                             | `toBe()` → `toMatch(/regex/)`                                                       |
| **MEDIUM**   | `CartIconButton` anunciaba dos veces a lectores de pantalla (`aria-live` + `aria-label`)                          | `aria-live` eliminado; badge con `aria-hidden="true"`                               |
| **LOW**      | `AddToCartButton`: `setTimeout` no limpiado en unmount                                                            | Reescrito con `useEffect` + cleanup                                                 |
| **LOW**      | Sin `ErrorBoundary` global → crash de render blanca la app                                                        | `ErrorBoundary.tsx` + `RouteError` integrados                                       |
| **LOW**      | Página 404 era `<div>404</div>` sin layout ni estilos                                                             | `NotFoundPage.tsx` con diseño coherente y enlace de vuelta                          |
| **LOW**      | "Vaciar carrito" sin confirmación (inconsistente con eliminación de ítem)                                         | Confirmación inline en `CartSummary` + 2 tests nuevos                               |

## Limitaciones conocidas

- La API no expone endpoint de búsqueda: filtrado es client-side. Si el catálogo crece >100 items, se debe mover a server-side.
- El certificado TLS de `dulces-petalos.jakala.es` estaba expirado durante el desarrollo — verificado con `curl`. La app funciona contra la API simulada (MSW) en tests y contra la URL real en producción.
- Sin PWA / service worker.
- Sin analytics / tracking.
- Sin i18n (español hardcoded, que es el idioma del proyecto).
