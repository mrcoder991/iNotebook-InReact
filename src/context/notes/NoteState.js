import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Fetch all notes
  const getNotes = async () => {
    //Todo API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDZjZDU4Nzg3ODAyYTM2ZDhlZTMyIn0sImlhdCI6MTY0ODYxMTIzNH0.T75VD_g6KuOyFCckCl29933ErofFCLvBm-rZJVeS0mw'
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDZjZDU4Nzg3ODAyYTM2ZDhlZTMyIn0sImlhdCI6MTY0ODYxMTIzNH0.T75VD_g6KuOyFCckCl29933ErofFCLvBm-rZJVeS0mw'
      },
      body: JSON.stringify({ title, description, tag })
    });

    console.log("adding a new note");
    const note = {
      "_id": "62408f0e52d55f57b28f1a13",
      "user": "623ea852ad10eb4f74bbf410",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-03-27T16:21:34.590Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/623f3626d0d61cdf34c871b2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDZjZDU4Nzg3ODAyYTM2ZDhlZTMyIn0sImlhdCI6MTY0ODYxMTIzNH0.T75VD_g6KuOyFCckCl29933ErofFCLvBm-rZJVeS0mw'
      },
      body: JSON.stringify({ title, description, tag })
    });


    //logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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