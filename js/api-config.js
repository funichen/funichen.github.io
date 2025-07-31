// API Configuration
// IMPORTANT: This file contains your API key. 
// Make sure to add this file to .gitignore if you don't want it public
// For personal websites, this is usually acceptable since you control the usage

const API_CONFIG = {
    GEMINI_API_KEY: (typeof window !== 'undefined' && window.ENV?.GEMINI_API_KEY) || "" // Use environment variable from window.ENV
};

// Export for use in other modules
window.API_CONFIG = API_CONFIG;