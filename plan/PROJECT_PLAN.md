# SpeakReady AI - Project Plan

## Project Idea

SpeakReady AI is an AI-powered English improvement and interview preparation platform.

In the first MVP, candidates will practice English by typing answers. The AI will analyze the answer, find mistakes, correct the English, and explain improvements in Hindi.

Later, the project will support career-based interview preparation and hybrid voice + text mock interviews.

## Main Goal

Help candidates:

- Improve English grammar
- Improve sentence structure
- Build confidence for job interviews
- Understand mistakes in Hindi
- Practice daily with AI feedback
- Track progress over time

## Phase 1 - Text-First English Improvement MVP

### Core Features

1. Authentication
   - Signup
   - Login
   - Logout
   - Protected dashboard
   - User-specific history

2. English Practice
   - Free writing mode
   - Guided prompt mode
   - Candidate writes English answer
   - Backend sends answer to Gemini API
   - Gemini returns structured feedback

3. AI Feedback
   - Corrected English version
   - Hindi summary
   - Mistakes list
   - Hindi explanation for each mistake
   - Grammar score
   - Clarity score
   - Vocabulary score
   - Overall score
   - Level: Beginner, Intermediate, Advanced
   - Weak areas
   - Personalized practice exercises
   - Motivation message in Hindi

4. History
   - Save every practice attempt
   - Show basic history list
   - Show full detail for each attempt

5. Safety
   - Validate input
   - Limit text length
   - Protect API routes
   - Add rate limiting for AI requests

## Phase 2 - Career-Based Interview Preparation

Candidate will select:

- Career field
- Experience level
- Interview type
- Number of questions

Example career fields:

- Software Developer
- Accountant
- HR
- Sales
- Customer Support
- Data Analyst
- Fresher / General

AI will generate role-based interview questions and give feedback on:

- English quality
- Answer structure
- Missing points
- Confidence
- Better answer version
- Hindi improvement suggestions

## Phase 3 - Hybrid Voice + Text

Future voice features:

- Candidate speaks answer
- Browser converts speech to text
- AI analyzes answer
- AI gives English and Hindi feedback
- Later AI can speak interview questions

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- App Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Gemini API

### Authentication

First try:

- Better Auth

Fallback:

- JWT
- bcrypt
- HTTP-only cookies

### Deployment Plan

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas
- AI: Gemini API

## Frontend Pages

```text
/
  Redirect based on auth

/login
  User login

/signup
  User registration

/dashboard
  User summary
  Latest score
  Start practice button
  Recent attempts

/practice
  Free writing mode
  Guided prompt mode
  AI feedback result

/history
  All previous attempts

/history/[id]
  Full feedback detail
```

Future interview pages:

```text
/interview/setup
/interview/session
/interview/history
/interview/history/[id]
```

## Backend API Routes

### Auth

```text
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

### Practice

```text
POST /api/v1/practice/analyze
```

### History

```text
GET /api/v1/history
GET /api/v1/history/:id
```

### Health

```text
GET /health
```

## Backend Folder Structure

```text
backend/
  src/
    config/
      db.js
      env.js

    models/
      User.js
      PracticeAttempt.js

    routes/
      auth.routes.js
      practice.routes.js
      history.routes.js
      health.routes.js

    controllers/
      auth.controller.js
      practice.controller.js
      history.controller.js

    services/
      gemini.service.js
      auth.service.js
      practice.service.js

    middleware/
      auth.middleware.js
      error.middleware.js
      validate.middleware.js
      rateLimit.middleware.js

    utils/
      asyncHandler.js
      apiResponse.js

    app.js
    server.js
```

## Frontend Folder Structure

```text
frontend/src/
  app/
    login/page.tsx
    signup/page.tsx
    dashboard/page.tsx
    practice/page.tsx
    history/page.tsx
    history/[id]/page.tsx

  components/
    auth/
      LoginForm.tsx
      SignupForm.tsx

    practice/
      PracticeEditor.tsx
      PromptSelector.tsx
      FeedbackPanel.tsx
      ScoreCard.tsx
      MistakeList.tsx

    history/
      HistoryList.tsx
      HistoryDetail.tsx

    layout/
      AppShell.tsx
      Sidebar.tsx
      Topbar.tsx

    ui/
      Button.tsx
      Input.tsx
      Textarea.tsx
      Card.tsx
      Badge.tsx

  lib/
    api.ts
    auth.ts
    utils.ts

  types/
    auth.ts
    practice.ts
```

## MongoDB Models

### User

```js
{
  name: String,
  email: String,
  passwordHash: String,
  createdAt: Date,
  updatedAt: Date
}
```

### PracticeAttempt

```js
{
  userId: ObjectId,
  mode: "free" | "guided",
  prompt: String,
  originalText: String,
  feedback: {
    correctedText: String,
    summaryHindi: String,
    mistakes: [
      {
        wrong: String,
        correct: String,
        explanationHindi: String
      }
    ],
    scores: {
      grammar: Number,
      clarity: Number,
      vocabulary: Number,
      overall: Number
    },
    level: "Beginner" | "Intermediate" | "Advanced",
    weakAreas: [String],
    personalizedExercises: [String],
    motivationHindi: String
  },
  createdAt: Date
}
```

## Gemini JSON Feedback Format

```json
{
  "correctedText": "Correct English answer here",
  "summaryHindi": "Hindi explanation here",
  "mistakes": [
    {
      "wrong": "I wants",
      "correct": "I want",
      "explanationHindi": "I ke saath verb ka base form use hota hai."
    }
  ],
  "scores": {
    "grammar": 7,
    "clarity": 7,
    "vocabulary": 6,
    "overall": 7
  },
  "level": "Beginner",
  "weakAreas": ["Grammar", "Sentence structure"],
  "personalizedExercises": [
    "Simple present tense ke 5 sentences likhiye.",
    "Apne introduction ko 5 lines me likhiye.",
    "Aaj 3 naye English words use karke sentences banaiye."
  ],
  "motivationHindi": "Aapka effort achha hai. Daily practice se improvement clear dikhega."
}
```

## MVP Success Criteria

MVP complete tab maanenge jab:

- User signup/login kar sake
- User protected dashboard access kar sake
- User English text submit kar sake
- Gemini AI Hindi feedback de
- Feedback structured UI me show ho
- Attempt MongoDB me save ho
- User history dekh sake
- Frontend and backend build/run successfully

