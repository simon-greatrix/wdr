import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import {createRoller} from "./Roller";

import Score from "./Score";
import FixedValue from "./FixedValue";
import DifficultyChooser from "./choosers/DifficultyChooser";
import DiceChooser from "./choosers/DiceChooser";

interface BasicRollerProps {
  addRoll: (x: number[]) => void;

  dice: number;
  setDice: (x: number) => void;

  difficulty: number;
  setDifficulty: (x: number) => void;

  score: string;
  setScore: (x: string) => void;
}

function BasicRoller(props: BasicRollerProps) {
  const [diffDialogOpen, setDiffDialogOpen] = useState(false);
  const [diceDialogOpen, setDiceDialogOpen] = useState(false);

  const roller = createRoller(props.dice, props.setDice, props.difficulty, props.setDifficulty, props.setScore, props.addRoll);
  const showDiffDialog = () => setDiffDialogOpen(true);
  const showDiceDialog = () => setDiceDialogOpen(true);
  return (
      <div className="rollGrid1">
        <DiceChooser open={diceDialogOpen} setOpen={setDiceDialogOpen} setDice={roller.diceSet}/>
        <div className="dice-header1"><span>Dice</span></div>
        <IconButton className="dice-less1" onClick={roller.diceDown} disabled={props.dice <= 1}>
          <FixedValue value={"\u23f4"}/>
        </IconButton>
        <IconButton className="dice-value1" onClick={showDiceDialog}>
          <FixedValue value={props.dice}/>
        </IconButton>
        <IconButton className="dice-more1" onClick={roller.diceUp} disabled={props.dice >= 100}>
          <FixedValue value={"\u23f5"}/>
        </IconButton>

        <div className="diff-header1"><span>Difficulty</span></div>
        <DifficultyChooser open={diffDialogOpen} setOpen={setDiffDialogOpen} setDifficulty={roller.diffSet}/>
        <IconButton className="diff-less1" onClick={roller.diffDown} disabled={props.difficulty <= 2}>
          <FixedValue value={"\u23f4"}/>
        </IconButton>
        <IconButton className="diff-value1" onClick={showDiffDialog}>
          <FixedValue value={props.difficulty}/>
        </IconButton>
        <IconButton className="diff-more1" onClick={roller.diffUp} disabled={props.difficulty >= 10}>
          <FixedValue value={"\u23f5"}/>
        </IconButton>

        <div className="score1" onClick={roller.roll}><Score value={props.score} spinId={"score"}/></div>
      </div>
  );
}

export default BasicRoller;