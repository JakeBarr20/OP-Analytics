import Image from "next/image";
import StarIcon from "../../assets/compare/StarIcon.svg";
import StarIconRed from "../../assets/compare/StarIconRed.svg";

interface StarRatingProps {
  lifterRating: number;
  compareRating: number;
  isSingle: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  lifterRating,
  compareRating,
  isSingle,
}) => {
  if (!isSingle) compareRating = 50;
  return (
    <div className="rating-container">
      <div className="rating-left">
        <Image
          priority
          src={lifterRating >= 70 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image
          priority
          src={lifterRating >= 50 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image
          priority
          src={lifterRating >= 30 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image
          priority
          src={lifterRating >= 15 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image priority src={StarIconRed} alt="star" height={40} width={40} />
      </div>
      <p className="bebas-neue red">RATING</p>
      <div className="rating-right">
        <Image priority src={StarIconRed} alt="star" height={40} width={40} />
        <Image
          priority
          src={compareRating >= 15 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image
          priority
          src={compareRating >= 30 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image
          priority
          src={compareRating >= 50 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
        <Image
          priority
          src={compareRating >= 70 ? StarIconRed : StarIcon}
          alt="star"
          height={40}
          width={40}
        />
      </div>
    </div>
  );
};

export default StarRating;
