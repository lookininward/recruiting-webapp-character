import { memo } from "react";
import { MAX_TOTAL_ATTR, ATTRIBUTE_LIST } from "../consts";
import { calculateModifier } from "../utils";

const AttributeControls = memo(({ attributes, setAttributes }) => {
  const totalAttributes = Object.values(attributes).reduce(
    (acc, value) => acc + value,
    0
  );

  const increment = (attr) => {
    if (totalAttributes < MAX_TOTAL_ATTR) {
      setAttributes({ ...attributes, [attr]: attributes[attr] + 1 });
    }
  };

  const decrement = (attr) => {
    if (attributes[attr] > 0) {
      setAttributes({ ...attributes, [attr]: attributes[attr] - 1 });
    }
  };

  return (
    <div className="container">
      <h2>Attributes</h2>

      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr} className="item">
          <div className="item__label">{attr}</div>
          <div className="item__modifier-controls">
            <button onClick={() => decrement(attr)}>-</button>
            <span>{attributes[attr]}</span>
            <button onClick={() => increment(attr)}>+</button>
          </div>
          <div>
            Modifier: {calculateModifier(attributes[attr])}
          </div>
        </div>
      ))}

      <p>
        Total Points: {totalAttributes} / {MAX_TOTAL_ATTR}
      </p>
    </div>
  );
});


export default AttributeControls;
