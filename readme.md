# Murmr - Youth Wellness Companion

> **Anonymous peer support circles powered by AI for mental wellness**

Murmr creates safe, anonymous group spaces where youth (16-24) can connect with peers facing similar challenges, get AI-curated wellness resources, and receive immediate crisis support when needed.

---

## 🎯 **Project Overview**

**Vision:** Transform youth mental health support through anonymous peer communities and intelligent AI assistance.

**Problem:** Youth struggle with mental health challenges but hesitate to seek help due to stigma, cost, or lack of relatable support systems.

**Solution:** AI-matched anonymous circles (4-5 people) where young people can:
- Share experiences without judgment
- Receive peer support from others with similar challenges  
- Access personalized wellness resources
- Get immediate crisis intervention when needed

---

### ✅ Must-Have (MVP)

- Anonymous onboarding (AI name + avatar)
- Group chat with 4–5 matched peers
- AI moderation (basic toxicity filter via Gemini)
- Crisis detection popup (at least RED/ORANGE classification)
- Daily AI prompt (simple text generation)
- Crisis helpline quick-access button

### ⚡Nice-to-Have (if time allows)

- Simple progress streaks (just count active days)
- Group wellness activity (like a breathing exercise link)
- Circle switch (manual button, no cooldown logic needed)

## 🔑 **Key Features**

### 1. **Smart Anonymous Group Matching**
- AI matches users based on wellness focus areas, preferred times, and language
- Each user belongs to one intimate circle (4-5 people) for deeper connections
- Option to switch circles if dynamics don't fit (7-day cooldown)

### 2. **AI-Powered Safety & Support**
- **Real-time crisis detection** with immediate intervention resources
- **Content moderation** preventing personal info sharing and toxic behavior
- **Contextual wellness recommendations** based on group conversations
- **Daily conversation prompts** to keep groups engaged

### 3. **Personalized Wellness Hub**
- 2-5 minute micro-practices curated by AI
- Group challenges and shared activities
- Always-accessible crisis resources and helplines
- Progress tracking with gentle, non-competitive streaks

### 4. **Complete Anonymity**
- AI-generated identities and avatars
- No personal information exchange
- Private crisis support outside group conversations
- Secure, confidential environment

---

## 👤 **User Flow**

### **Onboarding Journey**
```
Welcome Screen → Anonymous Identity Selection → Wellness Focus Areas → 
Preferred Times → Language → AI Matching → Group Introduction
```

### **Daily Experience**
```
Dashboard → Circle Chat (with AI prompts) → Peer Support → 
Wellness Resources → Optional Crisis Support → Progress Tracking
```

### **Crisis Intervention Flow**
```
Message Sent → AI Analysis → Crisis Detected → Private Popup → 
Crisis Resources → Helpline Access → Follow-up Check-ins
```

---

## 📱 **Frontend Pages**

### **Core User Journey Pages**

#### `/onboarding` - User Setup & Matching
- **Anonymous Identity Selection**: AI-generated avatars and names
- **Wellness Focus Areas**: Multi-select (Stress, Anxiety, Confidence, Sleep, Exam Anxiety, etc.)
- **Interaction Preferences**: Preferred times (Morning/Evening/Flexible)
- **Language Selection**: English, Hindi, Bengali, Tamil
- **Matching Process**: "Finding your circle" with gentle loading animations

#### `/dashboard` - Home Page
- **"Your Circle" Card**: Direct link to group chat with activity indicators
- **"Today's Focus" Card**: AI-recommended daily wellness resource
- **Circle Streak Tracker**: Non-competitive progress celebration
- **Quick Crisis Support**: Always visible emergency access button

#### `/circle-chat` - Group Conversation Hub
- **Daily AI Prompts**: Contextual conversation starters at top
- **Real-time Group Chat**: Anonymous members with unique avatars
- **Message Input**: AI-moderated with gentle character limits
- **Quick Actions**: Crisis support, wellness resources, circle settings
- **Member Indicators**: Show online status and participation

#### `/wellness-hub` - Resource Center
- **Today's Recommendations**: 2-3 AI-curated micro-practices
- **Group Challenge Card**: Shared activities with progress tracking
- **Personal Toolkit**: Saved favorite resources and exercises
- **Crisis Resources**: 24/7 accessible emergency support

#### `/profile-settings` - Account Management
- **Circle Management**: Current group overview, switch option
- **Wellness Preferences**: Update focus areas and interaction times
- **Privacy Settings**: Notification preferences, break options
- **Progress Overview**: Individual wellness journey insights

---

## Shema (Firebase)

