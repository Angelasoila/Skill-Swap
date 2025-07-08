// Enhanced mock data with skill levels and better matching
export const mockSkills = [
  {
    name: 'React Development',
    icon: '⚛️',
    progress: 15,
    totalLessons: 25,
    xp: 450,
    level: 3,
    timeSpent: 12,
    difficulty: 'Intermediate' as const,
    category: 'Frontend'
  },
  {
    name: 'Python Fundamentals',
    icon: '🐍',
    progress: 8,
    totalLessons: 20,
    xp: 280,
    level: 2,
    timeSpent: 8,
    difficulty: 'Beginner' as const,
    category: 'Programming'
  },
  {
    name: 'UI/UX Design',
    icon: '🎨',
    progress: 12,
    totalLessons: 18,
    xp: 320,
    level: 2,
    timeSpent: 10,
    difficulty: 'Intermediate' as const,
    category: 'Design'
  },
  {
    name: 'Node.js Backend',
    icon: '🚀',
    progress: 6,
    totalLessons: 22,
    xp: 180,
    level: 1,
    timeSpent: 5,
    difficulty: 'Advanced' as const,
    category: 'Backend'
  },
  {
    name: 'Data Science',
    icon: '📊',
    progress: 10,
    totalLessons: 30,
    xp: 350,
    level: 2,
    timeSpent: 15,
    difficulty: 'Advanced' as const,
    category: 'Analytics'
  },
  {
    name: 'Mobile Development',
    icon: '📱',
    progress: 4,
    totalLessons: 16,
    xp: 120,
    level: 1,
    timeSpent: 3,
    difficulty: 'Beginner' as const,
    category: 'Mobile'
  }
];

export const mockLearningPartners = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    rating: 4.9,
    xp: 5200,
    matchScore: 92,
    location: 'San Francisco, CA',
    responseTime: 'within 2 hours',
    online: true,
    level: 'Senior',
    teaches: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js'],
    wants: ['Machine Learning', 'Python', 'Data Science'],
    bio: 'Senior Frontend Engineer with 6+ years experience. Love teaching React patterns and helping junior developers grow.',
    badges: ['Top Mentor', 'React Expert', 'Community Leader']
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    avatar: 'AR',
    rating: 4.7,
    xp: 3800,
    matchScore: 85,
    location: 'Austin, TX',
    responseTime: 'within 1 hour',
    online: false,
    level: 'Intermediate',
    teaches: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    wants: ['React', 'Frontend Development', 'UI/UX Design'],
    bio: 'Full-stack developer passionate about Python and web development. Always eager to learn new frontend technologies.',
    badges: ['Python Pro', 'Backend Specialist']
  },
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'ET',
    rating: 4.8,
    xp: 4100,
    matchScore: 78,
    location: 'London, UK',
    responseTime: 'within 4 hours',
    online: true,
    level: 'Senior',
    teaches: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Design Systems'],
    wants: ['React', 'CSS-in-JS', 'Animation'],
    bio: 'UX Designer with a passion for creating beautiful, accessible interfaces. Love collaborating with developers.',
    badges: ['Design Master', 'Accessibility Advocate']
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'DK',
    rating: 4.6,
    xp: 2900,
    matchScore: 73,
    location: 'Seoul, South Korea',
    responseTime: 'within 3 hours',
    online: true,
    level: 'Junior',
    teaches: ['JavaScript', 'HTML/CSS', 'Git', 'Responsive Design'],
    wants: ['React', 'Node.js', 'Database Design', 'DevOps'],
    bio: 'Junior developer eager to learn and share knowledge. Strong foundation in web fundamentals.',
    badges: ['Rising Star', 'JavaScript Enthusiast']
  },
  {
    id: '5',
    name: 'Maria Gonzalez',
    avatar: 'MG',
    rating: 4.9,
    xp: 6500,
    matchScore: 88,
    location: 'Barcelona, Spain',
    responseTime: 'within 1 hour',
    online: false,
    level: 'Senior',
    teaches: ['Data Science', 'Machine Learning', 'Python', 'R', 'SQL'],
    wants: ['Web Development', 'React', 'Data Visualization'],
    bio: 'Data Scientist with 8+ years experience. Specializing in ML algorithms and statistical analysis.',
    badges: ['Data Expert', 'ML Specialist', 'Research Pioneer']
  },
  {
    id: '6',
    name: 'James Wilson',
    avatar: 'JW',
    rating: 4.5,
    xp: 3200,
    matchScore: 81,
    location: 'Toronto, Canada',
    responseTime: 'within 5 hours',
    online: true,
    level: 'Intermediate',
    teaches: ['Mobile Development', 'React Native', 'Flutter', 'iOS'],
    wants: ['Backend Development', 'Node.js', 'Cloud Architecture'],
    bio: 'Mobile developer passionate about cross-platform development and user experience.',
    badges: ['Mobile Master', 'Cross-Platform Pro']
  }
];

