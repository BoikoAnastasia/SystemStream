import React from 'react';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так: {this.state.error?.message}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
