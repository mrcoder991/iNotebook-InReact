import React, {useState, useContext} from 'react'
import noteContext from "../context/notes/noteContext";

export const Addnote = () => {
    const context = useContext(noteContext);
    const { notes, setNotes, addNote } = context;
    const [note, setNote] = useState({title:"", description: "", tag: "default"});
    const handleClick = (e) => {
        addNote(note.title, note.description, note.tag);
        e.preventDefault();
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <h2>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}
