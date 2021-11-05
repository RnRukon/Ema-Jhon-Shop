import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import initializeAuthentication from "../Firebase/Firebase.init";

initializeAuthentication()
const useFirebase = () => {

    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setUser({})
            }).catch((error) => {
                // An error happened.
            });
    }
    //observe whether user auth state change or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem('idToken', idToken))
                setUser(user)

            }
        });
    }, [auth])

    return {
        user,
        signInUsingGoogle,
        logOut

    }
}
export default useFirebase;