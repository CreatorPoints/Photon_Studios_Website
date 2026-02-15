/* ===========================
   PHOTON STUDIOS — fireauth.js
   Firebase Authentication (Google Sign-In)
   =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCsulwdk4ryzoCwpuKji5a8b-jXeG5ews4",
    authDomain: "photon-userbase.firebaseapp.com",
    projectId: "photon-userbase",
    storageBucket: "photon-userbase.firebasestorage.app",
    messagingSenderId: "66493624110",
    appId: "1:66493624110:web:d820995afc5b2bcad354bf",
    measurementId: "G-9RJRPKKNZV"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
let currentUser = null;

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    const btn = document.getElementById('login-btn');
    if (btn) {
        btn.textContent = user ? (user.displayName || user.email || 'Logged In') : 'Login';
    }
});

// Login button click handler
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (currentUser) {
            signOut(auth).catch(e => console.error(e));
        } else {
            signInWithPopup(auth, provider).catch(e => {
                if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
                    alert('Login failed: ' + e.message);
                }
            });
        }
    });
}
