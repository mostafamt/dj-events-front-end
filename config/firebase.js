// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_hZaXEr7rs1fL6JbDdxyChqwtvptlZlM",
  authDomain: "uploadingfiles-221e5.firebaseapp.com",
  projectId: "uploadingfiles-221e5",
  storageBucket: "uploadingfiles-221e5.appspot.com",
  messagingSenderId: "93310392760",
  appId: "1:93310392760:web:6010fbfb9e1f1e9e53974d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
