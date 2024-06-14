import { useState } from "react";
import classNames from "classnames";
import AuthForm from "../../components/auth/AuthForm";
import { useRouter } from "next/router";

function AuthPage() {
  const router = useRouter();
  const query = router.query.login;
  let login = false;
  if (query === "True") login = true;
  const [isLogin, setIsLogin] = useState(login);

  const buttonHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className={classNames("auth-left-side", { signup: !isLogin })}>
        <h1 className="ubuntu-medium red">
          {isLogin ? "Login to your account" : "Fill in your info"}
        </h1>
        <AuthForm isLogin={isLogin} />
      </div>
      <div className="auth-right-side">
        <h1 className="ubuntu-medium white">
          {isLogin ? "New Here?" : "Return to"}
        </h1>
        <button
          className="secondary-button"
          type="button"
          onClick={buttonHandler}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
