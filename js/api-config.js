// API Configuration
// IMPORTANT: This file contains your API key. 
// Make sure to add this file to .gitignore if you don't want it public
// For personal websites, this is usually acceptable since you control the usage

const API_CONFIG = {
    GEMINI_API_KEY: (typeof window !== 'undefined' && window.ENV?.GEMINI_API_KEY) || "" // Use environment variable from window.ENV
};

// Debug logging
console.log('API Config Debug:', {
    hasWindow: typeof window !== 'undefined',
    hasENV: typeof window !== 'undefined' && !!window.ENV,
    hasAPIKey: typeof window !== 'undefined' && !!window.ENV?.GEMINI_API_KEY,
    keyLength: API_CONFIG.GEMINI_API_KEY ? API_CONFIG.GEMINI_API_KEY.length : 0
});

// Export for use in other modules
window.API_CONFIG = API_CONFIG;