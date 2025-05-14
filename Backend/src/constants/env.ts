const getEnv = (key: string, defaultValue: string): string => {
  const value = process.env[key];
    if (value === undefined) {
        return defaultValue;
    }
    return value;
}


export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const MONGO_URI = getEnv("MONGO_URI" , "mongodb+srv://mehroz:mehroz@auth.ni17dpq.mongodb.net/?retryWrites=true&w=majority&appName=auth");
export const APP_ORIGIN = getEnv("APP_ORIGIN" , "http://localhost:3000");
export const JWT_SECRET = getEnv("JWT_SECRET" , "your_jwt");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET" , "your_jwt_refresh");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER" , "your_email_sender");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY" , "re_6z5Xi6X3_HkQSX9FMojfuABU15jpoYuJu");