# Image-to-Text Converter (Next.js, Gemini AI)

A modern, beautiful, and powerful web app that leverages Google Gemini AI to convert images into text, code, tables, math formulas, and more. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion for a seamless and delightful user experience.

![Demo Screenshot](public/favicon.png)

## ✨ Features

- **Image to Text**: Extract plain text from images using Gemini AI.
- **Image to Code**: Convert screenshots of code into editable, syntax-highlighted code blocks.
- **Image to Table**: Parse tables from images into structured formats (Markdown, CSV, JSON).
- **Image to Math/LaTeX**: Extract math formulas and render them beautifully.
- **Image to Markdown/JSON/Alt Text**: Flexible output for various use cases.
- **Image to Diagram/Translation**: (Planned) Convert diagrams or translate extracted content.
- **Tabbed Demo Interface**: Switch between extraction types with a modern tabbed UI.
- **Result Modal**: View, copy, or download results in a beautiful modal.
- **Framer Motion Animations**: Smooth, modern transitions and effects.
- **Robust Error Handling**: Friendly feedback for upload, conversion, and download issues.
- **Blue-Themed, Responsive UI**: Gorgeous cards, gradients, and layouts for all devices.

## 🚀 Demo

Try the live demo:  
`/demo` route in your local deployment.

## 🖼️ Landing Page Sections

- **Hero**: Eye-catching introduction to the app.
- **Features**: Overview of all conversion capabilities.
- **How It Works**: Step-by-step guide.
- **Pricing**: (If applicable) Pricing plans.
- **FAQ**: Frequently asked questions.
- **Newsletter**: Subscribe for updates.
- **Footer**: Links and credits.

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** & **tailwindcss-animate**
- **Framer Motion**
- **@google/generative-ai** (Gemini API)
- **Radix UI** (Accessible UI primitives)
- **react-syntax-highlighter** (Code display)
- **Zod** (Validation)
- **FileSaver, jsPDF, docx** (Export/download)
- ...and more!

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/minduck1103/Converter_Img_Text.git
cd Converter_Img_Text

# 2. Install dependencies
pnpm install
# or
npm install
# or
yarn install

# 3. Set up environment variables
cp .env.example .env.local
# Add your Gemini API key to .env.local
GEMINI_API_KEY=your_google_gemini_api_key

# 4. Run the development server
pnpm dev
# or
npm run dev
# or
yarn dev

# 5. Open http://localhost:3000 in your browser
```

## ⚙️ Environment Variables

- `GEMINI_API_KEY` – Your Google Gemini API key (required for all AI features).

## 🧩 Project Structure

```
.
├── app/                # Next.js app directory (routes, pages)
│   ├── page.tsx        # Landing page
│   └── demo/           # Demo page with tabbed interface
├── components/         # UI components (ResultModal, CodeResult, etc.)
│   └── sections/       # Landing page sections (Hero, Features, etc.)
├── lib/                # Utility functions, Gemini API logic
├── public/             # Static assets (favicon, images)
├── styles/             # Tailwind and global styles
├── hooks/              # Custom React hooks
├── package.json
└── ...
```

## 🖥️ Usage

1. Go to the `/demo` page.
2. Select the extraction type (Text, Code, Table, Math, etc.).
3. Upload your image.
4. Wait for the AI to process and display the result in a modal.
5. Copy or download the result, or continue converting.

## 💡 Customization

- **Add new conversion types**: Extend the Gemini prompt and add new tabs/components.
- **UI/UX**: Tweak Tailwind classes or Framer Motion animations for your brand.
- **API**: Swap Gemini for another AI provider if needed.

## 🛡️ Security & Privacy

- Your images are processed securely via the Gemini API.
- No data is stored on the server by default.

## 📝 License

MIT License.  
See [LICENSE](LICENSE) for details.

## 🙏 Credits

- [Google Gemini AI](https://ai.google.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

---
