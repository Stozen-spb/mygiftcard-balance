import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'

// firebase init - add your own config here
const firebaseConfig = {
        apiKey: "AIzaSyAQ1FtjQfyFhExuIDK3vYEfELNrk_sWcok",
        authDomain: "mygiftcard-balance.firebaseapp.com",
        databaseURL: "https://mygiftcard-balance-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "mygiftcard-balance",
        storageBucket: "mygiftcard-balance.appspot.com",
        messagingSenderId: "785601988374",
        appId: "1:785601988374:web:f2d0f10fecdb1ae9e87237",
        measurementId: "G-JF5Q0R52DV"
      };
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database()
const auth = firebase.auth()
auth.useDeviceLanguage();


// export utils/refs
export {
  db,
  auth
}