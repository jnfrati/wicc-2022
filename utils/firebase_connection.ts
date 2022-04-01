import firebase from "firebase";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { firebaseConfig },
} = getConfig();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
