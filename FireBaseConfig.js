// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDWxxTX8f0qVeJRCL8pGd3TbXSV3NJSdEw',
  authDomain: 'file-sharing-web-app-e217f.firebaseapp.com',
  projectId: 'file-sharing-web-app-e217f',
  storageBucket: 'file-sharing-web-app-e217f.appspot.com',
  messagingSenderId: '1013640251205',
  appId: '1:1013640251205:web:45b60822dc562197f0602c',
  measurementId: 'G-5ZKFWN9HBN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
