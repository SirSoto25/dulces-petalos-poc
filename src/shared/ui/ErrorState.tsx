export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Algo salió mal',
  message = 'No se pudieron cargar los datos.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-semibold text-text mb-2">{title}</h2>
      <p className="text-text-muted mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-cta text-white rounded-button hover:bg-cta-hover transition-colors focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
