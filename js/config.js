// Configuration Manager for the AI Chatbot
class ConfigManager {
    constructor() {
        this.config = this.getDefaultConfig();
        this.loadConfig();
        // Set the system prompt after config is initialized
        this.config.ai.systemPrompt = this.buildSystemPrompt();
    }

    getDefaultConfig() {
        return {
            personal: {
                name: "Funi Chen, M.D., MHI",
                title: "Data & AI Leader with Clinical Insight",
                bio: "Data & AI Leader with a foundation in complex, high-stakes problem-solving. Proven track record of building and leading high-performing engineering teams at Amazon and Providence. Expert in architecting scalable data platforms, AI-driven analytics solutions, and cloud-native systems (AWS, Azure, Snowflake). Adept at translating ambiguous business challenges into robust, data-driven strategy and execution. Uniquely positioned to bridge the gap between complex clinical/business challenges and cutting-edge data strategy.",
                skills: [
                    // Leadership & Strategy
                    "Team Building & Talent Development", "Agile/Scrum Methodologies", "Technical Project & Program Management",
                    "Data Strategy & Governance", "Stakeholder Engagement & Executive Communication", "Cross-Functional Collaboration",
                    "Healthcare Informatics", "Value-Based Care Analytics", "Clinical & Pharmacy Data Analysis",
                    // Cloud & Big Data
                    "AWS", "Azure", "Snowflake", "Databricks",
                    // Data Engineering & AI/ML
                    "Data Modeling", "ETL/ELT Architecture", "Distributed Data Systems", "Spark", "Kafka", "Airflow",
                    "AI/ML Pipeline Development", "Natural Language Processing (NLP)", "SQL", "Python", "PySpark", "Scala", "JavaScript",
                    // Analytics & Visualization
                    "Power BI", "Tableau", "QuickSight", "ThoughtSpot"
                ],
                projects: [
                    {
                        name: "SquishyDuck - Stress Relief App",
                        description: "A Flutter app designed to help users manage stress through interactive duck activities and relaxation techniques with beautiful, customizable themes",
                        technologies: ["Flutter", "Dart", "SharedPreferences", "AudioPlayers", "Custom UI"],
                        status: "Published",
                        highlights: ["Interactive balloon popping game", "Squeeze ball with realistic physics", "Guided breathing exercises", "5 customizable themes", "Usage analytics", "Cross-platform support"]
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
                    email: "chan.funi@gmail.com",
                    phone: "425-295-1460",
                    website: "https://funichen.github.io",
                    linkedin: "https://www.linkedin.com/in/funichen/"
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
                experience: [
                    {
                        company: "Amazon Pharmacy",
                        position: "Sr. Business Intelligence Engineer, Team Lead",
                        duration: "April 2024 - Present",
                        location: "Seattle, WA",
                        description: "Direct a team of 6 engineers in architecting and delivering critical data infrastructure across Amazon Pharmacy",
                        achievements: [
                            "Drove >30% productivity gain through strategic implementation of agile practices",
                            "Spearheaded development of AI-driven, natural-language analytics platform empowering 50+ business leaders",
                            "Reduced data analysis turnaround from days to seconds while maintaining strict data governance",
                            "Designed scalable Hub & Prescriber Analytics platform consolidating multiple siloed data sources",
                            "Improved partner reporting efficiency by ~30% and saved ~15 hours/week in operational overhead",
                            "Unified dashboards across 5 teams into single source-of-truth QuickSight environment"
                        ],
                        technologies: ["AWS", "Vibe Coding", "QuickSight", "ETL/Cradle", "Data Modeling", "AI/ML", "Natural Language Processing"]
                    },
                    {
                        company: "Providence Health & Services",
                        position: "Engineering Manager, Value Based Care Analytics",
                        duration: "April 2023 - April 2024",
                        location: "Seattle, WA",
                        description: "Managed multi-disciplinary team of 5 to build greenfield, modular data platform for value-based care financial reporting",
                        achievements: [
                            "Owned complete development lifecycle from strategic roadmap to deployment standards",
                            "Improved team velocity by 30% through best-in-class code review and deployment practices",
                            "Directed successful migration to modern Azure/Snowflake data stack",
                            "Reduced data latency and storage costs by over 40% for mission-critical financial P&L reporting",
                            "Collaborated with executive leaders for strategic planning and opportunity identification"
                        ],
                        technologies: ["Azure", "Snowflake", "Data Architecture", "Product Management", "Engineer Management", "Team Leadership"]
                    },
                    {
                        company: "Amazon Care",
                        position: "Sr. Business Intelligence Engineer, Team Lead",
                        duration: "April 2022 - March 2023",
                        location: "Seattle, WA",
                        description: "Led Quality Analytics team to design scalable data infrastructure for clinical quality programs and population health analysis",
                        achievements: [
                            "Implemented coordinated method for patient-centric data collection and storage",
                            "Achieved 40% increase in real-time decision making and provider performance reporting",
                            "Led automation development for global benefits utilization reporting with 65% efficiency increase",
                            "Mentored junior engineers resulting in 30% productivity increase",
                            "Collaborated with executive leaders, medical directors, and third-party vendors"
                        ],
                        technologies: ["AWS", "Clinical Data Systems", "Population Health Analytics", "Real-time Data Processing"]
                    },
                    {
                        company: "Providence Health & Services",
                        position: "Principal Data Engineer, Tech Lead / Sr. Data Engineer",
                        duration: "August 2017 - April 2022",
                        location: "Seattle, WA",
                        description: "Directed 6-engineer team to deploy production-level, ML-driven pipelines for clinical intervention protocols",
                        achievements: [
                            "Deployed ML-driven pipelines to predict post-chemotherapy risk, directly influencing clinical protocols",
                            "Built critical workflows automating data ingestion into Azure/Snowflake with 75% accuracy increase",
                            "Adopted Agile methodology for Sepsis, Cardiovascular, and Cancer data explorers",
                            "Achieved 35% reduction in project timelines and 60% increase in data availability for 51 hospitals",
                            "Collaborated with Clinical and Administrative Leaders on large clinical data stores evaluation"
                        ],
                        technologies: ["Azure", "Snowflake", "Databricks", "Data Modeling", "Machine Learning", "Clinical Data", "Spark", "Python", "SQL" ,"Tableau"]
                    }
                ],
                education: [
                    {
                        institution: "University of Washington",
                        degree: "Master of Health Informatics (MHI)",
                        duration: "Completed",
                        location: "Seattle, WA",
                        relevantCourses: ["Health Data Analytics", "Clinical Decision Support", "Healthcare Information Systems", "Data Science Methods"]
                    },
                    {
                        institution: "Southern Medical University",
                        degree: "Doctor of Medicine (M.D.)",
                        duration: "Completed",
                        location: "China",
                        relevantCourses: ["Clinical Medicine", "Medical Research", "Healthcare Systems", "Patient Care"]
                    }
                ],
                certifications: [
                    {
                        name: "Data Science Certification",
                        issuer: "University of Washington",
                        date: "Completed with MHI degree",
                        description: "Advanced data science methods and healthcare analytics"
                    },
                    {
                        name: "AWS Cloud Practitioner",
                        issuer: "Amazon Web Services",
                        date: "Professional Experience",
                        description: "Extensive hands-on experience with AWS services in production environments"
                    }
                ],
                languages: [
                    {
                        language: "English",
                        proficiency: "Professional"
                    },
                    {
                        language: "Mandarin Chinese",
                        proficiency: "Native"
                    }
                ],
                philosophy: "I believe technology should empower people and solve real-world problems. I'm always excited to collaborate on projects that make a positive impact.",
                currentFocus: "Currently exploring AI integration in web applications and building tools that help developers be more productive.",
                availability: "Open to interesting projects and collaboration opportunities!"
            },
            ai: {
                // API key will be loaded from API config
                apiKey: "", 
                model: "gemini-2.0-flash",
                baseUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                maxTokens: 500,
                temperature: 0.7,
                systemPrompt: "", // Will be set after initialization
                provider: "gemini"
            },
            ui: {
                theme: "default",
                position: "bottom-right",
                colors: {
                    primary: "#9B8B7A",      // Morandi brown
                    secondary: "#A8998A",    // Morandi warm gray
                    accent: "#B5A394",       // Morandi beige
                    background: "#F5F3F0",   // Morandi off-white
                    text: "#5D5A56"          // Morandi dark gray
                },
                animations: true,
                welcomeMessage: "Hi! I'm Funi's AI assistant. I can tell you about her background, projects, and skills. What would you like to know?"
            }
        };
    }

    buildSystemPrompt() {
        const personal = this.config?.personal || this.getDefaultConfig().personal;
        
        return `You are Funi Chen's AI assistant. Funi is a Data & AI Leader with Clinical Insight, currently working as Sr. Business Intelligence Engineer at Amazon Pharmacy.

Key Info:
- Name: ${personal.name}
- Title: ${personal.title}
- Bio: ${personal.bio}
- Contact: GitHub (${personal.contact.github}), LinkedIn (${personal.contact.linkedin})

Main Skills: ${personal.skills.slice(0, 10).join(', ')}

Current Role: ${personal.experience[0].position} at ${personal.experience[0].company}

Projects: ${personal.projects.map(p => `${p.name} (${p.status})`).join(', ')}

Respond as Funi's helpful AI assistant. Be friendly, professional, and encourage visitors to explore Funi's GitHub and LinkedIn profiles. Keep responses concise and informative.`;
    }

    loadConfig() {
        try {
            const savedConfig = localStorage.getItem('chatbot-config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                // Deep merge to preserve default values
                this.config = this.deepMerge(this.config, parsed);
            }
        } catch (error) {
            console.warn('Failed to load saved configuration:', error);
        }
    }

    // Deep merge helper to preserve nested default values
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
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
        // Return a complete API configuration object that AIService expects
        return {
            apiKey: this.config.ai.apiKey,
            model: this.config.ai.model,
            baseUrl: this.config.ai.baseUrl,
            maxTokens: this.config.ai.maxTokens,
            temperature: this.config.ai.temperature,
            provider: this.config.ai.provider
        };
    }

    getUIConfig() {
        return this.config.ui;
    }

    // Method to check if API key is configured
    isAPIConfigured() {
        return this.config.ai.apiKey && 
               this.config.ai.apiKey.trim() !== '' && 
               this.config.ai.apiKey !== 'YOUR_GEMINI_API_KEY_HERE';
    }

    // Method to set API key (should be called by user)
    setAPIKey(apiKey) {
        this.config.ai.apiKey = apiKey;
        this.saveConfig();
    }

    // Method to load API key from environment (should be called after initialization)
    loadAPIKey() {
        if (window.API_CONFIG && window.API_CONFIG.GEMINI_API_KEY) {
            this.config.ai.apiKey = window.API_CONFIG.GEMINI_API_KEY;
            // Only log in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('API key loaded from environment configuration');
            }
        } else {
            console.warn('No API key found in environment configuration');
        }
        
        // Validate that essential config is present after loading
        if (!this.config.ai.baseUrl || !this.config.ai.model) {
            console.warn('Invalid AI configuration detected, resetting to defaults');
            this.config.ai = this.getDefaultConfig().ai;
            this.config.ai.apiKey = window.API_CONFIG?.GEMINI_API_KEY || '';
        }
    }
}

// Export for use in other modules
window.ConfigManager = ConfigManager;