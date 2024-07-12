import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB9PW9qkpFHYgujgh1rfkvfpj1vWxU0yeQ",
    databaseURL: "https://fir-61d14-default-rtdb.firebaseio.com/",
    storageBucket: "gs://fir-61d14.appspot.com",
    // projectId: "fir-61d14",
    // messagingSenderId: "1086470582169",    
}

const app  = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)
const storage = getStorage(app)

export {auth, database, storage}
