# SpeakReady AI - Step By Step Guidance

This guide explains how to complete the project step by step.

## Step 1 - Clean Project Setup

Goal: Project ko professional structure me ready karna.

Tasks:

1. Backend ko `src` folder structure me move karo.
2. `index.js` ke jagah `src/app.js` and `src/server.js` use karo.
3. Environment variables setup karo.
4. Frontend me clean folders create karo:
   - `components`
   - `types`
   - `lib`
   - pages inside `app`

Expected result:

- Backend starts from `src/server.js`
- Frontend runs without starter template content
- Folder structure clean ho

## Step 2 - Backend Foundation

Goal: Express backend ko stable and industry-level banana.

Tasks:

1. Add `src/config/env.js`
2. Add `src/config/db.js`
3. Add MongoDB connection using Mongoose
4. Add `src/app.js`
5. Add `src/server.js`
6. Add health route
7. Add 404 middleware
8. Add error middleware

Important env values:

```text
PORT=5000
MONGO_URI=your_mongodb_connection
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development
```

Expected result:

```text
GET http://localhost:5000/health
```

should return:

```json
{
  "status": "ok"
}
```

## MongoDB Models and Model Structure

Phase 1 MVP ke liye sirf ye 2 main models required hain:

```text
backend/src/models/
  user.model.js
  practiceAttempt.model.js
```

`Mistake`, `Scores`, aur `Feedback` ke separate models banane ki zarurat nahi
hai. Ye `PracticeAttempt` ke andar embedded subdocuments rahenge, kyunki inka
use hamesha ek practice attempt ke saath hi hoga.

### 1. User Model

File:

```text
backend/src/models/user.model.js
```

Purpose:

- Signup aur login data store karna
- Har practice attempt ko ek user se connect karna
- Password ko plain text me kabhi store nahi karna

Recommended structure:

```js
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  createdAt: Date,
  updatedAt: Date
}
```

Mongoose schema options:

```js
{
  timestamps: true
}
```

Important rules:

1. Email par unique index hona chahiye.
2. Email save karne se pehle lowercase aur trim karo.
3. Client se aane wala raw password model me save mat karo.
4. Password ko bcrypt se hash karke `passwordHash` me save karo.
5. API response me `passwordHash` kabhi return mat karo.
6. Login ke time password verify karne ke liye explicitly
   `.select("+passwordHash")` use karo.

### 2. PracticeAttempt Model

File:

```text
backend/src/models/practiceAttempt.model.js
```

Purpose:

- User ka original English answer save karna
- Gemini ka complete structured feedback save karna
- Dashboard aur history pages ke liye previous attempts fetch karna

Recommended structure:

```js
{
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  mode: {
    type: String,
    enum: ["free", "guided"],
    required: true
  },
  prompt: {
    type: String,
    trim: true,
    maxlength: 300,
    default: ""
  },
  originalText: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 5000
  },
  feedback: {
    correctedText: {
      type: String,
      required: true
    },
    summaryHindi: {
      type: String,
      required: true
    },
    mistakes: [
      {
        wrong: {
          type: String,
          required: true
        },
        correct: {
          type: String,
          required: true
        },
        explanationHindi: {
          type: String,
          required: true
        }
      }
    ],
    scores: {
      grammar: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      },
      clarity: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      },
      vocabulary: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      },
      overall: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      }
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },
    weakAreas: [
      {
        type: String,
        trim: true
      }
    ],
    personalizedExercises: [
      {
        type: String,
        trim: true
      }
    ],
    motivationHindi: {
      type: String,
      required: true
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

Mongoose schema options:

```js
{
  timestamps: true
}
```

Recommended history index:

```js
practiceAttemptSchema.index({ userId: 1, createdAt: -1 });
```

Is index se logged-in user ki latest history efficiently fetch hogi.

Important rules:

1. `guided` mode me `prompt` required validate karo.
2. `free` mode me `prompt` empty string ho sakta hai.
3. Gemini response save karne se pehle saare required feedback fields validate
   karo.
4. Scores sirf `0` se `10` ke beech accept karo.
5. History query me hamesha authenticated user ka `userId` filter use karo.
6. User delete behavior abhi MVP me add mat karo. Future me account deletion
   add karte waqt related attempts delete ya anonymize karne ka decision lo.

### Model Relationship

```text
User (1) -------- (many) PracticeAttempt
```

Ek user ke multiple practice attempts ho sakte hain. `PracticeAttempt.userId`
MongoDB me `User._id` ko reference karega.

Example history query:

```js
const attempts = await PracticeAttempt.find({ userId: req.user._id })
  .sort({ createdAt: -1 })
  .select("mode prompt feedback.scores.overall feedback.level createdAt");
