import { useState, memo } from "react";
import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";

// todo handle party roll
const SkillCheck = memo(({ attributes, skills }) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [dc, setDc] = useState(10);
  const [randomNumber, setRandomNumber] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [totalSkillValue, setTotalSkillValue] = useState(null);

  const handleRoll = (e) => {
    e.preventDefault();

    if (!selectedSkill) return;

    // Generate a random number between 1 and 20 (inclusive)
    const roll = Math.floor(Math.random() * 20) + 1;
    setRandomNumber(roll);

    // Calculate total skill value for the selected skill
    const skill = SKILL_LIST.find((skill) => skill.name === selectedSkill);
    if (!skill) return;

    const attrModifier = calculateModifier(attributes[skill.attributeModifier]);
    const totalSkillValue = attrModifier + (skills[selectedSkill] || 0);
    setTotalSkillValue(totalSkillValue);

    // Check if the total skill value + roll meets or exceeds the DC
    const isSuccess = totalSkillValue + roll >= dc;
    setIsSuccessful(isSuccess);
  };

  return (
    <div className="container">
      <h2>Skill Check</h2>
      <form onSubmit={handleRoll}>
        <div>
          <label htmlFor="skill">Skill:</label>
          <select
            id="skill"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Select a skill</option>
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dc">DC:</label>
          <input
            id="dc"
            type="number"
            value={dc}
            onChange={(e) => setDc(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Roll</button>
      </form>

      <br />
      <br />

      {randomNumber && (
        <div>
          <div>Skill: {selectedSkill}</div>
          <div>Rolled: {randomNumber}</div>
          <div>DC: {dc}</div>
          <div>Total Skill Value: {totalSkillValue}</div>
          <div className={isSuccessful ? "success" : "warning"}>
            Result: {isSuccessful ? "Success" : "Failure"}
          </div>
        </div>
      )}
    </div>
  );
});

export default SkillCheck;
