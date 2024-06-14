import { useState } from "react";
import classNames from "classnames";

interface GroupSelectorProps {
  selectText: string;
  handleChange: (parameter: any) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({
  selectText,
  handleChange,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      type="button"
      id={selectText}
      className={classNames("group-radio", { selected: isSelected })}
      onClick={(event) => {
        handleChange(event);
        setIsSelected(!isSelected);
      }}
    >
      <h1 id={selectText} className="bebas-neue red">
        {selectText}
      </h1>
    </button>
  );
};

export default GroupSelector;
