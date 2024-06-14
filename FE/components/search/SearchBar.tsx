import { useState, ReactNode } from "react";
import classNames from "classnames";
import Helper from "@/utils/Helper";
import AuthModal from "../auth/AuthModal";

interface SearchBarProps {
  children: ReactNode;
  isCompare: boolean;
  filterHandler: (parameter: any) => void;
  searchHandler: (parameter: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  children,
  isCompare,
  filterHandler,
  searchHandler,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    male: false,
    female: false,
    sbj: false,
    junior: false,
    open: false,
    masters1: false,
    masters2: false,
    masters3: false,
    masters4: false,
    plus120men: false,
    u120men: false,
    u105men: false,
    u93men: false,
    u83men: false,
    u74men: false,
    u66men: false,
    u59men: false,
    u53men: false,
    plus84women: false,
    u84women: false,
    u76women: false,
    u69women: false,
    u63women: false,
    u57women: false,
    u52women: false,
    u47women: false,
    u43women: false,
  });

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      if (Helper.validateSearch(searchQuery)) searchHandler(searchQuery);
      else {
        setError(true);
        setErrorMessage("Incorrect search format");
      }
    }
  };

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: any) => {
    const filter = e.target.id;
    setActiveFilters({ ...activeFilters, [filter]: e.target.checked });
  };

  const handleFilterSubmit = () => {
    if (Helper.checkFiltersInvalid(activeFilters)) {
      setError(true);
      setErrorMessage("Only select one filter from each section");
    } else {
      filterHandler(activeFilters);
    }
  };

  const closeModal = () => {
    setError(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="search-container">
      <div className="search-results">
        <input
          id="search"
          className="search-bar"
          onChange={handleChange}
          onKeyUp={handleSubmit}
        ></input>
        <div className="label-button-container">
          <div className="search-label">
            <p className="bebas-neue red first-p">Name</p>
            <hr />
            <p className="bebas-neue red">Sex</p>
            <p className="bebas-neue red">Weight</p>
            <p className="bebas-neue red">Age</p>
            <hr />
            <p className="bebas-neue red">Squat</p>
            <p className="bebas-neue red">Bench</p>
            <p className="bebas-neue red">Deadlift</p>
            <p className="bebas-neue red">Total</p>
            <p className="bebas-neue red">Rating</p>
          </div>
          {children}
        </div>
      </div>
      {error && (
        <AuthModal errorMessage={errorMessage} closeModal={closeModal} />
      )}
      <div className="filters-container">
        {!isCompare && (
          <>
            <button className="search-bar sort" onClick={toggleMenu}></button>
            <div className={classNames("search-filters", { show: showMenu })}>
              <h1 className="bebas-neue red">Gender</h1>
              <div className="checkbox-wrapper">
                <label className="poppins-medium">Male</label>
                <input
                  type="checkbox"
                  id="male"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="checkbox-wrapper">
                <label className="poppins-medium">Female</label>
                <input
                  type="checkbox"
                  id="female"
                  onChange={handleFilterChange}
                />
              </div>
              <h1 className="bebas-neue red">Age</h1>
              <div className="checkbox-wrapper">
                <label className="poppins-medium">Sub-Junior</label>
                <input type="checkbox" id="sbj" onChange={handleFilterChange} />
              </div>
              <div className="checkbox-wrapper">
                <label className="poppins-medium">Junior</label>
                <input
                  type="checkbox"
                  id="junior"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="checkbox-wrapper">
                <label className="poppins-medium">Open</label>
                <input
                  type="checkbox"
                  id="open"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="checkbox-wrapper">
                <label className="poppins-medium">Masters</label>
                <input
                  type="checkbox"
                  id="masters1"
                  onChange={handleFilterChange}
                />
              </div>
              <h1 className="bebas-neue red">Weight</h1>
              <div className="weight-wrapper">
                <div className="weight-men">
                  <p className="poppins-medium">Men</p>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">120+</label>
                    <input
                      type="checkbox"
                      id="plus120men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U120</label>
                    <input
                      type="checkbox"
                      id="u120men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U105</label>
                    <input
                      type="checkbox"
                      id="u105men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U93</label>
                    <input
                      type="checkbox"
                      id="u93men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U83</label>
                    <input
                      type="checkbox"
                      id="u83men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U74</label>
                    <input
                      type="checkbox"
                      id="u74men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U66</label>
                    <input
                      type="checkbox"
                      id="u66men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U59</label>
                    <input
                      type="checkbox"
                      id="u59men"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U53</label>
                    <input
                      type="checkbox"
                      id="u53men"
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div className="weight-women">
                  <p className="poppins-medium">Women</p>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">84+</label>
                    <input
                      type="checkbox"
                      id="plus84women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U84</label>
                    <input
                      type="checkbox"
                      id="u84women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U76</label>
                    <input
                      type="checkbox"
                      id="u76women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U69</label>
                    <input
                      type="checkbox"
                      id="u69women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U63</label>
                    <input
                      type="checkbox"
                      id="u63women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U57</label>
                    <input
                      type="checkbox"
                      id="u57women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U52</label>
                    <input
                      type="checkbox"
                      id="u52women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U47</label>
                    <input
                      type="checkbox"
                      id="u47women"
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="checkbox-wrapper">
                    <label className="poppins-medium">U43</label>
                    <input
                      type="checkbox"
                      id="u43women"
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>

              <button className="primary-button" onClick={handleFilterSubmit}>
                SUBMIT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
