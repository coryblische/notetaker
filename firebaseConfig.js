import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC818bOhinlQhLbBw7EO8a5CmNy6Zaywjw',
  authDomain: 'cory-livestream-research.firebaseapp.com',
  projectId: 'cory-livestream-research',
  storageBucket: 'cory-livestream-research.appspot.com',
  messagingSenderId: '300379199622',
  appId: '1:300379199622:web:87ec66ff4a142f526b9907',
}

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
