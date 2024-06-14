import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore();

export default async function signUp(credData, lifterData) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(
      auth,
      credData.email,
      credData.password
    );
    const uid = result.user.uid;
    await setDoc(doc(db, "Lifter Stats", uid), {
      ...lifterData,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
