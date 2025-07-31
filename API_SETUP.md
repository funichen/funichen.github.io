# API Configuration Setup

## 🔑 How to Configure Your Gemini API Key

To enable the AI chatbot functionality on your website, you need to configure your Google Gemini API key.

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure the API Key in GitHub Secrets

1. Go to your GitHub repository (`funichen.github.io`)
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `GEMINI_API_KEY`
6. Value: Paste your actual API key
7. Click "Add secret"

### Step 3: Deploy

1. Commit and push your changes to GitHub
2. The GitHub Actions workflow will automatically:
   - Inject your API key into the `js/env-config.js` file during deployment
   - Deploy the updated site to GitHub Pages
3. Your AI chatbot will be available on your website

## 🔒 Security Notes

- **GitHub Secrets**: Your API key is stored securely in GitHub Secrets and injected during deployment
- **No Client-Side Exposure**: The API key is not visible in your source code
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

### If the chatbot doesn't work:

1. **Check GitHub Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Verify `GEMINI_API_KEY` exists and has a value

2. **Check GitHub Actions**:
   - Go to your repository → Actions tab
   - Look for the "Build and Deploy with Environment Variables" workflow
   - Check if it completed successfully
   - Look for any error messages in the logs

3. **Test Locally**:
   - Open `test-api.html` in your browser
   - Check the debug information
   - Try the "Test Gemini API" button

4. **Check Browser Console**:
   - Open browser developer tools (F12)
   - Look for error messages or debug information
   - Check if `window.ENV.GEMINI_API_KEY` has a value

5. **Common Issues**:
   - **"API Request failed"**: Usually means the API key is not properly injected
   - **"GEMINI_API_KEY is not configured"**: Check GitHub Secrets and Actions workflow
   - **CORS errors**: Make sure you're accessing the deployed site, not local files

### Debug Steps:

1. **Check the deployed site**: Visit `https://funichen.github.io/test-api.html`
2. **Look at the debug information**: It will show if the API key is properly loaded
3. **Check GitHub Actions logs**: Look for the "Create environment config" step
4. **Verify the secret**: Make sure the secret name is exactly `GEMINI_API_KEY`

## 📝 Customization

You can customize the chatbot by editing:
- `js/config.js` - Personal information and system prompts
- `styles/chatbot.css` - Visual appearance
- `js/chat-widget.js` - Functionality and behavior

## 💡 Alternative Setup (If Needed)

If you prefer users to enter their own API keys:
1. Set `GEMINI_API_KEY: ""` in `js/env-config.js`
2. Users will be prompted to enter their own API key when they first use the chat

## 🔧 Files Modified

The following files are automatically generated/updated by the GitHub Actions workflow:
- `js/env-config.js` - Generated during deployment with your API key
- `.github/workflows/deploy.yml` - GitHub Actions workflow configuration

---

**Ready to chat!** Once you've configured your API key in GitHub Secrets and the workflow runs successfully, your AI assistant will be ready to help visitors learn about your professional experience and projects.