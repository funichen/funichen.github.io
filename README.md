# Funi Chen's Personal Website

Welcome to my personal website! I'm a Data & AI Leader with Clinical Insight, currently working as Sr. Business Intelligence Engineer at Amazon Pharmacy.

## 🌟 Features

- **AI Chatbot**: Interactive AI assistant powered by Google's Gemini API
- **Professional Experience**: Detailed timeline of my work at Amazon and Providence
- **Personal Projects**: Showcase of side projects including SquishyDuck stress relief app
- **Responsive Design**: Optimized for desktop and mobile devices
- **Contact Integration**: Easy ways to connect via GitHub and LinkedIn

## 🤖 AI Chatbot

The AI chatbot is powered by **Google's Gemini 2.0 Flash** model and can help visitors learn about:

- **Professional Experience**: My roles at Amazon Pharmacy, Amazon Care, and Providence
- **Technical Skills**: Data engineering, AI/ML, cloud platforms (AWS, Azure, Snowflake)
- **Leadership Experience**: Team management, strategic planning, and cross-functional collaboration
- **Personal Projects**: SquishyDuck app, AI chatbot development, and more
- **Education**: M.D. and Master of Health Informatics background
- **Contact Information**: How to connect for collaboration opportunities

### How to Use the Chatbot
1. Click the **chat button** in the bottom-right corner
2. Or click **"Start Chat"** in the hero section
3. Ask questions about my experience, skills, or projects
4. The AI will provide personalized responses based on my background

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript (ES6+)**: Modular architecture with classes and async/await

### AI Integration
- **Google Gemini API**: Gemini 2.0 Flash model for natural language processing
- **Custom AI Service**: Retry logic, error handling, and response processing
- **Configuration Management**: Environment-based API key injection

### Deployment & Security
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: Automated deployment with environment variable injection
- **Secure API Keys**: Stored in GitHub Secrets, never exposed in source code
- **CORS Compliance**: Proper headers for cross-origin requests

### Architecture
```
├── js/
│   ├── env-config.js      # Environment variables (auto-generated)
│   ├── api-config.js      # API configuration
│   ├── config.js          # Application configuration
│   ├── ai-service.js      # Gemini API integration
│   ├── chat-controller.js # Chat logic and state management
│   ├── chat-widget.js     # UI components and interactions
│   ├── message-handler.js # Message processing
│   └── main.js           # Application initialization
├── styles/
│   ├── main.css          # Main website styles
│   └── chatbot.css       # Chatbot-specific styles
└── index.html            # Main website page
```

## 🚀 Setup & Configuration

### For Developers/Contributors

If you want to set up a similar chatbot for your own website:

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create an API key for the Gemini API

2. **Configure GitHub Secrets**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add a new secret named `GEMINI_API_KEY`
   - Paste your API key as the value

3. **Deploy**
   - The GitHub Actions workflow will automatically inject your API key during deployment
   - Your chatbot will be live on GitHub Pages

### Testing the Setup

Visit the main site to test the chatbot:

- **Main Site**: [https://funichen.github.io/](https://funichen.github.io/)

## 🔧 Troubleshooting

### Common Issues

1. **Chatbot not responding**
   - Check browser console for errors (F12)
   - Verify you're on the deployed site, not local files
   - Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

2. **"API key not configured" error**
   - Check GitHub Secrets are properly set
   - Verify GitHub Actions workflow completed successfully
   - Visit the test pages above to diagnose the issue

3. **Network/CORS errors**
   - Ensure you're accessing via HTTPS
   - Check if API quotas have been exceeded
   - Verify internet connection

### Debug Steps

1. **Check API Key Loading**:
   ```javascript
   console.log('API Key loaded:', !!window.API_CONFIG?.GEMINI_API_KEY);
   ```

2. **Test Chatbot API**:
   ```javascript
   ChatbotAPI.openChat(); // Should open chat window
   ChatbotAPI.isAPIConfigured(); // Should return true
   ```

3. **View Configuration**:
   ```javascript
   console.log(window.chatbotApp.getAPI().getConfig());
   ```

## 📊 Performance & Features

- **Response Time**: Typically 1-3 seconds for Gemini API calls
- **Error Handling**: Automatic retry with exponential backoff
- **Rate Limiting**: Built-in protection against API abuse
- **Accessibility**: ARIA labels and keyboard navigation support
- **Mobile Responsive**: Optimized for all screen sizes

## 🤝 Contributing

This is a personal website, but I welcome suggestions and improvements! Feel free to:

- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share feedback on the AI chatbot experience

## 📄 License

This project is for personal use and demonstration purposes.

## 📞 Contact

- **GitHub**: [https://github.com/funichen](https://github.com/funichen)
- **LinkedIn**: [https://www.linkedin.com/in/funichen/](https://www.linkedin.com/in/funichen/)
- **Email**: chan.funi@gmail.com
- **Website**: [https://funichen.github.io](https://funichen.github.io)

---

*Last updated: January 31, 2025*
