import QuickUpdate from "./QuickUpdate";
import Graph from "./Graph";

const CompareGraph: React.FC = () => {
  return (
    <div className="graph-component-wrapper">
      <div className="graph-container">
        <Graph />
      </div>
      <div className="quick-update-container">
        <QuickUpdate title="Squat" />
        <QuickUpdate title="Bench" />
        <QuickUpdate title="Deadlift" />
      </div>
    </div>
  );
};

export default CompareGraph;
