import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";
const initializeAuthentication = () => {
    initializeApp(firebaseConfig);
}
export default initializeAuthentication;

/*
steps for authentication
=================================
1. - Initial setup---------
1.0-firebase: create project
1.1- create web app
1.2- get configuration
1.3- initialize firebase
1.4- Enable auth method

2. Step:----------------------
2.1- create Login Component
2.2- create register component
2.3- create Route for Login and Register

3.step-------------------------
3.0 set up sign in method
3.1 set up sign out method
3.2 user state
3.3 special observer
3.4 return necessary methods and states from useFirebase

4. Step--------------------------
4.0 create a auth context
4.1 creat context Provider
4.2 use auth provider
4.3 crate useAuth Hook
4.2 set context Provider context value
4.2

*/