import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA7hXXXLm-o6yw08r5eFwlu7AB0IpTKbqQ',
  authDomain: 'graphiql-usebrain.firebaseapp.com',
  projectId: 'graphiql-usebrain',
  storageBucket: 'graphiql-usebrain.appspot.com',
  messagingSenderId: '728680331469',
  appId: '1:728680331469:web:d882351fb742e48462d184',
  measurementId: 'G-QPP439JRCG',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
