import GroupSelector from "./GroupSelector";
import { useState } from "react";
import { useAppDispatch } from "@/reducer/Hooks";
import { updateCompare } from "@/reducer/CompareSlice";

interface GroupOptionProps {
  choiceHandler: () => void;
}

const GroupOption: React.FC<GroupOptionProps> = ({ choiceHandler }) => {
  const dispatch = useAppDispatch();
  const [activeFilters, setActiveFilters] = useState({
    m: false,
    f: false,
    sbj: false,
    jr: false,
    op: false,
    ma1: false,
    ma2: false,
    ma3: false,
    ma4: false,
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

  const handleChange = (e: any) => {
    const filterId = e.target.id;
    for (const [key, value] of Object.entries(activeFilters)) {
      if (
        key.includes(filterId.toLowerCase()) &&
        filterId !== "M" &&
        filterId !== "F"
      ) {
        setActiveFilters({ ...activeFilters, [key]: !value });
      } else if (filterId === "120+")
        setActiveFilters({ ...activeFilters, plus120men: true });
      else if (filterId === "84+")
        setActiveFilters({ ...activeFilters, plus84women: true });
      else if (filterId === "M")
        setActiveFilters({ ...activeFilters, m: true });
      else if (filterId === "F")
        setActiveFilters({ ...activeFilters, f: true });
    }
  };

  const handleSubmit = () => {
    dispatch(updateCompare({ activeFilters: activeFilters, isSingle: false }));
    choiceHandler();
  };

  return (
    <div className="group-wrapper">
      <div className="selector-wrapper">
        <div className="group-left-side">
          <h1 className="poppins-light first">Weight M</h1>
          <h1 className="poppins-light">Weight F</h1>
          <h1 className="poppins-light">Age</h1>
          <h1 className="poppins-light">Gender</h1>
        </div>
        <hr />
        <div className="group-right-side">
          <div className="group-row">
            <GroupSelector selectText="U53" handleChange={handleChange} />
            <GroupSelector selectText="U59" handleChange={handleChange} />
            <GroupSelector selectText="U66" handleChange={handleChange} />
            <GroupSelector selectText="U74" handleChange={handleChange} />
            <GroupSelector selectText="U83" handleChange={handleChange} />
            <GroupSelector selectText="U93" handleChange={handleChange} />
            <GroupSelector selectText="U105" handleChange={handleChange} />
            <GroupSelector selectText="U120" handleChange={handleChange} />
            <GroupSelector selectText="120+" handleChange={handleChange} />
          </div>
          <div className="group-row">
            <GroupSelector selectText="U43" handleChange={handleChange} />
            <GroupSelector selectText="U47" handleChange={handleChange} />
            <GroupSelector selectText="U52" handleChange={handleChange} />
            <GroupSelector selectText="U57" handleChange={handleChange} />
            <GroupSelector selectText="U63" handleChange={handleChange} />
            <GroupSelector selectText="U69" handleChange={handleChange} />
            <GroupSelector selectText="U76" handleChange={handleChange} />
            <GroupSelector selectText="U84" handleChange={handleChange} />
            <GroupSelector selectText="84+" handleChange={handleChange} />
          </div>
          <div className="group-row">
            <GroupSelector selectText="SBJ" handleChange={handleChange} />
            <GroupSelector selectText="JR" handleChange={handleChange} />
            <GroupSelector selectText="OP" handleChange={handleChange} />
            <GroupSelector selectText="MA1" handleChange={handleChange} />
            <GroupSelector selectText="MA2" handleChange={handleChange} />
            <GroupSelector selectText="MA3" handleChange={handleChange} />
            <GroupSelector selectText="MA4" handleChange={handleChange} />
          </div>
          <div className="group-row">
            <GroupSelector selectText="M" handleChange={handleChange} />
            <GroupSelector selectText="F" handleChange={handleChange} />
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                handleSubmit();
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <div className="group-button-wrapper"></div>
    </div>
  );
};

export default GroupOption;
