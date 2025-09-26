importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

cacheName="timer-app"
const filestoCache = [
    "/",
    "/index.html",
    "/assets/index-BtnhdoIX.js",
    "/assets/index-DCfVHZpk.css"
]

const firebaseConfig = {
  apiKey: "AIzaSyA7DXOeUzOPDTmrcTmQ8084CCOGuqvKgLs",
  authDomain: "timer-app-5d211.firebaseapp.com",
  projectId: "timer-app-5d211",
  storageBucket: "timer-app-5d211.firebasestorage.app",  
  messagingSenderId: "424212541693",
  appId: "1:424212541693:web:fc4973043137911f0a0e94"
};

firebase.initializeApp(firebaseConfig)
const messaging=firebase.messaging();

messaging.onBackgroundMessage((payload)=>{  
    console.log("Background Messaging: ", payload)
    self.registration.showNotification(payload.notification.title,{
        body: payload.notification.body,
        icon: "./logo192.png",
    })
})

self.addEventListener("activate",()=>{
    console.log("Activated: ")
})

self.addEventListener("install", (e) => {
    console.log("SW: Installing...")
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("SW: Caching files...")
            return cache.addAll(filestoCache)
                .then(() => console.log("SW: All files cached!"))
                .catch(err => console.error("SW: Cache failed:", err))
        })
    )
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            if (response) {
                console.log("SW: From cache:", e.request.url)
                return response
            }
            console.log("SW: From network:", e.request.url)
            return fetch(e.request)
        })
    )
})