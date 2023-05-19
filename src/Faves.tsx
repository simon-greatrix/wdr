import React, {useState} from "react";
import {Favourite} from "./AppState";
import {DragDropContext, Draggable, DraggableProvidedDragHandleProps, DropResult} from "react-beautiful-dnd";
import {StrictModeDroppable} from "./StrictModeDroppable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import FavouriteChooser from "./choosers/FavouriteChooser";
import FavouriteDelete from "./choosers/FavouriteDelete";

interface FaveProps {
  index: number;
  favorite: Favourite;

  toRollerTab: () => void;
  setAttribute: (attribute: string) => void;
  setAbility: (ability: string) => void;
  setDifficulty: (difficulty: number) => void;

  handle: DraggableProvidedDragHandleProps | null | undefined
}

interface FavesProps {
  favourites: Favourite[];
  setFavourites: (favourites: Favourite[]) => void;

  toRollerTab: () => void;
  setAttribute: (attribute: string) => void;
  setAbility: (ability: string) => void;
  setDifficulty: (difficulty: number) => void;
}

function Fave(props: FaveProps) {
  const onClick = () => {
    props.toRollerTab();
    props.setAttribute(props.favorite.attribute);
    props.setAbility(props.favorite.ability);
    props.setDifficulty(props.favorite.difficulty);
  }
  return (
      <div className={"faveBox"} key={props.index}>
        <div className={"faveInner"}>
          <Button onClick={onClick} variant="text" sx={{width: "100%", textTransform: "none", color: "white"}}>
            <div className={"faveText"}>
              <div className={"faveTitle"}>{props.favorite.name}</div>
              <div className={"faveDescription"}>{props.favorite.attribute} with {props.favorite.ability} vs {props.favorite.difficulty}</div>
            </div>
          </Button>
        </div>
        <div className={"faveDrag"} {...props.handle}><DragIndicatorIcon sx={{fontSize: "4rem"}}/></div>
      </div>
  );
}

export default function Faves(props: FavesProps) {

  const [plusDialogOpen, setPlusDialogOpen] = useState(false);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const [faveToDelete, setFaveToDelete] = useState<Favourite | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (
        (!result.destination)
        || (!result.source)
        || (
            result.destination.index === result.source.index
            && result.destination.droppableId === result.source.droppableId)
    ) {
      return;
    }
    if (result.source.droppableId === "faves" && result.destination.droppableId === "faves") {
      const oldFaves = props.favourites;
      const newFaves = [...oldFaves];
      const [removed] = newFaves.splice(result.source.index, 1);
      newFaves.splice(result.destination.index, 0, removed);
      props.setFavourites(newFaves);
    } else if (result.source.droppableId === "faves" || result.destination.droppableId === "delete") {
      setFaveToDelete(props.favourites[result.source.index]);
      setDelDialogOpen(true);
    }
  };

  const onPlus = () => {
    setPlusDialogOpen(true);
  }

  const addFavourite = (favourite: Favourite) => {
    const oldFaves = props.favourites;
    favourite.setId(oldFaves);
    const newFaves = [favourite, ...oldFaves];
    props.setFavourites(newFaves);
  }

  const deleteFavourite = (favourite: Favourite) => {
    const oldFaves = props.favourites;
    const newFaves = oldFaves.filter(f => f.getId() !== favourite.getId());
    props.setFavourites(newFaves);
  }

  return (
      <div className={"faveContainer"}>
        <FavouriteChooser open={plusDialogOpen} setOpen={setPlusDialogOpen} setFavourite={addFavourite}/>
        <FavouriteDelete open={delDialogOpen} setOpen={setDelDialogOpen} favourite={faveToDelete} deleteFavourite={deleteFavourite}/>
        <div className={"faveBox"}>
          <Button onClick={onPlus} variant="text" sx={{width: "100%", textTransform: "none", color: "white"}}>
            <div className={"faveInner"}>
              <AddCircleOutlineIcon sx={{fontSize: "4rem"}}/>
            </div>
          </Button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId={"faves"}>
            {(provided, snapshot) => {
              return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {props.favourites.map((favorite, index) => {
                          return (
                              <Draggable key={favorite.getId()} draggableId={favorite.getId()} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                      <div ref={provided.innerRef} {...provided.draggableProps}>
                                        <Fave key={index} index={index}
                                              favorite={favorite}
                                              toRollerTab={props.toRollerTab}
                                              setAttribute={props.setAttribute}
                                              setAbility={props.setAbility}
                                              setDifficulty={props.setDifficulty}
                                              handle={provided.dragHandleProps}/>
                                      </div>
                                  );
                                }}
                              </Draggable>
                          );
                        }
                    )}

                    {provided.placeholder}
                  </div>
              )
            }
            }
          </StrictModeDroppable>
          <StrictModeDroppable droppableId={"delete"} isCombineEnabled>
            {(provided, snapshot) => {
              return (
                  <div className={"faveDropArea"} ref={provided.innerRef} {...provided.droppableProps}>
                    <DeleteIcon sx={{fontSize: "4rem"}}/>
                    <div style={{display: "none"}}>{provided.placeholder}</div>
                  </div>
              );
            }}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
  )
      ;
}