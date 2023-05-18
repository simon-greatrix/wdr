import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import {createRoller} from "./Roller";

import Score from "./Score";
import FixedValue from "./FixedValue";
import DifficultyChooser from "./choosers/DifficultyChooser";
import {SelectChangeEvent} from "@mui/material/Select";
import AbilityChooser from "./choosers/AbilityChooser";
import AttributeChooser from "./choosers/AttributeChooser";
import FormChooser from "./choosers/FormChooser";

interface SkillRollerProps {
  getStatistic: (x: string) => number;
  addRoll: (x: number[]) => void;

  attribute: string;
  setAttribute: (x: string) => void;

  ability: string;
  setAbility: (x: string) => void;

  form: string;
  setForm: (x: string) => void;

  difficulty: number;
  setDifficulty: (x: number) => void;

  score: string;
  setScore: (x: string) => void;
}

const BONUS = {
  "Homid": {
    "Strength": 0,
    "Dexterity": 0,
    "Stamina": 0,
    "Manipulation": 0,
    "Appearance": 0
  },
  "Glabro": {
    "Strength": 2,
    "Dexterity": 0,
    "Stamina": 2,
    "Manipulation": -1,
    "Appearance": -1
  },
  "Crinos": {
    "Strength": 4,
    "Dexterity": 1,
    "Stamina": 3,
    "Manipulation": -3,
    "Appearance": -999,
  },
  "Hispo": {
    "Strength": 3,
    "Dexterity": 2,
    "Stamina": 3,
    "Manipulation": -3,
    "Appearance": -1
  },
  "Lupus": {
    "Strength": 1,
    "Dexterity": 2,
    "Stamina": 2,
    "Manipulation": -3,
    "Appearance": 0
  }
}

const BONUS_ABILITIES = {
  "No bonus": 0,
  "+1 dice": 1,
  "+2 dice": 2,
  "+3 dice": 3,
  "+4 dice": 4,
  "+5 dice": 5
}

function formBonus(getStatistic: (x: string) => number, form: string, attribute: string) {
  // @ts-ignore
  const bonus = BONUS[form][attribute];
  if (bonus === undefined) {
    return 0;
  }
  if (bonus === -999) {
    return -getStatistic("Appearance");
  }
  return bonus;
}

function abilityBonus(getStatistic: (x: string) => number, ability: string) {
  let score = getStatistic(ability);
  if (score !== undefined) {
    return score;
  }
  // @ts-ignore
  score = BONUS_ABILITIES[ability];
  if (score !== undefined) {
    return score;
  }
  console.log("ERROR : Unknown ability: " + ability);
  return 0;
}

function SkillRoller(props: SkillRollerProps) {
  const [diffDialogOpen, setDiffDialogOpen] = useState(false);
  const showDiffDialog = () => setDiffDialogOpen(true);

  const contributions = [
    props.getStatistic(props.attribute),
    abilityBonus(props.getStatistic, props.ability),
    formBonus(props.getStatistic, props.form, props.attribute)];
  const dice = Math.max(0, contributions.reduce((a, b) => a + b, 0));
  const roller = createRoller(dice, x => {
    throw new Error("Unsupported")
  }, props.difficulty, props.setDifficulty, props.setScore, props.addRoll);

  function onChangeAttribute(e: SelectChangeEvent) {
    props.setAttribute(e.target.value as string);
  }

  function onChangeAbility(e: SelectChangeEvent) {
    props.setAbility(e.target.value as string);
  }

  function onChangeForm(e: SelectChangeEvent) {
    props.setForm(e.target.value as string);
  }

  return (
      <div className="rollGrid2">
        <div className="dice2-header-attr"><span>Attribute ({contributions[0]})</span></div>
        <div className="dice2-header-ability"><span>Ability ({contributions[1]})</span></div>
        <div className="dice2-header-form"><span>Form ({contributions[2]})</span></div>
        <AttributeChooser className="dice2-attr" value={props.attribute} onChange={onChangeAttribute}/>
        <AbilityChooser className="dice2-ability" value={props.ability} onChange={onChangeAbility}/>
        <FormChooser className="dice2-form" value={props.form} onChange={onChangeForm}/>

        <div className="diff-header2"><span>Difficulty</span></div>
        <DifficultyChooser open={diffDialogOpen} setOpen={setDiffDialogOpen} setDifficulty={roller.diffSet}/>
        <IconButton className="diff-less2" onClick={roller.diffDown} disabled={props.difficulty <= 2}>
          <FixedValue value={"\u23f4"}/>
        </IconButton>
        <IconButton className="diff-value2" onClick={showDiffDialog}>
          <FixedValue value={props.difficulty}/>
        </IconButton>
        <IconButton className="diff-more2" onClick={roller.diffUp} disabled={props.difficulty >= 10}>
          <FixedValue value={"\u23f5"}/>
        </IconButton>

        <div className="score2" onClick={roller.roll}><Score value={props.score} spinId={"score"}/></div>
      </div>
  );
}

export default SkillRoller;