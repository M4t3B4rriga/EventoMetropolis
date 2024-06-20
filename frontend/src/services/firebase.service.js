// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { UserModel } from "../../../backend/src/models/user.model"

export class FirebaseService {
    static #firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: "react-login-app-49af0.firebaseapp.com",
        projectId: "react-login-app-49af0",
        storageBucket: "react-login-app-49af0.appspot.com",
        messagingSenderId: "795779259715",
        appId: "1:795779259715:web:bf9aa1367c0a43c7d663f6",
        measurementId: "G-GTJPL6KW1E"
        
    }
    static #app = initializeApp(this.#firebaseConfig)
    static #auth = getAuth(this.#app)

    static register(email, password) {
        return createUserWithEmailAndPassword(this.#auth, email, password)
    }

    static login(email, password) {
        return signInWithEmailAndPassword(this.#auth, email, password)
    }

    static logout() {
        signOut(this.#auth)
    }

    /**
     * 
     * @param {(user: UserModel | undefined) => void} updateUser 
     * @returns 
     */
    static authObserver(updateUser) {
        return onAuthStateChanged(this.#auth, (user) => {
            if (user) {
                updateUser(new UserModel(user.uid, user.email))
            } else {
                updateUser(undefined)
            }
        })
    }
}