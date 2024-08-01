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
      <div className={classNames("nav-content", { mobile: isMobile })}>
        <NavbarLink icon={ProfileIcon} text="Analytics" isMobile={isMobile} />
        <NavbarLink icon={CompareIcon} text="Compare" isMobile={isMobile} />
        <NavbarLink icon={HomeIcon} text="Home" isMobile={isMobile} />
        <NavbarLink icon={SearchIcon} text="Search" isMobile={isMobile} />
        <NavbarLink icon={SettingIcon} text="Settings" isMobile={isMobile} />
        <div className={classNames("navbar-link", {mobile: isMobile})} onClick={handleLogout}>
          <Image
            priority
            src={SignOutIcon}
            height={26}
            width={26}
            alt="navbarlink"
          />
          {!isMobile && <p className="poppins-medium grey">Logout</p>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
