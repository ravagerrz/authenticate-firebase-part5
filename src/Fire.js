import firebase from 'firebase/app';
import 'firebase/auth';
var firebaseConfig = {
    apiKey: "AIzaSyAVfKi5pWsBZNmbot78K_7n9pjtkJahsq4",
    authDomain: "authenticate-1fe7a.firebaseapp.com",
    projectId: "authenticate-1fe7a",
    storageBucket: "authenticate-1fe7a.appspot.com",
    messagingSenderId: "106092731033",
    appId: "1:106092731033:web:7bd5581612d658beb37608"
  };
  const Fire = firebase.initializeApp(firebaseConfig);
  export default Fire;