```
# ==============================
# Firestore Collections Schema
# ==============================

Users (collection)
  userId (docId)
    identity: {
      name: "CalmLion",             # AI-generated alias
      avatar: "avatar_url.png"      # Anonymous avatar
    }
    focusAreas: ["stress", "anxiety"]
    preferences: {
      time: "evening",
      language: "en"
    }
    groupId: "group123"
    createdAt: timestamp
    lastActive: timestamp

Groups (collection)
  groupId (docId)
    members: ["userA", "userB", "userC"]
    focusThemes: ["exam anxiety", "confidence"]
    createdAt: timestamp
    lastActivity: timestamp
    streak: {
      activeDays: 3,
      lastUpdated: timestamp
    }

Messages (collection)
  messageId (docId)
    groupId: "group123"
    senderId: "userA"               # Anonymous within group
    text: "Feeling nervous about exams..."
    timestamp: timestamp
    aiFlags: {
      moderation: "safe",           # safe | flagged
      crisisLevel: "green"          # green | yellow | orange | red
    }

Prompts (collection)
  promptId (docId)
    groupId: "group123"
    text: "What’s one small win you had today?"
    type: "daily"                   # daily | crisis | reflection
    createdAt: timestamp
    usedBy: ["group123", "group456"]

WellnessResources (collection)
  resourceId (docId)
    title: "2-Min Breathing Exercise"
    type: "micro-practice"          # micro-practice | group-challenge | article
    contentUrl: "https://resource-link"
    tags: ["stress", "relaxation"]
    createdAt: timestamp


# ==============================
# Firebase Security Rules (MVP)
# ==============================
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    # Users: users can only read/write their own profile
    match /Users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    # Groups: only members can read group details
    match /Groups/{groupId} {
      allow read: if request.auth != null && request.auth.uid in resource.data.members;
      allow write: if false;  # group writes only from backend functions
    }

    # Messages: only group members can read; only sender can write
    match /Messages/{messageId} {
      allow read: if request.auth != null &&
                  request.auth.uid in get(/databases/$(database)/documents/Groups/$(resource.data.groupId)).data.members;
      allow create: if request.auth != null &&
                     request.auth.uid == request.resource.data.senderId;
      allow update, delete: if false; # immutable after creation
    }

    # Prompts: read-only for all authenticated users
    match /Prompts/{promptId} {
      allow read: if request.auth != null;
      allow write: if false;
    }

    # WellnessResources: read-only for all authenticated users
    match /WellnessResources/{resourceId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}

```
---

## 🔌 **Backend Routes (Firebase Cloud Functions)**

### **Authentication & User Management**

#### `createUser` - User Registration
```javascript
// Input: { anonymousIdentity, focusAreas, preferredTime, language }
// Output: { userId, matchingInitiated: boolean }
// Function: Creates Firebase user → Triggers group matching → Returns user ID
```

#### `updateUserPreferences` - Profile Updates
```javascript
// Input: { userId, newFocusAreas, newPreferredTime }
// Output: { updated: boolean, rematchTriggered: boolean }
// Function: Updates user profile → Triggers re-matching if significant changes
```

### **Group Matching & Management**

#### `findGroup` - Smart Group Matching
```javascript
// Input: { userId, focusAreas, preferredTime, language }
// Output: { groupId, members, introPrompt, estimatedWait }
// Function: AI matching algorithm → Creates/joins compatible group → Updates user
```

#### `switchGroup` - Circle Change Request
```javascript
// Input: { userId, currentGroupId, reason }
// Output: { newGroupId, cooldownEnds, switchSuccess: boolean }
// Function: Removes from current group → Initiates new matching → Applies cooldown
```

#### `getGroupInfo` - Circle Details
```javascript
// Input: { groupId, userId }
// Output: { members, focusThemes, streak, createdAt, activity }
// Function: Returns group information with anonymous member details
```

### **Messaging & AI Integration**

#### `sendMessage` - Message Processing Pipeline
```javascript
// Input: { groupId, userId, message }
// Output: { success: boolean, crisisDetected: boolean, messageId }
// Function: AI moderation → Crisis detection → Save to Firestore → Real-time update
```

#### `generateDailyPrompt` - Conversation Starters
```javascript
// Input: { groupId, timeOfDay, recentTopics }
// Output: { promptText, engagementTips, contextExplanation }
// Function: Analyzes group patterns → Generates contextual conversation prompt
```

#### `moderateMessage` - Content Safety Check
```javascript
// Input: { message, userContext, groupContext }
// Output: { isSafe, issues, suggestedEdit, educationalTip }
// Function: AI analysis for PII, toxicity, appropriateness → Safety decision
```

### **Crisis Detection & Intervention**

