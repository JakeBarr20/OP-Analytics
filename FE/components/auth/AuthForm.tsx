import Helper from "@/utils/Helper";
import AuthModal from "./AuthModal";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAppDispatch } from "@/reducer/Hooks";
import Loading from "../loading/Loading";
import { updateLifter } from "@/reducer/LifterSlice";
import AnalyticsForm from "../analytics/AnalyticsForm";
import signup from "../../firebase/auth/signup";
import signin from "../../firebase/auth/signin";
import { useRouter } from "next/router";
import { useState } from "react";

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [credData, setCredData] = useState({
    email: "",
    password: "",
  });
  const lifterObject: { [key: string]: any } = {
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    weight: 0,
    bench: 0,
    squat: 0,
    deadlift: 0,
  };
  const [lifterData, setLifterData] = useState({ ...lifterObject });

  const handleFormCredChange = (e: any) => {
    const { id, value } = e.target;
    setCredData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormDataChange = (e: any) => {
    const { id, value } = e.target;
    setLifterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAuth = async (event: any) => {
    event.preventDefault();
    let clear = true;

    if (isLogin) {
      if (Helper.validateInputField(credData)) {
        setLoading(true);
        const { result, error } = await signin(credData);
        await handleRouting(result, error);
      } else {
        setError(true);
        setErrorMessage("Incorrect credential input");
      }
    } else {
      for (const stat in lifterData) {
        if (lifterData[stat] === "" || lifterData[stat] === 0) {
          setError(true), setErrorMessage("Essential info missing");
          clear = false;
        }
      }
      if (
        !Helper.validateInputField(credData) ||
        !Helper.validateInputField(lifterData)
      ) {
        setError(true), setErrorMessage("Incorrect input format");
        clear = false;
      }
      if (clear) {
        setLoading(true);
        const { result, error } = await signup(credData, lifterData);
        await handleRouting(result, error);
      }
    }
  };

  async function handleRouting(result: any, error: any) {
    if (result !== null && result.user !== null) {
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "Lifter Stats", result?.user?.uid);
      const docSnap = await getDoc(docRef);
      const data = { ...docSnap.data(), id: result?.user?.uid };
      dispatch(updateLifter({ data: data }));
      router.push("/home");
    } else {
      setLoading(false);
      setError(true);
      const errorConvert = Helper.convertAuthErrorMessages(error);
      setErrorMessage(errorConvert);
    }
  }

  const closeModal = () => {
    setError(false);
  };

  return (
    <>
      {loading ? (
        <Loading type={isLogin ? "login" : "signup"} />
      ) : isLogin && !loading ? (
        <div className="auth-input-container">
          <label htmlFor="email">
            Email
            <input
              className="login-input"
              id="email"
              onChange={handleFormCredChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="login-input"
              id="password"
              type="password"
              onChange={handleFormCredChange}
            />
          </label>
        </div>
      ) : (
        <AnalyticsForm
          isLogin
          handleFormCredChange={handleFormCredChange}
          handleFormDataChange={handleFormDataChange}
          handleSubmit={() => {}}
        />
      )}
      <button
        className="primary-button auth-button"
        type="button"
        onClick={handleAuth}
      >
        {isLogin ? "SIGN IN" : "SIGN UP"}
      </button>
      {error && (
        <AuthModal errorMessage={errorMessage} closeModal={closeModal} />
      )}
    </>
  );
};

export default AuthForm;
