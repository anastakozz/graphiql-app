import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error has been thrown', error, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
