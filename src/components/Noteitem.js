import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";

export const Noteitem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
                </div>
            </div>
        </div>
    )
}
