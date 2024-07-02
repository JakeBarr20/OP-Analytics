import GraphIndividual from "./GraphIndividual"
import classNames from "classnames";
import StarRating from "./StarRating";
import Helper from "@/utils/Helper";
import OpenAPI from "@/utils/OpenAPI";
import { useAppSelector } from "@/reducer/Hooks";
import { useState, useEffect } from "react";
import CompareSkeleton from "../skeletons/CompareSkeleton";

const Graph: React.FC = () => {
  const lifter = useAppSelector((state) => state.lifter);
  const compareLifter = useAppSelector((state) => state.compare);
  const [lifterRatings, setLifterRatings] = useState<any>([]);
  const [compareRatings, setCompareRatings] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(true);

  const calculateRatingsSingle = (lifterCalc: any, isUser: boolean) => {
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
      if (isUser) setLifterRatings(formattedRatings);
      if (!isUser) {
        setCompareRatings(formattedRatings);
        setLoading(false);
      }
    });
  };

  const calculateRatingsGroup = () => {
    OpenAPI.GetDataByFilters(compareLifter.activeFilters, true).then(
      (res: any) => {
        const averages = Helper.calculateAverage(res);
        setCompareRatings({
          squat: averages.squatAvg,
          bench: averages.benchAvg,
          deadlift: averages.deadliftAvg,
          rating: "INT",
        });
        setLoading(false);
      }
    );
  };

  const onResize = () => {
    setIsMobile(window.innerWidth <= 700);
    setIsTablet(window.innerWidth > 700 && window.innerWidth < 1000)
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (compareLifter.isSingle) {
      calculateRatingsSingle(lifter, true);
      calculateRatingsSingle(compareLifter, false);
    } else {
      calculateRatingsSingle(lifter, true);
      calculateRatingsGroup();
    }
  }, [compareLifter]);

  return (
    <div className={classNames("graph", {mobile: isMobile})}>
      <div className={classNames("graph-info", {mobile: isMobile})}>
        <div className="lifter">
          <p className="bebas-neue white">
            {Helper.convertLifterToGraphHeader(lifter)}
          </p>
        </div>
        <div className="lifter other">
          <p className="bebas-neue white">
            {compareLifter.isSingle
              ? Helper.convertLifterToGraphHeader(compareLifter)
              : Helper.convertGroupToGraphHeader(compareLifter)}
          </p>
        </div>
      </div>
      <div className={classNames("graph-content", {mobile: isMobile})}>
        {loading ? (
          <CompareSkeleton />
        ) : (
          <>
            <GraphIndividual
              title={isTablet ? "S" : "SQUAT"} 
              lifterRating={lifterRatings.squat}
              compareRating={compareRatings.squat}
              lifterStat={lifter.squat}
              isSingle={compareLifter.isSingle}
              isMobile={isMobile}
            />
            <GraphIndividual
              title={isTablet ? "B" : "BENCH"}
              lifterRating={lifterRatings.bench}
              compareRating={compareRatings.bench}
              lifterStat={lifter.bench}
              isSingle={compareLifter.isSingle}
              isMobile={isMobile}
            />
            <GraphIndividual
              title={isTablet ? "D" : "Deadlift"}
              lifterRating={lifterRatings.deadlift}
              compareRating={compareRatings.deadlift}
              lifterStat={lifter.deadlift}
              isSingle={compareLifter.isSingle}
              isMobile={isMobile}
            />
            {!isMobile && 
            <StarRating
              lifterRating={lifterRatings.overallPercentage}
              compareRating={compareRatings.overallPercentage}
              isSingle={compareLifter.isSingle}
            />}
          </>
        )}
      </div>
    </div>
  );
};

export default Graph;
