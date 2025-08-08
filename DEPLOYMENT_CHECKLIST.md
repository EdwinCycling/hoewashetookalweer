# 🚀 Deployment Checklist - HoeWasHetOokAlweer

## 📋 Environment Variables voor Netlify

### Firebase Config (Client-side)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Admin (Server-side)
```
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
```

### Stripe
```
STRIPE_SECRET_KEY=sk_test_... (of sk_live_... voor productie)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### reCAPTCHA
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## 🔧 Netlify Setup Stappen

### 1. Repository koppelen
- Ga naar [netlify.com](https://netlify.com)
- Klik "New site from Git"
- Kies GitHub en selecteer je repository
- Branch: `main`

### 2. Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18 (of hoger)

### 3. Environment Variables instellen
- Ga naar Site settings → Environment variables
- Voeg alle bovenstaande variabelen toe
- **Belangrijk:** Gebruik je echte API keys, niet de dummy waarden!

### 4. Domain instellen
- Netlify geeft je een random URL (bijv. `amazing-app-123.netlify.app`)
- Je kunt een custom domain instellen in Domain settings

## ⚠️ Belangrijke Notities

### Security
- ✅ Je API keys zijn veilig in Netlify environment variables
- ✅ Ze worden niet in je code opgeslagen
- ✅ Alleen server-side code heeft toegang tot server-side keys

### Firebase Setup
- Zorg dat je Firebase project de juiste domains heeft toegevoegd
- Voor development: `localhost:3000`
- Voor productie: je Netlify domain

### Stripe Webhooks
- Update je Stripe webhook URL naar: `https://your-domain.netlify.app/api/webhooks/stripe`
- Test de webhook in Stripe dashboard

### reCAPTCHA
- Update je reCAPTCHA domains in Google reCAPTCHA console
- Voeg je Netlify domain toe

## 🧪 Test Checklist

Na deployment, test:
- [ ] Login functionaliteit
- [ ] Premium features
- [ ] Stripe checkout
- [ ] reCAPTCHA op forms
- [ ] Alle tabs laden correct
- [ ] Firebase database connectie

## 🔄 Updates

Voor toekomstige updates:
1. Push naar GitHub `main` branch
2. Netlify bouwt automatisch opnieuw
3. Environment variables blijven behouden

## 📞 Support

Als er problemen zijn:
1. Check Netlify build logs
2. Controleer environment variables
3. Test lokaal met `npm run build`
