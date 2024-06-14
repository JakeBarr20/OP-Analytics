import Image from "next/image";
import BackButtonIcon from "../../assets/compare/BackButton.svg";

interface CompareBackButtonProps {
  backHandler: () => void;
}

const CompareBackButton: React.FC<CompareBackButtonProps> = ({
  backHandler,
}) => {
  return (
    <button
      type="button"
      className="back-wrapper"
      onClick={() => {
        backHandler();
      }}
    >
      <Image priority src={BackButtonIcon} height={30} width={30} alt="back" />
      <p className="bebas-neue red">BACK</p>
    </button>
  );
};

export default CompareBackButton;
