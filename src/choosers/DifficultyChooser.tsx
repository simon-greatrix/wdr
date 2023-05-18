import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface DifficultyChooserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setDifficulty: (difficulty: number) => void;
}

export default function DifficultyChooser(props: DifficultyChooserProps) {

  const choose = (d: number) => {
    props.setOpen(false);
    props.setDifficulty(d);
  };

  return (
      <Dialog open={props.open}>
        <DialogTitle>Difficulty</DialogTitle>
        <DialogContent>
          <table>
            <tbody>
            <tr>
              <td><Button disabled={true}>X</Button></td>
              <td><Button onClick={() => choose(2)}>2</Button></td>
              <td><Button onClick={() => choose(3)}>3</Button></td>
            </tr>
            <tr>
              <td><Button onClick={() => choose(4)}>4</Button></td>
              <td><Button onClick={() => choose(5)}>5</Button></td>
              <td><Button onClick={() => choose(6)}>6</Button></td>
            </tr>
            <tr>
              <td><Button onClick={() => choose(7)}>7</Button></td>
              <td><Button onClick={() => choose(8)}>8</Button></td>
              <td><Button onClick={() => choose(9)}>9</Button></td>
            </tr>
            <tr>
              <td></td>
              <td><Button onClick={() => choose(10)}>10</Button></td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
  );
}