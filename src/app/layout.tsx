import "./globals.css"
export const metadata = {
  title: 'Weather App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b')] bg-cover bg-blend-multiply bg-black/50 bg-no-repeat text-white">
        {children}
      </body>
    </html>
  )
}
