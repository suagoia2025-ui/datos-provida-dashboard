import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Datos Provida Dashboard',
    template: '%s | Datos Provida'
  },
  description: 'Panel de control para visualización de datos de Datos Provida',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366f1',
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title: 'Datos Provida Dashboard',
    description: 'Panel de control para visualización de datos de Datos Provida',
    url: '/',
    siteName: 'Datos Provida',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}


