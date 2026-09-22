import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeToggle } from "./components/ThemeToggle";
import { RegistrationForm } from "./pages/RegistrationForm";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:py-12">
        <div className="mx-auto mb-6 flex max-w-2xl items-center justify-between">
          <h1 className="text-lg font-bold">پنل ثبت‌نام نماینده</h1>
          <ThemeToggle />
        </div>
        <RegistrationForm />
      </div>
    </ErrorBoundary>
  );
}

export default App;