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
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px',
          }}
        >
          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: '#3D3D3D',
              letterSpacing: '0.2em',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            [ ERR_UNCAUGHT_EXCEPTION ]
          </div>
          <p
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 13,
              color: '#5D5D5D',
              maxWidth: 420,
              lineHeight: 1.6,
              margin: '0 0 28px',
            }}
          >
            Something broke rendering this part of the page. It's on us, not you.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'none',
              border: '1px solid #1a1a1a',
              color: '#5D5D5D',
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              padding: '10px 18px',
              cursor: 'none',
              letterSpacing: '0.1em',
            }}
          >
            RELOAD
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