```

### Models Not Required in Phase 1

Abhi inke separate models mat banao:

- Prompt
- Feedback
- Mistake
- Score
- Exercise
- History

Guided prompts frontend/backend constants me static list ke form me reh sakte
hain. History koi separate collection nahi hai; history
`PracticeAttempt` collection se fetch hogi.

Phase 2 start hone par interview requirements ke liye separate
`InterviewSession` model plan kiya jayega.

## Step 3 - Authentication

Goal: User signup/login system create karna.

Recommended approach:

1. First try Better Auth.
2. If Better Auth creates problem with MongoDB, use JWT + bcrypt + HTTP-only cookies.

Auth APIs:

```text
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Tasks:

1. Create `User` model.
2. Hash password before saving.
3. Login par password compare karo.
4. JWT create karo.
5. JWT ko HTTP-only cookie me store karo.
6. `auth.middleware.js` create karo.
7. Protected route test karo.

Expected result:

- User signup kar sake
- User login kar sake
- User logout kar sake
- `/auth/me` current user return kare

## Step 4 - Frontend Auth Pages

Goal: Login and signup UI banana.

Pages:

```text
/login
/signup
```

Components:

```text
components/auth/LoginForm.tsx
components/auth/SignupForm.tsx
```

Tasks:

1. Login form create karo.
2. Signup form create karo.
3. Form validation add karo.
4. Backend APIs se connect karo.
5. Login success ke baad `/dashboard` redirect karo.
6. Signup success ke baad `/dashboard` redirect karo.

Expected result:

- Frontend se account create ho
- Login ke baad dashboard open ho

## Step 5 - Protected Dashboard

Goal: Logged-in user ke liye dashboard banana.

Page:

```text
/dashboard
```

Dashboard should show:

- Greeting
- Start practice button
- Latest score
- Recent attempts

Tasks:

1. Auth check karo.
2. Agar user logged out ho to `/login` redirect karo.
3. Dashboard layout create karo.
4. Recent attempts ke liye placeholder add karo.

Expected result:

- Logged-in user dashboard dekh sake
- Logged-out user dashboard access na kar sake

## Step 6 - Gemini API Setup

Goal: Backend me Gemini AI service create karna.

Env:

```text
GEMINI_API_KEY=your_api_key
```

Files:

```text
src/services/gemini.service.js
```

Tasks:

1. Gemini SDK install karo.
2. API key env se read karo.
3. Prompt create karo.
4. Gemini se strict JSON response maango.
5. JSON parse karo.
6. Invalid JSON ke liye fallback handling add karo.

Expected result:

- Backend English text ko Gemini ke paas bhej sake
- Gemini structured feedback return kare

## Step 7 - Practice API

Goal: English practice analyze endpoint create karna.

Route:

```text
POST /api/v1/practice/analyze
```

Request body:

```json
{
  "mode": "guided",
  "prompt": "Introduce yourself in 5 lines.",
  "text": "My name is Rahul and I wants improve english."
}
```

Tasks:

1. Create `PracticeAttempt` model.
2. Create practice route.
3. Create practice controller.
4. Validate request body.
5. Check logged-in user.
6. Send text to Gemini service.
7. Validate Gemini response.
8. Save result in MongoDB.
9. Return feedback to frontend.

