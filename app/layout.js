export const metadata = {
  title: 'Lexora Agentic Canvas',
  description: 'Agentic AI Architecture & Context Engineering Canvas for Lexora ERP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0a0a0a', color: '#ededed' }}>
        {children}
      </body>
    </html>
  );
}
