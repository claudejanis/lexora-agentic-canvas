export const metadata = {
  title: 'Agentic AI Architecture & Context Engineering Canvas — Lexora ERP',
  description: 'Agentic AI Architecture & Context Engineering Canvas for Lexora ERP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