export const mockChats = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    lastMessage: 'Great question about React hooks! Let me explain...',
    timestamp: '2m ago',
    online: true,
    unread: 2,
    skills: ['React', 'TypeScript']
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    avatar: 'AR',
    lastMessage: 'The Python tutorial you shared was really helpful',
    timestamp: '1h ago',
    online: false,
    unread: 0,
    skills: ['Python', 'Django']
  },
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'ET',
    lastMessage: 'I love the design concepts you\'re working on',
    timestamp: '3h ago',
    online: true,
    unread: 1,
    skills: ['UI/UX', 'Figma']
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'DK',
    lastMessage: 'Thanks for the code review!',
    timestamp: '1d ago',
    online: false,
    unread: 0,
    skills: ['JavaScript', 'React']
  }
];

export const mockChatMessages = {
  '1': {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    online: true,
    messages: [
      {
        id: '1',
        content: 'Hi! I saw you\'re learning React. Happy to help with any questions!',
        timestamp: '10:30 AM',
        isMe: false
      },
      {
        id: '2',
        content: 'That would be amazing! I\'m struggling with useEffect dependencies.',
        timestamp: '10:32 AM',
        isMe: true
      },
      {
        id: '3',
        content: 'Great question! useEffect dependencies are crucial for preventing infinite loops. Let me explain...',
        timestamp: '10:35 AM',
        isMe: false
      },
      {
        id: '4',
        content: 'Thanks! This is really helpful. Do you have any resources you\'d recommend?',
        timestamp: '10:40 AM',
        isMe: true
      }
    ]
  }
};

export function getMockChatById(id: string) {
  return mockChatMessages[id as keyof typeof mockChatMessages] || null;
}

