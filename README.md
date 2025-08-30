# 🤖 Code Explainer

An AI-powered code explanation tool that helps developers understand complex code snippets in plain English.

![Code Explainer Demo](https://via.placeholder.com/800x400?text=Add+Screenshot+Here)

## ✨ Features

- **Multi-language Support**: Supports JavaScript, Python, Java, C++, and 10+ other programming languages
- **AI-Powered Explanations**: Uses Ollama with local LLM models for detailed code analysis
- **Modern UI**: Beautiful, responsive interface built with React and TailwindCSS
- **Real-time Processing**: Fast explanations with loading states and error handling
- **Example Snippets**: Pre-loaded examples to get started quickly

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **AI Model**: Ollama (Local LLM)
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Ollama** - Install from [ollama.ai](https://ollama.ai)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-explainer.git
   cd code-explainer
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Setup Ollama**
   ```bash
   # Start Ollama service
   ollama serve
   
   # Pull a model (in new terminal)
   ollama pull llama2
   ```

### 🎯 Usage

1. Open http://localhost:5173 in your browser
2. Paste your code snippet in the textarea
3. Select the programming language
4. Click "Explain Code"
5. Get AI-powered explanation in seconds!

## 📁 Project Structure

```
code-explainer/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── ...
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.js # TailwindCSS config
├── README.md
└── .gitignore
```

## 🔧 Configuration

### Environment Variables

Create `.env` files for configuration:

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
OLLAMA_MODEL=llama2
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
```

## 🚦 API Endpoints

- `GET /health` - Health check
- `POST /api/explain` - Explain code snippet
- `GET /api/models` - Get available Ollama models

## 🛡️ Error Handling

The application handles various error scenarios:
- Ollama service not running
- Invalid code input
- Network connectivity issues
- Rate limiting protection

## 🎨 UI Features

- **Dark Theme**: Modern dark gradient background
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Visual feedback during processing
- **Status Indicators**: Shows backend connection status
- **Code Highlighting**: Syntax-aware textarea with tab support

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Save/bookmark explanations
- [ ] Code syntax highlighting
- [ ] Multiple AI model selection
- [ ] Export explanations as PDF
- [ ] Code diff explanations
- [ ] Team collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai) for local LLM inference
- [TailwindCSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for beautiful icons

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for the developer community**
