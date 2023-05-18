import React from "react";
import {Favourite} from "./AppState";
import {DragDropContext, Draggable, DropResult} from "react-beautiful-dnd";
import {StrictModeDroppable} from "./StrictModeDroppable";

interface FaveProps {
  index: number;
  favorite: Favourite;

  toRollerTab: () => void;
  setAttribute: (attribute: string) => void;
  setAbility: (ability: string) => void;
  setDifficulty: (difficulty: number) => void;
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
      <div key={props.index} className={"faveBox"} onClick={onClick}>
        <div className={"faveTitle"}>{props.favorite.name}</div>
        <div className={"faveDescription"}>{props.favorite.attribute} with {props.favorite.ability} vs {props.favorite.difficulty}</div>
      </div>
  );
}

export default function Faves(props: FavesProps) {
  const onDragEnd = (result: DropResult) => {
    if ((!result.destination) || (!result.source) || result.destination.index === result.source.index) {
      return;
    }
    const oldFaves = props.favourites;
    const newFaves = [...oldFaves];
    const [removed] = newFaves.splice(result.source.index, 1);
    newFaves.splice(result.destination.index, 0, removed);
    props.setFavourites(newFaves);
  };

  return (
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
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      <Fave key={index} index={index}
                                            favorite={favorite}
                                            toRollerTab={props.toRollerTab}
                                            setAttribute={props.setAttribute}
                                            setAbility={props.setAbility}
                                            setDifficulty={props.setDifficulty}/>
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
      </DragDropContext>
  );
}