import { useRef } from "react";

interface AnalyticsFormProps {
  isLogin?: boolean;
  handleFormDataChange?: (parameter: any) => void;
  handleFormCredChange?: (parameter: any) => void;
  handleSubmit: () => void;
}

const AnalyticsForm: React.FC<AnalyticsFormProps> = ({
  isLogin,
  handleFormCredChange,
  handleFormDataChange,
  handleSubmit,
}) => {
  const Sref = useRef(null);
  const Bref = useRef(null);
  const Dref = useRef(null);
  const Fref = useRef(null);
  const Lref = useRef(null);
  const Aref = useRef(null);
  const Wref = useRef(null);
  const liftRef = [Sref, Bref, Dref, Fref, Lref, Aref, Wref];

  const handleReset = () => {
    for (const refs in liftRef) {
      // @ts-ignore: Object is possibly 'null'.
      liftRef[refs].current.value = "";
    }
  };

  return (
    <>
      <div className="form-container">
        <label htmlFor="firstName">
          First Name
          <input ref={Fref} id="firstName" onChange={handleFormDataChange} />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input ref={Lref} id="lastName" onChange={handleFormDataChange} />
        </label>
        {isLogin && (
          <label htmlFor="email">
            Email
            <input id="email" onChange={handleFormCredChange} />
          </label>
        )}
        {isLogin && (
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              onChange={handleFormCredChange}
            />
          </label>
        )}
        <label htmlFor="weight">
          Weight
          <input ref={Wref} id="weight" onChange={handleFormDataChange} />
        </label>
        <label htmlFor="age">
          Age
          <input ref={Aref} id="age" onChange={handleFormDataChange} />
        </label>
        <label htmlFor="gender">
          Gender
          <select id="gender" onChange={handleFormDataChange}>
            <option disabled selected>
              select...
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label htmlFor="squat">
          Squat
          <input ref={Sref} id="squat" onChange={handleFormDataChange} />
        </label>
        <label htmlFor="bench">
          Bench
          <input ref={Bref} id="bench" onChange={handleFormDataChange} />
        </label>
        <label htmlFor="deadlift">
          Deadlift
          <input ref={Dref} id="deadlift" onChange={handleFormDataChange} />
        </label>
      </div>
      {!isLogin && (
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            handleSubmit();
            handleReset();
          }}
        >
          UPDATE
        </button>
      )}
    </>
  );
};

export default AnalyticsForm;
