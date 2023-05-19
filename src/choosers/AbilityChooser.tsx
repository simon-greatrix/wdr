import Select, {SelectChangeEvent} from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface AbilityChooserProps {
  className: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function AbilityChooser(props: AbilityChooserProps) {
  return (
      <Select className={props.className} value={props.value} onChange={props.onChange}>
        <ListSubheader>Talents</ListSubheader>
        <MenuItem value={"Alertness"}>Alertness</MenuItem>
        <MenuItem value={"Athletics"}>Athletics</MenuItem>
        <MenuItem value={"Brawl"}>Brawl</MenuItem>
        <MenuItem value={"Dodge"}>Dodge</MenuItem>
        <MenuItem value={"Empathy"}>Empathy</MenuItem>
        <MenuItem value={"Expression"}>Expression</MenuItem>
        <MenuItem value={"Intimidation"}>Intimidation</MenuItem>
        <MenuItem value={"Primal-Urge"}>Primal&#8209;Urge</MenuItem>
        <MenuItem value={"Streetwise"}>Streetwise</MenuItem>
        <MenuItem value={"Subterfuge"}>Subterfuge</MenuItem>
        <ListSubheader>Skills</ListSubheader>
        <MenuItem value={"Animal Ken"}>Animal&nbsp;Ken</MenuItem>
        <MenuItem value={"Drive"}>Drive</MenuItem>
        <MenuItem value={"Etiquette"}>Etiquette</MenuItem>
        <MenuItem value={"Firearms"}>Firearms</MenuItem>
        <MenuItem value={"Melee"}>Melee</MenuItem>
        <MenuItem value={"Leadership"}>Leadership</MenuItem>
        <MenuItem value={"Performance"}>Performance</MenuItem>
        <MenuItem value={"Repair"}>Repair</MenuItem>
        <MenuItem value={"Stealth"}>Stealth</MenuItem>
        <MenuItem value={"Survival"}>Survival</MenuItem>
        <ListSubheader>Knowledge</ListSubheader>
        <MenuItem value={"Computer"}>Computer</MenuItem>
        <MenuItem value={"Enigmas"}>Enigmas</MenuItem>
        <MenuItem value={"Investigation"}>Investigation</MenuItem>
        <MenuItem value={"Law"}>Law</MenuItem>
        <MenuItem value={"Linguistics"}>Linguistics</MenuItem>
        <MenuItem value={"Medicine"}>Medicine</MenuItem>
        <MenuItem value={"Occult"}>Occult</MenuItem>
        <MenuItem value={"Politics"}>Politics</MenuItem>
        <MenuItem value={"Rituals"}>Rituals</MenuItem>
        <MenuItem value={"Science"}>Science</MenuItem>
        <ListSubheader>Bonus Dice</ListSubheader>
        <MenuItem value={"No bonus"}>No&nbsp;bonus</MenuItem>
        <MenuItem value={"+1 dice"}>+1&nbsp;dice</MenuItem>
        <MenuItem value={"+2 dice"}>+2&nbsp;dice</MenuItem>
        <MenuItem value={"+3 dice"}>+3&nbsp;dice</MenuItem>
        <MenuItem value={"+4 dice"}>+4&nbsp;dice</MenuItem>
        <MenuItem value={"+5 dice"}>+5&nbsp;dice</MenuItem>
      </Select>
  );
}