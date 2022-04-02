import React, {useState, useContext} from 'react'
import noteContext from "../context/notes/noteContext";

export const Addnote = () => {
    const context = useContext(noteContext);
    const { notes, setNotes, addNote } = context;
    const [note, setNote] = useState({title:"", description: "", tag: ""});
    
    const handleClick = (e) => {
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description: "", tag: ""})
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
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} minLength={5} required/>
                </div>
               
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}
