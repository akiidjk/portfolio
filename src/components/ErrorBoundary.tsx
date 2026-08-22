import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

// Error boundaries have no hook equivalent — this must stay a class
// component. Catches render-time errors in the wrapped subtree so one
// broken component doesn't take the whole page down to a blank screen.
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught render error:', error, info.componentStack)
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-10 text-center">
          <div className="mb-5 font-mono text-fs-10 tracking-[0.2em] text-dim-label uppercase">
            [ ERR_UNCAUGHT_EXCEPTION ]
          </div>
          <p className="mb-7 max-w-[420px] font-mono text-fs-13 leading-[1.6] text-muted-steel">
            Something broke rendering this part of the page. It's on us, not you.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-none border border-hairline px-[18px] py-2.5 font-mono text-fs-10 tracking-[0.1em] text-muted-steel"
          >
            RELOAD
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
