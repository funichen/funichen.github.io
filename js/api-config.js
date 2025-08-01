// API Configuration
// IMPORTANT: This file contains your API key. 
// Make sure to add this file to .gitignore if you don't want it public
// For personal websites, this is usually acceptable since you control the usage

const API_CONFIG = {
    GEMINI_API_KEY: (typeof window !== 'undefined' && window.ENV?.GEMINI_API_KEY) || "" // Use environment variable from window.ENV
};

// Debug logging (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('API Config Debug:', {
        hasWindow: typeof window !== 'undefined',
        hasENV: typeof window !== 'undefined' && !!window.ENV,
        hasAPIKey: typeof window !== 'undefined' && !!window.ENV?.GEMINI_API_KEY,
        keyLength: API_CONFIG.GEMINI_API_KEY ? API_CONFIG.GEMINI_API_KEY.length : 0,
        keyStartsWith: API_CONFIG.GEMINI_API_KEY ? API_CONFIG.GEMINI_API_KEY.substring(0, 4) : 'N/A'
    });
}

// Check if API key is properly configured
if (!API_CONFIG.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY is not configured. Please check:');
    console.warn('1. GitHub repository secrets are properly set');
    console.warn('2. GitHub Actions workflow has run successfully');
    console.warn('3. The deployment includes the updated env-config.js file');
}

// Export for use in other modules
window.API_CONFIG = API_CONFIG;