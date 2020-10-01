import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import Config from '../config/config';

const firebaseConfig = Config.firebaseConfig;

firebase.initializeApp(firebaseConfig);

const getCurrentUser = () => {
    return firebase.auth().currentUser;
}

const isLoggedIn = () => {
    if (firebase.auth().currentUser) {
        return true;
    }

    return false;
}

const signIn = (email, password) => {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then( (user) => {
        //console.log(user.user.getIdToken());
        return user.user.getIdToken().then(idToken => {
            return idToken;          
        });
    });
}

const signOut = () => {
    return firebase.auth().signOut();
}

const onLoginChange = (callbackFunction = () => {}) => {
    const authRef = firebase.auth().onAuthStateChanged((user) => {
        callbackFunction(user);
    });

    return authRef;
}


export default {
    getCurrentUser,
    isLoggedIn,
    signIn,
    signOut,
    onLoginChange
}
