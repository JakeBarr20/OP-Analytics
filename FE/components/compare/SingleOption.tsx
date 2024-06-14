import SearchBar from "../search/SearchBar";
import SearchLifer from "../search/SearchLifter";
import OpenAPI from "@/utils/OpenAPI";
import Helper from "@/utils/Helper";
import { useState } from "react";
import LifterSkeleton from "../skeletons/LifterSkeleton";
import { useAppDispatch } from "@/reducer/Hooks";
import { updateCompare } from "@/reducer/CompareSlice";

interface SingleOptionProps {
  choiceHandler: () => void;
}

const SingleOption: React.FC<SingleOptionProps> = ({ choiceHandler }) => {
  const dispatch = useAppDispatch();
  const [searchStarted, setSearchStarted] = useState(false);
  const [isLifterFound, setIsLifterFound] = useState(false);
  const [searchedLifter, setSearchedLifter] = useState({
    name: "",
    gender: "",
    weight: "",
    age: "",
    squat: "",
    bench: "",
    deadlift: "",
    total: "",
    rating: "",
  });

  const searchHandler = (name: string) => {
    setSearchStarted(true);
    setIsLifterFound(false);
    OpenAPI.getDataByName(name).then((res: any) => {
      if (res !== null) {
        const data = Helper.convertSearchToObject(res);
        const updatedData = { ...data, age: data.age.slice(1) };
        setSearchedLifter(updatedData);
        dispatch(updateCompare({ data: updatedData, isSingle: true }));
      }
      setIsLifterFound(true);
      setSearchStarted(false);
    });
  };

  return (
    <div className="search-page-container">
      <SearchBar
        isCompare
        filterHandler={() => {}}
        searchHandler={searchHandler}
      >
        <div className="search-lifter-container">
          {!searchStarted ? (
            <></>
          ) : (
            !isLifterFound && (
              <>
                <LifterSkeleton small={false} />
                <LifterSkeleton small={false} />
                <LifterSkeleton small={false} />
              </>
            )
          )}
          {isLifterFound && (
            <SearchLifer
              lifter={searchedLifter}
              choiceHandler={choiceHandler}
            />
          )}
        </div>
      </SearchBar>
    </div>
  );
};

export default SingleOption;
