import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyARlt5kMjVw0P-kIXOePwz2xnG_8hqBfrQ",
    authDomain: "divents-3a964.firebaseapp.com",
    projectId: "divents-3a964",
    storageBucket: "divents-3a964.appspot.com",
    messagingSenderId: "817476435946",
    appId: "1:817476435946:web:d73a5c261e93f9f2c67c93"
};

firebase.initializeApp(firebaseConfig)

const app = createApp(App)
app.use(router)
app.mount('#app')
