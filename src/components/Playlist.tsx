import React from "react";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';

export type KeyedLink = {
  link: string;
  id: string;
}

type PlaylistProps = {
  links: Array<KeyedLink>;
  deleteHandler: (_: string) => void;
  reorderingHandler: (source: number, destination: number) => void;
};

function Playlist({ links, deleteHandler, reorderingHandler }: PlaylistProps) {
  function onDragEnd(result: DropResult) {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) return; // dropped in same place
    
    reorderingHandler(source.index, destination.index);    
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="playlist">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <List sx={{ py: 0, alignItems: "center" }}>
              {links.map((link, index) => (
                <Draggable draggableId={link.id} index={index} key={link.id}>
                  {(provided) => (
                    <div                       
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Paper sx={{ mt: 1 }}>
                        <ListItem secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={(event) => deleteHandler(link.link)}>
                            <ClearIcon />
                          </IconButton>
                        }>
                          <ListItemIcon>
                            <DragIndicatorIcon fontSize="large"/>
                          </ListItemIcon>
                          <ListItemText primary={link.link} primaryTypographyProps={{ fontSize: '25px' }} ></ListItemText>
                        </ListItem>
                      </Paper>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Playlist;
