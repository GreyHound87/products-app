import { Component, type ErrorInfo, type ReactNode } from 'react'

export interface ErrorBoundaryRenderFallbackArgs {
  error: Error
  reset: () => void
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  renderFallback?: (args: ErrorBoundaryRenderFallbackArgs) => ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  reset = (): void => {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    if (error) {
      if (this.props.renderFallback) {
        return this.props.renderFallback({ error, reset: this.reset })
      }
      if (this.props.fallback != null) {
        return this.props.fallback
      }
      return null
    }
    return this.props.children
  }
}
