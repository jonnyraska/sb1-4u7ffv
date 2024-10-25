import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="flex h-screen">
        <Navigation />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}