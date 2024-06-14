import Image from "next/image";
import Layout from "../../components/layout/Layout";
import HomeLink from "../../components/layout/HomeLink";
import OpenIcon from "../../assets/layout/Open.svg";
import PowerliftingIcon from "../../assets/layout/Powerlifting-title.svg";
import AIcon from "../../assets/pages/AnalysisHome.svg";
import CIcon from "../../assets/pages/ComparisonHome.svg";
import SIcon from "../../assets/pages/SearchHome.svg";
import Loading from "@/components/loading/Loading";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const user: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user.user == null) router.push("/landing");
  }, [user]);

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
          </Layout>
        </>
      )}
    </>
  );
}

export default HomePage;
