const firebaseConfig = {
  apiKey: "AIzaSyBS0Il6XiInupDAl7Gs0tr3x-S3kaXiKqQ",
  authDomain: "ifsp-web-site-noticias.firebaseapp.com",
  projectId: "ifsp-web-site-noticias",
  storageBucket: "ifsp-web-site-noticias.appspot.com",
  messagingSenderId: "1051121403927",
  appId: "1:1051121403927:web:84279b0075d8c1f1507452",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
