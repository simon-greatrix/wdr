import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Favourite} from '../AppState';

interface FavouriteDeleteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  favourite: Favourite | null;
  deleteFavourite: (f: Favourite) => void;
}

export default function FavouriteDelete(props: FavouriteDeleteProps) {
  if (props.favourite === null) {
    return (<span></span>);
  }

  const handleCancel = () => {
    props.setOpen(false);
  }

  const handleOk = () => {
    props.setOpen(false);
    if (props.favourite === null) {
      throw new Error("FavouriteDelete: favourite is null on OK");
    }
    props.deleteFavourite(props.favourite);
  }

  return (
      <div className={"faveDelete"}>
        <Dialog open={props.open}>
          <DialogTitle>Delete Favourite</DialogTitle>
          <DialogContent>
            Are you sure you want to delete<br/>&quot;{props.favourite.name}&quot;?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}