import Image from "next/image";
import Link from "next/link";
import StengthIcon from "../../assets/layout/StrengthIcon.png";
import StatsIcon from "../../assets/layout/StatsIcon.png";

function LandingPage() {
  return (
    <>
      <div className="home-page-canvas">
        <Image
          className="open-svg"
          priority
          src={StengthIcon}
          alt="Open"
          width={500}
          height={125}
        />
        <Image
          className="power-svg"
          priority
          src={StatsIcon}
          alt="Power"
          width={375}
          height={125}
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
