import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA3VOxarImd0GcJwljk5co90YgONh5bNE4",
	authDomain: "crown-clothingdb-d028c.firebaseapp.com",
	projectId: "crown-clothingdb-d028c",
	storageBucket: "crown-clothingdb-d028c.appspot.com",
	messagingSenderId: "778564001954",
	appId: "1:778564001954:web:7d09e55a1598e7c239b7fb",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	return userDocRef;
};
