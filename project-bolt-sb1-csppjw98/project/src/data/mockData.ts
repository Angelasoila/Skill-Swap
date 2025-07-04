import { Skill, User, Match, ForumPost, Badge } from '../context/AppContext';

export const techSkills = [
  // Frontend
  'React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Svelte', 'Next.js', 'Nuxt.js',
  
  // Backend
  'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails',
  
  // Mobile
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin',
  
  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Cassandra', 'DynamoDB',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'Terraform', 'Ansible',
  
  // Data & AI
  'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Apache Spark', 'Tableau', 'Power BI',
  
  // Other
  'GraphQL', 'REST APIs', 'Microservices', 'Blockchain', 'Cybersecurity', 'UI/UX Design', 'Game Development', 'Testing (QA)', 'Agile/Scrum'
];

export const proficiencyLevels = [
  { value: 'junior', label: 'Junior', description: '0-2 years experience, learning fundamentals' },
  { value: 'intermediate', label: 'Intermediate', description: '2-5 years experience, comfortable with most concepts' },
  { value: 'senior', label: 'Senior', description: '5+ years experience, can mentor and lead projects' }
];

export const mockSkills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    description: 'Learn modern React development with hooks and components',
    icon: '⚛️',
    color: 'bg-blue-500',
    totalLessons: 12,
    modules: [
      {
        id: 'react-basics',
        title: 'React Basics',
        completed: false,
        lessons: [
          {
            id: 'jsx-intro',
            title: 'Introduction to JSX',
            content: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.',
            completed: false,
            xpReward: 50,
            quiz: {
              question: 'What does JSX stand for?',
              options: ['JavaScript XML', 'Java Syntax Extension', 'Just Syntax Extension', 'JavaScript Extension'],
              correctAnswer: 0
            }
          },
          {
            id: 'components',
            title: 'Creating Components',
            content: 'Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.',
            completed: false,
            xpReward: 75,
            quiz: {
              question: 'How do you create a functional component in React?',
              options: ['function MyComponent() {}', 'const MyComponent = () => {}', 'Both A and B', 'class MyComponent {}'],
              correctAnswer: 2
            }
          }
        ]
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Master Python programming from basics to advanced concepts',
    icon: '🐍',
    color: 'bg-green-500',
    totalLessons: 15,
    modules: [
      {
        id: 'python-basics',
        title: 'Python Fundamentals',
        completed: false,
        lessons: [
          {
            id: 'variables',
            title: 'Variables and Data Types',
            content: 'Python has various data types including strings, integers, floats, and booleans.',
            completed: false,
            xpReward: 40,
            quiz: {
              question: 'Which of these is a valid Python variable name?',
              options: ['2variable', 'my_variable', 'my-variable', 'class'],
              correctAnswer: 1
            }
          }
        ]
      }
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Containerize applications with Docker',
    icon: '🐳',
    color: 'bg-blue-600',
    totalLessons: 10,
    modules: [
      {
        id: 'docker-basics',
        title: 'Docker Fundamentals',
        completed: false,
        lessons: [
          {
            id: 'containers',
            title: 'Understanding Containers',
            content: 'Containers are lightweight, standalone packages that include everything needed to run an application.',
            completed: false,
            xpReward: 60,
            quiz: {
              question: 'What is the main benefit of using Docker?',
              options: ['Faster development', 'Consistent environments', 'Better security', 'All of the above'],
              correctAnswer: 3
            }
          }
        ]
      }
    ]
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    description: 'Create beautiful and user-friendly interfaces',
    icon: '🎨',
    color: 'bg-purple-500',
    totalLessons: 8,
    modules: [
      {
        id: 'design-principles',
        title: 'Design Principles',
        completed: false,
        lessons: [
          {
            id: 'color-theory',
            title: 'Color Theory Basics',
            content: 'Understanding color relationships and how to use them effectively in design.',
            completed: false,
            xpReward: 45,
            quiz: {
              question: 'Which colors are complementary?',
              options: ['Red and Blue', 'Red and Green', 'Blue and Yellow', 'Green and Purple'],
              correctAnswer: 1
            }
          }
        ]
      }
    ]
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Angela Chen',
  email: 'angela@example.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  skillsHave: [
    { name: 'React', proficiency: 'senior' },
    { name: 'UI/UX Design', proficiency: 'intermediate' }
  ],
  skillsWant: [
    { name: 'Python', proficiency: 'intermediate' },
    { name: 'Docker', proficiency: 'junior' }
  ],
  xp: 1250,
  level: 5,
  streak: 7,
  timezone: 'PST',
  bio: 'Frontend developer passionate about creating beautiful user experiences',
  badges: [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Completed your first lesson',
      icon: '🎯',
      unlockedAt: new Date('2024-01-01')
    },
    {
      id: 'streak-7',
      name: 'Week Warrior',
      description: '7-day learning streak',
      icon: '🔥',
      unlockedAt: new Date('2024-01-07')
    }
  ]
};

export const mockMatches: Match[] = [
  {
    id: '1',
    user: {
      id: '2',
      name: 'Marcus Thompson',
      email: 'marcus@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillsHave: [
        { name: 'Python', proficiency: 'senior' },
        { name: 'Docker', proficiency: 'intermediate' },
        { name: 'AWS', proficiency: 'senior' }
      ],
      skillsWant: [
        { name: 'React', proficiency: 'intermediate' },
        { name: 'UI/UX Design', proficiency: 'junior' }
      ],
      xp: 2100,
      level: 8,
      streak: 12,
      timezone: 'EST',
      bio: 'Backend engineer with DevOps expertise',
      badges: []
    },
    compatibility: 95,
    sharedSkills: ['Python', 'Docker'],
    reason: 'Perfect match! Marcus (Senior Python, Intermediate Docker) can teach you these skills, while you can help him with React & UI/UX Design.'
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Sophia Kim',
      email: 'sophia@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      skillsHave: [
        { name: 'Python', proficiency: 'intermediate' },
        { name: 'Machine Learning', proficiency: 'senior' }
      ],
      skillsWant: [
        { name: 'React', proficiency: 'intermediate' },
        { name: 'TypeScript', proficiency: 'junior' }
      ],
      xp: 1800,
      level: 6,
      streak: 5,
      timezone: 'PST',
      bio: 'Data scientist transitioning to full-stack development',
      badges: []
    },
    compatibility: 87,
    sharedSkills: ['Python'],
    reason: 'Great compatibility! Sophia (Intermediate Python) can help you learn Python while you guide her through React development.'
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    userId: '4',
    userName: 'Alex Rivera',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    title: 'How to handle state management in large React apps?',
    content: 'I\'m working on a complex React application and struggling with state management. Should I use Context API, Redux, or Zustand?',
    skill: 'React',
    likes: 23,
    replies: 8,
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    userId: '5',
    userName: 'Emily Foster',
    userAvatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    title: 'Docker vs Virtual Machines - When to use what?',
    content: 'Can someone explain the key differences and help me understand when to choose Docker containers over VMs?',
    skill: 'Docker',
    likes: 18,
    replies: 12,
    timestamp: new Date('2024-01-14T14:20:00')
  },
  {
    id: '3',
    userId: '6',
    userName: 'David Park',
    userAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    title: 'Best practices for Python code organization?',
    content: 'Looking for advice on structuring Python projects. How do you organize your modules and packages?',
    skill: 'Python',
    likes: 31,
    replies: 15,
    timestamp: new Date('2024-01-13T09:15:00')
  }
];