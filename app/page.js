import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'lexora-agentic-canvas.md'), 'utf-8');

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem', lineHeight: 1.7 }}>
      <div className="markdown-body">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <style>{`
        .markdown-body h1 { font-size: 2rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; margin-top: 2rem; }
        .markdown-body h2 { font-size: 1.5rem; color: #58a6ff; margin-top: 2.5rem; }
        .markdown-body h3 { font-size: 1.2rem; color: #8b949e; }
        .markdown-body ul { padding-left: 1.5rem; }
        .markdown-body li { margin-bottom: 0.3rem; }
        .markdown-body strong { color: #f0f6fc; }
        .markdown-body hr { border: none; border-top: 1px solid #21262d; margin: 2rem 0; }
        .markdown-body blockquote { border-left: 3px solid #58a6ff; padding-left: 1rem; color: #8b949e; margin: 1rem 0; }
        .markdown-body ol { padding-left: 1.5rem; }
        .markdown-body code { background: #161b22; padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.9em; }
      `}</style>
    </main>
  );
}
