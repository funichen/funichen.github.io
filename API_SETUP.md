# API Configuration Setup

## 🔑 How to Configure Your Gemini API Key

To enable the AI chatbot functionality on your website, you need to configure your Google Gemini API key.

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure the API Key

1. Open the file `js/api-config.js`
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:

```javascript
const API_CONFIG = {
    GEMINI_API_KEY: "your-actual-api-key-here"
};
```

### Step 3: Deploy

1. Commit and push your changes to GitHub
2. Your AI chatbot will be automatically available on your website

## 🔒 Security Notes

- **For Personal Websites**: Since this is your personal website and you control the usage, having the API key in the client-side code is acceptable
- **API Usage**: You are responsible for monitoring your API usage and costs
- **Rate Limits**: The chatbot includes built-in rate limiting to prevent abuse

## 🚀 Features

Once configured, your visitors can:
- Click "Start Chat" in the hero section
- Use the floating chat button in the bottom-right corner
- Ask questions about your professional experience
- Learn about your projects and skills
- Get information about your background and expertise

## 🛠️ Troubleshooting

If the chatbot doesn't work:

1. **Check API Key**: Make sure you've replaced the placeholder in `api-config.js`
2. **Check Console**: Open browser developer tools and look for error messages
3. **API Limits**: Ensure your Gemini API key has sufficient quota
4. **Network**: Check if there are any network connectivity issues

## 📝 Customization

You can customize the chatbot by editing:
- `js/config.js` - Personal information and system prompts
- `styles/chatbot.css` - Visual appearance
- `js/chat-widget.js` - Functionality and behavior

## 💡 Alternative Setup (If Needed)

If you prefer users to enter their own API keys:
1. Set `GEMINI_API_KEY: ""` in `api-config.js`
2. Users will be prompted to enter their own API key when they first use the chat

---

**Ready to chat!** Once you've configured your API key, your AI assistant will be ready to help visitors learn about your professional experience and projects.