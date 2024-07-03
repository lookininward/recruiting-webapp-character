import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

export const calculateModifier = (value) => {
  return Math.floor((value - 10) / 2);
};

export const defaultAttrs = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 0 }),
  {}
);

export const defaultSkills = SKILL_LIST.reduce((acc, skill) => {
  return {
    ...acc,
    [skill.name]: 0,
  };
}, {});

export const newCharacter = (
  attributes = defaultAttrs,
  skills = defaultSkills
) => ({
  attributes,
  skills,
  id: crypto.randomUUID().toString(),
});