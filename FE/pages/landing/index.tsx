import Image from "next/image";
import Link from "next/link";
import OpenIcon from "../../assets/layout/Open.svg";
import PowerliftingIcon from "../../assets/layout/Powerlifting-title.svg";

function LandingPage() {
  return (
    <>
      <div className="home-page-canvas">
        <Image
          className="open-svg"
          priority
          src={OpenIcon}
          alt="Open"
          width={500}
          height={120}
        />
        <Image
          className="power-svg"
          priority
          src={PowerliftingIcon}
          alt="Power"
          width={300}
          height={30}
        />
      </div>
      <div className="landing-button-container">
        <Link href="/auth?login=True">
          <button type="button" className="primary-button">
            Login
          </button>
        </Link>
        <Link href="/auth?login=False">
          <button type="button" className="primary-button">
            Sign Up
          </button>
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
