import { useState, useEffect, memo, useMemo } from "react";
import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";

const SkillControls = memo(({ attributes, skills, setSkills }) => {
  const [maxSkillPoints, setMaxSkillPoints] = useState(
    SKILL_LIST.reduce((acc, skill) => {
      const attrModifier = calculateModifier(
        attributes[skill.attributeModifier]
      );
      return { ...acc, [skill.name]: 10 + 4 * attrModifier };
    }, {})
  );

  const totalSkillPointsAvailable = useMemo(() => {
    return Object.values(maxSkillPoints).reduce((acc, value) => acc + value, 0);
  }, [maxSkillPoints]);

  const totalSkillPointsSpent = useMemo(() => {
    return Object.values(skills).reduce((acc, value) => acc + value, 0);
  } , [skills]);

  const incrementSkill = (skillName) => {
    if (skills[skillName] < maxSkillPoints[skillName]) {
      setSkills({ ...skills, [skillName]: skills[skillName] + 1 });
    }
  };

  const decrementSkill = (skillName) => {
    if (skills[skillName] > 0) {
      setSkills({ ...skills, [skillName]: skills[skillName] - 1 });
    }
  };

  useEffect(() => {
    const updatedMaxPoints = SKILL_LIST.reduce((acc, skill) => {
      const attrModifier = calculateModifier(
        attributes[skill.attributeModifier]
      );
      const maxPoints = Math.max(10 + 4 * attrModifier, 0); // Ensure max points are not negative

      // Adjust skill points if they exceed the new max points
      if (skills[skill.name] > maxPoints) {
        setSkills({ ...skills, [skill.name]: maxPoints });
      }

      return { ...acc, [skill.name]: maxPoints };
    }, {});

    setMaxSkillPoints(updatedMaxPoints);
  }, [attributes, skills, setSkills]);

  return (
    <div className="container">
      <h2>Skills</h2>

      {SKILL_LIST.map((skill) => {
        const attrModifier = calculateModifier(
          attributes[skill.attributeModifier]
        );
        const totalSkillValue = skills[skill.name] + attrModifier;

        return (
          <div key={skill.name} className="item">
            <div className="item__label">{skill.name}</div>
            <div className="item__modifier-controls">
              <button onClick={() => decrementSkill(skill.name)}>-</button>
              <span>{skills[skill.name]}</span>
              <button onClick={() => incrementSkill(skill.name)}>+</button>
            </div>
            <div className="item__modifier">
              Modifier ({skill.attributeModifier}): {attrModifier}
            </div>
            <div className="item__modifier">Total: {totalSkillValue}</div>
            <div className="item__modifier">Max: {maxSkillPoints[skill.name]}</div>
          </div>
        );
      })}
      <p>Total Skill Points Available: {totalSkillPointsAvailable}</p>
      <p>Total Skill Points Spent: {totalSkillPointsSpent}</p>
    </div>
  );
});

export default SkillControls;
