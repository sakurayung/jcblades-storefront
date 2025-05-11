import Footer from "@modules/layout/templates/footer"; 
import Header from "@modules/layout/templates/nav"; 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply Tailwind classes for flex column and min screen height */}
      <body className="flex flex-col min-h-screen"> 
        <Header /> 
        {/* Main content area should grow to push footer down */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}