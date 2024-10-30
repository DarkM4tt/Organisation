import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { auth, app, messaging };

export const generateToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    // const token = await getToken(messaging,{
    //   vapidKey:"BPHF1z_DcXU4i1zEXt5zCeHiVSIFYvIn4m4MYK396tKKCVD5JjNpwXlzNaGWM9A6ygSkXuRepu0uOcmOwtxOCzs"
    // })
  }
};
