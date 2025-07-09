
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRyJV5X1Dfuwb5KsBVRnJ1N7Sl1zuf9nQ",
  authDomain: "splash-scouter-app.firebaseapp.com",
  projectId: "splash-scouter-app",
  storageBucket: "splash-scouter-app.firebasestorage.app",
  messagingSenderId: "634929065918",
  appId: "1:634929065918:web:36631b3b642fbac88ad3ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
