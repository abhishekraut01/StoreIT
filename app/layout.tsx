import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

// ✅ Correctly load Poppins font with all weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins', // Define a CSS variable for Tailwind or custom CSS
})

export const metadata: Metadata = {
  title: 'StoreIt',
  description: 'The only almighty storage solution you need',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  )
}
