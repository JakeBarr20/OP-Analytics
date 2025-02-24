import { useState, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import NavbarLink from "./NavbarLink";
import StengthIcon from "../../assets/layout/StrengthIcon.png";
import StatsIcon from "../../assets/layout/StatsIcon.png";
import ProfileIcon from "../../assets/layout/Profile.svg";
import CompareIcon from "../../assets/layout/Compare.svg";
import SearchIcon from "../../assets/layout/Search.svg";
import HomeIcon from "../../assets/layout/Home.svg";
import SettingIcon from "../../assets/layout/Settings.svg";
import SignOutIcon from "../../assets/layout/SignOut.svg";
import InstaIcon from "../../assets/layout/InstaIcon.png";
import XIcon from "../../assets/layout/XIcon.png";
import LinkedIcon from "../../assets/layout/LinkedIcon.png";
import DiscordIcon from "../../assets/layout/DiscordIcon.png";
import TermsIcon from "../../assets/layout/TermsIcon.png";
import ReportIcon from "../../assets/layout/ReportIcon.png";
import PrivacyIcon from "../../assets/layout/PrivacyIcon.png";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/reducer/Hooks";
import { resetLifter } from "@/reducer/LifterSlice";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const dispatch = useAppDispatch();

  const onResize = () => {
    console.log(window.innerWidth)
    setIsMobile(window.innerWidth <= 750);
  };

  async function handleLogout() {
    await signOut(auth);
    dispatch(resetLifter());
    router.push("/landing");
  }

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={classNames("navbar-container", { mobile: isMobile })}>
      <div className={classNames("nav-header", { mobile: isMobile })}>
        <Image priority src={StengthIcon} alt="Open" width={180} height={40} />
        <Image
          priority
          src={StatsIcon}
          alt="Power"
          width={160}
          height={40}
        />
      </div>
      <div className="nav-content">
      <div className={classNames("nav-content-top", { mobile: isMobile })}>
        <NavbarLink icon={ProfileIcon} text="Analytics" isMobile={isMobile} />
        <NavbarLink icon={CompareIcon} text="Compare" isMobile={isMobile} />
        <NavbarLink icon={HomeIcon} text="Home" isMobile={isMobile} />
        <NavbarLink icon={SearchIcon} text="Search" isMobile={isMobile} />
        <NavbarLink icon={SettingIcon} text="Settings" isMobile={isMobile} />
        <div className={classNames("navbar-link", {mobile: isMobile})} onClick={handleLogout}>
          <Image
            priority
            src={SignOutIcon}
            height={20}
            width={20}
            alt="navbarlink"
          />
          {!isMobile && <p className="poppins-medium grey">Logout</p>}
        </div>
      </div>
      <div className="nav-content-bottom">
        <p className="poppins-medium grey">Created By -</p>
        <p className="poppins-medium grey">Jake Biddiscombe-Barr</p>
        <p className="poppins-medium grey">Data From -</p>
        <p className="poppins-medium grey">Open Powerlifting</p>
        <div className="socials-wrapper">
          <Image
              priority
              src={InstaIcon}
              height={26}
              width={26}
              alt="Insta"
            />
          <Image
              priority
              src={XIcon}
              height={26}
              width={26}
              alt="X"
            />
          <Image
              priority
              src={LinkedIcon}
              height={26}
              width={26}
              alt="Insta"
            />
          <Image
              priority
              src={DiscordIcon}
              height={26}
              width={26}
              alt="Insta"
            />
        </div>
        <div className="final-content">
          <NavbarLink icon={ReportIcon} text="Report Bugs" isMobile={isMobile} />
          <NavbarLink icon={TermsIcon} text="Terms and Conditions" isMobile={isMobile} />
          <NavbarLink icon={PrivacyIcon} text="Privacy Policy" isMobile={isMobile} />
        </div>
      </div>
      </div>
     
    </div>
  );
}

export default Navbar;
