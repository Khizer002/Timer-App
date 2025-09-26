import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA7DXOeUzOPDTmrcTmQ8084CCOGuqvKgLs",
  authDomain: "timer-app-5d211.firebaseapp.com",
  projectId: "timer-app-5d211",
  storageBucket: "timer-app-5d211.firebasestorage.app",
  messagingSenderId: "424212541693",
  appId: "1:424212541693:web:fc4973043137911f0a0e94",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export async function initNotification() {
    try {
        const permission = await Notification.requestPermission();
        console.log("Checking: ",permission)
        if (permission === "granted") {
            const token = await messaging.getToken();
            console.log(`Token => ${token}`);
        } else {
            console.warn("Notification permission not granted.");
        }
    } catch (err) {
        console.error("An error occurred while retrieving token: ", err);
    }
}
