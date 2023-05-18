import Select, {SelectChangeEvent} from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface AttributeChooserProps {
  className: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function AttributeChooser(props: AttributeChooserProps) {
  return (
      <Select className={props.className} label="Attribute" value={props.value} onChange={props.onChange}>
        <ListSubheader>Physical</ListSubheader>
        <MenuItem value={"Strength"}>Strength</MenuItem>
        <MenuItem value={"Dexterity"}>Dexterity</MenuItem>
        <MenuItem value={"Stamina"}>Stamina</MenuItem>
        <ListSubheader>Social</ListSubheader>
        <MenuItem value={"Charisma"}>Charisma</MenuItem>
        <MenuItem value={"Manipulation"}>Manipulation</MenuItem>
        <MenuItem value={"Appearance"}>Appearance</MenuItem>
        <ListSubheader>Mental</ListSubheader>
        <MenuItem value={"Perception"}>Perception</MenuItem>
        <MenuItem value={"Intelligence"}>Intelligence</MenuItem>
        <MenuItem value={"Wits"}>Wits</MenuItem>
      </Select>
  )
}