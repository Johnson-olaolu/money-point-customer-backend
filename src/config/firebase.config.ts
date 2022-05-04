import { ConfigService } from "@nestjs/config";
import { ServiceAccount } from "firebase-admin";
import * as dotenv from "dotenv"
dotenv.config()

//const configService: ConfigService = ConfigService;
export const firebaseAdminConfig : ServiceAccount = {
    projectId:process.env.FIREBASE_PROJECT_ID,
    privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail:process.env.FIREBASE_CLIENT_EMAIL
}