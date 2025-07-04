import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import Datastore from 'nedb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://bolt.new",
      /^https:\/\/.*\.bolt\.new$/
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Enhanced CORS configuration - MUST be before routes
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bolt.new",
    /^https:\/\/.*\.bolt\.new$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize NeDB databases
const users = new Datastore({ filename: path.join(__dirname, 'data/users.db'), autoload: true });
const progress = new Datastore({ filename: path.join(__dirname, 'data/progress.db'), autoload: true });
const messages = new Datastore({ filename: path.join(__dirname, 'data/messages.db'), autoload: true });
const forumPosts = new Datastore({ filename: path.join(__dirname, 'data/forum.db'), autoload: true });

// Create indexes
users.ensureIndex({ fieldName: 'email', unique: true });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SkillSwap API is running',
    port: process.env.PORT || 5001,
    frontend: 'http://localhost:5173'
  });
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Helper function to generate user ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, skillsHave, skillsWant, timezone, bio } = req.body;
    
    // Check if user exists
    users.findOne({ email }, async (err, existingUser) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
          _id: generateId(),
          name,
          email,
          password: hashedPassword,
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          skillsHave: skillsHave || [],
          skillsWant: skillsWant || [],
          xp: 0,
          level: 1,
          streak: 0,
          timezone: timezone || 'PST',
          bio: bio || '',
          badges: [{
            id: 'welcome',
            name: 'Welcome!',
            description: 'Joined SkillSwap',
            icon: '🎉',
            unlockedAt: new Date()
          }],
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        users.insert(newUser, (err, user) => {
          if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          // Generate token
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
          );

          const userResponse = { ...user };
          delete userResponse.password;

          res.status(201).json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              skillsHave: user.skillsHave,
              skillsWant: user.skillsWant,
              xp: user.xp,
              level: user.level,
              streak: user.streak,
              timezone: user.timezone,
              bio: user.bio,
              badges: user.badges
            }
          });
        });
      } catch (hashError) {
        console.error('Hash error:', hashError);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    users.findOne({ email }, async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      try {
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last active
        users.update({ _id: user._id }, { $set: { lastActive: new Date() } }, {}, (updateErr) => {
          if (updateErr) {
            console.error('Update error:', updateErr);
          }
        });

        // Generate token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET || 'fallback_secret',
          { expiresIn: '7d' }
        );

        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            skillsHave: user.skillsHave,
            skillsWant: user.skillsWant,
            xp: user.xp,
            level: user.level,
            streak: user.streak,
            timezone: user.timezone,
            bio: user.bio,
            badges: user.badges
          }
        });
      } catch (compareError) {
        console.error('Password compare error:', compareError);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Routes
app.get('/api/user/profile', authenticateToken, (req, res) => {
  users.findOne({ _id: req.user.userId }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userResponse = { ...user };
    delete userResponse.password;
    res.json(userResponse);
  });
});

app.put('/api/user/profile', authenticateToken, (req, res) => {
  const updates = { ...req.body, updatedAt: new Date() };
  
  users.update({ _id: req.user.userId }, { $set: updates }, {}, (err, numReplaced) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    users.findOne({ _id: req.user.userId }, (findErr, user) => {
      if (findErr) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      const userResponse = { ...user };
      delete userResponse.password;
      res.json(userResponse);
    });
  });
});

// Progress Routes
app.get('/api/progress', authenticateToken, (req, res) => {
  progress.find({ userId: req.user.userId }, (err, progressData) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    const progressMap = {};
    progressData.forEach(p => {
      progressMap[p.skillId] = p.completedLessons;
    });
    res.json(progressMap);
  });
});

app.post('/api/progress/complete-lesson', authenticateToken, (req, res) => {
  const { skillId, xp } = req.body;
  
  progress.findOne({ userId: req.user.userId, skillId }, (err, existingProgress) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    if (existingProgress) {
      // Update existing progress
      progress.update(
        { userId: req.user.userId, skillId },
        { $inc: { completedLessons: 1, xpEarned: xp }, $set: { updatedAt: new Date() } },
        {},
        (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: 'Server error' });
          }
          updateUserXP();
        }
      );
    } else {
      // Create new progress
      const newProgress = {
        _id: generateId(),
        userId: req.user.userId,
        skillId,
        completedLessons: 1,
        xpEarned: xp,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      progress.insert(newProgress, (insertErr) => {
        if (insertErr) {
          return res.status(500).json({ message: 'Server error' });
        }
        updateUserXP();
      });
    }
    
    function updateUserXP() {
      users.findOne({ _id: req.user.userId }, (userErr, user) => {
        if (userErr) {
          return res.status(500).json({ message: 'Server error' });
        }
        
        const newXP = user.xp + xp;
        const newLevel = Math.floor(newXP / 500) + 1;
        
        users.update(
          { _id: req.user.userId },
          { $set: { xp: newXP, level: newLevel, updatedAt: new Date() } },
          {},
          (updateUserErr) => {
            if (updateUserErr) {
              return res.status(500).json({ message: 'Server error' });
            }
            
            progress.findOne({ userId: req.user.userId, skillId }, (progressErr, updatedProgress) => {
              if (progressErr) {
                return res.status(500).json({ message: 'Server error' });
              }
              
              res.json({
                progress: updatedProgress.completedLessons,
                newXP: newXP,
                newLevel: newLevel
              });
            });
          }
        );
      });
    }
  });
});

