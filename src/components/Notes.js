import React, { useContext, useEffect } from 'react';
import { Noteitem } from './Noteitem';
import { Addnote } from './Addnote';
import noteContext from "../context/notes/noteContext";

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        getNotes()
    }, [])
    
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
