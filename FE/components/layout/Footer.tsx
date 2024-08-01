import StengthIcon from "../../assets/layout/StrengthIcon.png";
import StatsIcon from "../../assets/layout/StatsIcon.png";
import InstaIcon from "../../assets/layout/InstaIcon.png";
import XIcon from "../../assets/layout/XIcon.png";
import LinkedIcon from "../../assets/layout/LinkedIcon.png";
import DiscordIcon from "../../assets/layout/DiscordIcon.png";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-left-side">
                <div className="footer-logo">
                    <Image
                        className="strength-img"
                        priority
                        src={StengthIcon}
                        alt="Open"
                        width={180}
                        height={40}
                    />
                    <Image
                        className="stats-img"
                        priority
                        src={StatsIcon}
                        alt="Power"
                        width={160}
                        height={40}
                    />
                </div>
                <hr></hr>
                <div className="footer-credit bebas-neue red">
                    <a className="a1" target="_blank" href="https://www.linkedin.com/in/jake-biddiscombe-barr-b63416215/">
                     <p>Created By - Jake Biddiscombe-Barr</p>
                    </a>
                    <a target="_blank" href="https://www.openpowerlifting.org">
                     <p>Data From - Open Powerlifting</p>
                    </a>
                </div>
            </div>
            <div className="footer-right-side">
                <div className="footer-socials">
                    <Image
                        priority
                        src={InstaIcon}
                        alt="Insta"
                        width={35}
                        height={35}
                    />
                    <Image
                        priority
                        src={XIcon}
                        alt="X"
                        width={35}
                        height={35}
                    />
                    <Image
                        priority
                        src={LinkedIcon}
                        alt="LinkedIn"
                        width={35}
                        height={35}
                    />
                    <Image
                        priority
                        src={DiscordIcon}
                        alt="Discord"
                        width={35}
                        height={35}
                    />
                </div>
                <div className="footer-links"></div>
            </div>
        </div>
    ) 
}

export default Footer