import firebase from 'firebase';
import '@firebase/firestore';
import env from './env.json';

const firebaseConfig = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId
}

class Fire {
    constructor(callback) {
        this.init(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                    firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
                }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection('users')
            .doc(this.userId)
            .collection('lists');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            })

            callback(lists);
        })
    }
    get userId() {
        return firebase.auth().currentUser.uid
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;