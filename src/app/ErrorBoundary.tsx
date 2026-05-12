import { Component, type ReactNode, type ErrorInfo } from 'react'
import { ErrorState } from '../shared/ui/ErrorState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Error inesperado"
          message={this.state.error?.message ?? 'Algo salió mal.'}
          onRetry={this.handleReset}
        />
      )
    }
    return this.props.children
  }
}
