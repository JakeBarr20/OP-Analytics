import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(credData) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(
      auth,
      credData.email,
      credData.password
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
