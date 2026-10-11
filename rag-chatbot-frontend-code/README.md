# Paperwise RAG Chatbot Frontend

A Next.js frontend scaffold for a PDF-based RAG chatbot. The current implementation uses mock responses and simulated PDF processing. It does **not** call a backend or read/index the contents of uploaded PDFs.

## Requirements

- Next.js with App Router
- TypeScript
- Tailwind CSS
- `lucide-react`
- `react-markdown`
- Tailwind Typography plugin for Markdown styling (`@tailwindcss/typography`)

Install missing packages from your frontend folder:

```bash
npm install lucide-react react-markdown
npm install -D @tailwindcss/typography
```

This code uses the `@/*` import alias. Make sure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

In your `globals.css`, make sure Tailwind is enabled. With Tailwind v4, use:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

With Tailwind v3, use the normal Tailwind directives and add `require('@tailwindcss/typography')` to the plugins list in `tailwind.config.js`.

## Where things live

- `src/components/layout/`: app shell, sidebar, header, mobile navigation
- `src/components/chat/`: chat screen, messages, input and starter prompts
- `src/components/documents/`: PDF selection and mock document library
- `src/components/ui/`: small reusable UI components
- `src/hooks/`: local mock chat, documents, and conversation state
- `src/lib/mock/`: fake assistant replies and optional sample document data
- `src/lib/types/`: TypeScript data shapes

## Connect FastAPI later

Keep API calls in `src/lib/api/` and call them from the hooks. Do not put `fetch()` calls directly in presentation components. When your Python backend is ready, replace the simulated `window.setTimeout()` response in `src/hooks/use-chat.ts` with a request to your FastAPI endpoint.

The UI intentionally does not show citations. To keep the mock honest, all responses are marked as demo responses and the upload panel says that uploaded PDFs are not processed yet.
