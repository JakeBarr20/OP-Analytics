import Layout from "../../components/layout/Layout";
import SearchBar from "../../components/search/SearchBar";
import SearchLifer from "../../components/search/SearchLifter";
import LifterSkeleton from "@/components/skeletons/LifterSkeleton";
import AuthModal from "@/components/auth/AuthModal";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";
import OpenAPI from "@/utils/OpenAPI";
import Helper from "@/utils/Helper";

function SearchPage() {
  const user: any = useAuthContext();
  const router = useRouter();
  const [filterResults, setFilterResults] = useState<any>([]);
  const [lifterFound, setIsLifterFound] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);
  const [error, setError] = useState(false);
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

  useEffect(() => {
    if (user.user == null) router.push("/landing");
  }, [user]);

  const searchHandler = (name: string) => {
    setFilterResults([]);
    setSearchStarted(true);
    setIsLifterFound(false);
    OpenAPI.getDataByName(name).then((res) => {
      if (res !== null) setSearchedLifter(Helper.convertSearchToObject(res));
      if (res === null) setError(true);
      setIsLifterFound(true);
      setSearchStarted(false);
    });
  };

  const filterHandler = (filters: any) => {
    setSearchStarted(true);
    setIsLifterFound(false);
    OpenAPI.GetDataByFilters(filters, false).then((res: any) => {
      setFilterResults(Helper.convertFilterToObject(res));
      setIsLifterFound(true);
      setSearchStarted(false);
    });
  };

  const filteredLifters = (lifter: any) => {
    if (lifter) {
      return <SearchLifer lifter={lifter} />;
    }
    return <></>;
  };

  const closeModal = () => {
    setError(false);
  };

  return (
    <>
      {user.user === null ? (
        <Loading type="page" />
      ) : (
        <Layout>
          <div className="search-page-container">
            <SearchBar
              isCompare={false}
              searchHandler={searchHandler}
              filterHandler={filterHandler}
            >
              <div className="search-lifter-container">
                {!searchStarted ? (
                  <></>
                ) : (
                  !lifterFound && (
                    <>
                      <LifterSkeleton small />
                      <LifterSkeleton small />
                      <LifterSkeleton small />
                    </>
                  )
                )}
                {lifterFound && filterResults.length <= 0 && (
                  <SearchLifer lifter={searchedLifter} />
                )}
                {filterResults.map((lifter: any) => filteredLifters(lifter))}
              </div>
              {error && (
                <AuthModal
                  errorMessage={"No lifter found"}
                  closeModal={closeModal}
                />
              )}
            </SearchBar>
          </div>
        </Layout>
      )}
    </>
  );
}

export default SearchPage;
