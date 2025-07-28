// Main application entry point
class ChatbotApp {
    constructor() {
        this.configManager = null;
        this.messageHandler = null;
        this.aiService = null;
        this.chatController = null;
        this.chatWidget = null;
        
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            console.log('Initializing AI Chatbot...');
            
            // Check if DOM elements exist
            const chatContainer = document.getElementById('chatbot-container');
            const chatToggle = document.getElementById('chat-toggle');
            
            if (!chatContainer) {
                throw new Error('Chatbot container not found in DOM');
            }
            
            if (!chatToggle) {
                throw new Error('Chat toggle button not found in DOM');
            }
            
            console.log('DOM elements found, proceeding with initialization...');
            
            // Initialize core components
            this.configManager = new ConfigManager();
            this.messageHandler = new MessageHandler();
            
            // Initialize AI service with configuration
            const aiConfig = this.configManager.getAPIConfig();
            this.aiService = new AIService(aiConfig);
            
            // Initialize chat controller
            this.chatController = new ChatController(
                this.configManager,
                this.messageHandler,
                this.aiService
            );
            
            // Initialize chat widget
            this.chatWidget = new ChatWidget(
                this.chatController,
                this.messageHandler
            );
            
            // Set up additional event listeners
            this.setupGlobalEventListeners();
            
            console.log('AI Chatbot initialized successfully!');
            console.log('Chat button should be visible in bottom-right corner');
            
        } catch (error) {
            console.error('Failed to initialize chatbot:', error);
            this.showInitializationError(error);
        }
    }

    // Set up global event listeners
    setupGlobalEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.chatWidget?.handleResize();
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Page became visible, you could refresh status here
                this.chatWidget?.updateAPIStatus();
            }
        });

        // Handle beforeunload to save state
        window.addEventListener('beforeunload', () => {
            // Save any pending state
            this.chatController?.saveConversation();
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to open chat
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.chatWidget?.show();
            }
        });
    }

    // Show initialization error
    showInitializationError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fee2e2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 16px;
            border-radius: 8px;
            max-width: 400px;
            z-index: 10000;
            font-family: inherit;
        `;
        
        errorContainer.innerHTML = `
            <strong>Chatbot Initialization Error</strong><br>
            <small>${error.message}</small><br>
            <button onclick="this.parentElement.remove()" style="margin-top: 8px; padding: 4px 8px; background: #dc2626; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Dismiss
            </button>
        `;
        
        document.body.appendChild(errorContainer);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorContainer.parentElement) {
                errorContainer.remove();
            }
        }, 10000);
    }

    // Public API methods for external access
    getAPI() {
        return {
            // Widget controls
            openChat: () => this.chatWidget?.show(),
            closeChat: () => this.chatWidget?.hide(),
            toggleChat: () => this.chatWidget?.toggle(),
            
            // Configuration
            setAPIKey: (apiKey) => this.configManager?.setAPIKey(apiKey),
            updateConfig: (config) => this.configManager?.updateConfig(config),
            getConfig: () => this.configManager?.config,
            
            // Conversation management
            clearHistory: () => this.chatController?.clearHistory(),
            getConversation: () => this.chatController?.getConversation(),
            getStats: () => this.chatController?.getStats(),
            
            // Status
            isAPIConfigured: () => this.configManager?.isAPIConfigured(),
            isOpen: () => this.chatWidget?.isOpen
        };
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting chatbot initialization...');
    
    try {
        // Create global chatbot instance
        window.chatbotApp = new ChatbotApp();
        
        // Expose API for external access
        window.ChatbotAPI = window.chatbotApp.getAPI();
        
        // Add some helpful console messages
        console.log('%c🤖 AI Chatbot Loaded!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
        console.log('Use ChatbotAPI to interact with the chatbot programmatically.');
        console.log('Example: ChatbotAPI.openChat() or ChatbotAPI.setAPIKey("your-key")');
        
        // Force show the chat button for debugging
        const chatButton = document.getElementById('chat-toggle');
        if (chatButton) {
            chatButton.style.display = 'flex';
            chatButton.style.position = 'fixed';
            chatButton.style.bottom = '20px';
            chatButton.style.right = '20px';
            chatButton.style.zIndex = '9999';
            console.log('Chat button found and forced to display');
        } else {
            console.error('Chat button not found in DOM!');
        }
        
    } catch (error) {
        console.error('Failed to initialize chatbot app:', error);
    }
});

// Handle any uncaught errors
window.addEventListener('error', (event) => {
    console.error('Chatbot Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Chatbot Promise Rejection:', event.reason);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotApp;
}