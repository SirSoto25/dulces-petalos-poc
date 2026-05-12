import { Link, useRouteError, isRouteErrorResponse } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-text-muted mb-4">404</p>
      <h1 className="text-2xl font-semibold text-text mb-2">
        Página no encontrada
      </h1>
      <p className="text-text-muted mb-8">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-cta text-white font-medium rounded-button hover:bg-cta-hover transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
      >
        Volver al catálogo
      </Link>
    </div>
  )
}

export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Error desconocido'

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-text-muted mb-4">!</p>
      <h1 className="text-2xl font-semibold text-text mb-2">Error de carga</h1>
      <p className="text-text-muted mb-8">{message}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-cta text-white font-medium rounded-button hover:bg-cta-hover transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
      >
        Volver al catálogo
      </Link>
    </div>
  )
}
