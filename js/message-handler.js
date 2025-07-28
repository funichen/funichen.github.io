// Message Handler for processing and formatting messages
class MessageHandler {
    constructor() {
        this.messageIdCounter = 0;
    }

    // Create a new message object
    createMessage(content, sender, type = 'text') {
        return {
            id: this.generateMessageId(),
            content: this.sanitizeInput(content),
            sender: sender, // 'user' or 'bot'
            timestamp: new Date(),
            type: type // 'text', 'error', 'system'
        };
    }

    // Generate unique message ID
    generateMessageId() {
        return `msg_${++this.messageIdCounter}_${Date.now()}`;
    }

    // Sanitize user input to prevent XSS
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .trim();
    }

    // Format bot response (can include basic markdown)
    formatBotResponse(response) {
        if (typeof response !== 'string') return '';
        
        // Basic markdown support
        let formatted = response
            // Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic text
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Code blocks
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Line breaks
            .replace(/\n/g, '<br>');

        // Detect and format links
        formatted = this.detectLinks(formatted);
        
        return formatted;
    }

    // Detect and format links in text
    detectLinks(text) {
        const urlRegex = /(https?:\/\/[^\s<>"]+)/gi;
        return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    // Add timestamp to message display
    formatTimestamp(timestamp) {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 1440) { // 24 hours
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours}h ago`;
        } else {
            return messageTime.toLocaleDateString();
        }
    }

    // Validate message content
    validateMessage(content) {
        if (!content || typeof content !== 'string') {
            return { valid: false, error: 'Message content is required' };
        }
        
        const trimmed = content.trim();
        if (trimmed.length === 0) {
            return { valid: false, error: 'Message cannot be empty' };
        }
        
        if (trimmed.length > 1000) {
            return { valid: false, error: 'Message is too long (max 1000 characters)' };
        }
        
        return { valid: true, content: trimmed };
    }

    // Create error message
    createErrorMessage(errorText) {
        return this.createMessage(errorText, 'bot', 'error');
    }

    // Create system message
    createSystemMessage(text) {
        return this.createMessage(text, 'bot', 'system');
    }

    // Process message for AI API (prepare context)
    prepareForAPI(messages, maxMessages = 10) {
        // Get recent messages for context
        const recentMessages = messages.slice(-maxMessages);
        
        return recentMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.sender === 'user' ? msg.content : this.stripHTML(msg.content)
        }));
    }

    // Strip HTML tags from text
    stripHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    // Get fallback responses for when AI is unavailable
    getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm Funichen's AI assistant. Unfortunately, I'm having trouble connecting to my AI service right now, but I'd still love to help you learn about Funichen's work!";
        }
        
        if (message.includes('project') || message.includes('work')) {
            return "Funichen is currently working on several exciting projects including a Kids Time Manager app built with Flutter and this AI chatbot for GitHub Pages. You can check out more projects on their GitHub profile!";
        }
        
        if (message.includes('skill') || message.includes('technology')) {
            return "Funichen has expertise in JavaScript, Python, React, Node.js, Flutter, Dart, and AI integration. They're passionate about both frontend and backend development!";
        }
        
        if (message.includes('contact') || message.includes('reach')) {
            return "You can find Funichen on GitHub at github.com/funichen or explore more of their work on this website. Feel free to reach out for collaboration opportunities!";
        }
        
        return "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment, or feel free to explore Funichen's projects and contact information on this website!";
    }
}

// Export for use in other modules
window.MessageHandler = MessageHandler;