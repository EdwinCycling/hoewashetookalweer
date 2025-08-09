# 🎯 **Stripe Payment Setup Guide**

## ✅ **Code Updates Compleet**

Alle code is bijgewerkt voor de nieuwe Stripe configuratie:

### 🔧 **Environment Variables Setup**

Maak een `.env.local` bestand in de root van je project met:

```env
# Firebase Configuration (bestaand)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Firebase Admin SDK (bestaand)
MY_FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Stripe Configuration (NIEUW/UPDATE)
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY

# Stripe Price IDs - Maak deze aan in je Stripe Dashboard
STRIPE_PRICE_ID_JAAR=price_YOUR_1_YEAR_PRICE_ID
STRIPE_PRICE_ID_TWEEJAAR=price_YOUR_2_YEAR_PRICE_ID
STRIPE_PRICE_ID_EEUWIG=price_YOUR_10_YEAR_UNLIMITED_PRICE_ID

# Public Price IDs for frontend
NEXT_PUBLIC_STRIPE_PRICE_ID_JAAR=price_YOUR_1_YEAR_PRICE_ID
NEXT_PUBLIC_STRIPE_PRICE_ID_TWEEJAAR=price_YOUR_2_YEAR_PRICE_ID
NEXT_PUBLIC_STRIPE_PRICE_ID_EEUWIG=price_YOUR_10_YEAR_UNLIMITED_PRICE_ID

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_API_KEY=your_admin_api_key_here
```

---

## 💳 **Stripe Dashboard Setup**

### 1. **Stripe Account**
- Log in op [Stripe Dashboard](https://dashboard.stripe.com)
- Zorg dat je in **Test Mode** bent voor development

### 2. **Maak Price IDs aan**
Ga naar **Products** → **Create Product**:

**Product 1: Jaarpas**
- Name: `HoeWasHetOokAlweer - Jaarpas`
- Price: `€3.00`
- Billing: `One time`
- Copy de `price_xxx` ID

**Product 2: Tweejaarpas**
- Name: `HoeWasHetOokAlweer - Tweejaarpas`
- Price: `€5.00` 
- Billing: `One time`
- Copy de `price_xxx` ID

**Product 3: Eeuwige Toegang**
- Name: `HoeWasHetOokAlweer - Eeuwige Toegang`
- Price: `€10.00`
- Billing: `One time`
- Copy de `price_xxx` ID

### 3. **Webhook Setup**
Ga naar **Developers** → **Webhooks** → **Add endpoint**:

- **Endpoint URL**: `https://hoewashetookalweer.nl/api/webhooks/stripe`
  (Voor localhost: `https://smee.io` of ngrok)
- **Events to send**: 
  - `checkout.session.completed`
- Copy de **Webhook Secret** (`whsec_xxx`)

### 4. **API Keys**
Ga naar **Developers** → **API Keys**:
- Copy **Publishable key** (`pk_test_xxx`)
- Copy **Secret key** (`sk_test_xxx`) - **GEHEIM!**

---

## 🔄 **Payment Flow**

### **1. Klant koopt premium**
1. Klant gaat naar `/premium`
2. Kiest een pakket (1 jaar, 2 jaar, of 10 jaar)
3. Vult email in (als niet ingelogd)
4. Wordt doorgestuurd naar Stripe Checkout

### **2. Betaling afgerond**
1. Stripe webhook fired: `checkout.session.completed`
2. Code controleert `payment_status === 'paid'`
3. Extraheert email en price_id uit session
4. Berekent expiry date:
   - **1 jaar**: `vandaag + 1 jaar`
   - **2 jaar**: `vandaag + 2 jaar`  
   - **10 jaar**: `vandaag + 10 jaar`
5. Slaat user op in Firestore `premium_users` collectie

### **3. Account aanmaken**
1. Klant gaat naar `/signup` met hun email
2. Code controleert of email premium is en niet verlopen
3. Bij success: account aangemaakt + automatisch ingelogd
4. Toast toont: "Welkom! Je hebt X dagen premium toegang"

### **4. Inloggen**
1. Klant logt in op `/login`
2. Na inloggen wordt premium status gecheckt
3. Toast toont: "Welkom terug! Nog X dagen premium"

---

## 🧪 **Testing**

### **Local Testing**
1. Start development server: `npm run dev`
2. Ga naar `http://localhost:3000/premium`
3. Test met Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### **Webhook Testing**
Voor lokaal testen van webhooks:
1. Install Stripe CLI: `stripe login`
2. Forward events: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Copy de webhook secret naar je `.env.local`

### **Test Complete Flow**
1. **Betaling**: Koop premium pakket
2. **Webhook**: Check Firebase voor nieuwe premium user
3. **Signup**: Registreer met het email adres
4. **Login**: Log in en check welcome message

---

## 📁 **Database Structure**

**Firestore collectie: `premium_users`**
```
email: "user@example.com"
expiryDate: Timestamp
updatedAt: Timestamp  
lastPurchasePriceId: "price_xxx"
```

**Firebase Auth**: Normale user accounts met email/password

---

## 🚨 **Security Checklist**

- [ ] `.env.local` is in `.gitignore`
- [ ] Stripe Secret Key is NOOIT in frontend code
- [ ] Webhook secret is correct ingesteld
- [ ] Test mode voor development
- [ ] Prod keys alleen op productie server

---

## 📞 **Support**

Bij problemen check:
1. **Stripe Logs**: Dashboard → Developers → Logs
2. **Webhook Logs**: Dashboard → Developers → Webhooks  
3. **Browser Console**: F12 voor frontend errors
4. **Server Logs**: `npm run dev` output

**De volledige payment flow is nu klaar voor testing!** 🚀
