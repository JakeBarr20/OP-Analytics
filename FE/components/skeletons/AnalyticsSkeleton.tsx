import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AnalyticsSkeleton: React.FC = () => {
  return (
    <div className="analytics-skeleton">
      <Skeleton className="skeleton-bar" width={550} height={30} />
      <Skeleton className="skeleton-bar" width={550} height={30} />
      <Skeleton className="skeleton-bar" width={550} height={30} />
      <Skeleton className="skeleton-semi" width={550} height={200} />
    </div>
  );
};

export default AnalyticsSkeleton;
