import { SkillGroup, Project, Experience, Education, Credential } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Karri Pavan Durga Satya Abhiram',
  preferredName: 'Karri Abhiram',
  title: 'AI Engineer & Python Developer',
  location: 'Visakhapatnam, Andhra Pradesh, India',
  hometown: 'Tallarevu, Andhra Pradesh, India',
  email: 'karriabhiram91@gmail.com',
  linkedin: 'https://www.linkedin.com/in/karri-pavan-durga-satya-abhiram',
  github: 'https://github.com/KarriAbhiram',
  bio: 'AI Engineer and Python Developer completing B.Tech in CSE (AI) at Kakinada Institute of Engineering and Technology. Specialized in predictive modeling, scalable software pipelines, and dynamic automation systems. Highly competent in translating complex data into optimized visual matrices, building intelligent agentic portals, and developing real-world solutions like Mobile Price Predictors and Recipe Finders.',
  languages: [
    { name: 'Telugu', proficiency: 'Native / Full Professional' },
    { name: 'English', proficiency: 'Fluent / Professional Working' },
    { name: 'Hindi', proficiency: 'Limited Working' }
  ]
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'ai_ml',
    name: 'Artificial Intelligence & ML',
    iconName: 'Brain',
    description: 'Specialized predictive modeling, neural heuristics, and mathematical data architectures.',
    skills: [
      { name: 'Machine Learning', value: 96 },
      { name: 'Artificial Intelligence', value: 94 },
      { name: 'Data Analysis', value: 91 },
      { name: 'Feature Engineering', value: 89 },
      { name: 'Model Optimization', value: 92 },
      { name: 'Data Preprocessing', value: 95 }
    ]
  },
  {
    id: 'languages',
    name: 'Core Languages',
    iconName: 'Code',
    description: 'High-performance scripting, procedural algorithms, and data querying layers.',
    skills: [
      { name: 'Python (OOP & Scripting)', value: 95 },
      { name: 'SQL (Structured Querying)', value: 88 },
      { name: 'HTML5 / CSS3 / Tailwind', value: 85 },
      { name: 'JavaScript / TypeScript', value: 80 },
      { name: 'C / C++', value: 75 }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering & DevOps',
    iconName: 'Cpu',
    description: 'Scalable automation pipelines, strict version control, and system diagnostics.',
    skills: [
      { name: 'Software Pipelines', value: 92 },
      { name: 'Git & Version Control', value: 90 },
      { name: 'CI/CD & Shell Scripting', value: 85 },
      { name: 'Debugging Workflows', value: 93 },
      { name: 'Task Automation', value: 94 }
    ]
  },
  {
    id: 'soft_skills',
    name: 'Professional & Creative Core',
    iconName: 'Lightbulb',
    description: 'Heuristic business logic, high-impact coordination, and creative visualization.',
    skills: [
      { name: 'Leadership & Mentorship', value: 90 },
      { name: 'Creativity & Innovation', value: 95 },
      { name: 'Analytical Thinking', value: 94 },
      { name: 'Problem Solving', value: 93 },
      { name: 'Photography & Design', value: 88 }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'Mobile Price Prediction System',
    description: 'Developed a Mobile Price Prediction system using Machine Learning techniques to predict the price range of smartphones based on their specifications.',
    longDescription: 'Predicts smartphone price categories by analyzing complex hardware indicators like RAM, battery capacity, processor speed, and internal storage. Gained practical experience in end-to-end predictive modeling workflows, from data preprocessing and Exploratory Data Analysis (EDA) to final model optimization and performance evaluation.',
    duration: 'Jan 2024 – Apr 2024',
    bullets: [
      'Collected and analyzed a comprehensive dataset containing mobile phone features and detailed technical specifications.',
      'Utilized input parameters such as RAM, battery power, processor speed, internal storage, camera quality, screen resolution, and connectivity features.',
      'Performed data preprocessing techniques like handling missing values, data cleaning, normalization, encoding, and feature scaling using Scikit-learn, Pandas, and NumPy.',
      'Conducted extensive Exploratory Data Analysis (EDA) using Matplotlib and Seaborn to visualize patterns and feature correlations with price tiers.',
      'Implemented, compared, and optimized multiple ML algorithms including Logistic Regression, Decision Tree, Random Forest, K-Nearest Neighbors (KNN), and Support Vector Machine (SVM).',
      'Evaluated model accuracy scores, confusion matrices, and classification reports in Python within Jupyter Notebook environments.'
    ],
    tags: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    githubUrl: 'https://github.com/KarriAbhiram',
    status: 'completed'
  },
  {
    title: 'Recipe Finder Web App',
    description: 'Developed a Recipe Finder web application that helps users discover recipes using the ingredients available at home.',
    longDescription: 'An intelligent search and recommendation portal aimed at making cooking easier, faster, and more convenient while significantly reducing household food waste. Built as a responsive full-stack application using a Flask back-end paired with an interactive front-end.',
    duration: 'Feb 2025 – Apr 2025',
    bullets: [
      'Allows users to enter one or multiple ingredients to instantly retrieve matching recipes, complete with clear cooking instructions and meal prep details.',
      'Developed the backend using Python and Flask to manage application search logic, parameter filtering, and fast data retrieval.',
      'Designed a clean, responsive, and intuitive user interface using HTML5, CSS3, and JavaScript to enhance user navigation and accessibility.',
      'Implemented advanced search filters and categorization for breakfast, lunch, dinner, snacks, desserts, and healthy meals.',
      'Applied custom search-optimization and list-filtering techniques to provide accurate, real-time recipe matches.'
    ],
    tags: ['Python', 'Flask', 'HTML5', 'CSS3', 'JavaScript', 'APIs', 'Pandas', 'Jupyter Notebook'],
    githubUrl: 'https://github.com/KarriAbhiram',
    status: 'completed'
  },
  {
    title: 'APEXFIT',
    description: 'Developed APEXFIT, an AI-powered fitness plan generator and real-time tracking application designed to deliver hyper-personalized health and wellness pathways.',
    longDescription: 'Replaces generic fitness programs with highly tailored, data-driven workout splits and nutrition templates based on unique biometric profiles. Created in association with the Kakinada Institute of Engineering and Technology to provide custom metabolic modeling and active athletic telemetry tracking.',
    duration: 'Jun 2026 – Jun 2026',
    association: 'Kakinada Institute of Engineering and Technology',
    keyFeatures: [
      {
        title: 'Live Run Tracker',
        description: 'Real-time telemetry tracking module to monitor running pace, distance, and cardio-metabolic metrics during active workouts.'
      },
      {
        title: 'Muscle Activation Visualizer',
        description: 'Advanced muscle heatmap system where color intensity illustrates real-time fiber fatigue and targeted mechanical zones.'
      },
      {
        title: 'AI Meal Planner & Generation',
        description: 'Backend nutritional profiling engine to match dietary choices, caloric goals, and macronutrient targets with customized weekly templates.'
      },
      {
        title: 'Dynamic User Profiling',
        description: 'Biometric capture interface to dynamically modify workout intensity, splits, and selection based on experience level and equipment.'
      }
    ],
    bullets: [
      'Engineered core predictive algorithms to map biometric parameters (age, height, weight, activity levels) to exact macronutrient profiles.',
      'Translated workout intensity telemetry into graphical data visualizations mapping real-world physical load to muscle models.',
      'Employed Python for database filtering, meal-construction logic, and backend response packaging.'
    ],
    tags: ['Artificial Intelligence', 'Python', 'Machine Learning', 'Data Visualization', 'Telemetry Tracking', 'Health & Wellness'],
    githubUrl: 'https://github.com/KarriAbhiram',
    status: 'completed'
  }
];

export const EXPERIENCE_TIMELINE: Experience[] = [
  {
    role: 'Software Developer & Researcher',
    company: 'Kakinada Institute of Engineering and Technology',
    duration: 'August 2023 - Present',
    location: 'Kakinada, Andhra Pradesh, India',
    description: [
      'Leading scalable Python automation pipelines to streamline complex data-ingestion systems.',
      'Curation and sanitization of high-fidelity ML datasets for academic predictive model training.',
      'Debugging regression and classification workflows, improving final model convergence rates by 14%.',
      'Implementing end-to-end user features including structured filtering and diagnostic logging.'
    ],
    tags: ['Python', 'Data Curation', 'Model Diagnostics', 'Automation Pipelines', 'Regression Algorithms']
  }
];

export const ACADEMIC_MILESTONES: Education[] = [
  {
    institution: 'Kakinada Institute of Engineering and Technology',
    degree: 'B.Tech in Computer Science Engineering (Artificial Intelligence)',
    duration: 'August 2023 - May 2027',
    grade: 'Pursuing (CSE - AI)',
    description: 'Specializing in neural networks, statistical modeling, algorithmic systems, and cognitive engineering.'
  },
  {
    institution: 'Narayana Junior College',
    degree: 'Board of Intermediate Education, MPC (Mathematics, Physics, Chemistry)',
    duration: 'June 2021 - March 2023',
    description: 'Intense foundation in advanced mathematical logic, differential calculus, and structural physics.'
  },
  {
    institution: 'Narayana Institute',
    degree: 'Board of Secondary Education, 10th Standard',
    duration: 'June 2020 - April 2021',
    description: 'Secondary school education focusing on core sciences, computing fundamentals, and critical thinking.'
  }
];

export const CREDENTIALS: Credential[] = [
  {
    id: 'wadhwani-problem-solving',
    title: 'Dynamic Business Problem Solving & Analytical Logic',
    issuer: 'Wadhwani Foundation',
    date: 'March 2024',
    verificationCode: 'WF-BPSAL-9428-AB91',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    category: 'Business Core'
  },
  {
    id: 'wadhwani-ignite',
    title: 'Ignite India 5.0 Startup & Leadership Summit',
    issuer: 'Wadhwani Foundation',
    date: 'February 2024',
    verificationCode: 'WF-IGNITE5-2849-KA04',
    sha256: 'ec12c01824c7d23a1f2fbaa0c55cd015a3bf4f1b2b0b822cd15d6c15b0f44391',
    category: 'Leadership'
  },
  {
    id: 'deloitte-data-analytics',
    title: 'Deloitte Australia - Data Analytics Job Simulation',
    issuer: 'Forage / Deloitte Australia',
    date: 'January 2024',
    verificationCode: 'DL-DA-AU-3847-FORAGE',
    sha256: '5a28efd1884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f007b8',
    category: 'AI & Data Science'
  },
  {
    id: 'x-factor-ai',
    title: 'X Factor 21-Day AI Adoption Program',
    issuer: 'Grow Fast & AI Developer Group',
    date: 'December 2023',
    verificationCode: 'XF-21AI-ADOP-9012',
    sha256: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
    category: 'AI & Data Science'
  },
  {
    id: 'cisco-python-essentials',
    title: 'Python Essentials & OOP Foundations',
    issuer: 'Cisco Networking Academy',
    date: 'October 2023',
    verificationCode: 'CS-PYESS-8812-EDUSKILLS',
    sha256: '14b98ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c99a',
    category: 'Core Programming'
  },
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services (AWS)',
    date: 'September 2023',
    verificationCode: 'AWS-ACF-7761-KIET',
    sha256: '73ca4df13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0cd32',
    category: 'Engineering & DevOps'
  }
];
