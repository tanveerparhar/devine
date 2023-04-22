// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiJCLvyeRw6_rGQpXHDMXTPMWZWY-iZk8",
  authDomain: "devine-e99ca.firebaseapp.com",
  projectId: "devine-e99ca",
  storageBucket: "devine-e99ca.appspot.com",
  messagingSenderId: "455479114955",
  appId: "1:455479114955:web:403663cd96d4bbd15caf4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export const storage = getStorage();
export const winesRef = collection(db, "wines");
export const cartRef = collection(db, "cart");

let user;
//register
export const createUser = async (email,password) => {
   try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("try block email ", email);
      console.log("try block userCred ", userCredential);
      user = userCredential.user;
      console.log("try block");
      //return user;
      
   }catch(error){
      //const errorCode = error.code;
      //const errorMessage = error.message;
      console.error(error,"catch errror");
      //const errorDetails = await error
      //return errorDetails
      //console.error(error);
   }
   return user;
}

//sign in
export const signInUser = async (email,password) => {
   try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
   }catch(error){
      console.error(error,"catch errror");
   }
   return user;
}

//create data
export const createWineCollec = async({wineName,wineCategory,wineLocation,wineRating,winery,wineImage}) => {
   let res;
   console.log("createwinecolle image",wineRating)
   try {
      if(!wineName || !wineCategory || !wineLocation || !wineRating || !winery || !wineImage){
         res = false;
         throw new Error("One of the values is empty, check console")
      }
      //upload file
      const imageName = 'wine-images/' + wineImage.name.split('.')[0] + ".png"
      const storageRef = ref(storage, imageName );
      console.log(storageRef)
      await uploadBytes(storageRef, wineImage).then((snapshot) => {
         console.log('Uploaded the file!  ',snapshot);
      });
      //convert to lowercase
      wineCategory = wineCategory.toLowerCase();
      const docRef = await addDoc(winesRef, {
         wineName,
         wineCategory,
         wineLocation,
         wineRating,
         winery,
         wineImage: imageName,
      });
      console.log("Document written with ID: ", docRef.id);
      res = true;
      } catch (e) {
      console.error("Error adding document, ", e);
      res = false;
      }
   return res;
}

//add to cart
export const addToCartCollec = async(wine,location,winery,image,quantity) => {
   let res;
   try {
      const docRef = await addDoc(cartRef, {
         wine,
         location,
         winery,
         image,
         quantity
      });
      res = true;
      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
         console.error("Error adding document, ", e);
         res = false;
      }
   return res
}