#### `detectCrisis` - Mental Health Risk Assessment
```javascript
// Input: { message, userId, conversationHistory }
// Output: { riskLevel, crisisType, immediateResources, followUpNeeded }
// Function: Advanced AI analysis → Risk classification → Resource matching
```

#### `triggerCrisisIntervention` - Emergency Response
```javascript
// Input: { userId, crisisLevel, detectedIndicators }
// Output: { interventionStarted, resourcesProvided, followUpScheduled }
// Function: Private crisis popup → Helpline access → Support coordination
```

#### `scheduleCrisisFollowUp` - Ongoing Support
```javascript
// Input: { userId, interventionId, followUpType }
// Output: { scheduled, nextCheckTime, supportPlan }
// Function: Creates follow-up plan → Schedules check-ins → Monitors recovery
```

### **Wellness & Content Curation**

#### `getWellnessRecommendations` - Personalized Content
```javascript
// Input: { userId, groupId, recentConversations }
// Output: { dailyPractices, groupChallenge, personalizedTips }
// Function: Analyzes conversation patterns → Curates relevant wellness content
```

#### `trackWellnessActivity` - Progress Monitoring
```javascript
// Input: { userId, resourceId, completed, durationMinutes }
// Output: { streakUpdated, groupProgress, nextRecommendations }
// Function: Records activity → Updates streaks → Suggests follow-up content
```

#### `createGroupChallenge` - Community Activities
```javascript
// Input: { groupId, challengeType, duration }
// Output: { challengeId, participants, instructions, timeline }
// Function: Generates group wellness activity → Tracks participation → Celebrates completion
```

---

## 🤖 **AI Components**

### **AI Service Architecture (FastAPI)**

#### **1. Group Matching Agent** (`/match`)
```python
# Endpoint: POST /api/ai/match
# Function: Intelligent user clustering for optimal group dynamics
# Algorithm: Vector similarity matching on focus areas + time + language preferences
# Output: Compatible group_id or new group creation recommendation
```

#### **2. Content Moderation Agent** (`/moderate`)
```python
# Endpoint: POST /api/ai/moderate  
# Function: Real-time message safety analysis
# Checks: Personal info detection, toxicity, spam, inappropriate content
# Output: Safety decision with suggestions for improvement
```

#### **3. Crisis Detection Agent** (`/crisis`)
```python
# Endpoint: POST /api/ai/crisis
# Function: Advanced mental health risk assessment
# Analysis: Suicidal ideation, self-harm, severe depression indicators
# Output: Risk level classification with immediate intervention recommendations
```

#### **4. Wellness Content Agent** (`/content`)
```python
# Endpoint: POST /api/ai/content
# Function: Dynamic wellness resource curation
# Input: Group conversation patterns, user engagement history
# Output: Personalized micro-practices, group activities, daily prompts
```

### **AI Integration Flow**
```
User Message → Moderation Agent → Crisis Detection Agent → 
[If Safe] → Save to Database → Real-time Update to Group
[If Crisis] → Private Intervention → Crisis Resources → Follow-up Scheduling
Wellness Agent (Background) → Analyzes Patterns → Updates Recommendations
```

### **Gemini API Prompts**

#### **Crisis Detection Prompt Example**
```python
prompt = f"""
Analyze this message from a youth wellness support group for mental health crisis indicators:

Message: "{message}"
User recent context: {user_history}

Assess for:
- Suicidal ideation (direct: "I want to die" or indirect: "no point in trying")
- Self-harm intentions ("I want to hurt myself", "cutting relieves pain")
- Severe depression ("everything is hopeless", "I'm worthless")
- Immediate danger signals ("tonight I will", "have a plan")

Classification levels:
- GREEN: Normal conversation, no concerns
- YELLOW: Mild distress, suggest wellness resources
- ORANGE: Moderate concern, private check-in needed
- RED: High risk, immediate intervention required

Respond with JSON:
{{
  "risk_level": "green|yellow|orange|red",
  "crisis_indicators": ["hopelessness", "suicidal_ideation"],
  "confidence_score": 0.85,
  "immediate_resources": ["breathing_exercise", "crisis_helpline"],
  "follow_up_needed": true,
  "intervention_type": "private_popup"
}}
"""
```

---

## 📁 **Project Directory Structure**

