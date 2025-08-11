# Stripe Setup Instructies voor HoeWasHetOokAlWeer.nl

## 🚨 Probleem Oplossen: "De prijs voor dit product is niet goed geconfigureerd"

Deze foutmelding verschijnt omdat Stripe nog niet is geconfigureerd in de applicatie. Volg deze stappen om betalingen in te schakelen:

## 📋 Vereiste Stappen

### 1. Stripe Account Aanmaken
- Ga naar [stripe.com](https://stripe.com) en maak een account aan
- Kies voor een gratis account (geen maandelijkse kosten)
- Verifieer uw e-mailadres en bedrijfsgegevens

### 2. Producten Aanmaken in Stripe Dashboard
Log in op uw Stripe Dashboard en maak de volgende producten aan:

#### Product 1: Jaarpas
- **Naam**: Jaarpas Premium
- **Prijs**: €3,00 EUR
- **Betalingsmodel**: Eenmalige betaling
- **Beschrijving**: 1 jaar premium toegang tot HoeWasHetOokAlWeer.nl

#### Product 2: Tweejaarpas
- **Naam**: Tweejaarpas Premium
- **Prijs**: €5,00 EUR
- **Betalingsmodel**: Eenmalige betaling
- **Beschrijving**: 2 jaar premium toegang tot HoeWasHetOokAlWeer.nl

#### Product 3: Eeuwige Toegang
- **Naam**: Eeuwige Toegang Premium
- **Prijs**: €10,00 EUR
- **Betalingsmodel**: Eenmalige betaling
- **Beschrijving**: 10 jaar premium toegang tot HoeWasHetOokAlWeer.nl

### 3. Price IDs Kopiëren
Na het aanmaken van elk product:
1. Klik op het product
2. Ga naar de "Pricing" sectie
3. Kopieer de **Price ID** (begint met `price_`)

### 4. Environment Variables Instellen
Maak een `.env.local` bestand aan in de root van uw project met de volgende variabelen:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_ID_JAAR=price_your_1_year_price_id
NEXT_PUBLIC_STRIPE_PRICE_ID_TWEEJAAR=price_your_2_year_price_id
NEXT_PUBLIC_STRIPE_PRICE_ID_EEUWIG=price_your_10_year_price_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Stripe Keys Vinden
In uw Stripe Dashboard:
- **Publishable Key**: Developers → API Keys → Publishable key
- **Secret Key**: Developers → API Keys → Secret key
- **Webhook Secret**: Developers → Webhooks → Voeg endpoint toe → Kopieer signing secret

### 6. Webhook Endpoint Instellen
1. Ga naar Developers → Webhooks in Stripe Dashboard
2. Klik "Add endpoint"
3. **Endpoint URL**: `https://uwdomein.nl/api/webhooks/stripe`
4. **Events**: Selecteer `checkout.session.completed`
5. Kopieer de webhook signing secret naar `STRIPE_WEBHOOK_SECRET`

## 🔧 Testen

### 1. Lokale Test
```bash
npm run dev
```
- Ga naar `/premium`
- Controleer of de waarschuwing verdwenen is
- Test een betaling (gebruik test kaart: 4242 4242 4242 4242)

### 2. Test Kaartnummers
- **Succesvol**: 4242 4242 4242 4242
- **Geweigerd**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## 🚀 Deployment

### 1. Environment Variables
Zorg ervoor dat alle environment variables ook op uw hosting platform zijn ingesteld:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Andere platforms: Raadpleeg hun documentatie

### 2. Webhook URL Aanpassen
Verander de webhook URL naar uw live domein:
```
https://uwdomein.nl/api/webhooks/stripe
```

## 📱 Premium Features

Na configuratie hebben gebruikers toegang tot:
- **Uitgebreide historische data** (tot 1925)
- **Alle premium tabs** (18 exclusieve tabs)
- **Reclamevrije ervaring**
- **Onbeperkte tab wissels**
- **Exclusieve postcard templates**

## 🆘 Problemen Oplossen

### Fout: "Stripe is niet geconfigureerd"
- Controleer of alle environment variables zijn ingesteld
- Herstart de development server na het toevoegen van `.env.local`

### Fout: "Price ID niet gevonden"
- Controleer of de Price IDs correct zijn gekopieerd
- Zorg ervoor dat de producten in Stripe zijn aangemaakt

### Betalingen werken niet
- Controleer of de webhook endpoint correct is ingesteld
- Controleer de Stripe logs in uw dashboard
- Zorg ervoor dat de webhook secret correct is ingesteld

## 📞 Ondersteuning

Voor technische ondersteuning:
- Controleer de browser console voor foutmeldingen
- Controleer de Stripe dashboard logs
- Raadpleeg de [Stripe documentatie](https://stripe.com/docs)

---

**Let op**: Zorg ervoor dat u in test mode blijft totdat u klaar bent voor productie. In test mode worden geen echte betalingen verwerkt.
