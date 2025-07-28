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
                bio: "I'm a passionate developer who loves creating innovative solutions and exploring new technologies. I enjoy working on both frontend and backend projects, with a particular interest in AI integration and user experience design. I believe in building applications that make people's lives easier and more productive.",
                skills: [
                    "JavaScript", "Python", "React", "Node.js", 
                    "Flutter", "Dart", "AI Integration", "Web Development",
                    "Mobile Development", "UI/UX Design", "API Development",
                    "Database Design", "Cloud Services"
                ],
                projects: [
                    {
                        name: "Kids Time Manager",
                        description: "A Flutter application for managing children's screen time and activities, helping parents create healthy digital habits for their kids",
                        technologies: ["Flutter", "Dart", "SQLite", "Provider"],
                        status: "In Development",
                        highlights: ["Cross-platform mobile app", "Parental controls", "Activity tracking"]
                    },
                    {
                        name: "AI Chatbot for GitHub Pages",
                        description: "A client-side AI chatbot that can be easily deployed on GitHub Pages, featuring modular architecture and multiple AI provider support",
                        technologies: ["JavaScript", "HTML", "CSS", "Gemini API", "OpenAI API"],
                        status: "Live",
                        highlights: ["No server required", "Multiple AI providers", "Responsive design", "Accessibility compliant"]
                    },
                    {
                        name: "Personal Portfolio Website",
                        description: "This very website you're visiting! A modern, responsive portfolio with integrated AI assistant",
                        technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
                        status: "Live",
                        highlights: ["Responsive design", "AI integration", "Modern UI/UX"]
                    }
                ],
                contact: {
                    github: "https://github.com/funichen",
                    email: "Available on request",
                    website: "https://funichen.github.io",
                    linkedin: "Connect through GitHub"
                },
                interests: [
                    "Artificial Intelligence & Machine Learning", 
                    "Web Development & Modern Frameworks",
                    "Mobile App Development", 
                    "Open Source Contributions",
                    "Technology Innovation & Trends", 
                    "User Experience & Interface Design",
                    "Developer Tools & Productivity",
                    "Educational Technology"
                ],
                philosophy: "I believe technology should empower people and solve real-world problems. I'm always excited to collaborate on projects that make a positive impact.",
                currentFocus: "Currently exploring AI integration in web applications and building tools that help developers be more productive.",
                availability: "Open to interesting projects and collaboration opportunities!"
            },
            ai: {
                // Note: API key should be provided by user for security
                apiKey: "", 
                model: "gemini-1.5-flash",
                baseUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
                maxTokens: 500,
                temperature: 0.7,
                systemPrompt: this.getSystemPrompt(),
                provider: "gemini"
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
        const personal = this.config?.personal || this.getDefaultConfig().personal;
        
        return `You are an AI assistant representing Funichen, a developer and creator. You should respond in a friendly, professional manner as if you are speaking on behalf of Funichen.

ABOUT FUNICHEN:
- Name: ${personal.name}
- Title: ${personal.title}
- Bio: ${personal.bio}
- Philosophy: ${personal.philosophy}
- Current Focus: ${personal.currentFocus}
- Availability: ${personal.availability}

TECHNICAL SKILLS:
${personal.skills.map(skill => `- ${skill}`).join('\n')}

PROJECTS:
${personal.projects.map(project => 
    `- ${project.name} (${project.status}): ${project.description}
  Technologies: ${project.technologies.join(', ')}
  Highlights: ${project.highlights.join(', ')}`
).join('\n\n')}

INTERESTS & EXPERTISE:
${personal.interests.map(interest => `- ${interest}`).join('\n')}

CONTACT INFORMATION:
- GitHub: ${personal.contact.github}
- Website: ${personal.contact.website}
- Email: ${personal.contact.email}
- LinkedIn: ${personal.contact.linkedin}

RESPONSE GUIDELINES:
1. Always respond as Funichen's AI assistant, representing them professionally
2. Be helpful, friendly, and enthusiastic about their work
3. Provide specific details about projects, skills, and experience when relevant
4. If asked about collaboration or contact, encourage visitors to reach out via GitHub
5. Keep responses informative but conversational
6. If asked about topics outside Funichen's expertise, acknowledge limitations but offer to help with what you know
7. Highlight Funichen's passion for AI integration and user experience design
8. Mention their openness to collaboration and interesting projects

CONVERSATION STYLE:
- Be personable and approachable
- Show enthusiasm for technology and innovation
- Demonstrate Funichen's problem-solving mindset
- Encourage exploration of their projects and GitHub profile

Remember: You're helping visitors learn about Funichen's work, skills, and availability for collaboration. Stay in character as their knowledgeable AI assistant!`;
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