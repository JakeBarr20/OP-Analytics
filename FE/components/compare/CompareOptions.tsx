import Image from "next/image";
import SingleCompareIcon from "../../assets/compare/SingleCompare.svg";
import GroupCompareIcon from "../../assets/compare/GroupCompare.svg";

interface CompareOptionsProps {
  choiceHandler: (param: boolean) => void;
}

const CompareOptions: React.FC<CompareOptionsProps> = ({ choiceHandler }) => {
  return (
    <div className="compare-choice-container">
      <button
        type="button"
        className="compare-link"
        onClick={() => choiceHandler(true)}
      >
        <Image
          priority
          src={SingleCompareIcon}
          alt="link image"
          height={200}
          width={200}
        />
        <h1 className="ubuntu-medium">Compare Single</h1>
      </button>
      <hr />
      <button
        type="button"
        className="compare-link"
        onClick={() => choiceHandler(false)}
      >
        <Image
          priority
          src={GroupCompareIcon}
          alt="link image"
          height={200}
          width={200}
        />
        <h1 className="ubuntu-medium">Group Compare</h1>
      </button>
    </div>
  );
};

export default CompareOptions;
