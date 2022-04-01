declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    ENV: string;
    URL: string;
    MONGO_PASS: string;
    MONGO_URL: string;
    NEXT_AUTH_SECRET: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    AUTH0_DOMAIN: string;
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_DB_URL: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASSUREMENT_ID: string;
    REMARK_HOST: string;
    REMARK_SITE_ID: string;
    REMARK_LOCALE: string;
  }
}
