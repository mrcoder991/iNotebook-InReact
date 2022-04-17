import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = ""
  const notesInitial = []

  const authToken = localStorage.getItem('token')

  const [notes, setNotes] = useState(notesInitial);

  //Fetch all notes
  const getNotes = async () => {
    //Todo API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'auth-token': authToken
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }


  //Delete a note
  const deleteNote = async (id) => {

    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'aplication/json',
        'auth-token': authToken
      },
    });
    const json = await response.json()
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //USER LOGIN
  const login = async  (email, password) => {
    console.log('this is login with' ,email, password)
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password})
    });
    const json = await response.json()
    console.log(json)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, login }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;