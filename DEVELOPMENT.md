# Development Setup Guide

This guide helps you set up Astra AI for development with mock authentication.

## Quick Start for Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Convex Backend
```bash
npx convex login
npx convex dev
```
This will start the Convex backend and show your deployment URL.

### 3. Get Google Gemini API Key
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key
- Add it to your environment variables

### 4. Environment Configuration
Copy the development environment file:
```bash
cp .env.development .env.local
```

Edit `.env.local` and add:
- Your Convex deployment URL (from step 2)
- Your Google Gemini API key (from step 3)

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Mock Authentication

When OAuth environment variables are not set, Astra AI automatically uses mock authentication:

### Google Sign-In Mock
- Click "Get Started" → "Sign In With Google"
- Creates a "Development User" account
- No real Google OAuth required
- User data: `dev.user@astra-ai.local`

### GitHub Integration Mock
- Click "Push to GitHub" in workspace
- Shows alert about mock OAuth
- Still allows you to configure repository name
- No actual GitHub integration

## Production Setup

For production, you'll need to configure real OAuth:

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000` for development
6. Add your production domain for deployment

### GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create "New OAuth App"
3. Set callback URL: `http://localhost:3000/api/auth/github/callback`
4. Copy Client ID and Client Secret

### Environment Variables for Production
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_real_google_client_id
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your_real_google_client_id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_real_github_client_id
GITHUB_CLIENT_SECRET=your_real_github_client_secret
```

## Troubleshooting

### "Missing required parameter client_id" Error
This error occurs when Google OAuth is not configured. The mock authentication fixes this automatically.

### Convex Connection Issues
Make sure Convex is running: `npx convex dev`
Check your deployment URL in `.env.local`

### AI Not Working
Ensure your Google Gemini API key is valid and has quota remaining.

## Development Features

- ✅ Mock authentication (no OAuth setup required)
- ✅ Hot reload for fast development
- ✅ Mock GitHub integration
- ✅ Full AI functionality (with real API key)
- ✅ Local development database via Convex

## File Structure for Mock Implementation

```
components/custom/
├── MockGoogleOAuthProvider.jsx    # Mock OAuth provider
├── useGoogleLogin.js              # Mock Google login hook
└── SignInDialog.jsx               # Updated to use mocks when needed

app/
└── provider.jsx                   # Conditional OAuth provider

.env.development                   # Development environment template
.env.local.example                 # Example environment file
```