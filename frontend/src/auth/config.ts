import { initializeApp } from "firebase/app";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "book-list-a8a32.firebaseapp.com",
  projectId: "book-list-a8a32",
  storageBucket: "book-list-a8a32.appspot.com",
  messagingSenderId: "867747876742",
  appId: "1:867747876742:web:c9dbe5db6bcd9cc160a607",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
(async () => {
  await setPersistence(auth, browserSessionPersistence);
})();
export default auth;
