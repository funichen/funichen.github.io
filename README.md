# Funi Chen - Personal Website with AI Assistant

[![Deploy Status](https://github.com/funichen/funichen.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/funichen/funichen.github.io/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://funichen.github.io)
[![AI Powered](https://img.shields.io/badge/AI-Gemini%20Powered-blue)](https://ai.google.dev/)

> A professional personal website featuring an AI-powered chatbot assistant, built with modern web technologies and deployed on GitHub Pages.

🌐 **Live Website**: [https://funichen.github.io](https://funichen.github.io)

## 👨‍⚕️ About

This is the personal website of **Funi Chen, M.D., MHI** - a Data & AI Leader with Clinical Insight. The website showcases professional experience, side projects, and features an intelligent AI assistant that can answer questions about background, skills, and expertise.

## ✨ Features

### 🤖 **AI-Powered Chatbot**
- **Google Gemini Integration**: Powered by Gemini 1.5 Flash for intelligent conversations
- **Professional Knowledge**: Trained on Dr. Chen's resume, experience, and expertise
- **Secure API Management**: API keys managed through GitHub Secrets
- **Multiple Access Points**: Hero section button + floating chat widget
- **Conversation Persistence**: Chat history saved locally

### 🎨 **Modern Design**
- **Morandi Color Palette**: Elegant, muted color scheme throughout
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Timeline**: Interactive work experience visualization
- **Glassmorphism UI**: Modern visual effects with backdrop blur
- **Accessibility Compliant**: WCAG 2.1 guidelines followed

### 📊 **Professional Showcase**
- **Timeline Visualization**: Work experience displayed as interactive timeline
- **Skills Highlighting**: Technology tags for each position
- **Project Portfolio**: Side projects with detailed descriptions
- **Contact Integration**: Direct links to GitHub and LinkedIn

## 🛠️ Technology Stack

### **Frontend**
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, modular architecture
- **GitHub Pages**: Static site hosting

### **AI Integration**
- **Google Gemini API**: Natural language processing and conversation
- **Modular Architecture**: Separate components for config, chat, AI service
- **Error Handling**: Graceful fallbacks and retry mechanisms
- **Rate Limiting**: Built-in protection against API abuse

### **DevOps & Deployment**
- **GitHub Actions**: Automated deployment pipeline
- **GitHub Secrets**: Secure API key management
- **Automated Testing**: Code quality and functionality checks
- **Version Control**: Git workflow with feature branches

## 🚀 Quick Start

### **For Visitors**
Simply visit [https://funichen.github.io](https://funichen.github.io) and:
1. Click "Start Chat" in the hero section
2. Ask questions about Dr. Chen's experience, skills, or projects
3. Explore the timeline of professional experience
4. Check out side projects and technical expertise

### **For Developers**
```bash
# Clone the repository
git clone https://github.com/funichen/funichen.github.io.git
cd funichen.github.io

# Open in your preferred editor
code .

# Serve locally (optional)
python -m http.server 8000
# or
npx serve .
```

## 🔧 Configuration

### **API Key Setup**
The website uses GitHub Actions to securely inject the Gemini API key during deployment:

1. **GitHub Secrets**: API key stored as `GEMINI_API_KEY` in repository secrets
2. **Build Process**: GitHub Actions replaces placeholder during deployment
3. **Security**: No sensitive data exposed in source code

### **Customization**
Key files for customization:

- `js/config.js` - Personal information, skills, experience
- `styles/main.css` - Visual styling and color scheme
- `js/api-config.js` - API configuration (placeholder replaced during build)
- `index.html` - Main page structure and content

## 📁 Project Structure

```
funichen.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── images/
│   └── FuniChen.png           # Profile photo
├── js/
│   ├── ai-service.js          # Gemini API integration
│   ├── api-config.js          # API configuration
│   ├── chat-controller.js     # Chat orchestration
│   ├── chat-widget.js         # UI interactions
│   ├── config.js              # Personal data & settings
│   ├── main.js                # Application entry point
│   └── message-handler.js     # Message processing
├── styles/
│   ├── chatbot.css            # Chat widget styling
│   └── main.css               # Main website styles
├── index.html                 # Main page
├── API_SETUP.md              # API configuration guide
└── README.md                 # This file
```

## 🎯 Key Components

### **ConfigManager** (`js/config.js`)
- Personal information and professional experience
- Skills, projects, and contact details
- AI system prompts and personality configuration

### **AIService** (`js/ai-service.js`)
- Google Gemini API integration
- Request/response handling
- Error management and retry logic

### **ChatWidget** (`js/chat-widget.js`)
- User interface for chat interactions
- Message display and input handling
- Responsive design implementation

### **ChatController** (`js/chat-controller.js`)
- Conversation flow orchestration
- Message history management
- Integration between UI and AI service

## 🔒 Security & Privacy

### **API Key Security**
- ✅ Stored securely in GitHub Secrets
- ✅ Injected during build process only
- ✅ No exposure in client-side code
- ✅ User controls their own API usage

### **Data Privacy**
- ✅ No server-side data storage
- ✅ Conversations stored locally only
- ✅ No tracking or analytics
- ✅ GDPR compliant approach

### **Content Security**
- ✅ Input sanitization for XSS prevention
- ✅ Rate limiting for API protection
- ✅ Error handling for graceful failures

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Desktop**: Full timeline view with side-by-side layout
- **Tablet**: Adapted timeline with optimized spacing
- **Mobile**: Single-column layout with touch-friendly interactions

## 🤝 Contributing

While this is a personal website, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Funi Chen, M.D., MHI**
- 🌐 Website: [https://funichen.github.io](https://funichen.github.io)
- 💼 LinkedIn: [https://www.linkedin.com/in/funichen/](https://www.linkedin.com/in/funichen/)
- 🐙 GitHub: [https://github.com/funichen](https://github.com/funichen)
- 📧 Email: chan.funi@gmail.com

## 🙏 Acknowledgments

- **Google Gemini**: AI capabilities powered by Google's Gemini 1.5 Flash
- **GitHub Pages**: Free hosting and deployment platform
- **GitHub Actions**: Automated deployment and CI/CD
- **Open Source Community**: Various libraries and inspirations

---

**Built with ❤️ by Funi Chen** | **Powered by AI** | **Deployed on GitHub Pages**
