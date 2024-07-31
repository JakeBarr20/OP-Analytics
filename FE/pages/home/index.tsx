import Image from "next/image";
import Layout from "../../components/layout/Layout";
import HomeLink from "../../components/layout/HomeLink";
import StrengthIcon from "../../assets/layout/StrengthIcon.png";
import StatsIcon from "../../assets/layout/StatsIcon.png";
import AIcon from "../../assets/pages/AnalysisHome.svg";
import CIcon from "../../assets/pages/ComparisonHome.svg";
import SIcon from "../../assets/pages/SearchHome.svg";
import Loading from "@/components/loading/Loading";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation" ;

function HomePage() {
  const user: any = useAuthContext();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (user.user == null) router.push("/landing");
  }, [user]);

  const onResize = () => {
    setIsMobile(window.innerWidth <= 525);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);


  const analyticsText =
    "In-depth analysis of your profile to find your strengths and weakness";
  const comparisonText =
    "Compare yourself against other lifters to see where you land against their lifts";
  const searchText =
    "Search and filter through the official Open Powerlifting database";

  return (
    <>
      {user.user === null ? (
        <Loading type="page" />
      ) : (
        <>
          <div className="home-page-canvas">
            <Image
              className="open-svg"
              priority
              src={StrengthIcon}
              alt="Open"
              width={isMobile ? 350 : 500}
              height={isMobile ? 80 : 125} 
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
          <Layout hide>
            <div className="home-link-container">
              <HomeLink
                image={AIcon}
                title="Analytics"
                text={analyticsText}
                h={85}
                w={140}
              />
              <HomeLink
                image={CIcon}
                title="Compare"
                text={comparisonText}
                h={90}
                w={110}
              />
              <HomeLink
                image={SIcon}
                title="Search"
                text={searchText}
                h={65}
                w={165}
              />
            </div>
            <div className="credit bebas-neue red">
              <a target="_blank" href="https://www.linkedin.com/in/jake-biddiscombe-barr-b63416215/">
                <p>Created By - Jake Biddiscombe-Barr</p>
              </a> 
             <a target="_blank" href="https://www.openpowerlifting.org">
                <p>Data From - Open Powerlifting</p>
             </a>
           </div>
          </Layout>
        </>
      )}
    </>
  );
}

export default HomePage;
