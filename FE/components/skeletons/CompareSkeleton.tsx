import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CompareSkeleton: React.FC = () => {
  return (
    <div className="compare-skeleton">
      <Skeleton className="skeleton-bar" width={850} height={50} />
      <Skeleton className="skeleton-bar" width={850} height={50} />
      <Skeleton className="skeleton-bar" width={850} height={50} />
    </div>
  );
};

export default CompareSkeleton;
