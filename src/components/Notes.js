import React, { useContext } from 'react';
import { Noteitem } from './Noteitem';
import { Addnote } from './Addnote';
import noteContext from "../context/notes/noteContext";

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <>
            <Addnote />
            <div className="row my-3">
                <h2>My notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />;
                })}
            </div>
      </>
    )
}
