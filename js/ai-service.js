// AI Service for handling external API communication
class AIService {
    constructor(config) {
        this.config = config;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.retryDelay = 1000; // Start with 1 second
    }

    // Generate response from AI API
    async generateResponse(messages, systemPrompt) {
        if (!this.config.apiKey || this.config.apiKey.trim() === '') {
            throw new Error('API key not configured. Please set your OpenAI API key in the configuration.');
        }

        const requestBody = this.formatRequest(messages, systemPrompt);
        
        try {
            const response = await this.makeAPIRequest(requestBody);
            return this.processResponse(response);
        } catch (error) {
            console.error('AI Service Error:', error);
            
            if (this.retryCount < this.maxRetries && this.shouldRetry(error)) {
                return this.retryRequest(messages, systemPrompt);
            }
            
            throw error;
        }
    }

    // Format request for OpenAI API
    formatRequest(messages, systemPrompt) {
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];

        return {
            model: this.config.model || 'gpt-3.5-turbo',
            messages: formattedMessages,
            max_tokens: this.config.maxTokens || 500,
            temperature: this.config.temperature || 0.7,
            stream: false
        };
    }

    // Make the actual API request
    async makeAPIRequest(requestBody) {
        const response = await fetch(this.config.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new APIError(response.status, errorData.error?.message || 'API request failed', errorData);
        }

        return response.json();
    }

    // Process API response
    processResponse(response) {
        if (!response.choices || response.choices.length === 0) {
            throw new Error('No response generated from AI service');
        }

        const choice = response.choices[0];
        if (choice.finish_reason === 'length') {
            console.warn('Response was truncated due to length limit');
        }

        return choice.message.content.trim();
    }

    // Retry logic with exponential backoff
    async retryRequest(messages, systemPrompt) {
        this.retryCount++;
        const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
        
        console.log(`Retrying AI request (attempt ${this.retryCount}/${this.maxRetries}) after ${delay}ms`);
        
        await this.sleep(delay);
        return this.generateResponse(messages, systemPrompt);
    }

    // Determine if error is retryable
    shouldRetry(error) {
        if (error instanceof APIError) {
            // Retry on server errors and rate limits
            return error.status >= 500 || error.status === 429;
        }
        
        // Retry on network errors
        return error.name === 'TypeError' || error.message.includes('fetch');
    }

    // Sleep utility for retry delays
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Reset retry counter
    resetRetryCount() {
        this.retryCount = 0;
    }

    // Update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    // Validate API configuration
    validateConfig() {
        const errors = [];
        
        if (!this.config.apiKey || this.config.apiKey.trim() === '') {
            errors.push('API key is required');
        }
        
        if (!this.config.baseUrl) {
            errors.push('Base URL is required');
        }
        
        if (!this.config.model) {
            errors.push('Model is required');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    // Get user-friendly error message
    getErrorMessage(error) {
        if (error instanceof APIError) {
            switch (error.status) {
                case 401:
                    return 'Invalid API key. Please check your OpenAI API key configuration.';
                case 429:
                    return 'Rate limit exceeded. Please wait a moment before sending another message.';
                case 500:
                case 502:
                case 503:
                    return 'AI service is temporarily unavailable. Please try again in a moment.';
                default:
                    return error.message || 'An error occurred while processing your request.';
            }
        }
        
        if (error.message.includes('fetch') || error.name === 'TypeError') {
            return 'Network error. Please check your internet connection and try again.';
        }
        
        return error.message || 'An unexpected error occurred. Please try again.';
    }
}

// Custom error class for API errors
class APIError extends Error {
    constructor(status, message, data = {}) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

// Export for use in other modules
window.AIService = AIService;
window.APIError = APIError;