Expected result:

- User text submit kare
- AI feedback mile
- Attempt database me save ho

## Step 8 - Rate Limiting

Goal: AI API abuse and extra cost se bachna.

Rule:

```text
10 AI requests per user per hour
```

Tasks:

1. Add rate limit middleware.
2. Apply it only on `/practice/analyze`.
3. Return clear error if limit cross ho.

Expected result:

- User unlimited AI requests na bhej sake

## Step 9 - Practice Frontend Page

Goal: Candidate ke liye practice UI banana.

Page:

```text
/practice
```

Components:

```text
PracticeEditor.tsx
PromptSelector.tsx
FeedbackPanel.tsx
ScoreCard.tsx
MistakeList.tsx
```

UI should include:

- Free writing mode
- Guided prompt mode
- Prompt selector
- Textarea
- Submit button
- Loading state
- Error state
- Feedback result

Guided prompts:

```text
Introduce yourself in 5 lines.
Describe your daily routine.
Why do you want to improve your English?
Tell me about your career goal.
Describe your strengths.
```

Expected result:

- User English answer submit kare
- Feedback page par dikhe
- UX clean and easy ho

## Step 10 - History API

Goal: User ke previous attempts fetch karna.

Routes:

```text
GET /api/v1/history
GET /api/v1/history/:id
```

Tasks:

1. Create history route.
2. Create history controller.
3. Fetch attempts only for logged-in user.
4. Sort by latest first.
5. Add detail endpoint.

Expected result:

- User apni history list dekh sake
- User single attempt detail dekh sake

## Step 11 - History Frontend Pages

Goal: Practice history ko frontend me show karna.

Pages:

```text
/history
/history/[id]
```

Components:

```text
HistoryList.tsx
HistoryDetail.tsx
```

History card should show:

- Practice mode
- Prompt
- Overall score
- Level
- Date

Detail page should show:

- Original text
- Corrected text
- Mistakes
- Scores
- Weak areas
- Exercises
- Motivation

Expected result:

- User previous attempts review kar sake

## Step 12 - UI Polish

Goal: App ko student-friendly but professional banana.

Design style:

- Dashboard structure
- Clean cards
- Neutral background
- Green/blue accents
- Good spacing
- Mobile responsive

Tasks:

1. Add app shell.
2. Add sidebar/topbar.
3. Add reusable UI components.
4. Add empty states.
5. Add loading states.
6. Add error states.
7. Make pages responsive.

Expected result:

- App demo-ready lage
- Candidate easily use kar sake

## Step 13 - Testing Checklist

Manual tests:

1. Signup works
2. Login works
3. Logout works
4. Dashboard protected hai
5. Practice text validation works
6. Gemini feedback works
7. Attempt DB me save hota hai
8. History list works
9. History detail works
10. Rate limit works
11. Frontend build passes
12. Backend starts without error

Commands:

```powershell
cd backend
npm run dev
```

```powershell
cd frontend
npm run dev
```

```powershell
cd frontend
npm run build
```

## Step 14 - Deployment Preparation

Goal: MVP stable hone ke baad deploy karna.

Deployment:

- MongoDB Atlas for database
- Render or Railway for backend
- Vercel for frontend

Production env:

```text
MONGO_URI=your_mongodb_atlas_uri
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=strong_secret
CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-backend-domain
NODE_ENV=production
```

Expected result:

- Public demo link ready ho
- Resume/project showcase ke liye usable ho

## Recommended Completion Order

Follow this exact order:

1. Backend folder structure
2. MongoDB connection
3. Auth system
4. Frontend auth pages
5. Protected dashboard
6. Gemini service
7. Practice analyze API
8. Practice frontend page
9. History backend
10. History frontend
11. UI polish
12. Testing
13. Deployment

Do not start voice features before Phase 1 is complete.
