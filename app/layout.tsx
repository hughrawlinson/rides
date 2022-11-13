import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {children}
        </section>
      </body>
    </html>
  );
}
