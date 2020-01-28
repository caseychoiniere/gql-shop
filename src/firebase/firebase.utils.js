import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyB7jnc8wMYp8-JU7gRqa3PKdHZzmR9elTI',
	authDomain: 'gqlshop.firebaseapp.com',
	databaseURL: 'https://gqlshop.firebaseio.com',
	projectId: 'gqlshop',
	storageBucket: 'gqlshop.appspot.com',
	messagingSenderId: '927141617472',
	appId: '1:927141617472:web:2cba05e86ae23dd3d624a5',
};

export const createUserProfileDocument = async (
	userAuth,
	additionalData,
) => {
	if (!userAuth) return;
	const userRef = firestore.doc(
		`users/${userAuth.uid}`,
	);
	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log(
				`error creating user ${error.message}`,
			);
		}
	}
	return userRef;
};

export const convertCollectionsSnapShotToMap = collections => {
	const transformedCollection = collections.docs.map(
		doc => {
			const { title, items } = doc.data();
			return {
				routeName: encodeURI(title.toLowerCase()),
				id: doc.id,
				title,
				items,
			};
		},
	);
	return transformedCollection.reduce(
		(acc, collection) => {
			acc[collection.title.toLowerCase()] = collection;
			return acc;
		},
		{},
	);
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd,
) => {
	const collectionRef = firestore.collection(
		collectionKey,
	);
	const batch = firestore.batch();
	objectsToAdd.forEach(o => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, o);
	});
	return await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});
export const signInWithGoogle = () =>
	auth.signInWithPopup(provider);

export default firebase;
