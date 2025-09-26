importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

cacheName="timer-app"
filestoCache=[
    "./",                                    
    "./index.html",
    "./vite.svg",
    "./logo192.png",
    "./assets/index-BtnhdoIX.js",            
    "./assets/index-DCfVHZpk.css ",           
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
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

self.addEventListener("install",(e)=>{
    console.log("Installing: ")
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log("Adding Files: ")
            return cache.addAll(filestoCache)
                .catch((error) => {                     
                    console.error("Failed to cache files:", error);
                    throw error;
                });
        })
    )
})

self.addEventListener("fetch",(e)=>{
    console.log("Fetching",e.request.url)
    
    if (e.request.method !== 'GET') {
        return;
    }
    
    e.respondWith(
        caches.match(e.request).then((response)=>{
            if (response) {
                console.log("Served from cache:", e.request.url);
                return response;
            }
            return fetch(e.request).catch((error) => {
                console.log("Network request failed:", error);
                throw error;
            });
        })
    )
})