// Matching Routes
app.get('/api/matches', authenticateToken, (req, res) => {
  users.findOne({ _id: req.user.userId }, (err, currentUser) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    users.find({ _id: { $ne: req.user.userId } }, (findErr, allUsers) => {
      if (findErr) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      // Filter users who can teach what current user wants to learn
      const potentialMatches = allUsers.filter(user => {
        return user.skillsHave && user.skillsHave.some(skill => 
          currentUser.skillsWant && currentUser.skillsWant.some(s => s.name === skill.name)
        );
      });

      // Calculate compatibility scores
      const matches = potentialMatches.map(user => {
        const sharedSkills = user.skillsHave
          .filter(skill => currentUser.skillsWant.some(s => s.name === skill.name))
          .map(skill => skill.name);
        
        const compatibility = Math.min(95, 60 + (sharedSkills.length * 15));
        
        const userResponse = { ...user };
        delete userResponse.password;
        
        return {
          id: user._id,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            skillsHave: user.skillsHave,
            skillsWant: user.skillsWant,
            xp: user.xp,
            level: user.level,
            streak: user.streak,
            timezone: user.timezone,
            bio: user.bio,
            badges: user.badges
          },
          compatibility,
          sharedSkills,
          reason: `Great match! ${user.name} can teach you ${sharedSkills.join(', ')} while you can help them with ${currentUser.skillsHave.filter(s => user.skillsWant.some(w => w.name === s.name)).map(s => s.name).join(', ')}.`
        };
      });

      // Sort by compatibility
      matches.sort((a, b) => b.compatibility - a.compatibility);

      res.json(matches.slice(0, 10)); // Return top 10 matches
    });
  });
});

// Message Routes
app.get('/api/messages/:userId', authenticateToken, (req, res) => {
  const { userId } = req.params;
  
  messages.find({
    $or: [
      { senderId: req.user.userId, receiverId: userId },
      { senderId: userId, receiverId: req.user.userId }
    ]
  }).sort({ timestamp: 1 }).exec((err, messageData) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    res.json(messageData);
  });
});

app.post('/api/messages', authenticateToken, (req, res) => {
  const { receiverId, content } = req.body;
  
  const newMessage = {
    _id: generateId(),
    senderId: req.user.userId,
    receiverId,
    content,
    timestamp: new Date(),
    read: false
  };

  messages.insert(newMessage, (err, message) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    // Emit to socket
    io.to(receiverId).emit('newMessage', message);

    res.status(201).json(message);
  });
});

// Forum Routes
app.get('/api/forum', (req, res) => {
  forumPosts.find({}).sort({ timestamp: -1 }).limit(20).exec((err, posts) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    // Get user details for each post
    const userIds = [...new Set(posts.map(post => post.userId))];
    
    users.find({ _id: { $in: userIds } }, (userErr, postUsers) => {
      if (userErr) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      const userMap = {};
      postUsers.forEach(user => {
        userMap[user._id] = user;
      });

      const formattedPosts = posts.map(post => ({
        id: post._id,
        userId: post.userId,
        userName: userMap[post.userId]?.name || 'Unknown User',
        userAvatar: userMap[post.userId]?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        title: post.title,
        content: post.content,
        skill: post.skill,
        likes: post.likes,
        replies: post.replies,
        timestamp: post.timestamp
      }));

      res.json(formattedPosts);
    });
  });
});

app.post('/api/forum', authenticateToken, (req, res) => {
  const { title, content, skill } = req.body;
  
  const newPost = {
    _id: generateId(),
    userId: req.user.userId,
    title,
    content,
    skill,
    likes: 0,
    replies: 0,
    timestamp: new Date()
  };

  forumPosts.insert(newPost, (err, post) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    
    users.findOne({ _id: req.user.userId }, (userErr, user) => {
      if (userErr) {
        return res.status(500).json({ message: 'Server error' });
      }
      
      res.status(201).json({
        id: post._id,
        userId: post.userId,
        userName: user.name,
        userAvatar: user.avatar,
        title: post.title,
        content: post.content,
        skill: post.skill,
        likes: post.likes,
        replies: post.replies,
        timestamp: post.timestamp
      });
    });
  });
});

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('sendMessage', (data) => {
    const newMessage = {
      _id: generateId(),
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
      timestamp: new Date(),
      read: false
    };

    messages.insert(newMessage, (err, message) => {
      if (err) {
        socket.emit('error', { message: 'Failed to send message' });
        return;
      }

      io.to(data.receiverId).emit('newMessage', message);
      socket.emit('messageSent', message);
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`SkillSwap API Server running on port ${PORT}`);
  console.log(`Frontend should be running on http://localhost:5173`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});