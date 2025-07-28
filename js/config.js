// Configuration Manager for the AI Chatbot
class ConfigManager {
    constructor() {
        this.config = this.getDefaultConfig();
        this.loadConfig();
    }

    getDefaultConfig() {
        return {
            personal: {
                name: "Funichen",
                title: "Developer & Creator",
                bio: "I'm a passionate developer who loves creating innovative solutions and exploring new technologies. I enjoy working on both frontend and backend projects, with a particular interest in AI integration and user experience design.",
                skills: [
                    "JavaScript", "Python", "React", "Node.js", 
                    "Flutter", "Dart", "AI Integration", "Web Development",
                    "Mobile Development", "UI/UX Design"
                ],
                projects: [
                    {
                        name: "Kids Time Manager",
                        description: "A Flutter application for managing children's screen time and activities",
                        technologies: ["Flutter", "Dart"],
                        status: "In Development"
                    },
                    {
                        name: "AI Chatbot for GitHub Pages",
                        description: "A client-side AI chatbot that can be easily deployed on GitHub Pages",
                        technologies: ["JavaScript", "HTML", "CSS", "AI APIs"],
                        status: "Current Project"
                    }
                ],
                contact: {
                    github: "https://github.com/funichen",
                    email: "[email]",
                    website: "https://funichen.github.io"
                },
                interests: [
                    "Artificial Intelligence", "Web Development", "Mobile Apps",
                    "Open Source", "Technology Innovation", "User Experience"
                ]
            },
            ai: {
                // Note: API key should be provided by user for security
                apiKey: "", 
                model: "gpt-3.5-turbo",
                baseUrl: "https://api.openai.com/v1/chat/completions",
                maxTokens: 500,
                temperature: 0.7,
                systemPrompt: this.getSystemPrompt()
            },
            ui: {
                theme: "default",
                position: "bottom-right",
                colors: {
                    primary: "#2563eb",
                    secondary: "#1d4ed8",
                    background: "#ffffff",
                    text: "#333333"
                },
                animations: true,
                welcomeMessage: "Hi! I'm Funichen's AI assistant. I can tell you about their background, projects, and skills. What would you like to know?"
            }
        };
    }

    getSystemPrompt() {
        return `You are an AI assistant representing Funichen, a developer and creator. You should respond in a friendly, professional manner as if you are speaking on behalf of Funichen.

Key information about Funichen:
- Name: Funichen
- Title: Developer & Creator
- Passionate about creating innovative solutions and exploring new technologies
- Works on both frontend and backend projects
- Particularly interested in AI integration and user experience design
- Skills include: JavaScript, Python, React, Node.js, Flutter, Dart, AI Integration, Web Development, Mobile Development, UI/UX Design
- Currently working on projects like Kids Time Manager (Flutter app) and this AI Chatbot for GitHub Pages
- Interests: Artificial Intelligence, Web Development, Mobile Apps, Open Source, Technology Innovation, User Experience

Guidelines for responses:
1. Always respond as if you are representing Funichen
2. Be helpful, friendly, and professional
3. Focus on Funichen's technical skills and projects when relevant
4. If asked about topics outside of Funichen's expertise, politely redirect to relevant topics or provide general assistance
5. Keep responses concise but informative
6. Encourage visitors to explore Funichen's projects and get in touch for collaboration
7. If asked about contact information, direct them to GitHub or suggest they can reach out through the website

Remember: You are an AI assistant helping visitors learn about Funichen and their work. Stay in character and be helpful!`;
    }

    loadConfig() {
        try {
            const savedConfig = localStorage.getItem('chatbot-config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                this.config = { ...this.config, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load saved configuration:', error);
        }
    }

    saveConfig() {
        try {
            localStorage.setItem('chatbot-config', JSON.stringify(this.config));
        } catch (error) {
            console.warn('Failed to save configuration:', error);
        }
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.saveConfig();
    }

    getPersonalInfo() {
        return this.config.personal;
    }

    getSystemPrompt() {
        return this.config.ai.systemPrompt;
    }

    getAPIConfig() {
        return this.config.ai;
    }

    getUIConfig() {
        return this.config.ui;
    }

    // Method to check if API key is configured
    isAPIConfigured() {
        return this.config.ai.apiKey && this.config.ai.apiKey.trim() !== '';
    }

    // Method to set API key (should be called by user)
    setAPIKey(apiKey) {
        this.config.ai.apiKey = apiKey;
        this.saveConfig();
    }
}

// Export for use in other modules
window.ConfigManager = ConfigManager;