// Chat Controller - orchestrates chat functionality
class ChatController {
    constructor(configManager, messageHandler, aiService) {
        this.configManager = configManager;
        this.messageHandler = messageHandler;
        this.aiService = aiService;
        this.conversation = this.loadConversation();
        this.isProcessing = false;
        
        // Rate limiting
        this.lastRequestTime = 0;
        this.minRequestInterval = 1000; // 1 second between requests
    }

    // Send a message and get AI response
    async sendMessage(userInput) {
        if (this.isProcessing) {
            throw new Error('Please wait for the current message to be processed.');
        }

        // Validate user input
        const validation = this.messageHandler.validateMessage(userInput);
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        // Rate limiting check
        const now = Date.now();
        if (now - this.lastRequestTime < this.minRequestInterval) {
            const waitTime = this.minRequestInterval - (now - this.lastRequestTime);
            throw new Error(`Please wait ${Math.ceil(waitTime / 1000)} seconds before sending another message.`);
        }

        this.isProcessing = true;
        this.lastRequestTime = now;

        try {
            // Create user message
            const userMessage = this.messageHandler.createMessage(validation.content, 'user');
            this.addMessageToConversation(userMessage);

            // Get AI response
            const botResponse = await this.getAIResponse();
            const botMessage = this.messageHandler.createMessage(botResponse, 'bot');
            this.addMessageToConversation(botMessage);

            // Save conversation
            this.saveConversation();

            return {
                userMessage,
                botMessage
            };

        } catch (error) {
            console.error('Error in sendMessage:', error);
            
            // Create error message for user
            const errorMessage = this.messageHandler.createErrorMessage(
                this.aiService.getErrorMessage(error)
            );
            this.addMessageToConversation(errorMessage);
            this.saveConversation();

            // If AI is unavailable, try fallback response
            if (this.shouldUseFallback(error)) {
                const fallbackResponse = this.messageHandler.getFallbackResponse(userInput);
                const fallbackMessage = this.messageHandler.createMessage(fallbackResponse, 'bot');
                this.addMessageToConversation(fallbackMessage);
                this.saveConversation();
                
                return {
                    userMessage: this.messageHandler.createMessage(validation.content, 'user'),
                    botMessage: fallbackMessage,
                    isError: true
                };
            }

            throw error;
        } finally {
            this.isProcessing = false;
            this.aiService.resetRetryCount();
        }
    }

    // Get AI response for current conversation
    async getAIResponse() {
        const config = this.configManager.getAPIConfig();
        const systemPrompt = this.configManager.getSystemPrompt();
        
        // Prepare messages for API
        const apiMessages = this.messageHandler.prepareForAPI(this.conversation.messages);
        
        // Generate response
        return await this.aiService.generateResponse(apiMessages, systemPrompt);
    }

    // Add message to conversation
    addMessageToConversation(message) {
        this.conversation.messages.push(message);
        this.conversation.lastActivity = new Date();
        
        // Limit conversation history to prevent memory issues
        const maxMessages = 50;
        if (this.conversation.messages.length > maxMessages) {
            this.conversation.messages = this.conversation.messages.slice(-maxMessages);
        }
    }

    // Load conversation from localStorage
    loadConversation() {
        try {
            const saved = localStorage.getItem('chatbot-conversation');
            if (saved) {
                const conversation = JSON.parse(saved);
                // Convert timestamp strings back to Date objects
                conversation.startTime = new Date(conversation.startTime);
                conversation.lastActivity = new Date(conversation.lastActivity);
                conversation.messages.forEach(msg => {
                    msg.timestamp = new Date(msg.timestamp);
                });
                return conversation;
            }
        } catch (error) {
            console.warn('Failed to load conversation:', error);
        }

        // Return new conversation
        return this.createNewConversation();
    }

    // Create new conversation
    createNewConversation() {
        const welcomeMessage = this.configManager.getUIConfig().welcomeMessage;
        const conversation = {
            sessionId: this.generateSessionId(),
            messages: [],
            startTime: new Date(),
            lastActivity: new Date()
        };

        // Add welcome message
        if (welcomeMessage) {
            const welcome = this.messageHandler.createMessage(welcomeMessage, 'bot', 'system');
            conversation.messages.push(welcome);
        }

        return conversation;
    }

    // Save conversation to localStorage
    saveConversation() {
        try {
            localStorage.setItem('chatbot-conversation', JSON.stringify(this.conversation));
        } catch (error) {
            console.warn('Failed to save conversation:', error);
        }
    }

    // Clear conversation history
    clearHistory() {
        this.conversation = this.createNewConversation();
        this.saveConversation();
        return this.conversation;
    }

    // Get current conversation
    getConversation() {
        return this.conversation;
    }

    // Generate unique session ID
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Check if should use fallback response
    shouldUseFallback(error) {
        // Use fallback for API errors, network errors, or configuration issues
        return error.message.includes('API key') || 
               error.message.includes('Network') || 
               error.message.includes('fetch') ||
               (error instanceof window.APIError && error.status >= 500);
    }

    // Get conversation statistics
    getStats() {
        const messages = this.conversation.messages;
        const userMessages = messages.filter(m => m.sender === 'user');
        const botMessages = messages.filter(m => m.sender === 'bot');
        
        return {
            totalMessages: messages.length,
            userMessages: userMessages.length,
            botMessages: botMessages.length,
            sessionDuration: Date.now() - this.conversation.startTime.getTime(),
            lastActivity: this.conversation.lastActivity
        };
    }

    // Check if API is configured
    isAPIConfigured() {
        return this.configManager.isAPIConfigured();
    }

    // Update AI service configuration
    updateAIConfig(newConfig) {
        this.configManager.updateConfig({ ai: newConfig });
        this.aiService.updateConfig(newConfig);
    }
}

// Export for use in other modules
window.ChatController = ChatController;