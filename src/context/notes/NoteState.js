import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0NzNiYTZiNDY4M2IzMTk0MmJkMjc1In0sImlhdCI6MTY0ODgzNTUzMH0.F4ys6gYZQlgNVvFli77l0PnXJk1kBhLE75-tPIQXnOY'

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

    const json = await response.json();
    console.log(json)
     

    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'aplication/json',
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDZjZDU4Nzg3ODAyYTM2ZDhlZTMyIn0sImlhdCI6MTY0ODYxMTIzNH0.T75VD_g6KuOyFCckCl29933ErofFCLvBm-rZJVeS0mw'
      },
    });
    const json = await response.json()
    console.log(json)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;