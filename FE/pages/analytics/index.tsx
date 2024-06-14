import Image from "next/image";
import AnalyticsForm from "../../components/analytics/AnalyticsForm";
import AnalyticsStats from "../../components/analytics/AnalyticsStats";
import Layout from "../../components/layout/Layout";
import ProfileSVG from "../../assets/analytics/Profile.jpg";
import UploadSVG from "../../assets/analytics/UploadIcon.svg";
import AnalyticsSkeleton from "@/components/skeletons/AnalyticsSkeleton";
import Helper from "@/utils/Helper";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../reducer/Hooks";
import { updateLifter } from "@/reducer/LifterSlice";
import OpenAPI from "../../utils/OpenAPI";
import { doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";
import Loading from "@/components/loading/Loading";

function AnalyticsPage() {
  const user: any = useAuthContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lifter = useAppSelector((state) => state.lifter);
  const [lifterRatings, setLifterRatings] = useState<object>([]);
  const [loading, setLoading] = useState(false);
  const lifterObject: { [key: string]: any } = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    weight: "",
    bench: "",
    squat: "",
    deadlift: "",
  };
  const [lifterUpdate, setLifterUpdate] = useState({ ...lifterObject });

  useEffect(() => {
    calculateRatings(lifter, false);
  }, []);

  useEffect(() => {
    if (user.user == null) router.push("/landing");
  }, [user]);

  const calculateRatings = (lifterCalc: any, updated: boolean) => {
    if (!lifterCalc?.rating?.ratingCalculated || updated) {
      setLoading(true);
      OpenAPI.getDataByAgeAndWeight(
        Helper.convertWeightToCategory(
          Number(lifterCalc.weight),
          lifterCalc.gender
        ).slice(1),
        Helper.convertAgeToCategory(Number(lifterCalc.age)),
        lifterCalc.gender
      ).then((res) => {
        const formattedRatings = Helper.convertResponseToAverages(
          lifterCalc,
          res
        );
        setLifterRatings(formattedRatings);
        dispatch(
          updateLifter({ ratings: formattedRatings, ratingCalculated: true })
        );
        setLoading(false);
      });
    } else {
      setLifterRatings(lifterCalc.rating);
    }
  };

  const handleFormDataChange = (e: any) => {
    const { id, value } = e.target;
    setLifterUpdate((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const db = getFirestore();
    const ref = doc(db, "Lifter Stats", lifter.id);
    for (const stat in lifterUpdate) {
      if (lifterUpdate[stat] !== "") {
        await updateDoc(ref, {
          [stat]: lifterUpdate[stat],
        });
      }
    }
    const docSnap = await getDoc(ref);
    const data = { ...docSnap.data(), id: lifter.id };
    dispatch(updateLifter({ data: data, ratingCalculated: false }));
    calculateRatings(data, true);
  };

  return (
    <div className="analytics">
      {user.user === null ? (
        <Loading type="page" />
      ) : (
        <Layout>
          <div className="analytics-header">
            <div className="left-side">
              <h1>{lifter.firstName.toUpperCase()}</h1>
              <p>{lifter.lastName}</p>
            </div>
            <div className="right-side">
              <div className="profile">
                <Image
                  priority
                  src={ProfileSVG}
                  alt="profile"
                  width={190}
                  height={190}
                />
                <Image
                  className="upload-icon"
                  priority
                  src={UploadSVG}
                  alt="upload"
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-container">
                <h1>
                  {Helper.convertWeightToCategory(
                    Number(lifter.weight),
                    lifter.gender
                  )}
                </h1>
                <p>{lifter.gender}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="analytics-body">
            <div className="analytics-body-left">
              <AnalyticsForm
                isLogin={false}
                handleFormDataChange={handleFormDataChange}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="analytics-body-right">
              {!loading ? (
                <AnalyticsStats
                  squat={lifter.squat + "KG"}
                  bench={lifter.bench + "KG"}
                  deadlift={lifter.deadlift + "KG"}
                  lifterRatings={lifterRatings}
                />
              ) : (
                <AnalyticsSkeleton />
              )}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default AnalyticsPage;
