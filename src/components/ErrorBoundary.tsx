import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled application error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-xl font-bold text-secondary">خطایی رخ داد</h1>
          <p className="text-gray-600 dark:text-gray-300">{this.state.message}</p>
          <button
            onClick={this.handleReset}
            className="rounded-lg bg-primary px-6 py-2 text-white transition hover:bg-primary-dark"
          >
            تلاش مجدد
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}