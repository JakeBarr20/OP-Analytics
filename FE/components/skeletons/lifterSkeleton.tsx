import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LifterSkeletonProps {
  small: boolean;
}

const LifterSkeleton: React.FC<LifterSkeletonProps> = ({ small }) => {
  return (
    <div className="lifter-skeleton">
      <div className="img-skeleton">
        <Skeleton circle width={40} height={40} />
      </div>
      <Skeleton height={40} width={small ? 765 : 1000} />
    </div>
  );
};

export default LifterSkeleton;
