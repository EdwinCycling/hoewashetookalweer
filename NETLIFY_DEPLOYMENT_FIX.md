# Netlify Deployment Fix

## Problem
The original deployment was failing because:
1. Next.js API routes (`/api/*`) are not supported in Netlify's static builds
2. The postcard functionality was trying to call `/api/generate-postcard-summary` and `/api/postcards` which returned 404 errors

## Solution
Converted Next.js API routes to Netlify Functions:

### 1. Created Netlify Functions
- `netlify/functions/generate-postcard-summary.js` - Generates postcard content summaries
- `netlify/functions/postcards.js` - Serves postcard image data

### 2. Updated API Calls
- Changed `/api/generate-postcard-summary` to `/.netlify/functions/generate-postcard-summary`
- Changed `/api/postcards` to `/.netlify/functions/postcards`

### 3. Updated Configuration
- Modified `netlify.toml` to support functions and redirect API calls
- Updated `package.json` build scripts to install function dependencies
- Updated `robots.txt` with new API endpoints

## Files Modified
- `netlify.toml` - Added function support and API redirects
- `app/postcard-simple/page.tsx` - Updated API endpoints
- `package.json` - Added function build step
- `public/robots.txt` - Updated API endpoints
- `netlify/functions/generate-postcard-summary.js` - New function
- `netlify/functions/postcards.js` - New function
- `netlify/functions/package.json` - Function dependencies

## Deployment Steps

### 1. Build Locally (Optional)
```bash
npm run build
```

### 2. Deploy to Netlify
The build process will automatically:
- Build the Next.js app
- Install function dependencies
- Deploy functions to Netlify

### 3. Verify Deployment
- Check that postcards load without errors
- Verify content generation works
- Test PDF generation functionality

## Notes
- Netlify Functions require Node.js 18+ (configured in netlify.toml)
- Functions are automatically deployed with the main build
- API calls are redirected from `/api/*` to `/.netlify/functions/*`
- CORS is enabled for all functions to support cross-origin requests

## Troubleshooting
If you still see errors:
1. Check Netlify build logs for function deployment issues
2. Verify function dependencies are installed
3. Check browser console for CORS errors
4. Ensure Netlify Functions are enabled in your account
