import { createContext, useEffect, useState } from "react";
import { UserModel } from "../../../backend/src/models/user.model";
import { FirebaseService } from "../services/firebase.service";

export const PageContext = createContext()

export function PageProvider({ children }) {
    const [path, setPath] = useState(window.location.href)
    /**
     * @type [user: UserModel, React.Dispatch<React.SetStateAction<UserModel>>]
     */
    const [user, setUser] = useState(undefined)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = FirebaseService.authObserver(user => {
            setUser(user)
            setLoading(false)
        })
        return () => unsubscribe();
    }, []);

    return (
        <PageContext.Provider value={
            { path, setPath, user, loading }
        } >
            {children}
        </PageContext.Provider>
    )
}