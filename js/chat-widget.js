// Chat Widget - handles UI interactions and display
class ChatWidget {
    constructor(chatController, messageHandler) {
        this.chatController = chatController;
        this.messageHandler = messageHandler;
        this.isOpen = false;
        this.elements = {};
        
        this.init();
    }

    // Initialize the chat widget
    init() {
        this.bindElements();
        this.attachEventListeners();
        this.loadExistingMessages();
        this.updateAPIStatus();
    }

    // Bind DOM elements
    bindElements() {
        this.elements = {
            container: document.getElementById('chatbot-container'),
            toggleButton: document.getElementById('chat-toggle'),
            chatWindow: document.getElementById('chat-window'),
            closeButton: document.getElementById('chat-close'),
            messagesContainer: document.getElementById('chat-messages'),
            input: document.getElementById('chat-input'),
            sendButton: document.getElementById('chat-send'),
            typingIndicator: document.getElementById('typing-indicator')
        };

        // Validate all elements exist
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                console.error(`Chat widget element not found: ${key}`);
            }
        }
    }

    // Attach event listeners
    attachEventListeners() {
        // Toggle chat window
        this.elements.toggleButton?.addEventListener('click', () => this.toggle());
        this.elements.closeButton?.addEventListener('click', () => this.hide());
        
        // Hero chat button
        const heroButton = document.getElementById('chat-toggle-hero');
        if (heroButton) {
            heroButton.addEventListener('click', () => this.show());
        }

        // Send message
        this.elements.sendButton?.addEventListener('click', () => this.handleSendMessage());
        this.elements.input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Auto-resize input
        this.elements.input?.addEventListener('input', () => this.adjustInputHeight());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.hide();
            }
        });

        // Click outside to close (optional)
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.elements.container?.contains(e.target)) {
                // Uncomment to enable click-outside-to-close
                // this.hide();
            }
        });
    }

    // Load existing messages from conversation
    loadExistingMessages() {
        const conversation = this.chatController.getConversation();
        this.elements.messagesContainer.innerHTML = '';
        
        conversation.messages.forEach(message => {
            this.displayMessage(message);
        });
        
        this.scrollToBottom();
    }

    // Show chat window
    show() {
        this.isOpen = true;
        this.elements.chatWindow?.classList.remove('hidden');
        this.elements.input?.focus();
        this.scrollToBottom();
    }

    // Hide chat window
    hide() {
        this.isOpen = false;
        this.elements.chatWindow?.classList.add('hidden');
    }

    // Toggle chat window
    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    // Handle sending a message
    async handleSendMessage() {
        const input = this.elements.input;
        const message = input?.value?.trim();
        
        if (!message) return;

        // Check if API is configured
        if (!this.chatController.isAPIConfigured()) {
            this.showAPINotConfiguredMessage();
            return;
        }

        // Clear input and disable send button
        input.value = '';
        this.setSendButtonState(false);
        this.adjustInputHeight();

        try {
            // Show typing indicator
            this.showTyping();

            // Send message through controller
            const result = await this.chatController.sendMessage(message);
            
            // Display messages (user message was already added to conversation)
            this.displayMessage(result.userMessage);
            this.displayMessage(result.botMessage);

        } catch (error) {
            console.error('Error sending message:', error);
            this.showErrorMessage(error.message);
        } finally {
            // Hide typing indicator and re-enable send button
            this.hideTyping();
            this.setSendButtonState(true);
            this.scrollToBottom();
            input?.focus();
        }
    }

    // Display a message in the chat
    displayMessage(message) {
        const messageElement = this.createMessageElement(message);
        this.elements.messagesContainer?.appendChild(messageElement);
        this.scrollToBottom();
    }

    // Create message DOM element
    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}-message`;
        messageDiv.setAttribute('data-message-id', message.id);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (message.sender === 'bot') {
            contentDiv.innerHTML = this.messageHandler.formatBotResponse(message.content);
        } else {
            contentDiv.textContent = message.content;
        }

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.messageHandler.formatTimestamp(message.timestamp);

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        // Add error styling if it's an error message
        if (message.type === 'error') {
            messageDiv.classList.add('error-message');
        }

        return messageDiv;
    }

    // Show typing indicator
    showTyping() {
        this.elements.typingIndicator?.classList.remove('hidden');
        this.scrollToBottom();
    }

    // Hide typing indicator
    hideTyping() {
        this.elements.typingIndicator?.classList.add('hidden');
    }

    // Set send button state
    setSendButtonState(enabled) {
        const button = this.elements.sendButton;
        if (button) {
            button.disabled = !enabled;
        }
    }

    // Scroll to bottom of messages
    scrollToBottom() {
        const container = this.elements.messagesContainer;
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        }
    }

    // Adjust input height for multiline
    adjustInputHeight() {
        const input = this.elements.input;
        if (input) {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        }
    }

    // Show error message
    showErrorMessage(errorText) {
        const errorMessage = this.messageHandler.createErrorMessage(errorText);
        this.displayMessage(errorMessage);
    }

    // Show API not configured message
    showAPINotConfiguredMessage() {
        const configMessage = this.messageHandler.createSystemMessage(
            `Hi! I'm Funi's AI assistant, but I need to be configured with a Google Gemini API key to work properly. 

