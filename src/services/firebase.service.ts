import {Injectable} from "@nestjs/common";
import * as firebase from "firebase-admin";
import * as dotenv from "dotenv"
import { firebaseAdminConfig } from "src/config/firebase.config";

dotenv.config()

@Injectable()
export class FirebaseApp {
    private firebaseApp: firebase.app.App;

    constructor() {
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseAdminConfig),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    }

    firestore = (): firebase.firestore.Firestore => {
        return this.firebaseApp.firestore();
    }

    db = (): firebase.database.Database => {
        return this.firebaseApp.database()
    }
}