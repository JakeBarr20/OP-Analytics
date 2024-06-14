import Image from "next/image";
import Link from "next/link";

interface NavbarLinkProps {
  icon: string;
  text: string;
  isMobile: boolean;
  logout?: boolean;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ icon, text, isMobile }) => {
  return !isMobile ? (
    <Link href={`/${text.toLowerCase()}`}>
      <div className="navbar-link">
        <Image priority src={icon} height={26} width={26} alt="navbarlink" />
        <p className="poppins-medium grey">{text}</p>
      </div>
    </Link>
  ) : (
    <Link href={`/${text.toLowerCase()}`}>
      <div className="navbar-link-mobile">
        <Image
          priority
          src={icon}
          height={isMobile ? 20 : 26}
          width={isMobile ? 20 : 26}
          alt="navbarlink"
        />
        <hr />
      </div>
    </Link>
  );
};

export default NavbarLink;
