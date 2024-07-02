import { useState, useCallback, memo } from "react";
import { CLASS_LIST } from "../consts";

const ClassList = memo(({ attributes }) => {
  const [showDetails, setShowDetails] = useState(null);

  const onClickShowDetails = useCallback((classItem) => {
    setShowDetails(classItem === showDetails ? null : classItem);
  }, [showDetails]);

  const meetsRequirements = (classRequirements) => {
    return Object.keys(classRequirements).every(
      (attr) => attributes[attr] >= classRequirements[attr]
    );
  };

  return (
    <div className="container">
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((classItem) => {
        const requirementsMet = meetsRequirements(CLASS_LIST[classItem]);
        return (
          <div
            key={classItem}
            className={`class-item ${requirementsMet ? "class-item--met" : ""}`}
          >
            <h3>{classItem}</h3>

            {showDetails && showDetails === classItem && (
              <ul>
                {Object.keys(CLASS_LIST[classItem]).map((attr) => (
                  <li key={attr}>
                    {attr}: {CLASS_LIST[classItem][attr]}
                  </li>
                ))}
              </ul>
            )}

            <button onClick={() => onClickShowDetails(classItem)}>
              {showDetails === classItem ? "Hide" : "Show"} Details
            </button>
          </div>
        );
      })}
    </div>
  );
});

export default ClassList;