**To enable AI chat:**
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click the button below to configure it

**In the meantime:** Feel free to explore Funi's portfolio, projects, and contact information on this website!`
        );
        this.displayMessage(configMessage);
        
        // Add a configure button
        this.addConfigureButton();
    }

    // Add configure button to chat
    addConfigureButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'configure-button-container';
        buttonContainer.style.cssText = `
            padding: 16px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            background: #f9fafb;
        `;
        
        const configButton = document.createElement('button');
        configButton.textContent = '🔧 Configure API Key';
        configButton.style.cssText = `
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
        `;
        
        configButton.addEventListener('click', () => {
            this.showAPIKeyPrompt();
            buttonContainer.remove();
        });
        
        configButton.addEventListener('mouseenter', () => {
            configButton.style.background = '#1d4ed8';
        });
        
        configButton.addEventListener('mouseleave', () => {
            configButton.style.background = '#2563eb';
        });
        
        buttonContainer.appendChild(configButton);
        this.elements.messagesContainer?.appendChild(buttonContainer);
        this.scrollToBottom();
    }

    // Show API key configuration prompt (kept for backward compatibility)
    showAPIKeyPrompt() {
        const promptMessage = `To use the AI chatbot, you need to configure your Google Gemini API key. 

Please note: The API key will be stored in your browser's local storage and used directly from your browser to make API calls. This means:
- Your API key is only stored locally on your device
- API calls are made directly from your browser to Google Gemini
- You are responsible for your API usage and costs

To get a Gemini API key:
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key

Would you like to enter your API key now?`;

        if (confirm(promptMessage)) {
            const apiKey = prompt('Please enter your Google Gemini API key:');
            if (apiKey && apiKey.trim()) {
                this.chatController.updateAIConfig({ apiKey: apiKey.trim() });
                this.updateAPIStatus();
                
                const successMessage = this.messageHandler.createSystemMessage(
                    'Gemini API key configured successfully! You can now chat with the AI assistant.'
                );
                this.displayMessage(successMessage);
            }
        } else {
            const infoMessage = this.messageHandler.createSystemMessage(
                'You can still explore the website, but the AI chat functionality requires a Gemini API key. You can configure it anytime by trying to send a message.'
            );
            this.displayMessage(infoMessage);
        }
    }

    // Update API status indicator (if you want to add one)
    updateAPIStatus() {
        const isConfigured = this.chatController.isAPIConfigured();
        // You can add visual indicators here if needed
        console.log('API configured:', isConfigured);
    }

    // Clear chat history
    clearHistory() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.chatController.clearHistory();
            this.loadExistingMessages();
        }
    }

    // Add method to handle window resize
    handleResize() {
        if (this.isOpen) {
            this.scrollToBottom();
        }
    }

    // Destroy widget (cleanup)
    destroy() {
        // Remove event listeners and clean up
        this.elements.toggleButton?.removeEventListener('click', this.toggle);
        this.elements.closeButton?.removeEventListener('click', this.hide);
        this.elements.sendButton?.removeEventListener('click', this.handleSendMessage);
    }
}

// Export for use in other modules
window.ChatWidget = ChatWidget;