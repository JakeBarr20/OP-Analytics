import GraphIndividual from "./GraphIndividual";
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
    <div className="graph">
      <div className="graph-info">
        <div className="lifter">
          <p className="bebas-neue white">
            {Helper.convertLifterToGraphHeader(lifter)}
          </p>
        </div>
        <div className="lifter">
          <p className="bebas-neue white">
            {compareLifter.isSingle
              ? Helper.convertLifterToGraphHeader(compareLifter)
              : Helper.convertGroupToGraphHeader(compareLifter)}
          </p>
        </div>
      </div>
      <div className="graph-content">
        {loading ? (
          <CompareSkeleton />
        ) : (
          <>
            <GraphIndividual
              title="SQUAT"
              lifterRating={lifterRatings.squat}
              compareRating={compareRatings.squat}
              lifterStat={lifter.squat}
              isSingle={compareLifter.isSingle}
            />
            <GraphIndividual
              title="BENCH"
              lifterRating={lifterRatings.bench}
              compareRating={compareRatings.bench}
              lifterStat={lifter.bench}
              isSingle={compareLifter.isSingle}
            />
            <GraphIndividual
              title="DEADLIFT"
              lifterRating={lifterRatings.deadlift}
              compareRating={compareRatings.deadlift}
              lifterStat={lifter.deadlift}
              isSingle={compareLifter.isSingle}
            />
            <StarRating
              lifterRating={lifterRatings.overallPercentage}
              compareRating={compareRatings.overallPercentage}
              isSingle={compareLifter.isSingle}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Graph;