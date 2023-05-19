import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface FormChooserProps {
  className: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function FormChooser(props: FormChooserProps) {
  return (
      <Select className={props.className} value={props.value} onChange={props.onChange}>
        <MenuItem value={"Homid"}>Homid</MenuItem>
        <MenuItem value={"Glabro"}>Glabro</MenuItem>
        <MenuItem value={"Crinos"}>Crinos</MenuItem>
        <MenuItem value={"Hispo"}>Hispo</MenuItem>
        <MenuItem value={"Lupus"}>Lupus</MenuItem>e
      </Select>
  );
}