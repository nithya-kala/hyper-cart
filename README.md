# HyperCart 🐟

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnithya-kala%2Fhyper-cart&env=NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_PROJECT_ID,NEXT_PUBLIC_FIREBASE_APPID,FIREBASE_PRIVATE_KEY,FIREBASE_CLIENT_EMAIL&project-name=hyper-cart&repository-name=hyper-cart)

HyperCart is a e-commerce application built using Next.js, shadcn/ui, Tailwind CSS, and Firebase, and deployed on Vercel. Experience a fast, responsive shopping cart application.

**Tech Stack:**

- **Vercel:** Cloud platform for hosting and automated deployments.
- **Next.js:** React framework for building server-rendered web apps **using the new app router**.
- **Firebase:** Authentication and real-time database (Firestore).
- **Shadcn/ui and Tailwind CSS:** UI components and utility-first CSS framework.
- **Zustand:** State management for handling app data.

**Live Demo:** [https://hyper-cart-phi.vercel.app/](https://hyper-cart-phi.vercel.app/)

## Setup

1.  **Firebase Setup:** Ensure your Firebase project is created and that the following services are enabled:
    - **Authentication:** Enable the authentication method you prefer (e.g., email/password, Google).
    - **Firestore:** Create a Firestore database.
2.  `npm i` and `npm run dev`

## Environment variables

1.  **Public Firebase Configuration:**
    - Go to your Firebase project settings.
    - Find the "Your apps" section.
    - Select your web app, and copy the "Firebase configuration".
    - Create a new file called `.env.local` at the root of your project.
    - Paste the following into `.env.local`, replacing the placeholders with your Firebase config:
    ```sh
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_APPID=your_firebase_app_id
    ```
2.  **Admin SDK Private Key:**
    - This is for FIREBASE_ADMIN_SDK. Get your Firebase service account private key and client email
    - Go to your Firebase Project Setting
    - Select "Service accounts"
    - Click on "Generate new private key"
    - Add these keys to your `.env.local`:
    ```sh
    FIREBASE_PRIVATE_KEY=your_firebase_private_key
    FIREBASE_CLIENT_EMAIL=your_firebase_client_email
    ```

**Created by [⬡ Nithyakala Rajendran](https://nithis.in)**