export const mockForumPosts = [
  {
    id: '1',
    title: 'Best practices for React state management in 2024?',
    author: 'CodeNewbie123',
    avatar: 'CN',
    content: 'I\'m working on a medium-sized React application and wondering about the best approaches for state management. Should I stick with useState/useContext, or move to Redux Toolkit, or try Zustand?',
    timestamp: '2 hours ago',
    likes: 24,
    replies: 8,
    category: 'react',
    tags: ['React', 'State Management', 'Redux', 'Zustand'],
    solved: false
  },
  {
    id: '2',
    title: 'How to transition from junior to mid-level developer?',
    author: 'AspiringSE',
    avatar: 'AS',
    content: 'I\'ve been working as a junior developer for about a year now. What skills and experiences should I focus on to make the transition to mid-level? Any advice from those who\'ve been through this journey?',
    timestamp: '5 hours ago',
    likes: 42,
    replies: 15,
    category: 'javascript',
    tags: ['Career', 'Professional Development', 'Advice'],
    solved: true
  },
  {
    id: '3',
    title: 'Python vs JavaScript for beginners - which to choose?',
    author: 'TechMentor',
    avatar: 'TM',
    content: 'I often get asked this question by people just starting their programming journey. Both languages have their merits, but the choice depends on your goals. Let me break down the considerations...',
    timestamp: '1 day ago',
    likes: 67,
    replies: 23,
    category: 'python',
    tags: ['Python', 'JavaScript', 'Beginners', 'Programming'],
    solved: false
  },
  {
    id: '4',
    title: 'Understanding async/await in JavaScript',
    author: 'DevExplorer',
    avatar: 'DE',
    content: 'Asynchronous programming can be tricky for newcomers. Here\'s a comprehensive guide to understanding Promises, async/await, and how to handle asynchronous operations effectively.',
    timestamp: '2 days ago',
    likes: 89,
    replies: 12,
    category: 'javascript',
    tags: ['JavaScript', 'Async Programming', 'Tutorial'],
    solved: true
  },
  {
    id: '5',
    title: 'Best UI/UX design patterns for 2024',
    author: 'DesignGuru',
    avatar: 'DG',
    content: 'Let\'s discuss the most effective design patterns that are trending this year. From micro-interactions to accessibility-first design approaches.',
    timestamp: '3 days ago',
    likes: 156,
    replies: 31,
    category: 'design',
    tags: ['UI/UX', 'Design Patterns', 'Accessibility'],
    solved: false
  },
  {
    id: '6',
    title: 'DevOps best practices for small teams',
    author: 'CloudMaster',
    avatar: 'CM',
    content: 'Working in a startup with limited resources? Here are essential DevOps practices that won\'t overwhelm your small development team.',
    timestamp: '4 days ago',
    likes: 73,
    replies: 18,
    category: 'devops',
    tags: ['DevOps', 'CI/CD', 'Docker', 'AWS'],
    solved: true
  },
  {
    id: '7',
    title: 'Introduction to Machine Learning with Python',
    author: 'MLExpert',
    avatar: 'ML',
    content: 'A beginner-friendly guide to getting started with machine learning using Python. We\'ll cover scikit-learn, pandas, and basic algorithms.',
    timestamp: '5 days ago',
    likes: 234,
    replies: 45,
    category: 'machine-learning',
    tags: ['Machine Learning', 'Python', 'Data Science', 'Tutorial'],
    solved: false
  }
];

export function filterForumPostsByCategory(category: string) {
  if (category === 'all') {
    return mockForumPosts;
  }
  
  return mockForumPosts.filter(post => 
    post.category === category || 
    post.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
  );
}

export function searchForumPosts(query: string) {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) {
    return mockForumPosts;
  }
  
  return mockForumPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.author.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

export const mockActivities = [
  {
    id: 1,
    type: 'lesson_completed',
    title: 'Completed React Hooks Fundamentals',
    xp: 25,
    timestamp: '2 hours ago',
    description: 'Mastered useState and useEffect patterns',
    color: 'blue'
  },
  {
    id: 2,
    type: 'help_given',
    title: 'Helped Alex with Python debugging',
    xp: 15,
    timestamp: '4 hours ago',
    description: 'Provided solution for async function issue',
    color: 'green'
  },
  {
    id: 3,
    type: 'badge_earned',
    title: 'Earned "React Enthusiast" badge',
    xp: 50,
    timestamp: '1 day ago',
    description: 'Completed 10 React lessons with 90%+ score',
    color: 'yellow'
  },
  {
    id: 4,
    type: 'skill_levelup',
    title: 'Leveled up in JavaScript',
    xp: 30,
    timestamp: '2 days ago',
    description: 'Reached Level 3 in JavaScript fundamentals',
    color: 'purple'
  },
  {
    id: 5,
    type: 'forum_answered',
    title: 'Answered community question',
    xp: 10,
    timestamp: '3 days ago',
    description: 'Helped with CSS flexbox layout issue',
    color: 'teal'
  }
];
