# Deployment Checklist - HoeWasHetOokAlWeer.nl

## Netlify Deployment Stappen

### 1. Voorbereiding
- [x] Alle configuratiebestanden zijn aanwezig
- [x] Dependencies zijn correct geïnstalleerd
- [x] TypeScript configuratie is geoptimaliseerd
- [x] Next.js configuratie is aangepast voor Netlify

### 2. Netlify Dashboard Instellingen

#### Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

#### Environment Variables
Zorg ervoor dat alle volgende environment variables zijn ingesteld:

**Firebase (Public)**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Firebase Admin (Secret)**
```
MY_FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

**Stripe (Public)**
```
NEXT_PUBLIC_STRIPE_PRICE_ID_JAAR=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_TWEEJAAR=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_EEUWIG=price_xxxxx
```

**Stripe (Secret)**
```
STRIPE_SECRET_KEY=sk_test_... (of sk_live_... voor productie)
STRIPE_WEBHOOK_SECRET=whsec_...
```

**reCAPTCHA (Public)**
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

**Admin**
```
ADMIN_API_KEY=your_admin_api_key
```

**App**
```
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NODE_ENV=production
```

### 3. Netlify Plugin Verwijderen
1. Ga naar Site settings > Build & deploy > Build plugins
2. Verwijder eventuele Next.js plugins
3. Gebruik alleen de standaard Netlify build process

### 4. Build Cache Wissen
1. Ga naar Site settings > Build & deploy > Build cache
2. Klik op "Clear build cache"
3. Trigger een nieuwe deployment

### 5. Deployment Troubleshooting

#### Als build faalt met path resolution errors:
1. Controleer of alle `@/` imports correct zijn
2. Zorg ervoor dat `tsconfig.json` paths correct zijn geconfigureerd
3. Controleer of alle dependencies in `package.json` staan

#### Als build faalt met TypeScript errors:
1. Controleer of `typescript` in dependencies staat (niet devDependencies)
2. Zorg ervoor dat `@types/*` packages correct zijn geïnstalleerd
3. Controleer of `strict: false` in `tsconfig.json` staat

#### Als site werkt maar routing niet:
1. Controleer of `_redirects` bestand correct is
2. Zorg ervoor dat Netlify redirects correct zijn geconfigureerd
3. Test client-side routing

### 6. Alternatieve Deployment (Vercel)

Als Netlify problemen blijft geven, is Vercel de aanbevolen optie:

1. **Push code naar GitHub**
2. **Import project in Vercel**
3. **Configure environment variables**
4. **Deploy**

Vercel heeft betere native ondersteuning voor Next.js en minder configuratie nodig.

### 7. Post-Deployment Checklist

- [ ] Homepage laadt correct
- [ ] Alle tabs werken (Nederlandse films, Internationale films, etc.)
- [ ] Firebase authentication werkt
- [ ] Stripe checkout werkt
- [ ] Admin functionaliteit werkt
- [ ] Mobile responsive design werkt
- [ ] Performance is acceptabel

### 8. Monitoring

Na deployment:
- Monitor build logs voor errors
- Test alle belangrijke functionaliteiten
- Controleer Firebase logs voor errors
- Monitor Stripe webhook deliveries

## Huidige Configuratie

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"
  CI = "false"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './'),
    };
    return config;
  },
}

module.exports = nextConfig
```

## Belangrijke Notities

1. **Node.js versie**: Gebruik Node.js 18 voor betere compatibiliteit
2. **Legacy peer deps**: Nodig voor sommige dependencies
3. **CI=false**: Voorkomt waarschuwingen die build kunnen breken
4. **Path resolution**: Webpack alias zorgt voor correcte `@/` imports
5. **Redirects**: Zorgt voor correcte client-side routing

## Contact

Bij problemen:
1. Check build logs in Netlify dashboard
2. Controleer environment variables
3. Test lokaal met `npm run build`
4. Overweeg Vercel als alternatief
