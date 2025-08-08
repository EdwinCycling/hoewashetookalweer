# HoeWasHetOokAlweer.nl

Een nostalgische website die historische gegevens, nieuws, muziek en meer toont voor elke dag in het verleden. "Hoe was het ook al weer?"

## 🚀 Features

- **Historische Data**: Ontdek wat er gebeurde op elke dag in het verleden
- **Muziek & Films**: Top hits, films en TV series van toen
- **Weer Data**: Historische weer informatie via KNMI
- **Sport**: Voetbal, Formule 1, Olympische Spelen en meer
- **Politiek & Nieuws**: Belangrijke politieke gebeurtenissen
- **Premium Features**: Uitgebreide historische data tot 1925
- **Responsive Design**: Werkt op alle apparaten

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Payments**: Stripe
- **Deployment**: Vercel (aanbevolen)

## 📋 Vereisten

- Node.js 18+ 
- npm of yarn
- Firebase project
- Stripe account (voor betalingen)

## 🔧 Installatie

1. **Clone het project**
   ```bash
   git clone <repository-url>
   cd HoeWasHetOokAlweer
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   # of
   yarn install
   ```

3. **Configureer omgevingsvariabelen**
   ```bash
   cp env.example .env.local
   ```
   
   Vul de volgende variabelen in in `.env.local`:
   - Firebase configuratie
   - Stripe API keys
   - Admin API key
   - reCAPTCHA site key

4. **Start de development server**
   ```bash
   npm run dev
   # of
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🔑 Omgevingsvariabelen

Zie `env.example` voor alle benodigde omgevingsvariabelen. De belangrijkste zijn:

### Firebase
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `MY_FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY`

### Stripe
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

## 📁 Project Structuur

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── premium/           # Premium pages
│   └── ...
├── actions/               # Server actions
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── data/                 # Static data files
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── context/              # React context providers
```

## 🚀 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Verbind je repository met Vercel
3. Configureer omgevingsvariabelen in Vercel dashboard
4. Deploy!

### Andere platforms

Het project kan ook gedeployed worden op:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build voor productie
npm run start        # Start productie server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

- TypeScript voor type safety
- ESLint voor code linting
- Prettier voor code formatting
- Conventional commits

## 📊 Data Sources

- **KNMI**: Weer data
- **Wikipedia**: Historische gebeurtenissen
- **IMDB**: Film en TV data
- **Spotify**: Muziek data
- **Voetbal**: Eredivisie en internationale competities

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 🆘 Support

Voor vragen of problemen:
- Open een issue op GitHub
- Neem contact op via de website

## 🙏 Dankbetuiging

- KNMI voor weer data
- Wikipedia voor historische informatie
- Alle data providers en APIs
- De open source community
