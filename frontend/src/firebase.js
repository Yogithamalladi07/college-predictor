import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
        apiKey: "AIzaSyDr_vVjDjjdDfu0-1FzLC178AdW0N4ITOk",
        authDomain: "college-predictor-a551b.firebaseapp.com",
        projectId: "college-predictor-a551b",
        storageBucket: "college-predictor-a551b.firebasestorage.app",
        messagingSenderId: "617270281303",
        appId: "1:617270281303:web:dabd54050ea630417b8f12",
        measurementId: "G-8LE29LP9T2"
        };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);