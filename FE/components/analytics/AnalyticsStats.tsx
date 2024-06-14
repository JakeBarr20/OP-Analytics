import ArcStat from "./ArcStat";
import styled from "styled-components";
interface AnalyticsStatsProps {
  squat: string;
  bench: string;
  deadlift: string;
  lifterRatings: any;
}

const AnalyticsStats: React.FC<AnalyticsStatsProps> = ({
  squat,
  bench,
  deadlift,
  lifterRatings,
}) => {
  const ProgressStat = styled.div`
  width: 100%;
  max-width: 400px;
  height: 25px;
  border-radius: 50px;
  background-color: #facfcf;
  position: relative;
  margin: 0;
  align-items: center;

  span {
    border-radius: 50px;
    height: 100%;
    width: 0;
    background-color: #ef303d;
    position: absolute;
    text-align: end;
    padding-right: 5px;

    &:after{
      content:"";
      font-family: bebas-neue;
      color: #ef303d;
      position: absolute;
      bottom: 40px;
      right: -20px;
    }

    &:before {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      bottom: 30px;
      border-radius: 50%;
      background-color: #ef303d;
    }
  `;

  const ProgressStatSquat = styled(ProgressStat)`
    span {
      animation: prog-squat 1s linear forwards;

      &:after {
        content: "${squat}";
      }
    }

    @keyframes prog-squat {
      100% {
        width: ${lifterRatings.squat}%;
      }
    }
  `;

  const ProgressStatBench = styled(ProgressStat)`
    span {
      animation: prog-bench 1s linear forwards;

      &:after {
        content: "${bench}";
      }
    }

    @keyframes prog-bench {
      100% {
        width: ${lifterRatings.bench}%;
      }
    }
  `;

  const ProgressStatDead = styled(ProgressStat)`
    span {
      animation: prog-dead 1s linear forwards;

      &:after {
        content: "${deadlift}";
      }
    }

    @keyframes prog-dead {
      100% {
        width: ${lifterRatings.deadlift}%;
      }
    }
  `;

  return (
    <>
      <div className="progress-bars">
        <div className="progress-container">
          <h1>SQUAT</h1>
          <ProgressStatSquat>
            <span></span>
          </ProgressStatSquat>
        </div>
        <div className="progress-container">
          <h1>BENCH</h1>
          <ProgressStatBench>
            <span></span>
          </ProgressStatBench>
        </div>
        <div className="progress-container">
          <h1>DEADLIFT</h1>
          <ProgressStatDead>
            <span></span>
          </ProgressStatDead>
        </div>
      </div>
      
      <div className="arc-container">
        <ArcStat
          rating={lifterRatings.overall}
          arcPercentage={lifterRatings.overallPercentage}
        ></ArcStat>
      </div>
    </>
  );
};

export default AnalyticsStats;
