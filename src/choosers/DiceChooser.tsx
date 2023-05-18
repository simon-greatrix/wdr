import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BackspaceIcon from '@mui/icons-material/Backspace';

interface DiceChooserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setDice: (dice: number) => void;
}

export default function DiceChooser(props: DiceChooserProps) {
  const [count, setCount] = useState("");
  const [is2Digits, set2Digits] = useState(false);
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    if (props.open) {
      setCount("");
      set2Digits(false);
      setEmpty(true);
    }
  }, [props.open]);

  const ok = () => {
    props.setOpen(false);
    props.setDice(Number.parseInt(count));
  };

  const click = (d: number) => {
    set2Digits(count.length === 1);
    setCount(count + d);
    setEmpty(false);
  }

  const undo = () => {
    if (count.length === 1) {
      setCount("");
      setEmpty(true);
    } else {
      setCount(count.substring(0, 1));
      set2Digits(false);
    }
  }

  return (
      <Dialog open={props.open}>
        <DialogTitle>Dice: {count}</DialogTitle>
        <DialogContent>
          <table>
            <tbody>
            <tr>
              <td><Button onClick={() => click(1)} disabled={is2Digits}>1</Button></td>
              <td><Button onClick={() => click(2)} disabled={is2Digits}>2</Button></td>
              <td><Button onClick={() => click(3)} disabled={is2Digits}>3</Button></td>
            </tr>
            <tr>
              <td><Button onClick={() => click(4)} disabled={is2Digits}>4</Button></td>
              <td><Button onClick={() => click(5)} disabled={is2Digits}>5</Button></td>
              <td><Button onClick={() => click(6)} disabled={is2Digits}>6</Button></td>
            </tr>
            <tr>
              <td><Button onClick={() => click(7)} disabled={is2Digits}>7</Button></td>
              <td><Button onClick={() => click(8)} disabled={is2Digits}>8</Button></td>
              <td><Button onClick={() => click(9)} disabled={is2Digits}>9</Button></td>
            </tr>
            <tr>
              <td><Button onClick={() => undo()} disabled={isEmpty}><BackspaceIcon/></Button></td>
              <td><Button onClick={() => click(0)} disabled={is2Digits || isEmpty}>0</Button></td>
              <td><Button onClick={() => ok()} disabled={isEmpty}>OK</Button></td>
            </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
  );
}