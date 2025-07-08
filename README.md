I want you to generate a complete full-stack web application called **Skill Swap**.

**Goal**: Skill Swap is a social learning platform for developers to exchange skills, teach each other, and learn through AI-powered personalized paths and real-time collaboration. The app should function similarly to Mimo or Duolingo but allow users to match with other developers based on shared goals.

---

💻 Tech Stack:
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Supabase
- **Database**: Supabase Database
- **Authentication**: Supabase Authentication
- **Real-time Chat**: Supabase Real-Time chat
- **AI Integration**: GroqI want you to generate a complete full-stack web application called **Skill Swap**.

**Goal**: Skill Swap is a social learning platform for developers to exchange skills, teach each other, and learn through AI-powered personalized paths and real-time collaboration. The app should function similarly to Mimo or Duolingo but allow users to match with other developers based on shared goals.

---

💻 Tech Stack:
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Supabase 
- **Database**: Supabase Authentication
- **Authentication**: Supabase Authentication
- **Real-time Chat**: Supabase Real-time chat
- **AI Integration**: GrokAI API for skill matching and lesson suggestions

---

🔑 Features to Implement:

1. **User Registration & Login**
   - Email/password signup with JWT-based authentication
   - User profile includes: name, avatar, skills they know (`skillsHave`), and skills they want to learn (`skillsWant`)

2. **Dashboard (Gamified)**
   - Show progress bars, XP, learning streak
   - Daily reminder/coach message using AI
   - List of current modules and match suggestions

3. **AI Skill Matching**
   - Use OpenAI API to match users based on their `skillsHave` and `skillsWant`
   - Store match results in MongoDB (`matches` collection)
   - Show match confidence score and reason

4. **Lesson System**
   - CRUD for lessons by skill
   - Each lesson has: title, content, quiz (MCQ), XP reward
   - Track user progress per lesson

5. **Chat System**
   - Realtime one-on-one chat with Socket.io
   - Store messages in `messages` collection
   - Support file/resource sharing

6. **Gamification**
   - XP earned per lesson/interaction
   - Track daily streak and badge unlocks
   - Leaderboard (top learners and helpers)

7. **Admin Panel (optional)**
   - Add/update skills and lesson content
   - Manage users and reported messages

---

🧱 SupabaseDB Schema Suggestions:
- `/users`: { name, email, skillsHave, skillsWant, XP, streak, avatar }
- `/matches`: { user1, user2, score, createdAt }
- `/lessons`: { skill, title, level, quiz, XP }
- `/progress`: { userId, lessonId, XP, completedAt }
- `/messages`: { senderId, receiverId, text, timestamp }

---

💡 Bonus UI Ideas:
- Animated badges and streak counter
- Duolingo-style skill trees or lesson bubbles
- Daily motivational pop-ups

---

Please generate the full backend API (routes, models, controllers) and frontend React components (pages, forms, dashboard, chat, etc.) using clean architecture.

Also, include comments to explain logic and how to test each part locally.

AI API for skill matching and lesson suggestions

---

🔑 Features to Implement:

1. **User Registration & Login**
   - Email/password signup with JWT-based authentication
   - User profile includes: name, avatar, skills they know (`skillsHave`), and skills they want to learn (`skillsWant`)

2. **Dashboard (Gamified)**
   - Show progress bars, XP, learning streak
   - Daily reminder/coach message using AI
   - List of current modules and match suggestions

3. **AI Skill Matching**
   - Use OpenAI API to match users based on their `skillsHave` and `skillsWant`
   - Store match results in MongoDB (`matches` collection)
   - Show match confidence score and reason

4. **Lesson System**
   - CRUD for lessons by skill
   - Each lesson has: title, content, quiz (MCQ), XP reward
   - Track user progress per lesson

5. **Chat System**
   - Realtime one-on-one chat with Socket.io
   - Store messages in `messages` collection
   - Support file/resource sharing

6. **Gamification**
   - XP earned per lesson/interaction
   - Track daily streak and badge unlocks
   - Leaderboard (top learners and helpers)

7. **Admin Panel (optional)**
   - Add/update skills and lesson content
   - Manage users and reported messages

---

🧱 Supabase Schema Suggestions:
- `/users`: { name, email, skillsHave, skillsWant, XP, streak, avatar }
- `/matches`: { user1, user2, score, createdAt }
- `/lessons`: { skill, title, level, quiz, XP }
- `/progress`: { userId, lessonId, XP, completedAt }
- `/messages`: { senderId, receiverId, text, timestamp }

---

💡 Bonus UI Ideas:
- Animated badges and streak counter
- Duolingo-style skill trees or lesson bubbles
- Daily motivational pop-ups

---

Please generate the full backend API (routes, models, controllers) and frontend React components (pages, forms, dashboard, chat, etc.) using clean architecture.

Also, include comments to explain logic and how to test each part locally.