murmr/
├── frontend/                        # React App (Next.js or CRA + Tailwind)
│   ├── public/                      # Static assets (logos, icons, crisis JSON)
│   ├── src/
│   │   ├── components/              # Reusable UI
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── CircleCard.jsx
│   │   │   ├── CrisisPopup.jsx
│   │   │   └── ResourceCard.jsx
│   │   ├── pages/                   # Core pages
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CircleChat.jsx
│   │   │   └── WellnessHub.jsx
│   │   ├── services/                # API + Firebase helpers
│   │   │   ├── firebase.js
│   │   │   └── api.js
│   │   └── App.jsx / index.jsx
│   └── package.json
│
├── backend/                         # Firebase Cloud Functions (Node.js)
│   ├── index.js                     # Function exports
│   ├── group.js                     # Group matching logic
│   ├── message.js                   # Messaging + moderation pipeline
│   ├── crisis.js                    # Crisis detection + intervention
│   ├── wellness.js                  # Recommendation endpoints
│   └── package.json
│
├── ai-service/                      # FastAPI lightweight AI microservice
│   ├── main.py                      # Entry point
│   ├── routes.py                    # /moderate, /crisis, /content
│   ├── gemini_client.py             # Gemini API wrapper
│   ├── prompts.py                   # Prompt templates
│   └── requirements.txt
│
├── shared/                          # Documentation + configs
│   ├── firestore-schema.md          # Simple collections (Users, Groups, Messages)
│   └── api-contracts.md             # Input/output of APIs
│
└── README.md

---

## 🚀 **Quick Start Guide**

### **Prerequisites**
- Node.js 16+ and npm
- Python 3.8+ and pip
- Firebase CLI
- Google Cloud account with Gemini API access

### **Development Setup**

#### **1. Clone and Setup**
```bash
git clone https://github.com/your-org/murmr.git
cd murmr

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install function dependencies  
cd functions
npm install
cd ..

# Install AI service dependencies
cd ai-service
pip install -r requirements.txt
```

#### **2. Firebase Configuration**
```bash
# Login to Firebase
firebase login

# Initialize project
firebase init

# Set up Firestore security rules
firebase deploy --only firestore:rules
```

#### **3. Environment Variables**
```bash
# Frontend (.env)
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Functions (.env)
GEMINI_API_KEY=your_gemini_api_key
AI_SERVICE_URL=http://localhost:8000

# AI Service (.env)
GOOGLE_API_KEY=your_gemini_api_key
ENVIRONMENT=development
```

#### **4. Local Development**
```bash
# Terminal 1: Start Firebase emulators
firebase emulators:start

# Terminal 2: Start AI service
cd ai-service
uvicorn app.main:app --reload --port 8000

# Terminal 3: Start frontend
cd frontend  
npm start
```

### **Deployment**
```bash
# Deploy all components
firebase deploy --only functions,hosting
cd ai-service && docker build -t murmr-ai . && gcloud run deploy
```

---

## 🛡️ **Safety & Privacy**

### **Crisis Intervention Protocol**
- Real-time AI monitoring of all conversations
- Immediate private intervention for high-risk messages
- 24/7 crisis helplines with one-click access
- Follow-up support and wellness check-ins
- Integration with local mental health services

### **Privacy Protection**
- Complete anonymity with AI-generated identities
- No personal information storage or sharing
- End-to-end conversation privacy
- GDPR-compliant data handling
- User-controlled data deletion

### **Content Safety**
- AI-powered content moderation for all messages
- Prevention of personal information sharing
- Toxic behavior detection and intervention
- Educational guidance on safe sharing practices

---

## 🤝 **Contributing**

We welcome contributions from developers, mental health professionals, and youth advocates!

### **Development Guidelines**
- Follow component-based architecture patterns
- Ensure comprehensive crisis detection testing
- Maintain strict privacy and anonymity standards
- Write user-focused documentation
- Test thoroughly with youth feedback

### **Getting Involved**
1. Read our [Contributing Guide](docs/contributing.md)
2. Check [open issues](https://github.com/your-org/murmr/issues)
3. Join our [developer community](https://discord.gg/murmr)
4. Review our [Code of Conduct](docs/code-of-conduct.md)

---

## 📞 **Support & Resources**

### **For Users**
- **Crisis Support**: Available 24/7 within the app
- **User Guide**: [Complete usage documentation](docs/user-guide.md)
- **Community Support**: peer-support@murmr.com

### **For Developers** 
- **Technical Documentation**: [Developer Wiki](docs/developer-setup.md)
- **API Reference**: [Function documentation](docs/api-reference.md)  
- **Community Discord**: [Join developer discussions](https://discord.gg/murmr-dev)

### **Crisis Resources**
- **India**: KIRAN Mental Health Helpline - 1800-599-0019
- **International**: Crisis Text Line - Text HOME to 741741
- **Emergency**: Always contact local emergency services for immediate danger

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Built with ❤️ for youth mental wellness**