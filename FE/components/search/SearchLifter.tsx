import Image from "next/image";
import ProfileIcon from "../../assets/analytics/Profile.jpg";

interface SearchLifterProps {
  lifter: {
    name: string;
    gender: string;
    weight: string;
    age: string;
    squat: string;
    bench: string;
    deadlift: string;
    total: string;
    rating: string;
  };
  choiceHandler?: () => void;
}

const SearchLifer: React.FC<SearchLifterProps> = ({
  lifter,
  choiceHandler,
}) => {
  return (
    <div className="search-lifter compare" onClick={choiceHandler}>
      <div className="image-container">
        <Image
          priority
          src={ProfileIcon}
          width={40}
          height={40}
          alt="profile image"
        />
      </div>
      <div className="info-container">
        <p className="bebas-neue white first-p">{lifter.name}</p>
        <hr />
        <p className="bebas-neue white">{lifter.gender}</p>
        <p className="bebas-neue white">{lifter.weight}</p>
        <p className="bebas-neue white">{lifter.age}</p>
        <hr />
        <p className="bebas-neue white">{lifter.squat}</p>
        <p className="bebas-neue white">{lifter.bench}</p>
        <p className="bebas-neue white">{lifter.deadlift}</p>
        <p className="bebas-neue white">{lifter.total}</p>
        <p className="bebas-neue white last-p">{lifter.rating}</p>
      </div>
    </div>
  );
};

export default SearchLifer;
