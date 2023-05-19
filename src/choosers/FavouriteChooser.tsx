import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Favourite} from '../AppState';
import AbilityChooser from './AbilityChooser';
import AttributeChooser from './AttributeChooser';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import {MenuItem} from "@mui/material";

interface FavouriteChooserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setFavourite: (f: Favourite) => void;
}

export default function FavouriteChooser(props: FavouriteChooserProps) {

  const [name, setName] = useState("");
  const [attribute, setAttribute] = useState("Strength");
  const [ability, setAbility] = useState("Alertness");
  const [difficulty, setDifficulty] = useState("6");

  function onChangeAttribute(e: SelectChangeEvent) {
    setAttribute(e.target.value as string);
  }

  function onChangeAbility(e: SelectChangeEvent) {
    setAbility(e.target.value as string);
  }

  function onChangeDifficulty(e: SelectChangeEvent) {
    setDifficulty(e.target.value as string);
  }

  function handleCancel() {
    props.setOpen(false);
  }

  function handleOk() {
    props.setOpen(false);
    const newFave = new Favourite(name, attribute, ability, parseInt(difficulty));
    props.setFavourite(newFave);
  }


  return (
      <Dialog open={props.open}>
        <DialogTitle>New Favourite</DialogTitle>
        <DialogContent>
          <div className="fcDialog">
            <div className="fcName">Name</div>
            <div className="fcText"><TextField className={"fullWidth"} label={"Name"} value={name} onChange={(e) => setName(e.target.value)}/></div>
            <div className="fcLabel1">Attribute</div>
            <div className="fcValue1"><AttributeChooser className={"fullWidth"} value={attribute} onChange={onChangeAttribute}/></div>
            <div className="fcLabel2">Ability</div>
            <div className="fcValue2"><AbilityChooser className={"fullWidth"} value={ability} onChange={onChangeAbility}/></div>
            <div className="fcLabel3">Difficulty</div>
            <div className="fcValue3"><Select className="fcDiff" value={difficulty} onChange={onChangeDifficulty}>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={name.trim().length === 0} onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
  );
}