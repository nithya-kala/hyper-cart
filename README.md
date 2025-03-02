# HyperCart 🐟

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnithya-kala%2Fhyper-cart&env=NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_PROJECT_ID,NEXT_PUBLIC_FIREBASE_APPID,FIREBASE_PRIVATE_KEY,FIREBASE_CLIENT_EMAIL&project-name=hyper-cart&repository-name=hyper-cart)

### Basic HyperCard built with Next.js, shadcn/ui, Tailwind and Firebase on Vercel!

See HyperCart in action with the live demo: https://vercel.com/nithyas-projects-6a45b31c

> Using Next.js app router!

- **Ve**rcel for cloud and automated deployments
- **Ne**xt.js for better React
- **Fi**rebase for auth and database (Firestore)
- **Sh**adcn and Tailwind for UI/styling
- **Zu**stand for state management

## Setup

1. Make sure your Firebase project has authentication added
2. Get your Firebase config and paste it into `.env.local`
3. `npm i` and `npm run dev`

## Environment variables

1. Create a new file at the root level called `.env.local`
2. Get your public Firebase config and paste it into `.env.local`
   ```sh
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_APPID=your_firebase_app_id
   ```
3. This is for FIREBASE_ADMIN_SDK. Get your Firebase service account private key and client email
   ```sh
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

**Created by [⬡ Nithyakala Rajendran](https://nithis.in)**
