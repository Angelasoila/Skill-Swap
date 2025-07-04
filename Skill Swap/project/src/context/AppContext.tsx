import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authAPI, progressAPI } from '../services/api';
import socketService from '../services/socket';

// Types
export interface SkillWithProficiency {
  name: string;
  proficiency: 'junior' | 'intermediate' | 'senior';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skillsHave: SkillWithProficiency[];
  skillsWant: SkillWithProficiency[];
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  timezone: string;
  bio: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  modules: SkillModule[];
  totalLessons: number;
}

export interface SkillModule {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: Quiz;
  completed: boolean;
  xpReward: number;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Match {
  id: string;
  user: User;
  compatibility: number;
  sharedSkills: string[];
  reason: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  skill: string;
  likes: number;
  replies: number;
  timestamp: Date;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  skills: Skill[];
  userProgress: Record<string, number>;
  matches: Match[];
  messages: Message[];
  forumPosts: ForumPost[];
  darkMode: boolean;
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_PROGRESS'; payload: Record<string, number> }
  | { type: 'COMPLETE_LESSON'; payload: { skillId: string; lessonId: string; xp: number } }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'UPDATE_STREAK'; payload: number }
  | { type: 'SET_MATCHES'; payload: Match[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_FORUM_POSTS'; payload: ForumPost[] }
  | { type: 'ADD_FORUM_POST'; payload: ForumPost }
  | { type: 'TOGGLE_DARK_MODE' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  skills: [],
  userProgress: {},
  matches: [],
  messages: [],
  forumPosts: [],
  darkMode: localStorage.getItem('skillswap_theme') === 'dark',
  loading: false,
  error: null
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loadUserProgress: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loadUserProgress: async () => {}
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userProgress: {},
        matches: [],
        messages: []
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    case 'SET_PROGRESS':
      return {
        ...state,
        userProgress: action.payload
      };
    case 'COMPLETE_LESSON':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          xp: state.user.xp + action.payload.xp
        } : null,
        userProgress: {
          ...state.userProgress,
          [action.payload.skillId]: (state.userProgress[action.payload.skillId] || 0) + 1
        }
      };
    case 'ADD_BADGE':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          badges: [...state.user.badges, action.payload]
        } : null
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          streak: action.payload
        } : null
      };
    case 'SET_MATCHES':
      return {
        ...state,
        matches: action.payload
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'SET_FORUM_POSTS':
      return {
        ...state,
        forumPosts: action.payload
      };
    case 'ADD_FORUM_POST':
      return {
        ...state,
        forumPosts: [action.payload, ...state.forumPosts]
      };
    case 'TOGGLE_DARK_MODE':
      const newDarkMode = !state.darkMode;
      localStorage.setItem('skillswap_theme', newDarkMode ? 'dark' : 'light');
      return {
        ...state,
        darkMode: newDarkMode
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing auth token on app load
  useEffect(() => {
    const token = localStorage.getItem('skillswap_token');
    if (token) {
      authAPI.getProfile()
        .then(response => {
          dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
          socketService.connect(response.data.id);
          loadUserProgress();
        })
        .catch(() => {
          localStorage.removeItem('skillswap_token');
        });
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.login(credentials);
      
      localStorage.setItem('skillswap_token', response.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      
      socketService.connect(response.data.user.id);
      await loadUserProgress();
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Login failed' 
      });
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.register(userData);
      
      localStorage.setItem('skillswap_token', response.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      
      socketService.connect(response.data.user.id);
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Registration failed' 
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('skillswap_token');
    socketService.disconnect();
    dispatch({ type: 'LOGOUT' });
  };

  const loadUserProgress = async () => {
    try {
      const response = await progressAPI.getProgress();
      dispatch({ type: 'SET_PROGRESS', payload: response.data });
    } catch (error) {
      console.error('Failed to load user progress:', error);
    }
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch, 
      login, 
      register, 
      logout, 
      loadUserProgress 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}