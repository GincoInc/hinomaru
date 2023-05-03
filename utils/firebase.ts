import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCc42aMrJbIHK_8wuWzkWrSYzjjigB3r10',
  authDomain: 'hinomaru-hackathon.firebaseapp.com',
  projectId: 'hinomaru-hackathon',
  storageBucket: 'hinomaru-hackathon.appspot.com',
  messagingSenderId: '41967019356',
  appId: '1:41967019356:web:489f991906f2dc44e98d99',
  measurementId: 'G-K7JN49DCG4',
};

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

export const getIdToken = async (): Promise<string> => {
  if (!auth.currentUser) {
    return '';
  }
  return await auth.currentUser.getIdToken();
};
