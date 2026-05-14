# Dulces Pétalos

Catálogo de productos + carrito de compras para la floristería Dulces Pétalos. Prueba técnica para Jakala.

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

```text
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

## Limitaciones conocidas

- La API no expone endpoint de búsqueda: filtrado es client-side. Si el catálogo crece >100 items, se debe mover a server-side.
- El certificado TLS de `dulces-petalos.jakala.es` estaba expirado durante el desarrollo — verificado con `curl`. La app funciona contra la API simulada (MSW) en tests y contra la URL real en producción.
- Sin PWA / service worker.
- Sin analytics / tracking.
- Sin i18n (español hardcoded, que es el idioma del proyecto).
