import classNames from "classnames";

interface LoadingProps {
  type: string;
}

const Loading: React.FC<LoadingProps> = ({ type }) => {
  return (
    <div
      className={classNames("loading", {
        page: type == "page",
        login: type == "login",
        signup: type == "signup",
      })}
    >
      <span></span>
    </div>
  );
};

export default Loading;
